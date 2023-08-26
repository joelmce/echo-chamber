const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter');

const WebSocket = require('ws');

const app = express();

const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static('../client'));

wss.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(message);
        client.send(JSON.stringify(message));
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
