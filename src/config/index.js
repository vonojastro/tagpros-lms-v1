export const s3Config = {
  bucketName: process.env.REACT_APP_S3_BUCKET,
  region: process.env.REACT_APP_S3_REGION,
  accessKeyId: process.env.REACT_APP_S3_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
};

export const paypalConfig = {
  clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  paypalURL: process.env.REACT_APP_PAYPAL_LINK
}
