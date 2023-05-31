import * as yup from 'yup';
import {
  GROUP_0_FIELD_NAMES,
  GROUP_1_FIELD_NAMES,
  GROUP_2_FIELD_NAMES,
  GROUP_3_FIELD_NAMES,
  GROUP_4_FIELD_NAMES
} from '../components/TeacherApplication/fields';
import _ from 'lodash';
import { errorMessage } from './errorMessages';
const { empty_field, char_maxed } = errorMessage;
const validators = {
  professionalTitle: yup.string().required(empty_field),
  watchedVideo: yup.bool().oneOf([true], 'Please watch the video first').required('Please watch the video first'),
  schUniOrg: yup.string().required(empty_field),
  address: yup.string().required(empty_field),
  cvResume: yup.string().required('CV / Resume is required'),
  professionalLicense: yup.string().required('Professional license is required'),
  govtId: yup.string().required('Government I.D. is required'),
  refRecommendation: yup
    .string()
    .notRequired()
    .default(' '),
  teacherAchievement: yup
    .string()
    .max(1000, char_maxed)
    .typeError(empty_field)
    .optional(),
  classTopics: yup
    .string()
    .max(1000, char_maxed)
    .typeError(empty_field)
    .required(empty_field),
  classDescription: yup
    .string()
    .max(1000, char_maxed)
    .typeError(empty_field)
    .required(empty_field),
  classSampleVid: yup.string(" ").nullable(" ").notRequired(),
  agreeTermsAndConditions: yup.bool().oneOf([true],'Agreement is required to proceed'),
  agreeClassContentPolicy: yup.bool().oneOf([true],'Agreement is required to proceed'),
  agreeCommunityStandards: yup.bool().oneOf([true],'Agreement is required to proceed')
};

export const getInputGroupSchema = groupNumber => {
  const FIELD_NAMES =
    groupNumber === 0
      ? GROUP_0_FIELD_NAMES
      : groupNumber === 1
      ? GROUP_1_FIELD_NAMES
      : groupNumber === 2
      ? GROUP_2_FIELD_NAMES
      : groupNumber === 3
      ? GROUP_3_FIELD_NAMES
      : groupNumber === 4
      ? GROUP_4_FIELD_NAMES
      : [];
  return yup.object().shape({
    ..._.pickBy(validators, (value, key) => FIELD_NAMES.includes(key))
  });
};
