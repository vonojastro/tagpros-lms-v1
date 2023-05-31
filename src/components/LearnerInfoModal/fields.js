import { LEARNER_GRADE_LEVELS } from "utils/constants";
import moment from 'moment';

const FIELDS = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
  },
  {
    name: "nickname",
    type: "text",
    label: "Nick Name",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: 1 },
      { label: "Female", value: 2 },
    ],
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
    max: (moment(new Date()).subtract(4, 'years')).format('YYYY-MM-DD')
  },
  {
    name: "ageCategory",
    label: "Grade Level",
    type: "select",
    options: LEARNER_GRADE_LEVELS,
  },
  {
    name: "photo",
    type: "image",
    label: "Photo",
  },
];
export default FIELDS;
