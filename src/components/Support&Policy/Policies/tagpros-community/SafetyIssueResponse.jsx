import { Container } from '../../style';

const SafetyIssueResponse = () => {
  return (
    <Container>
      <p>
        Tagpros takes the security of our members very seriously. We have created a
        standard response in the case of an incident that compromises the safety of an
        individual to ensure that no harm will be done to anyone.
      </p>
      <p>
        If a report has been submitted to us or we have identified that personal
        information was illegally obtained, then we will do the following:
      </p>
      <ul>
        <li>
          Identify the attacker and immediately terminate their access to the platform and
          verify if they can no longer do any harm.
        </li>
        <li>
          Determine who will be impacted and let them know right away if they are in
          danger.
        </li>
        <li>
          Identify the root cause of the issue and create countermeasures to prevent the
          incident from happening again.
        </li>
      </ul>
      <p>
        We will also be communicating with the affected individuals and informing them of
        the situation and what we are doing to resolve the problem. Do not hesitate to
        contact{' '}
        <a href='mailto:customercare@tagpros.us' target='_blank' rel='noreferrer'>
          customercare@tagpros.us
        </a>{' '}
        if you feel unsafe in any way and we will listen to your requests.
      </p>
    </Container>
  );
};

export default SafetyIssueResponse;
