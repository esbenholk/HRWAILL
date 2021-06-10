import React, { useRef } from "react";
import axios from "axios";

export default function Broadcast() {
  const button = useRef();
  const video = useRef();

  async function init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      video.current.srcObject = stream;
      const peer = createPeer();
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    } catch (error) {
      console.log(error);
    }
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          url: "turn:192.158.29.39:3478?transport=udp",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
          username: "28224511:1379330808",
        },
      ],
    });
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
  }

  function endStream() {
    axios.post("/api/endbroadcast");
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    console.log("BROADCASTER SENDS", payload);

    const { data } = await axios.post("/api/broadcast", payload);

    const desc = new RTCSessionDescription(data.sdp);
    peer
      .setRemoteDescription(desc)
      .catch((e) => console.log("there is an error", e));
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        zIndex: "10",
      }}
    >
      <button ref={button} id="my-button" onClick={init}>
        Start Stream
      </button>
      <button ref={button} id="my-button" onClick={endStream}>
        End Stream
      </button>

      <video ref={video} autoPlay controls id="video"></video>
    </div>
  );
}
