import * as yup from 'yup';
import { errorMessage } from './errorMessages';
const {
  empty_field,
  too_long,
  too_long_2,
  too_short,
  not_email,
  password_too_short,
  passwordMismatched,
  special_char
} = errorMessage;

export default yup.object({
  firstName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, { message: special_char, excludeEmptyString: true })
    .required(empty_field)
    .min(2, too_short)
    .max(50, too_long),
  lastName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, { message: special_char, excludeEmptyString: true })
    .required(empty_field)
    .min(2, too_short)
    .max(50, too_long),
  nickname: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, { message: special_char, excludeEmptyString: true })
    .min(2, too_short)
    .max(10, too_long_2),
  salutaion: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, { message: special_char, excludeEmptyString: true })
    .min(2, too_short)
    .max(10, too_long_2),
  phone: yup
    .string()
    .required(empty_field)
    .min(2, too_short)
    .max(50, too_long),
  email: yup
    .string()
    .required(empty_field)
    .email(not_email)
    .min(2, too_short)
    .max(100, too_long),
  password: yup
    .string()
    .required(empty_field)
    .min(8, password_too_short)
    .max(50, too_long),
  newPassword: yup
    .string()
    .required(empty_field)
    .min(8, password_too_short)
    .max(50, too_long),
  confirmPassword: yup.object({
    password: yup.string(),
    value: yup
      .string()
      .required(empty_field)
      .oneOf([yup.ref('password')], passwordMismatched)
  }),
});
