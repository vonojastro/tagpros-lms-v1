import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import EmailComposer from '../EmailComposer';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid: auto-flow auto 1fr / 1fr;
  gap: 1rem;
`;
function WriteMailView() {
  const notify = () => toast('Email Sent Successfully', { type: 'success' });
  const navigate = useNavigate();
  const activeDraft = useSelector(state => state.mailView.activeDraft);
  const handleSendNewEmailSuccess = () => {
    navigate('/mail');
  };

  const additionalProps = {
    ...(activeDraft != null && { initialValues: activeDraft })
  };
  return (
    <Container>
      <h3>New Message</h3>
      <EmailComposer
        onSubmit={notify}
        handleSuccess={handleSendNewEmailSuccess}
        {...additionalProps}
      />
    </Container>
  );
}
export default WriteMailView;
