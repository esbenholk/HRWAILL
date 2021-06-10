import React, { Suspense, useCallback, useState, useRef } from "react";
import ContentRedistributionCanvas from "./canvas";
import Dropzone from "react-dropzone";

// import SongPlayer from "./MusicPlayer";
// <SongPlayer audioUrl="https://res.cloudinary.com/www-houseofkilling-com/video/upload/v1620900008/sounds/AliveForever_clhtnw.mp3" />

function MyDropzone(props) {
  const [message, setMessage] = useState(
    "Drag 'n' drop some files here, or click to select files"
  );
  const [isLoading, setIsLoading] = useState(false);

  const inputField = useRef();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles[0]) {
        const reader = new FileReader();

        reader.readAsDataURL(acceptedFiles[0]);
        reader.onloadstart = () => {
          console.log("loads file");
          setMessage("loading file:");
          setIsLoading(true);
        };
        reader.onloadend = () => {
          console.log("has file");
          props.uploadImage(reader.result);

          if (reader.error) {
            setMessage("that didnt go according to plan");
          } else {
            setTimeout(() => {
              setMessage("thank you for your expression. i love it");
              setTimeout(() => {
                setMessage(
                  "Drag 'n' drop some files here, or click to select files"
                );
                setIsLoading(false);
              }, 2000);
              setIsLoading(false);
            }, 1000);
          }
        };
      }
    },
    [props]
  );

  return (
    <Dropzone
      onDrop={handleDrop}
      accept="image/*"
      minSize={1024}
      maxSize={3072000}
      className="container"
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{ width: "100%", height: "100%" }}
          ref={inputField}
        >
          <input {...getInputProps()} />
          {!isLoading ? (
            <p
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "black",
              }}
            >
              {message}
            </p>
          ) : (
            <p>is loading</p>
          )}
        </div>
      )}
    </Dropzone>
  );
}

export default class ContentRedistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
      hasNewImage: true,
      previewSource: "",
      hasBroadcast: false,
    };
  }

  componentDidMount() {
    this.loadImages();
    this.setState({ hasNewImage: false });

    this.props.socket.on("message", (data) => {
      if (data.newImage) {
        if (!this.state.imageUrls.includes(data.newImage)) {
          this.setState({
            imageUrls: [...this.state.imageUrls, data.newImage],
          });
        }
      }
      if (data.broadcast) {
        console.log("has broadcast", data);
        this.setState({
          hasBroadcast: true,
        });
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
    console.log(file);
    this.previewFile(file);
  };

  uploadImage = async (base64EncodedImage) => {
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();

      console.log("succesful upload", data);

      this.setState({ hasNewImage: true, previewSource: "" });

      this.props.socket.emit("uploadImage", { data }, (error) => {});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <>
        {this.state.imageUrls.length > 1 ? (
          <Suspense fallback={null}>
            <ContentRedistributionCanvas
              imageUrls={this.state.imageUrls}
              loggedIn={this.props.loggedIn}
              hasBroadcast={this.state.hasBroadcast}
            />
          </Suspense>
        ) : null}

        {this.props.loggedIn && (
          <>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                display: "flex",
                flexFlow: "column-reverse",
                zIndex: "99999999999",
                height: "150px",
                width: "250px",
              }}
              className="container"
            >
              <p
                style={{
                  position: "absolute",
                  bottom: "105%",
                  fontSize: "15px",
                }}
              >
                Feed me expressions plz
              </p>
              <MyDropzone uploadImage={this.uploadImage} />
            </div>
          </>
        )}
      </>
    );
  }
}
