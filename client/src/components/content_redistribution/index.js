import React, { Suspense, useCallback, useState } from "react";
import ContentRedistributionCanvas from "./canvas";
import Dropzone from "react-dropzone";

// import SongPlayer from "./MusicPlayer";
// <SongPlayer audioUrl="https://res.cloudinary.com/www-houseofkilling-com/video/upload/v1620900008/sounds/AliveForever_clhtnw.mp3" />

function MyDropzone(props) {
  const [message, setMessage] = useState(
    "Drag 'n' drop some files here, \nor click to select files"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [dropZoneClass, setDropZoneClass] = useState("dropzone-basic");

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles[0]) {
        const reader = new FileReader();

        console.log("accptedfile", acceptedFiles[0].previewElement);

        reader.readAsDataURL(acceptedFiles[0]);
        reader.onloadstart = () => {
          setMessage("loading file:");
          setIsLoading(true);
          setDropZoneClass("dropzone-loading");
        };
        reader.onloadend = () => {
          if (reader.error) {
            setMessage("that didnt go according to plan");
          } else {
            props.uploadImage(reader.result);
            setTimeout(() => {
              setMessage(
                "thank you for your expression. \nI love it \nYou and everyone else can find it here in the archive now."
              );
              setIsLoading(false);
              setDropZoneClass("dropzone-succes");

              setTimeout(() => {
                setMessage(
                  "Drag 'n' drop some files here, \nor click to select files"
                );
                setIsLoading(false);
                setDropZoneClass("dropzone-basic");
              }, 3000);
            }, 2000);
          }
        };
      }
    },
    [props]
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        zIndex: "99999999999",
        height: "150px",
        width: "250px",
      }}
      className={`container ${dropZoneClass}`}
    >
      <p
        style={{
          position: "absolute",
          bottom: "105%",
          fontSize: "15px",
        }}
      >
        Feed us expressions plz
      </p>
      <Dropzone
        onDrop={handleDrop}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
        addRemoveLinks={true}
        className="container"
        previewsContainer="dropzone-previews"
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({ className: "dropzone" })}
            style={{ width: "100%", height: "100%" }}
          >
            <input {...getInputProps()} />
            {!isLoading ? (
              <p
                style={{
                  color: "inherit",
                  whiteSpace: "pre-wrap",
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
      <div className="dropzone-previews"></div>
    </div>
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
        body: JSON.stringify({
          data: base64EncodedImage,
          name: this.props.name,
        }),
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
            <MyDropzone uploadImage={this.uploadImage} />
          </>
        )}
      </>
    );
  }
}
