const express = require('express');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
