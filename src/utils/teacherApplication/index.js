import ls from "local-storage";

const toggleCheckBoxState = (field, keep) => {
  const exists = ls(`teacher-app-${field}`);
  if (!keep)
    (exists && ls.delete(`teacher-app-${field}`)) || ls.set(`teacher-app-${field}`, 1);
  else ls.set(`teacher-app-${field}`, 1);
};

const getCheckBoxState = (field) => ls(`teacher-app-${field}`);

const getStep = (location) => parseInt(location.pathname.split("/")[2].split("-")[1]);

const getS3Url = (fileKey) =>
  `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_S3_REGION}.amazonaws.com/${fileKey}`;

const isFormSegementAccomplished = (fields, data) => data && !fields.find((f) => !data[f] || data[f] === null || data[f] === "");

export { toggleCheckBoxState, getCheckBoxState, getStep, getS3Url, isFormSegementAccomplished };
