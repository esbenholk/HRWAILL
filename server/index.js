const http = require("http");
const express = require("express");
const cors = require("cors");
const { cloudinary } = require("./utils/cloudinary");
const webrtc = require("wrtc");
const bodyParser = require("body-parser");
var path = require("path");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const stun = require("stun");

stun.request("stun.l.google.com:19302", (err, res) => {
  if (err) {
    console.error("stun doesnt work", err);
  } else {
    const { address } = res.getXorAddress();
    console.log("your ip", address);
  }
});

const PORT = process.env.PORT || 5000;

let senderStream;

const room = "stayvirtual.online";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://stayvirtual.online",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
// app.use(router);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

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
      user: "HRWAILL Archive",
      text: `Hej, ${capitalizeFirstLetter(
        user.name
      )}, it's me: the HRWAILL Archive of Human Expressions :( :) welcome to StayVirtual.Online. Good that you came! We need your help`,
    });

    setTimeout(function () {
      socket.emit("message", {
        user: "HRWAILL Archive",
        text: `Will you please feed the me your expresions? I so desperately want to express more `,
      });
    }, 6000);

    socket.broadcast.to(room).emit("message", {
      user: "HRWAILL Archive",
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

    if (user) {
      io.to(room).emit("message", {
        user: "HRWAILL Archive",
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
    console.log("image in socket", data.data.newImage);

    io.to(room).emit("message", {
      user: "HRWAILL Archive",
      text: `thats a beautiful jpg, thank u`,
      newImage: data.data.newImage,
    });
  });
});

// app.get("/", (req, res) => {
//   res.send(
//     "hello world, i am an autonomous server. I was sneazed into existence. call me..."
//   );
// });

app.use(express.static(path.join(__dirname, "build")));

app.get("/api/getallimages", async (req, res) => {
  console.log("gts images");
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
    console.log(req.body.name);
    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "contentRedistribution",
      public_id:
        "file" +
        Math.random().toString(36).substring(2) +
        "_from_" +
        req.body.name,
    });
    res.json({ newImage: uploadRes.url });
  } catch (error) {
    console.error("there is error", error);
    res.status(500).json({ err: "there is an error" });
  }
});

app.post("/api/consumer", async ({ body }, res) => {
  console.log("CONSUMER CALLS", senderStream);

  if (senderStream) {
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        // {
        //   url: "turn:192.158.29.39:3478?transport=udp",
        //   credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
        //   username: "28224511:1379330808",
        // },
      ],
    });
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    senderStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, senderStream));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription,
    };
    console.log("CONSUMER SENDS", payload);

    res.json(payload);
  } else {
    res.status(500).json({ err: "there is an error" });
  }
});

app.post("/api/broadcast", async ({ body }, res) => {
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      // {
      //   url: "turn:192.158.29.39:3478?transport=udp",
      //   credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      //   username: "28224511:1379330808",
      // },
    ],
  });
  peer.ontrack = (e) => handleTrackEvent(e, peer);
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription,
  };

  res.json(payload);
});
app.post("/api/endbroadcast", async ({ body }, res) => {
  senderStream = undefined;
});

app.get("/*", (req, res) => {
  console.log("sends build folder");
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
  console.log("BROADCASTER CREATES", senderStream);
}

server.listen(PORT, () => console.log(`Server has started.`, PORT));
