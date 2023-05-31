/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getAllMessagesByThreadId } from '../../../api/emailMessaging';
import EmailComposer, {
  Container as EmailComposerFormContainer,
  EmailComposerInputFields
} from '../EmailComposer';
import { fields } from '../EmailComposer/fields';
import IconButton from '../IconButton/index';
import Email from './Email';
import EmailContentViewContainer from './EmailContentViewContentLoader';

export const Subject = styled.h1``;
export const Message = styled.div`
  display: ${props => !props.show && 'none'};
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  color: black;
  display: grid;
  gap: 1.5rem;
  grid-auto-rows: min-content;
`;

export const MailActionContainer = styled.div`
  & ${EmailComposerFormContainer} {
    grid-template-rows: 1fr auto;
  }

  & ${EmailComposerInputFields} {
    display: none;
  }
`;

const EmailComposerContainer = styled.div`
  min-height: 500px;
  height: 100%;
  padding: 1rem;
  background: aliceblue;
`;

export default function EmailContentView() {
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const emailThreads = useSelector(state => state.mailView.emailThread.data);
  const loading = useSelector(state => state.mailView.emailThread.get.loading);
  const success = useSelector(state => state.mailView.emailThread.get.success);
  const handleClickReplyButton = () => setShowEmailComposer(!showEmailComposer);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    getAllMessagesByThreadId(dispatch, { threadId: params.threadId });
  }, [params.threadId]);

  const [emailThread] = emailThreads;
  const { threadId, mailSubject } = emailThread || {};

  const handleSuccess = messageSent => {
    setShowEmailComposer(false);
    getAllMessagesByThreadId(dispatch, { threadId: params.threadId });
  };
  const containerRef = useRef(null);
  return (
    <Container ref={containerRef}>
      {loading && !emailThreads.length ? (
        <EmailContentViewContainer />
      ) : success && !emailThreads.length ? (
        <Navigate to='/mail' />
      ) : (
        <React.Fragment>
          <Subject>{mailSubject}</Subject>
          {emailThreads?.map((data, index) => (
            <Email
              key={data.messageId}
              {...data}
              open={index === emailThreads.length - 1}
              order={index}
            />
          ))}
          <MailActionContainer showEmailComposer={showEmailComposer}>
            {showEmailComposer ? (
              <EmailComposerContainer>
                <EmailComposer
                  initialValues={{
                    [fields.mailSubject.name]: mailSubject,
                    [fields.mailReceiver.name]: [emailThread],
                    [fields.carbonCopy.name]: [],
                    [fields.blindCarbonCopy.name]: [],
                    [fields.mailAttachments.name]: [],
                    [fields.threadId.name]: threadId
                  }}
                  handleSuccess={handleSuccess}
                />
              </EmailComposerContainer>
            ) : (
              <div>
                <button
                  className='btn btn-light font-14'
                  onClick={handleClickReplyButton}
                >
                  <IconButton fa='fas fa-share' background='transparent' />
                  Reply
                </button>
              </div>
            )}
          </MailActionContainer>
        </React.Fragment>
      )}
    </Container>
  );
}
