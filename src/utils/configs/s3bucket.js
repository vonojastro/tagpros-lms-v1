const {
  REACT_APP_BUCKET_NAME,
  REACT_APP_SECRET_ACCESS_KEY,
  REACT_APP_ACCESS_ID_KEY,
  REACT_APP_REGION,
} = process.env;

export const s3Config = {
  bucketName: REACT_APP_BUCKET_NAME,
  region: REACT_APP_REGION,
  accessKeyId: REACT_APP_SECRET_ACCESS_KEY,
  secretAccessKey: REACT_APP_ACCESS_ID_KEY,
};
