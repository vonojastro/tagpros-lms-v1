import React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

class PlyrReact extends React.Component {
  videoSrcPasrser = () => {
    let src;
    if (this.props.videoType === "youtube") {
      src = {
        src: this.props.path,
        provider: "youtube",
      };
    } else {
      src = {
        src: this.props.path,
        type: "video/mp4",
      };
    }
    return src;
  };

  render() {
    const source = this.videoSrcPasrser();

    return (
      <div style={{ position: "relative", maxWidth: "640px", height: "100%" }}>
        <Plyr
          source={{
            type: "video",
            sources: [source],
          }}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
          }}
          options={{
            controls: [
              "play-large",
              "play",
              "progress",
              "volume",
              "fullscreen",
            ],
            settings: ["speed"],
          }}
        />
      </div>
    );
  }
}

export default PlyrReact;
