const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

const room = "stayvirtual.online";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(router);

const users = {};

io.on("connect", (socket) => {
  socket.on("join", ({ name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name });

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (error) return callback(error);

    socket.join(room);

    console.log("users socket.id", socket.id);

    socket.emit("me", socket.id);

    socket.emit("message", {
      user: "Hrwail Archive",
      text: `Hej, ${capitalizeFirstLetter(
        user.name
      )}, it's me: the Hrwail Archive of Human Expressions :( :) welcome to StayVirtual.Online. Good that you came! We need your help`,
    });

    setTimeout(function () {
      socket.emit("message", {
        user: "Hrwail Archive",
        text: `Will you please feed the me your expresions? I so desperately want to express more `,
      });
    }, 6000);

    socket.broadcast.to(room).emit("message", {
      user: "Hrwail Archive",
      text: `${user.name} is also here`,
    });

    io.to(room).emit("roomData", {
      username: user.name,
      room: room,
      users: getUsersInRoom(room, user.name),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(socket.id);

    io.to(room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    console.log("disconnedting", user);

    if (user) {
      io.to(room).emit("message", {
        user: "Hrwail Archive",
        text: `${user.name} left us.`,
      });
      io.to(room).emit("roomData", { room: room, users: getUsersInRoom(room) });
    }
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    console.log("answers call from user", data);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
