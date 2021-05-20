import React, { useEffect, useRef, useState } from "react";
import { CopyToClipBoard } from "react-copy-to-clipboard";
import Peer from "simple-peer";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

function TextContainer({ users, socket }) {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const connectionRef = useRef();
  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [socket, stream]);

  function call(user) {
    callUser(user);
  }

  function callUser(user) {
    const id = user.id;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }

  function answerCall() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    setCallAccepted(true);

    peer.on("stream", (stream) => {
      console.log("uservideo", stream, callAccepted, callEnded);
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  }

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div className="textContainer container-ish">
      {users ? (
        <div>
          <p className="users-headline">Online users</p>

          {users.map((user) => (
            <div key={user.name} className="activeItem">
              <p>{user.name}</p>
              <img alt="Online Icon" src={onlineIcon} />
              <button onClick={() => call(user)}>call user</button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="video">
        {stream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            controls
            style={{ width: "300px" }}
          />
        )}
        {!callEnded ? (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        ) : null}

        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>{name} is calling...</h1>
            <button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TextContainer;

// <div className="userContainer">
// <TextContainer users={users} socket={socket} />
// </div>
