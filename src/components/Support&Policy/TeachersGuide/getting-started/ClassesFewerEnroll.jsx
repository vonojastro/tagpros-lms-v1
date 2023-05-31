import { Container } from '../../style';

const ClassesFewerEnroll = () => {
  return (
    <Container>
      <p>
        The teacher will be the one to set the minimum amount of enrollments for his/her
        class. If the minimum amount is reached, the default assumption will be that the
        teacher will continue with the class at the specified date. However, there will be
        cases where the number of enrollees will be less than the minimum that the teacher
        has set. Here are the options that the teacher can take if it happens:
      </p>
      <p>&nbsp;</p>
      <h3>Proceed</h3>
      <p>
        The teacher still has the option to continue his/her class even if the number of
        enrollees is less than the minimum amount the teacher specified. However, we
        recommend that the teacher notify the parents of those who enrolled that the
        teacher will have fewer students than expected. Please note that more enrollments
        may occur at the last minute so the teacher should always check up on his/her
        class. If no announcements are made from the teacher’s side, the assumption will
        be that the teacher will be proceeding with the class.
      </p>
      <p>&nbsp;</p>
      <h3>Reschedule</h3>
      <p>
        The teacher can also try to change the schedule of his/her class or wait until the
        number of enrollments reaches the minimum. If the teacher wants to do so, we will
        require the teacher to message the parents or learners and ask them if they are
        willing to reschedule. If the parents or learners are not willing, the teacher
        will have to cancel his/her class.
      </p>
      <p>&nbsp;</p>
      <h3>Cancel</h3>
      <p>
        The teacher may also choose to cancel their class altogether. To do so, the
        teacher will have to notify all parents 24 hours before the supposed starting date
        of the class and issue the refund according to our{' '}
        <a href='/enrollment-guide/refund-basics' target='_blank'>
          guidelines
        </a>
        .
      </p>
    </Container>
  );
};

export default ClassesFewerEnroll;
