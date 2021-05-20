import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import VideoChat from "../TextContainer/VideoChat.js";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";

const ContentRedistribution = lazy(() => import("../content_redistribution"));

const ENDPOINT = "localhost:5000";

let socket;
socket = io(ENDPOINT);

const Chat = () => {
  const [name, setName] = useState();
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loggedIn, setLoggedIn] = useState();
  const [myID, setMyID] = useState();

  function runConnection() {
    setLoggedIn(true);

    socket.emit("join", { name }, (error) => {
      if (error) {
        alert(error);
        setLoggedIn(false);
      }
    });
    socket.on("me", (id) => {
      setMyID(id);
    });
  }

  useEffect(() => {
    // new CircleType(document.getElementById("circletype")).radius(700);
    if (loggedIn) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on("roomData", ({ users, username }) => {
        setUsers(users);
        setName(username);
      });
    }
  }, [loggedIn]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div
      style={{
        background: "radial-gradient(#00ff04, pink, white)",
        position: "fixed",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        zIndex: "-9999",
      }}
    >
      <Suspense fallback={null}>
        <ContentRedistribution loggedIn={loggedIn} />
      </Suspense>

      {!loggedIn && (
        <>
          <div className="outer-container">
            <div className="circletype-container">
              <p id="circletype">
                www.stayvirtual.online** softly introduces H r w a i l Archive
                of Human Expression* ·{" "}
              </p>
            </div>
            <div className="container">
              <input
                placeholder="Name"
                className="input"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <button
              onClick={(e) => runConnection()}
              className={"sendButton"}
              type="submit"
            >
              Sign In
            </button>
          </div>
          <p>
            * a generative encyclopedia of images as expressions. <br></br>
            ** an open source landscape <br></br> + live chat
          </p>
        </>
      )}

      {loggedIn && (
        <>
          <div className="chatContainer container-ish">
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>

          <VideoChat users={users} socket={socket} id={myID} myName={name} />
        </>
      )}
    </div>
  );
};

export default Chat;
