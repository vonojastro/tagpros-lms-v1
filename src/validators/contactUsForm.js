import * as yup from 'yup';
import { errorMessage } from './errorMessages';

const { not_email, empty_field } = errorMessage;

export default yup.object().shape({
  email: yup
    .string(' ')
    .required(empty_field)
    .email(not_email),
  name: yup.string(' ').required(empty_field),
  message: yup.string(' ').required(empty_field)
});
