import { Container } from '../style';

const EnrollmentPolicies = () => {
  return (
    <Container>
      <h3>Canceling a class</h3>
      <p>
        You have the right to cancel a class if you find yourself in a situation where you
        cannot teach it before it begins or if the required minimum number of students
        enrolls. Please reschedule the session at least 24 hours before the scheduled
        start time out of respect for those who registered. Before calling off the
        session, publish a notice in the room or send a message to every parent or student
        informing them of the cancellation. You must click the "cancel this class" button
        in your teacher's profile in order to end the class. The enrolled families will
        immediately receive reimbursements as a result. Repeated cancellations of classes
        will warrant a warning from us and can be subject to{' '}
        <a href='/teachers-guide/miscellaneous-topics/teacher-removal' target='_blank'>
          teacher removal
        </a>{' '}
        if repeated a lot of times.
      </p>
      <p>&nbsp;</p>
      <h3>Withdrawals</h3>
      <p>
        Only at the request of enrolled families should learners be removed from a class
        section or moved between class sections. Unauthorized withdrawal or transfer of
        students is against Tagpros policy and may result in a warning from our staff.
      </p>
      <p>&nbsp;</p>
      <h3>Minimum enrollments</h3>
      <p>
        In the case that your class has less than the minimum number of enrollees that you
        specified, you have three options:
      </p>
      <ul>
        <li>
          Proceed
          <ul>
            <li>You can still continue to teach the class.</li>
            <li>Notify the parents that the class has fewer students than expected.</li>
          </ul>
        </li>
        <li>
          Reschedule
          <ul>
            <li>Change the start time of your class until more enrollments are made.</li>
            <li>Enrollees should agree with the rescheduling plan.</li>
          </ul>
        </li>
        <li>
          Cancel
          <ul>
            <li>Cancel the class altogether.</li>
            <li>Notify the parents that you will be canceling the class.</li>
            <li>Issue the refunds.</li>
          </ul>
        </li>
      </ul>
      <p>
        To learn more about our policies regarding less than minimum enrollments, click{' '}
        <a
          href='/teachers-guide/getting-started/classes-with-fewer-enrollments'
          target='_blank'
        >
          here
        </a>
        .
      </p>
    </Container>
  );
};

export default EnrollmentPolicies;
