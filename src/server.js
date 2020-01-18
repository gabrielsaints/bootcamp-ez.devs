const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
// const server = require(`https`);

const app = express();

mongoose.connect(
  "mongodb+srv://ezdevs:ez123devs@cluster0-1nal0.mongodb.net/ezcamp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());

app.listen(3000);

app.use(router);

console.log("API started at 3000");

/**
 * server.Server(app)
 * server.listen()
 */
