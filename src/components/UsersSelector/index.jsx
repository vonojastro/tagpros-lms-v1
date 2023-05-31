import {
  
  CheckboxArrayControl,
  InputControl,
  InputLabel
} from 'components/common/Form/Inputs';
import useValidationSchema from 'hooks/use-validation-schema';
import { Form } from 'react-final-form';
import { ACCOUNT_STATUS, APPLICATION_STATUS, USER_CODES } from 'utils/constants';
import _ from 'lodash';
import { api } from 'api';
import styled from 'styled-components';
import usersSelectorSchema from '../../validators/usersSelector';
import { Button, Spinner } from 'react-bootstrap';
import AutoSubmit from 'components/common/Form/AutoSubmit';
const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
const Inputs = styled.div`
  display: grid;
  grid-auto-flow: row;
  /* grid-template-: 20rem 10rem 10rem; */
  gap: 2rem;
  select {
    width: 100%;
  }
`;
const StyledForm = styled.form`
  display: grid;
  grid-template-rows: auto min-content;
  /* overflow-y: auto; */
`;


const SearchInput = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 200px;
    grid-template-rows: 1fr;
  }

  gap: 20px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
`;
const UsersSelector = ({ onChange, selectedEmails, onLoadingChange }) => {
  const handleSubmit = async values => {
    onLoadingChange(true);
    try {
      const r = await api.get('/accounts', {
        params: { ...values, NAME: values.NAME?.length ? `%${values.NAME}%` : undefined }
      });
      onChange(
        r.data.map?.(v => ({ ...v, IS_CHECKED: selectedEmails.includes(v.EMAIL_ADD) }))
      );
    } catch (error) {
      throw error;
    } finally {
      onLoadingChange(false);
    }
  };

  const validate = useValidationSchema(usersSelectorSchema);

  return (
    <Form
      validate={validate}
      onSubmit={handleSubmit}
      render={({ handleSubmit, submitting }) => (
        <StyledForm className='form-material' onSubmit={handleSubmit}>
          <AutoSubmit save={handleSubmit} debounce={1000} />
          <SearchInput>
            <InputControl
              name='NAME'
              placeholder='Enter email, first name, or last name...'
            />
            <Button
              type='submit'
              variant='outline-info'
              style={{
                display: 'grid',
                gridTemplateColumns: 'min-content min-content',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              disabled={submitting}
            >
              {submitting && <Spinner animation='border' size='sm' />}
              <div>Search</div>
            </Button>
          </SearchInput>

          <Inputs>
            <div className='mt-5'>
              <InputLabel label={'Account Type'} />
            </div>
            <InputWrapper>
              <CheckboxArrayControl
                name={'USER_CODE'}
                options={Object.keys(USER_CODES).map(key => ({
                  value: key,
                  label: USER_CODES[key] === 'Educ' ? 'Education' : USER_CODES[key]
                }))}
              />
            </InputWrapper>
            <InputLabel label={'Account Status'} />
            <InputWrapper>
              <CheckboxArrayControl
                name={'STATUS'}
                options={Object.keys(ACCOUNT_STATUS).map(key => ({
                  label: _.startCase(_.lowerCase(key)),
                  value: ACCOUNT_STATUS[key]
                }))}
              />
            </InputWrapper>
            <InputLabel label={'Application Status - School Leader'} />
            <InputWrapper>
              <CheckboxArrayControl
                name={'SCHOOL_DISTRICT_APPLICATION_STATUS'}
                options={Object.keys(APPLICATION_STATUS).map(key => ({
                  label: _.startCase(_.lowerCase(key)),
                  value: APPLICATION_STATUS[key]
                }))}
              />
            </InputWrapper>
            <InputLabel label={'Application Status - Teacher'} />
            <InputWrapper>
              <CheckboxArrayControl
                name={'TEACHER_APPLICATION_STATUS'}
                options={Object.keys(APPLICATION_STATUS).map(key => ({
                  label: _.startCase(_.lowerCase(key)),
                  value: APPLICATION_STATUS[key]
                }))}
              />
            </InputWrapper>
          </Inputs>

          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          {/* <button type='submit'>submit</button> */}
        </StyledForm>
      )}
    />
  );
};
export default UsersSelector;
