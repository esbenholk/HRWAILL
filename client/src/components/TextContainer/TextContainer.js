import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

function TextContainer({ users }) {
  const HWRAILL_Text =
    "THE HRWAILL ARCHIVE of Human Expressions is a user generated data set that unfolds into a 3D landscape.  \n\nPlay as data input for the semi-sentient machine learning algorithm HRWAILL and enjoy First Person Shooter access to its slowly expanding index of signs, images and symbols.  \n\nClick on landscape to toggle controls AWSD \nClick ESC to reclaim control of your cursor";
  return (
    <div
      className="container"
      style={{
        position: "fixed",
        top: "200px",
        zIndex: "99999",
        pointerEvents: "auto",
        maxWidth: "250px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {users ? (
        <div>
          <p style={{ whiteSpace: "pre-wrap" }}>{HWRAILL_Text}</p>

          <p className="users-headline">Online users</p>
          <div className="users">
            {users.map((user) => (
              <div key={user.name} className="activeItem">
                <p>{user.name}</p>
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TextContainer;
