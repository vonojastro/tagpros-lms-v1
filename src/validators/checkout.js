import * as yup from "yup";
import { errorMessage } from "./errorMessages";

const { not_email, empty_field } = errorMessage;

export default yup.object().shape({
  email: yup.string(" ").required(empty_field).email(not_email),
  city: yup.string(" ").required(empty_field),
  state: yup.string(" ").required(empty_field),
  postalCode: yup.string(" "),
  country: yup.string(" ").required(empty_field),
  streetAddress2: yup.string(" ").optional(),
  streetAddress: yup.string(" ").required(empty_field),
  discountCode: yup.mixed().optional(),
  procId: yup.mixed().required("Please select a payment method."),
});
