import styled from 'styled-components';
import MailContent from '../../EmailContentView/MailContent';

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  grid-template-areas: 'photo other-details';
  color: gray;
  cursor: pointer;
  padding: 0.5rem;

  img {
    height: 3rem;
    width: 3rem;
    object-fit: cover;
    border-radius: 9999px;
  }
  div:nth-child(2) {
    min-width: 0;
    & * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    *:first-child {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      font-weight: ${props => !props.read && 500};
      color: ${props => !props.read && 'black'};
    }
    *:nth-child(2) {
      font-size: small;
      font-weight: ${props => (props.read ? 'normal' : 500)};
      color: ${props => (props.read ? 'normal' : 'black')};
    }
    *:nth-child(3) {
      font-size: small;
    }
  }
`;

const Message = styled.div`
  font-size: xx-small;
`;
const EmailListItem = ({
  threadId,
  mailSubject,
  createdDate,
  updatedDate,
  mailContent,
  sender,
  senderPhoto,
  hasUserRead,
  variant,
  mailReceiver
}) => {
  const getDate = dateString => {
    const dateNow = new Date();
    const updatedDate = new Date(dateString);
    // Either show Month-Date or HH:MM
    const isLastUpdatedToday =
      dateNow.getFullYear() === updatedDate.getFullYear() &&
      dateNow.getDate() === updatedDate.getDate();

    return isLastUpdatedToday
      ? updatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : updatedDate.toLocaleString([], {
          month: 'short',
          day: '2-digit',

          // If not same year, display year.
          year: dateNow.getFullYear() === updatedDate.getFullYear() ? undefined : 'numeric'
        });
  };

  return (
    <Container read={hasUserRead}>
      <img
        alt={sender}
        src={
          (!senderPhoto?.length && './assets/images/image-placeholder.jpg') || senderPhoto
        }
      />
      <div>
        <div>
          <div>{sender || "To: " + mailReceiver.map(({sender})=>sender).join(", ")}</div>
          <div>{getDate(updatedDate)}</div>
        </div>
        <div>{mailSubject}</div>
        <Message>
          <MailContent mailContent={mailContent} />
        </Message>
    </div>
  </Container>
  );
};

export default EmailListItem;
