import { Country } from 'country-state-city';
import { USER_TYPE } from 'utils/constants';
import * as yup from 'yup';
import { errorMessage } from './errorMessages';
const {
  empty_field,
  too_long,
  too_short,
  not_email,
  password_too_short,
  passwordMismatched,
  special_char
} = errorMessage;

export const schema = yup.object({
  firstName: yup
    .string()
    .trim()
    .matches(/^[aA-zZ\s]+$/, {
      message: special_char,
      excludeEmptyString: false
    })
    .min(2, too_short)
    .max(50, too_long)
    .required(empty_field),
  lastName: yup
    .string()
    .trim()
    .matches(/^[aA-zZ\s]+$/, {
      message: special_char,
      excludeEmptyString: false
    })
    .min(2, too_short)
    .max(50, too_long)
    .required(empty_field),
  email: yup
    .string()
    .trim()
    .required(empty_field)
    .email(not_email)
    .min(2, too_short)
    .max(100, too_long),
  provider: yup
    .string()
    .required()
    .nullable(),
  authToken: yup.string().optional(),
  password: yup
    .string()
    .trim()
    .when('provider', {
      is: v => v === 'none',
      then: s =>
        s
          .required(empty_field)
          .min(8, password_too_short)
          .max(50, too_long),
      otherwise: s => s.optional()
    }),
  password2: yup
    .string()
    .trim()
    .nullable()
    .when('password', {
      is: v => v?.length,
      then: s => s.oneOf([yup.ref('password')], passwordMismatched),
      otherwise: s => s.optional()
    }),
  type: yup
    .string()
    .required()
    .oneOf(['FAMILY', 'TEACHER', 'LEARNER', USER_TYPE.SCHOOL_LEADER.toUpperCase()]),
  agree: yup
    .bool()
    .required()
    .oneOf([true], 'Agreement is required to proceed'),
  // ...(type === USER_TYPE.SCHOOL_LEADER.toUpperCase()
  schoolName: yup.string().when('type', {
    is: USER_TYPE.SCHOOL_LEADER.toUpperCase(),
    then: s =>
      s
        .required(empty_field)
        .trim()
        .matches(/^[aA-zZ\s]+$/, {
          message: special_char,
          excludeEmptyString: true
        }),
    otherwise: s => s.optional()
  }),

  schoolType: yup.number().when('type', {
    is: USER_TYPE.SCHOOL_LEADER.toUpperCase(),
    then: s => s.typeError(empty_field).required(empty_field),
    otherwise: s => s.optional()
  }),

  country: yup.string().when('type', {
    is: USER_TYPE.SCHOOL_LEADER.toUpperCase(),
    then: s =>
      s
        .trim()
        .oneOf(Country.getAllCountries().map(({ isoCode }) => isoCode), empty_field)
        .typeError(empty_field)
        .required(empty_field),
    otherwise: s => s.optional()
  }),
  recHelp: yup.string().optional(),
  hiring: yup.number().when('type', {
    is: USER_TYPE.SCHOOL_LEADER.toUpperCase(),
    then: s => s.typeError(empty_field).required(empty_field),
    otherwise: s => s.optional()
  })
});
