import React, { useRef, useState } from "react";

import { s3Config } from "../../../config";
import S3 from "aws-s3-pro";
const s3Client = new S3(s3Config);

const Uploader = ({ name }) => {
  const uploaderRef = useRef();
  const [uploadDetails, setUploadDetails] = useState({});
  const onUpload = async (event) => {
    try {
      const uploadResponse = await s3Client.uploadFile(event.target.files[0]);
      if (uploadResponse.status == 204) {
        setUploadDetails((prevState) => {
          return {
            ...prevState,
            [event.target.name]: uploadResponse.location,
          };
        });
      }
    } catch (error) {}
  };

  return (
    <div className="col-md-9">
      <button className="btn btn-info mt-2" onClick={() => uploaderRef.current.click()}>
        Upload
      </button>
      <input
        name={name}
        ref={uploaderRef}
        type="file"
        accept=".doc, .docx, .pdf"
        style={{ display: "none" }}
        onChange={onUpload}
      />
    </div>
  );
};

export default Uploader