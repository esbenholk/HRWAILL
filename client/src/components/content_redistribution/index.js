import React, { useEffect, useState, Suspense } from "react";
import ContentRedistributionCanvas from "./canvas";

import SongPlayer from "./MusicPlayer";

const URL = "https://hok-studio-backend.herokuapp.com";

export default function ContentRedistribution(props) {
  const [imageUrls, setImageUrls] = useState([]);
  const [hasNewImage, setHasNewImage] = useState(true);
  const [previewSource, setPreviewSource] = useState("");

  const loadImages = async () => {
    console.log("loading images");
    try {
      const res = await fetch("/api/getallimages");

      const data = await res.json();
      setImageUrls(data.images);
    } catch (error) {
      console.error("this is the output error", error);
    }
  };

  useEffect(() => {
    loadImages();
    setHasNewImage(false);
  }, [hasNewImage]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      setHasNewImage(true);
      setPreviewSource("");
    } catch (error) {
      console.error(error);
    }
  };

  const stream = props.stream;

  console.log("renders canvas container");

  return (
    <div className="content-container">
      <Suspense fallback={null}>
        <ContentRedistributionCanvas imageUrls={imageUrls} />
      </Suspense>

      {props.loggedIn && (
        <div
          style={{
            position: "absolute",
            zIndex: "2",
            bottom: "0",
            width: "65%",
            left: "0",
            display: "flex",
            flexFlow: "row",
            alignItems: "flex-end",
          }}
          className="container-ish"
        >
          <div
            style={{
              maxWidth: "300px",
              flexGrow: "1",
              position: "relative",
              borderTop: "2px solid black",
              borderRight: "2px solid black",
            }}
            className="flex-column"
          >
            <p
              style={{
                position: "absolute",
                bottom: "105%",
                margin: "0",
                left: "0",
                textAlign: "left",
              }}
            >
              {" "}
              Feed me a jpeg
            </p>
            <form onSubmit={handleSubmitFile} className="flex-column">
              <input
                type="file"
                name="file"
                placeholder="Upload an Image"
                onChange={handleFileInputChange}
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  flexFlow: "row-reverse",
                }}
                className="custom-file-input"
              ></input>
              {previewSource && (
                <img
                  src={previewSource}
                  alt={previewSource}
                  style={{ width: "100%" }}
                />
              )}
              <button className="sendButton" type="submit">
                UPLOAD
              </button>
            </form>
          </div>

          <SongPlayer audioUrl="https://res.cloudinary.com/www-houseofkilling-com/video/upload/v1620900008/sounds/AliveForever_clhtnw.mp3" />
        </div>
      )}
    </div>
  );
}
