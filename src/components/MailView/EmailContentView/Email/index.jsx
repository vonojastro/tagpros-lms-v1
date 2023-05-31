/* eslint-disable eqeqeq */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import arrayMutators from 'final-form-arrays';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { Message } from '../../EmailContentView';
import MailContent from '../MailContent';
import Popup from 'reactjs-popup';
import {
  deleteEmailMessage,
  getAllMessagesByThreadId
} from '../../../../api/emailMessaging';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-final-form';
import { fields } from '../../EmailComposer/fields';
import { FileAttachment } from '../../EmailComposer';
import { FieldArray } from 'react-final-form-arrays';

const MainContent = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const AvatarImage = styled.img`
  border-radius: 999px;
  height: 3rem;
  width: 3rem;
  object-fit: cover;
`;

const SenderInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  cursor: pointer;
  align-items: center;
`;

const SenderInfoLeft = styled.div``;

const SenderInfoRight = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  color: black;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1rem;
  border-bottom: solid lightgray 1px;
`;
const DateSent = styled.h6`
  color: gray;
  font-size: x-small;
`;
const MessageActions = ({ messageId, order }) => {
  const [deleting, setDeleting] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const actions = [
    order !== 0
      ? {
          label: 'Delete Message',
          icon: !deleting ? (
            <i className='fa fa-trash' aria-hidden='true' />
          ) : (
            <div class='spinner-border text-primary' role='status'>
              <span class='sr-only'>Loading...</span>
            </div>
          ),
          onClick: async messageId => {
            try {
              setDeleting(true);
              await deleteEmailMessage(null, { messageId });
              toast('Message Deleted', { type: 'info', position: 'bottom-left' });
              getAllMessagesByThreadId(dispatch, { threadId: params.threadId });
            } catch (error) {
              toast('Failed to delete message', {
                type: 'default',
                position: 'bottom-left'
              });
            } finally {
              setDeleting(false);
            }
          }
        }
      : null
  ].filter(a => a != null);
  if (!actions.length) return <Fragment />;
  return (
    <Popup
      trigger={() => (
        <button className='btn btn-circle d-flex justify-content-center align-items-center'>
          <i className='fas fa-ellipsis-v' />
        </button>
      )}
      position='left top'
      closeOnDocumentClick
    >
      {actions.map(({ label, icon, onClick }) => (
        <div
          id={label}
          onClick={!deleting ? () => onClick(messageId) : null}
          className='btn'
          style={{
            display: 'grid',
            alignItems: 'center',
            gap: '0.5rem',
            grid: '1fr / auto-flow auto 1fr',
            padding: '0.5rem'
          }}
        >
          <div>{icon}</div>
          <div>{label}</div>
        </div>
      ))}
    </Popup>
  );
};

export default function Email({
  senderPhoto,
  sender,
  mailContent,
  open,
  createdDate,
  messageId,
  senderId,
  order,
  mailAttachments
}) {
  const [openContent, setOpenContent] = useState(open);
  const getDate = dateString => {
    return (
      dayjs(dateString).format('MMM D, YYYY, h:mm A') +
      ' (' +
      dayjs(dateString).fromNow('d') +
      ' ago' +
      ')'
    );
  };

  const handleToggleContent = () => setOpenContent(!openContent);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && open) {
      ref.current.scrollIntoView();
    }
  }, [open]);
  const accountId = useSelector(state => state.auth?.user?.accountId);
  return (
    <Container ref={ref}>
      <MainContent>
        <SenderInfo onClick={handleToggleContent}>
          <SenderInfoLeft>
            <AvatarImage
              src={
                (!senderPhoto?.length && './assets/images/image-placeholder.jpg') ||
                senderPhoto
              }
            />
          </SenderInfoLeft>
          <SenderInfoRight>
            <div>{sender}</div>
          </SenderInfoRight>
          <DateSent>{getDate(createdDate)}</DateSent>
          <MessageActions
            messageId={messageId}
            isOwner={accountId == senderId}
            order={order}
          />
        </SenderInfo>
        <Message show={openContent}>
          <MailContent mailContent={mailContent} />
          <Form
            onSubmit={() => {}}
            initialValues={{
              mailAttachments: mailAttachments
            }}
            mutators={{
              ...arrayMutators
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {(mailAttachments && mailAttachments.length && (
                  <div className='mt-5'>
                    <h6>Attachments</h6>
                    <FieldArray
                      name={fields.mailAttachments.name}
                      component={FileAttachment}
                      viewOnly={true}
                    />
                  </div>
                )) || <div />}
              </form>
            )}
          />
        </Message>
      </MainContent>
    </Container>
  );
}
