const express = require('express');
const userRouter = require('./routes/userRouter');
const playlistRouter = require('./routes/playlistRouter');
const roomRouter = require('./routes/roomRouter');

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/room', roomRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
