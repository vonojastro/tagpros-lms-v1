import * as yup from "yup";
import { errorMessage } from "./errorMessages";

const { empty_field, no_option_selected, image_not_uploaded } = errorMessage;

export default yup.object().shape({
  id: yup.number().optional(),
  nickname: yup.mixed().required(empty_field),
  firstName: yup.mixed().required(empty_field),
  lastName: yup.mixed().required(empty_field),
  gender: yup.mixed().required(no_option_selected),
  dateOfBirth: yup.date().required(empty_field),
  ageCategory: yup.mixed().required(no_option_selected),
  photo: yup.mixed().required(image_not_uploaded),
});
