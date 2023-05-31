import { Container } from '../../style';

const ListingClass = () => {
  return (
    <Container>
      <p>
        Once you have{' '}
        <a
          href='/teachers-guide/getting-started/how-to-become-a-teacher-on-tagpros'
          target='_blank'
        >
          created your teacher’s account
        </a>
        , you are now ready to create your first class. This article will serve as your
        guide in listing your first class. Check out our{' '}
        <a href='/' target='_blank'>
          Standards for Listings
        </a>{' '}
        to learn more.
      </p>
      <p>&nbsp;</p>
      <h3>1. Create New Class:</h3>
      <ol>
        <li>
          Log in to our{' '}
          <a href='/' target='_blank'>
            website
          </a>{' '}
          using your teacher’s account.{' '}
        </li>
        <li>Click the “+ Create New Class” button</li>
        <li>Fill up the details of your class</li>
        <li>Click Submit</li>
      </ol>
      <p>&nbsp;</p>
      <h3>2. Wait for Approval:</h3>
      <p>
        Once you have submitted your first class, our approvals team will check it and see
        if it is ready to be published. This will typically take 3-5 business days to
        process. Once we have checked your class, we will be contacting you to tell you if
        the class has been approved or not. If the class has not been approved, we will be
        giving you feedback to help you improve your class listing.
      </p>
      <p>&nbsp;</p>
      <h3>3. Edit your Class:</h3>
      <p>
        This part is optional. After we have given you our feedback for your class
        listing, you will have to edit parts of your class to fix some mistakes or make
        improvements. After you have revised the content of your class, you can now
        resubmit it and wait again for approval. Please note that you may have to edit
        your class multiple times before it can be published.
      </p>
      <p>&nbsp;</p>
      <h3>4. Respond to Messages:</h3>
      <p>
        Once we have approved the publishing of your class, it will now be listed on our
        website and learners can now enroll in it. Your class details will contain a “Send
        Message” button that users can see. If a parent or learner wants to ask a question
        about the class, they can use that button to contact you. We recommend you be
        responsive to increase the likelihood of them enrolling in your class.
      </p>
    </Container>
  );
};

export default ListingClass;
