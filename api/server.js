// imports
const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter');
const playlistRouter = require('./routes/playlistRouter');
const roomRouter = require('./routes/roomRouter');
const messageRouter = require('./routes/messageRouter');

// initialize express server
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// initialize socketIO server
const { Server } = require("socket.io");
const io = new Server(server);

// server static files from client folder, use JSON for requests
app.use(express.json());
app.use(express.static('../client'));

// api routes
app.use('/api/users', userRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', messageRouter);

// render index.html as root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// handle socketIO events - listen for messages and fetch room via query params
// connection event (might help with displaying which members are in what room)
io.on("connection", (socket) => {
  console.log("new connection");

  // handles room changing
  const roomType = socket.handshake.query.roomType;
  socket.join(roomType);

  // on message event send message to the correct room
  socket.on("message", (message) => {
    io.to(roomType).emit("message", message);
  });

  // disconnect event (might help with displaying which members are in what room)
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});
