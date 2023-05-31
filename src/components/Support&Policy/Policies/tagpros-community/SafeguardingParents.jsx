import { Container } from '../../style';

const SafeguardingParents = () => {
  return (
    <Container>
      <p>
        Learner safety is our top priority at Tagpros while providing the best classes to
        them. As such, we want to create a safe space in our community. Here are some of
        our guidelines to help you maximize the learning experience of your children:
      </p>
      <ul>
        <li>
          Help your children maximize their Tagpros experience.
          <ul>
            <li>
              Make sure your children come to classes on time and ensure that they are
              connected.
            </li>
            <li>
              Review our{' '}
              <a
                href='/policies/tagpros-community/community-code-of-conduct'
                target='_blank'
              >
                Community Standards
              </a>{' '}
              for both the parents and learners before their first class.
            </li>
            <li>Provide the materials required by the class.</li>
            <li>
              Help your children familiarize themselves with using{' '}
              <a href='https://meet.jit.si/' target='_blank' rel='noreferrer'>
                Jitsi
              </a>
              . Learn more about Jitsi{' '}
              <a href='https://youtu.be/3Iwiwq7eofE' target='_blank' rel='noreferrer'>
                here
              </a>
              .
            </li>
            <li>
              Support your children if they are in need of help. Be careful of trying to
              help too much, we want the students to try and solve the problems if they
              can.
            </li>
          </ul>
        </li>
        <li>
          Do not share any personal information with others.
          <ul>
            <li>
              Do not share the Jitsi link with teachers or fellow parents in private
              messaging.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        You can check out our{' '}
        <a href='/policies/privacy-and-copyright-policies/privacy-policy' target='_blank'>
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href='/policies/privacy-and-copyright-policies/terms-and-conditions'
          target='_blank'
        >
          Terms of Service
        </a>{' '}
        for more information on our security practices. If you have any questions or have
        something to report, please contact us via{' '}
        <a href='mailto:customercare@tagpros.us' target='_blank' rel='noreferrer'>
          customercare@tagpros.us
        </a>
        .
      </p>
    </Container>
  );
};

export default SafeguardingParents;
