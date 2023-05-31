import { api } from ".";
import { s3Config } from "../config";
import S3 from "aws-s3-pro";
import FIELDS from "../components/LearnerInfoModal/fields";
import { fetchLearnersSuccess } from "../redux/actions/learners";

const s3Client = new S3(s3Config);

const LEARNER_ENDPOINT = '/learner';

export const addLearner = async ({ values }) => {
  try {
    let files = [];
    FIELDS.forEach(({ type, name }) => {
      if (type === "image")
        files.push(
          s3Client
            .uploadFile(values[name])
            .then((result) => ({ [name]: result.key }))
            .catch((err) => err)
        );
    });

    if (files.length) {
      files = await Promise.all(files);
      files = files.reduce(
        (acc, curr) => ({ ...acc, [Object.keys(curr)[0]]: curr[Object.keys(curr)[0]] }),
        {}
      );
    }
    const learnerData = {
      ...values,
      ...files,
    };
    await api.post("learner/add", learnerData);
  } catch (error) {
    console.log("🚀 ~ file: learnerInfo.js ~ line 33 ~ addLearner ~ error", error);
    throw error;
  }
};

export const updateLearner = async ({ values }) => {
  try {
    let files = [];
    FIELDS.forEach(({ type, name }) => {
      if (type === "image")
        files.push(
          s3Client
            .uploadFile(values[name])
            .then((result) => ({ [name]: result.key }))
            .catch((err) => err)
        );
    });

    if (files.length) {
      files = await Promise.all(files);
      files = files.reduce(
        (acc, curr) => ({ ...acc, [Object.keys(curr)[0]]: curr[Object.keys(curr)[0]] }),
        {}
      );
    }
    const learnerData = {
      ...values,
      ...files,
    };
    await api.post("learner/update", learnerData);
  } catch (error) {
    console.log("🚀 ~ file: learnerInfo.js ~ line 33 ~ addLearner ~ error", error);
    throw error;
  }
};

export const getLearners = async (dispatch, params) => {
  try {
    const learners = (await api.get("learner/all", { params })).data;
    dispatch(fetchLearnersSuccess(learners));
    return learners.map(({ dateOfBirth, ...others }) => ({
      ...others,
      dateOfBirth: `${dateOfBirth.split("/")[0]}-${dateOfBirth.split("/")[1]}-${
        dateOfBirth.split("/")[2]
      }`,
    }));
    // return learners;
  } catch (error) {
    console.log("🚀 ~ file: learners.js ~ line 42 ~ getLearners ~ error", error);
    throw error;
  }
};

export const deleteLearner = async (id) => {
  try {
    await api.post("learner/delete", {id});
  } catch (error) {
    console.log("🚀 ~ file: learnerInfo.js ~ line 33 ~ deleteLearner ~ error", error);
    throw error;
  }
};

export const getAllLearners = async (dispatch, callback) => {
	try {
		const response = await api.get(LEARNER_ENDPOINT + "/all");
		dispatch(fetchLearnersSuccess(response.data));
		callback && callback(true);
	} catch (error) {
		console.log("Status:", error);
		callback && callback(false);
	} finally {

	}
};
