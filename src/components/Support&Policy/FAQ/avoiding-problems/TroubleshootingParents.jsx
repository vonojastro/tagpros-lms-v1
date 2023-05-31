import { Container } from '../../style';

const TroubleshootingParents = () => {
  return (
    <Container>
      <h3>Before the Class</h3>
      <ul>
        <li>Make sure you are logged in using the correct credentials or profile.</li>
        <li>Make sure that your browser is updated to its latest version.</li>
        <li>Help your children prepare to come to class on time.</li>
      </ul>
      <p>&nbsp;</p>
      <h3>During the Class</h3>
      <ul>
        <li>
          Make sure that the teacher is not muted
          <br />
          <ul>
            <li>
              You can check this by right-clicking the teacher’s screen at Jitsi, the
              video conferencing platform
            </li>
          </ul>
        </li>
        <li>Check if your internet connection is stable and is at least at 3 Mbps</li>
        <li>Close all unnecessary programs if the computer is running slow</li>
      </ul>
      <p>&nbsp;</p>
      <p>If these issues persist, please try to do the following:</p>
      <ul>
        <li>Close and restart your browser</li>
        <li>Reload the Tagpros website</li>
        <li>Close and restart Jitsi</li>
        <li>Restart your computer</li>
      </ul>
      <p>&nbsp;</p>
      <p>
        We also recommend contacting the teacher as soon as possible if an issue arises so
        that they can assist you in solving the problem. Additionally, you can send your
        concerns to{' '}
        <a href='mailto:customercare@tagpros.us' target='_blank' rel='noreferrer'>
          customercare@tagpros.us
        </a>{' '}
        and we will be glad to provide assistance.
      </p>
    </Container>
  );
};

export default TroubleshootingParents;
