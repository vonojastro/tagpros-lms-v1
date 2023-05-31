import * as yup from 'yup';

const schema = yup.object({
  NAME: yup.string().nullable(true).default(null)
});

export default schema