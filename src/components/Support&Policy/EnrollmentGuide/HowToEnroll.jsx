import { Container } from '../style';
import img1 from '../img/enrollmentGuide1.png';
import img2 from '../img/enrollmentGuide2.png';

const HowToEnroll = () => {
  return (
    <Container>
      <p>
        Once you log in to your parent’s or learner’s account, you can choose a class you
        want to take. You can do this by searching for a specific class or class title
        using our search button or you can also find classes in our “Top Classes for the
        Month” gallery.
      </p>
      <p>
        To choose a class, simply click at the image or the title of the class. Once you
        are at the class profile, click “Enroll Now” to avail the class. If you are using
        a parent’s account, first tick the checkbox of which learner/s will be enrolling
        in the class.
      </p>
      <img src={img1} alt='Enroll now' />
      <p>
        You will be redirected to a billing tab. Simply fill up the details and click the
        Paypal Buy now to complete the enrollment. We are only currently accepting
        payments from{' '}
        <a href='http://paypal.com' target='_blank' rel='noreferrer'>
          PayPal
        </a>
        .
      </p>
      <img src={img2} alt='billing tab' />
    </Container>
  );
};

export default HowToEnroll;
