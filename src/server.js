/* eslint-disable arrow-parens */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");

const server = require(`http`);
const socketServer = require(`socket.io`);

const app = express();
const appServer = server.Server(app);

const io = socketServer(appServer);

const userConnected = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;
  userConnected[user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://ezdevs:ez123devs@cluster0-1nal0.mongodb.net/ezcamp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = userConnected;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(router);

appServer.listen(3000);
