const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const { cloudinary } = require("./utils/cloudinary");

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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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

    if (user) {
      io.to(room).emit("message", { user: user.name, text: message });
    }

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
    console.log("answers call from user", data.images);
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("uploadImage", (data) => {
    console.log("in socket", data.data.images.length);

    io.to(room).emit("message", {
      user: "Hrwail Archive",
      text: `thats a beautiful jpg, thank u`,
      images: data.data.images,
    });
  });
});

app.get("/", (req, res) => {
  res.send(
    "hello world, i am an autonomous server. I was sneazed into existence. call me..."
  );
});

app.get("/api/getallimages", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:contentRedistribution")
      .sort_by("public_id", "desc")
      .max_results(99999)
      .execute();

    const publicUrls = await resources.map((file) => file.url);

    console.log("first image load", publicUrls.length);

    res.json({ images: publicUrls });
  } catch (error) {
    console.error("there is error", error);
    res.status(500).json({ err: "there is an error" });
  }
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "contentRedistribution",
    });

    ///revert back to only sending

    console.log("after upload", uploadRes.url);

    res.json({ newImage: uploadRes.url });
  } catch (error) {
    console.error("there is error", error);
    res.status(500).json({ err: "there is an error" });
  }
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
