import React, { useState } from "react";

const YoutubeLinkInput = (props) => {
  const [link, setLink] = useState("");
  const [error, setError] = useState(null);

  const onAdd = () => {
    const isValid = matchYoutubeUrl(link.toString());
    if (!isValid) {
      setError("Youtube link is not valid.");
    }
  };

  const matchYoutubeUrl = (url) => {
    console.log(url);

    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      console.log(url.match(p)[1]);
      props.addYTLink(url.match(p)[1]);
      return true;
    }
    return false;
  };

  return (
    <div className="youtube-form-overlay">
      <div className="youtube-form-container">
        <h1 className="youtube-form__title">
          {props.isLectureLink
            ? "Add video lecture link"
            : "Add your video profile link"}
        </h1>
        <input
          className="youtube-form__input"
          type="text"
          placeholder="Youtube link"
          style={{ border: error ? "1px solid red" : "1px solid #2699fb" }}
          onChange={(e) => setLink((prevState) => e.target.value)}
          onFocus={() => setError("")}
        />
        {error ? (
          <p
            style={{
              marginLeft: "15px",
              marginBottom: "16px",
              marginTop: "4px",
            }}
          >
            {error}
          </p>
        ) : (
          <div
            style={{ height: "24px", marginBottom: "16px", marginTop: "4px" }}
          ></div>
        )}
        <div>
          <button className="youtube-form__button" onClick={onAdd}>
            Submit
          </button>
          <button
            className="youtube-form__button"
            style={{ marginLeft: "10px", backgroundColor: "grey" }}
            onClick={props.close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default YoutubeLinkInput;
