import { Container } from '../../style';
import ss from '../../img/technicalIssue-email-sample.png';
import ssEmailReceive from '../../img/technicalIssue-emailrecieve.png';
import ssEmail1 from '../../img/technicalIssue-email1.png';
import ssEmail2 from '../../img/technicalIssue-email2.png';
import ssEmail3 from '../../img/technicalIssue-email3.png';
import ssEmail4 from '../../img/technicalIssue-email4.png';

const TechnicalIssues = () => {
  return (
    <Container>
      <p>
        If you find a bug or an error at our Tagpros LMS, feel free to send us a report at{' '}
        <a href='customercare@tagpros.us' target='_blank'>
          customercare@tagpros.us
        </a>
        . We want to continuously develop and improve our services to make sure that
        everyone is getting high-quality education everywhere. We have implemented a
        procedure on how to submit a report to have full documentation of all the requests
        and changes. Here are the steps:
      </p>
      <p>&nbsp;</p>
      <h3>
        1. Report/Email to{' '}
        <a href='customercare@tagpros.us' target='_blank'>
          customercare@tagpros.us
        </a>
      </h3>
      <p>Subject -&gt; Brief Description of the Bug</p>
      <p>Body -&gt; Specific Details of the Bug</p>
      <p>
        If possible, please include as many details as you can to help us pinpoint exactly
        where the error occurs. Here are some of the details that you can put:
      </p>
      <ul>
        <li>The browser that you were using</li>
        <li>How you arrived at the error</li>
        <li>
          Screenshot of the error
          <br />
          <img src={ss} alt='sample email' />
        </li>
      </ul>
      <p>&nbsp;</p>
      <h3>
        2. You will be able to receive two (2) acknowledgment email messages with your
        ticket number (in the example below, #1515):
      </h3>
      <img src={ssEmailReceive} alt='ss-email-receive' />
      <img src={ssEmail1} alt='ssEmail1' style={{ marginTop: '20px' }} />
      <img src={ssEmail2} alt='ssEmail2' style={{ marginTop: '20px' }} />
      <p>&nbsp;</p>
      <h3>
        3. You will receive a resolution email (or a followup question) with a note that
        the ticket will be closed.
      </h3>
      <img src={ssEmail3} alt='ssEmail3' style={{ marginTop: '20px' }} />
      <p>&nbsp;</p>
      <h3>4. Ticket Closed email message</h3>
      <img src={ssEmail4} alt='ssEmail4' style={{ marginTop: '20px' }} />
    </Container>
  );
};

export default TechnicalIssues;
