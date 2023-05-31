import React, { useRef } from "react";

import { s3Config } from "../../../config";
import S3 from "aws-s3-pro";
const s3Client = new S3(s3Config);

export const Uploader = ({uploadImage}) => {
  const uploaderRef = useRef();
 
  const onUpload = async (event) => {
    try {
      const uploadResponse = await s3Client.uploadFile(event.target.files[0]);
      if (uploadResponse.status === 204) {
        document.getElementById("imageSrc").value = uploadResponse.location;
        var image = document.getElementById('imageFile');
        image.src = uploadResponse.location;
        uploadImage(uploadResponse.location);
      }
    } catch (error) {}
  };

  return (
    <div className="col-md-12" style={{textAlign:"center"}}>
      <button className="btn btn-info mt-2" onClick={() => uploaderRef.current.click()}>
        Upload
      </button>
      <input
        // name={name}
        ref={uploaderRef}
        type="file"
        accept=".jpg, .png, .jpeg"
        style={{ display: "none" }}
        onChange={onUpload}
      />
    </div>
  );
};

export default Uploader