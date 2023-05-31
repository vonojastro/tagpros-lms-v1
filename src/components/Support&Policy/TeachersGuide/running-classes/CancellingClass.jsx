import { Container } from '../../style';

const CancellingClass = () => {
  return (
    <Container>
      <h3>How to cancel your class</h3>
      <p>
        If the situation arises that you are no longer capable of teaching the class
        before it starts or the number of enrollees does not meet the minimum specified
        for your class, then you can cancel it. To be considerate to those who enrolled,
        please cancel the class at least 24 hours before the start time. Before
        canceling the class, post an announcement in the classroom or message each
        parent or learner that you will be canceling the class so they will be notified.{' '}
      </p>
      <p>
        To cancel the class, you have to press a “cancel this class” button in your
        teacher’s profile. This will automatically issue refunds to the enrolled
        families.{' '}
      </p>
      <p>&nbsp;</p>
      <h3>Auto-canceled sections</h3>
      <p>
        If your class has no enrollments once the class starts, then it will be
        automatically canceled by our platform. You will be receiving an email
        notification if this happens. In the case that the class was auto-canceled by
        mistake, you can undo the cancellation in the email.{' '}
      </p>
    </Container>
  );
};

export default CancellingClass;
