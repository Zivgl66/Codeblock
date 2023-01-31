const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
require("dotenv").config();
const { Server } = require("socket.io");
const ACTIONS = require("./src/Actions");
const connectToDb = require("./server/connectToDB");
const PORT = process.env.PORT || 5000;

// connect to server with websocket and mongoDB
const server = http.createServer(app);
const io = new Server(server);
server.listen(PORT, function () {
  connectToDb
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log(err));
});

app.use(express.static("build"));
app.use((req, res, next) => {
  res.sendFile(path, join(__dirname, "build", "index.html"));
});

// create a user model and schema
const User = mongoose.model("User", { name: String });

// users object
const userSocketMap = {};

//function to make an array of clients and add new ones
function getAllConnectedClients(codeblockId) {
  return Array.from(io.sockets.adapter.rooms.get(codeblockId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

// when a connection to the socket is established
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  // join a user to the socket and add to DB
  socket.on(ACTIONS.JOIN, ({ codeblockId, username }) => {
    const user = new User({ name: username });
    user.save().then(() => console.log("new user added"));
    userSocketMap[socket.id] = username;
    socket.join(codeblockId);
    const clients = getAllConnectedClients(codeblockId);
    console.log("clients: ", clients);
    clients.forEach((client) => {
      io.to(client.socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // change code in real time for both users
  socket.on(ACTIONS.CODE_CHANGE, ({ codeblockId, code }) => {
    socket.in(codeblockId).emit("code-change", { code });
  });

  // sync code when first entering the codeblock
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.in(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // discconect a user from the socket and remove from DB
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
      User.findOneAndRemove({ username: userSocketMap[socket.id] }, () => {});
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});
