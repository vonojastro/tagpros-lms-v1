import * as yup from 'yup';
import { fields } from './fields';

export default yup.object().shape({
  [fields.blindCarbonCopy.name]: yup.array().optional(),
  [fields.carbonCopy.name]: yup.array().optional(),
  [fields.mailContent.name]: yup
    .mixed()
    .required()
    .test('is-empty', 'Email content is empty.', contentState => {
      try {
        const currentContent = contentState.getCurrentContent();
        return currentContent.hasText() && currentContent.getPlainText().length > 0;
      } catch (error) {
        throw error;
      }
    }),
  [fields.mailReceiver.name]: yup
    .array()
    .min(1)
    .required('At least one recipient is required.'),
  [fields.mailSubject.name]: yup.mixed().required('Subject is required.')
});
