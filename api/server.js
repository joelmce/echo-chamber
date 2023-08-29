require('dotenv').config();
const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter');
const playlistRouter = require('./routes/playlistRouter');
const roomRouter = require('./routes/roomRouter');
const messageRouter = require('./routes/messageRouter');
const sessionsRouter = require('./routes/sessionsRouter.js');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const WebSocket = require('ws');

const app = express();

const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

app.use(express.json());

app.use(express.static('../client'));
app.use(
  expressSession({
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
  })
);

const chatSockets = [];
const playlistSockets = [];

wss.on('connection', (socket, request) => {
  console.log('New client connected');

  const url = request.url;

  if (url === '/playlist') {
    playlistSockets.push(socket); // Add the socket to the playlistSockets array

    socket.on('message', (message) => {
      playlistSockets.forEach((playlistSocket) => {
        if (playlistSocket.readyState === WebSocket.OPEN) {
          playlistSocket.send(JSON.stringify(message));
        }
      });
    });
  } else if (url === '/chat') {
    chatSockets.push(socket); // Add the socket to the chatSockets array

    socket.on('message', (message) => {
      chatSockets.forEach((chatSocket) => {
        if (chatSocket.readyState === WebSocket.OPEN) {
          chatSocket.send(JSON.stringify(message));
        }
      });
    });
  }

  socket.on('close', () => {
    console.log('Client disconnected');

    // Remove the socket from the respective array when it's closed
    if (url === '/playlist') {
      const index = playlistSockets.indexOf(socket);
      if (index !== -1) {
        playlistSockets.splice(index, 1);
      }
    } else if (url === '/chat') {
      const index = chatSockets.indexOf(socket);
      if (index !== -1) {
        chatSockets.splice(index, 1);
      }
    }
  });
});

// socket.on('message', (message) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(message));
//     }
//   });
// });

//   socket.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

app.use('/api/users', userRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);
app.use('/api/sessions', sessionsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
