import React from 'react';
import { useFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { fields } from '../fields';
import { useLocation } from 'react-router';

const Sender = styled.div``;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
  gap: 0.5rem;

  & ${Sender} {
    border: solid lightgray 1px;
    padding: 0.5rem;
    background: white;
    margin-right: 0.1rem;
    white-space: pre;
    font-size: 14px;
    border-radius: 20px;
    text-align: center;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 0.2rem;
    & i {
      cursor: pointer;
    }
    img {
      height: 1.5rem;
      width: 1.5rem;
      object-fit: cover;
      object-position: center;
      border-radius: 9999px;
    }
  }
`;

const SelectedRecipients = () => {
  const {
    fields: { value = [], remove }
  } = useFieldArray(fields.mailReceiver.name);
  const handleClickRemoveSender = index => remove(index);
  const location = useLocation();

  return (
    <Container>
      {value?.map(({ sender, senderPhoto }, index) => (
        <Sender key={sender + index}>
          <img
            alt={sender}
            src={
              (senderPhoto?.length && senderPhoto) ||
              './assets/images/image-placeholder.jpg'
            }
          />
          {sender}{' '}
          {!location.state?.draft && (
            <i
              className='fas fa-times-circle'
              onClick={() => handleClickRemoveSender(index)}
            />
          )}
        </Sender>
      ))}
    </Container>
  );
};
export default SelectedRecipients;
