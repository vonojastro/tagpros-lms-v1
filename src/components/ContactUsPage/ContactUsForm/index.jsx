import React from 'react';
import { Form } from 'react-final-form';
import { InputControl } from 'components/common/Form/Inputs';
import { TextAreaControl } from '../../common/Form/Inputs';
import styled from 'styled-components';
import schema from '../../../validators/contactUsForm';
import useValidationSchema from 'hooks/use-validation-schema';

const CustomInputLabel = styled.div`
  font-size: 1rem;
  margin-bottom: -0.4em;
`;
const CustomForm = styled.form`
  display: grid;
  gap: 2em;
`;

export default function ContactUsForm({ initialValues }) {
  const submit = params => {};
  const validate = useValidationSchema(schema);
  return (
    <Form
      validate={validate}
      initialValues={initialValues}
      onSubmit={submit}
      render={({ handleSubmit }) => (
        <CustomForm
          onSubmit={handleSubmit}
          className='form-teacher form-horizontal form-material'
        >
          <InputControl
            name='email'
            label={<CustomInputLabel>Email</CustomInputLabel>}
            placeholder='Enter your email'
          />
          <InputControl
            name='name'
            label={<CustomInputLabel>Name</CustomInputLabel>}
            placeholder='Enter your name'
          />
          <TextAreaControl
            name='message'
            label={<CustomInputLabel>Message</CustomInputLabel>}
            type='text-area'
            rows={10}
            placeholder='Write your message...'
          />

          <button
            className='btn btn-info text-uppercase waves-effect waves-light'
            type='submit'
          >
            Submit
          </button>
        </CustomForm>
      )}
    />
  );
}
