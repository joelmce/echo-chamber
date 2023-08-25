const express = require("express");
const users = require("./api/getUsers.js");

const app = express();
app.use(express.json());

app.use("/api/users", users);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
