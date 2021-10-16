const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//
// RUN DB
require("./DB/mongoose");

//
//
const todosRouter = require("./routes/todosRouter");
const usersRouter = require("./routes/userRouter");
//
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(todosRouter);
app.use(usersRouter);



//
app.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});

//
PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
