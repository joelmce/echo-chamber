// imports
require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRouter');
const songsRouter = require('./routes/songsRouter');
const roomRouter = require('./routes/roomRouter');
const messageRouter = require('./routes/messageRouter');
const sessionsRouter = require('./routes/sessionsRouter.js');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

/**
 * Initialize the server components
 */
const app = express();
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'http://localhost';
const server = app.listen(port, () => {
  console.log(`Server running on ${domain}:${port}`);
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

/* initialize socketIO server */
const { Server } = require('socket.io');
const io = new Server(server);
io.engine.use(sessionMiddleware);

/* Serve static files from client folder, use JSON for API requests */
app.use(express.json());
app.use(express.static('../client'));

/* Initialize express session */
app.use(sessionMiddleware);

/* API routes */
app.use('/api/users', userRouter);
app.use('/api/songs', songsRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);
app.use('/api/sessions', sessionsRouter);

/**
 * Handle socketIO events - listen for messages and fetch room via query params
 * connection event (might help with displaying which members are in what room)
 */
io.on('connection', (socket) => {
  console.log('A new user has connected');

  /* On message event send message to the correct room */
  socket.on('new message', (message) => {
    io.to(message.roomId).emit('share message', message);
  });

  /* When a user adds the song to the playlist */
  socket.on('new song', (song) => {
    io.to(song.roomId).emit('share song', song);
  });

  socket.on('like song', (roomId) => {
    io.to(roomId).emit('update songs', roomId);
  });

  socket.on('join room', ({ roomId }) => {
    for (const room of socket.rooms) {
      socket.leave(room);
    }

    socket.join(roomId);
  });

  /* Disconnect event  */
  /* TODO: Add members online */
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

module.exports = app;
