import React, { Suspense } from "react";
import ContentRedistributionCanvas from "./canvasC";

import SongPlayer from "./MusicPlayer";

export default class ContentRedistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
      hasNewImage: true,
      previewSource: "",
    };
  }

  componentDidMount() {
    this.loadImages();
    this.setState({ hasNewImage: false });
  }

  componentWillMount() {
    this.props.socket.on("message", (data) => {
      if (data.images) {
        this.setState({ imageUrls: data.images });
        console.log("upadtes imageURLs", data.images.length);
      }
    });
  }
  loadImages = async () => {
    try {
      const res = await fetch("/api/getallimages");

      const data = await res.json();
      this.setState({ imageUrls: data.images });
    } catch (error) {
      console.error("this is the output error", error);
    }
  };

  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    this.previewFile(file);
  };

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ previewSource: reader.result });
    };
  };

  handleSubmitFile = (e) => {
    e.preventDefault();
    if (!this.state.previewSource) return;
    this.uploadImage(this.state.previewSource);
  };

  uploadImage = async (base64EncodedImage) => {
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();

      console.log("after upload", data.newImage);

      ////concat url with the rest of ImageUrls and then send them to socket.

      this.setState({ hasNewImage: true, previewSource: "" });

      this.props.socket.emit("uploadImage", { data }, (error) => {
        console.log("uploads images", data.images);
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="content-container">
        {this.state.imageUrls.length > 1 ? (
          <Suspense fallback={null}>
            <ContentRedistributionCanvas imageUrls={this.state.imageUrls} />
          </Suspense>
        ) : null}

        {this.props.loggedIn && (
          <div
            style={{
              position: "absolute",
              bottom: "0",
              width: "65%",
              left: "0",
              display: "flex",
              flexFlow: "row",
              alignItems: "flex-end",
              zIndex: "99999999999",
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
              <form onSubmit={this.handleSubmitFile} className="flex-column">
                <input
                  type="file"
                  name="file"
                  placeholder="Upload an Image"
                  onChange={this.handleFileInputChange}
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    flexFlow: "row-reverse",
                  }}
                  className="custom-file-input"
                ></input>
                {this.state.previewSource && (
                  <img
                    src={this.state.previewSource}
                    alt={this.state.previewSource}
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
}
