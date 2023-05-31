import { Container } from '../../style';
import img1 from '../../img/creatingAccount.png';

const CreatingAccount = () => {
  return (
    <Container>
      <h3>Signing Up</h3>
      <p>
        To create a parent’s account, you have to first{' '}
        <a href='/register' target='_blank'>
          sign up
        </a>{' '}
        at our website. You must fill up the necessary details and agree to our{' '}
        <a
          href='/policies/privacy-and-copyright-policies/terms-and-conditions'
          target='_blank'
        >
          terms and conditions
        </a>
        . You can also choose four different options on which type of account you want to
        create, which are:
      </p>
      <ul>
        <li>Family</li>
        <li>Learner</li>
        <li>Teacher</li>
        <li>School District</li>
      </ul>
      <p>
        Each of these will have a different layout that is appropriate to the type of
        account.
      </p>
      <p>
        Your password must be at least 8 characters and not exceed 50 characters. It
        should also contain at least 1 uppercase letter and 1 special character.
      </p>
      <p>&nbsp;</p>
      <h3>Verification and Notifications</h3>
      <p>
        When you have created an account, you will need to verify your email. To verify
        your email, you will have to log in using the email address you provided. From
        there, you will see a message with the subject “[Tagpros.us] Verify your account.”
        Once you open that you will see a message asking you to click on a hyperlink. Your
        account will be verified upon clicking that link.
      </p>
      <p>
        Your account will be linked with the email you provided during sign-up. Whenever
        we have a new class or updates, you will be receiving notifications on your email
        account.
      </p>
      <p>&nbsp;</p>
      <h3>Logging in</h3>
      <p>
        Once you have signed up for your account, you can now{' '}
        <a href='/login' target='_blank'>
          log in
        </a>{' '}
        to your account by entering your email and password. You can tick the option
        “Remember Me” to keep your email saved on the same computer during log-in.
      </p>
      <p>&nbsp;</p>
      <h3>Family Account</h3>
      <p>
        The family account is managed by the parent wherein he/she handles the classes
        that the learners enroll in. To create a new learner profile under your account,
        simply click the “+ Add New Learner” and fill in the necessary details.
      </p>
      <img src={img1} alt='create account' />
      <p>&nbsp;</p>
      <h3> Learner’s Account</h3>
      <p>
        If a learner wants to manage his/her account, the option to create a learner’s
        account is also available. The format of the account is similar to that of a
        family account with the exception of not being able to add new learners within the
        account.
      </p>
      <p>&nbsp;</p>
      <h3>Teacher’s Account</h3>
      <p>
        Teachers who want to partner with Tagpros and create classes will also have to
        create an account. The teacher’s account can be used to create classes, post
        assignments, and also contact the parents and learners.
      </p>
    </Container>
  );
};

export default CreatingAccount;
