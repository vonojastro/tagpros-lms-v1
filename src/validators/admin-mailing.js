import * as yup from 'yup';
import { errorMessage } from './errorMessages';
const { empty_field } = errorMessage;

export default yup.object().shape({
  to: yup
    .array()
    .of(yup.string())
    .min(1, 'Select at least one email recipient.'),
  subject: yup.string().required(empty_field)
});
