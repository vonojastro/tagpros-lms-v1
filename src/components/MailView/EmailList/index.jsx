import React, { Fragment, useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';
import EmailListItem from './EmailListItem';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import {
  getAllEmailDraftsOfUser,
  getAllEmailThreadsByUser,
  markEmailThreadsAsRead
} from 'api/emailMessaging';
import { useNavigate, useParams } from 'react-router';
import EmailListContentLoader from './EmailListContentLoader';
import { setActiveDraft, toggleEmailComposer } from '../../../redux/actions/mailView';
import { toast } from 'react-toastify';

const Container = styled.ul`
  padding: 0;
  display: grid;
  gap: 2rem;
  & h4 {
    text-transform: capitalize;
    font-weight: 900;
    padding: 0;
    margin: 0;
  }
`;

const NoEmailsFound = styled.div`
  width: 100%;
  height: 100%;
  h5 {
    color: gray;
    text-align: center;
  }
`;

export default function EmailList() {
  const emails = useSelector(state => state.mailView.emailThreads.data);
  const loading = useSelector(state => state.mailView.emailThreads.get.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const themeContext = useContext(ThemeContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${themeContext.custom.laptopMinWidth})`
  });
  const userAccountId = useSelector(state => state.auth?.user?.accountId);

  const handleClickEmailListItem = data => {
    switch (params.type) {
      case 'drafts':
        dispatch(setActiveDraft(data));
        dispatch(toggleEmailComposer(true));
        if (!isDesktopOrLaptop) navigate('/mail/writer');
        break;

      default:
        markEmailThreadsAsRead(dispatch, { threadIds: [data.threadId] });
        navigate(`view/${data.threadId}`);

        break;
    }
  };

  useEffect(() => {
    switch (params.type) {
      case 'drafts':
        getAllEmailDraftsOfUser(dispatch)
          .then(result => {})
          .catch(err => {
            toast('Failed to get draft emails.', { type: 'error' });
          });
        break;

      default:
        getAllEmailThreadsByUser(dispatch)
          .then(result => {})
          .catch(err => {
            toast('Failed to get emails.', { type: 'error' });
          });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.type]);

  const emailQuery = _.startCase(_.toLower(params.type || 'Inbox'));
  const isLastMessageByUser = senderId => {
    // eslint-disable-next-line eqeqeq
    return userAccountId == senderId;
  };

  const hasUserRead = (senderId, isRead) => {
    return isLastMessageByUser(senderId) ? true : isRead;
  };

  return (
    <Container>
      <h4>{emailQuery}</h4>
      {loading ? (
        <EmailListContentLoader />
      ) : emails.length ? (
        <Fragment>
          {emails.map((data) => (
            <div onClick={_ => handleClickEmailListItem(data)} key={data.threadId}>
              <EmailListItem
                {...data}
                {...data.deletedDate && {
                  mailContent: {
                    blocks: [
                      {
                        key: '5v1sh',
                        text: 'You deleted this message',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                      }
                    ],
                    entityMap: {}
                  }
                }}
                hasUserRead={hasUserRead(data.senderId, data.isRead)}
                key={data.threadId + ' ' + hasUserRead(data.senderId, data.isRead)}
                id={data.threadId + ' ' + hasUserRead(data.senderId, data.isRead)}
                variant={params.type}
              />
            </div>
          ))}
        </Fragment>
      ) : (
        <NoEmailsFound>
          <h5>No emails found 🙁</h5>
        </NoEmailsFound>
      )}
    </Container>
  );
}
