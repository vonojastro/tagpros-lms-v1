import * as yup from 'yup';
import { errorMessage } from './errorMessages';

const { not_email, empty_field } = errorMessage;

export default yup.object().shape({
  email: yup
    .string(empty_field)
    .nullable()
    .when('provider', {
      is: v => v === 'none',
      then: s =>
        s
          .required(empty_field)
          .trim()
          .email(not_email),
      otherwise: s => s.optional()
    }),
  provider: yup
    .string()
    .default('none')
    .required(),
  password: yup
    .string(empty_field)
    .nullable()
    .trim()
    .when('provider', {
      is: v => v === 'none',
      then: s => s.required(empty_field),
      otherwise: s => s.optional()
    }),
  authToken: yup.string(' ').optional()
});
