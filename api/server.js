// imports
require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRouter');
const playlistRouter = require('./routes/playlistRouter');
const roomRouter = require('./routes/roomRouter');
const messageRouter = require('./routes/messageRouter');
const sessionsRouter = require('./routes/sessionsRouter.js');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

// initialize express server
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const sessionMiddleware = expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  },
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(new PrismaClient(), {
    checkPeriod: 2 * 60 * 1000, // 2 minutes in ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

// initialize socketIO server
const { Server } = require('socket.io');
const io = new Server(server);
io.engine.use(sessionMiddleware);

// server static files from client folder, use JSON for requests
app.use(express.json());
app.use(express.static('../client'));

// initialize express session
app.use(sessionMiddleware);

// api routes
app.use('/api/users', userRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);
app.use('/api/sessions', sessionsRouter);

// handle socketIO events - listen for messages and fetch room via query params
// connection event (might help with displaying which members are in what room)
io.on('connection', (socket) => {
  console.log('new connection');
  // console.log('socket.io session:', socket.request.session);

  // on message event send message to the correct room
  socket.on('new message', (message, authorName, roomId) => {
    console.log(message, authorName, roomId);
    io.to(roomId).emit('share message', message, authorName);
  });

  socket.on('join-room', (roomId) => {
    const rooms = socket.rooms;
    for (const room of rooms) {
      if (room !== socket.id) rooms.delete(room);
    }

    socket.join(roomId);
  });

  // socket.on('newSong', (newSong) => {
  //   io.emit();
  // }

  // disconnect event (might help with displaying which members are in what room)
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});
