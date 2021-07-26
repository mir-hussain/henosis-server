//require packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//server port
const port = process.env.PORT || 5000;

//express app initialization
const app = express();
app.use(express.json());
app.use(cors());

//database connection with mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.ghclx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("ERROR", error));

//application routes

//root route
app.get("/", (req, res) => {
  res.send("Henosis server is running");
});

// default error handler
function errorHandler(req, res, err, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(port, () => {
  console.log(`Boss! I am listening to you at port:${port}`);
});
