import { PRICING_FOR_TYPES } from 'utils/constants';
import * as yup from 'yup';

export default yup.object().shape({
  FOR: yup
    .array()
    .min(1, 'Please select at least 1 option.')
    .of(yup.string().oneOf(PRICING_FOR_TYPES, 'Please select at least 1 option.'))
    .typeError('Please select at least 1 option.'),
  PRICE_AMOUNT: yup
    .number()
    .required('Please enter a valid price.')
    .min(0, 'Please enter a valid price.')
    .typeError('Please enter a valid price'),
  PRICE_CURRENCY: yup
    .string()
    .required('Please select a currency.')
    .oneOf(['USD', 'PHP'], 'Please select a currency.'),
  STATUS: yup
    .string()
    .required('')
    .oneOf(['active', 'inactive'], 'Please select an option.'),
  REMARKS: yup.string().optional('Please enter a valid remark.')
});
