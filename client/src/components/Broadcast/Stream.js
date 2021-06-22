import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
const streamUrl =
  "https://9080d9c066cb.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.554958627116.channel.DTf3HzFPw6Tl.m3u8";

const isStreaming = true;
export default function Stream(props) {
  const [hasStream, setHasStream] = useState(false);
  const stream = useRef();
  useEffect(() => {
    UrlExists(streamUrl);
  });

  function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open("HEAD", url, false);
    http.send();
    if (http.status !== 404) {
      console.log("has stream");
      setHasStream(true);
      props.callbackFunction();
    } else {
      console.log("does not have stream");
      setHasStream(false);
    }
  }

  return (
    <div
      className="container"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "99999",
        pointerEvents: "auto",
        width: "250px",
        height: "180px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {hasStream && isStreaming ? (
        <ReactPlayer
          ref={stream}
          url={streamUrl}
          width="100%"
          height="105%"
          playing
          controls
          playsinline
          disablePictureInPicture
          id="video"
        />
      ) : (
        <img
          style={{ height: "100%", objectFit: "contain" }}
          id="logo"
          src="https://res.cloudinary.com/www-houseofkilling-com/image/upload/v1623355136/textures/logo_y5vsqo.png"
          alt="HRWAILL_icon"
        />
      )}
    </div>
  );
}
