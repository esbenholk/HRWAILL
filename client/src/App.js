import React, { Suspense, useRef, useState } from "react";

import Chat from "./components/Chat/Chat";
import ContentRedistribution from "./components/content_redistribution";

import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import io from "socket.io-client";

const ENDPOINT = "https://stayvirtual-chat-backend.herokuapp.com/";

const socket = io(ENDPOINT);

const recording = false;

const INTRO_Text =
  "www.stayvirtual.online** softly introduces  \n THE HRWAILL ARCHIVE of Human Expression* Your semi-sentient 3D dataset \ncreated by Esben Holk @ HOUSE OF KILLING  \n with music by Sophie Harkins and Font by Jules Durand \n\nEnter with your name to share your jpgs with HRWAILL   ";

const App = () => {
  const [name, setName] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [myID, setMyID] = useState();

  const nameRef = useRef();

  function runConnection(nameRef) {
    const name = nameRef;
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

  return (
    <Router>
      <Route path="/" exact>
        {!loggedIn && !recording ? (
          <>
            <div className="outer-container" style={{ zIndex: "1" }}>
              <img
                style={{ height: "200px", objectFit: "contain" }}
                id="logo"
                src="https://res.cloudinary.com/www-houseofkilling-com/image/upload/v1623355136/textures/logo_y5vsqo.png"
                alt="HRWAILL_icon"
              />

              <p
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                {INTRO_Text}
              </p>

              <div className="container">
                <input
                  placeholder="Name"
                  className="input"
                  type="text"
                  ref={nameRef}
                />
              </div>

              <button
                onClick={(e) => {
                  setName(nameRef.current.value);
                  runConnection(nameRef.current.value);
                }}
                className={"sendButton"}
                type="submit"
              >
                Sign In
              </button>
            </div>
            <p>
              * a generative encyclopedia of images as expressions. <br></br>
              ** an open source landscape <br></br> + live chat <br></br>
              created by Esben Holk @{" "}
              <a href="http://beta.houseofkilling.com/"> HOUSE OF KILLING</a>
              <br></br>
              with music by Sophie Harkins and Font by{" "}
              <a href="https://www.julesdurand.xyz/">Jules Durand</a>
            </p>
          </>
        ) : null}

        <Suspense fallback={null}>
          <ContentRedistribution
            socket={socket}
            loggedIn={loggedIn}
            name={name}
            myID={myID}
          />
          <Chat socket={socket} loggedIn={loggedIn} name={name} myID={myID} />
        </Suspense>
      </Route>
    </Router>
  );
};

export default App;

// <Route path="/broadcast" exact>
// <Broadcast socket={socket} />
// </Route>
