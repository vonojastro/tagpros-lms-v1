import { Container } from '../../style';
import img1 from '../../img/troubleshootingTeachers1.png';
import img2 from '../../img/troubleshootingTeachers2.png';
import img3 from '../../img/troubleshootingTeachers3.png';
import img4 from '../../img/troubleshootingTeachers4.png';

const TroubleshootingTeachers = () => {
  return (
    <Container>
      <p>
        Tagpros’ video classroom is designed to be easy for students and teachers to
        access. However, we understand that, as with all matters concerning technology,
        issues do sometimes arise. Here are some tips to ensure a successful class:
      </p>
      <p>&nbsp;</p>
      <h3>Browser:</h3>
      <p>
        Please check that your browser and devices meet our{' '}
        <a
          href='/getting-started/technical-requirements-and-browser-support'
          target='_blank'
        >
          technical requirements
        </a>
        . Our{' '}
        <a href='https://tagpros.us' target='_blank' rel='noreferrer'>
          website
        </a>{' '}
        supports the latest two versions of all major browsers.{' '}
      </p>
      <p>
        Our video classroom uses{' '}
        <a href='https://meet.jit.si/' target='_blank' rel='noreferrer'>
          Jitsi
        </a>{' '}
        to host the classes. Check your internet connection speed at{' '}
        <a href='https://www.speedtest.net/' target='_blank' rel='noreferrer'>
          speedtest.net
        </a>
        . We suggest a minimum speed of 3 Mbps for both upload and download speeds. For
        the technical requirements of Jitsi, click{' '}
        <a
          href='https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-requirements/'
          target='_blank'
          rel='noreferrer'
        >
          here
        </a>
        . You should also host a practice class meeting on Jitsi before starting a class.
      </p>
      <p>&nbsp;</p>
      <h3>How to host a practice class in Jitsi:</h3>
      <p>
        To familiarize yourself with how to use Jitsi, we advise that you first host a
        practice class. Here are some settings that we recommend to ensure the best
        experience (You can find the settings by clicking the triple dot at the bottom of
        the meeting).
      </p>
      <img src={img1} alt='troubleshoooting-img1' />
      <ul style={{ marginTop: '20px' }}>
        <li>
          In the Jitsi settings, enable the pre-meeting screen
          <br />
          <img src={img2} style={{ margin: '20px' }} alt='troubleshooting-img2' />
        </li>
        <li>
          In the Jitsi settings, enable all sound notifications
          <br />
          <img src={img3} style={{ margin: '20px' }} alt='troubleshooting-img3' />
        </li>
        <li>
          Send your Jitsi meeting name in a calendar event or email to your practice group
          of learners/attendees.
        </li>
        <li>Begin your practice “class” at the designated time</li>
      </ul>
      <p>&nbsp;</p>
      <h3>Technical Issues:</h3>
      <p>
        If you’re unable to get into the Jitsi meeting via the “Start Meeting” button on
        the classroom for any reason, please let your learners know right away by posting
        a note on the Classroom page to explain that you’re having technical difficulties.
      </p>
      <p>
        If you're unable to access the Tagpros classroom on your primary device, use an
        alternate device like a cell phone or tablet to log into{' '}
        <a href='www.tagpros.us' target='_blank'>
          www.tagpros.us
        </a>{' '}
        and communicate with your class via the classroom tab that you're experiencing
        technical issues.
      </p>
      <p>
        It is advised to quit all unnecessary programs and tabs on your device during
        class to ensure that your computer and connection will be at their best
        performance.
      </p>
      <p>
        If that does not work, clear your cache/cookies and browsing data. Here are some
        basic instructions on{' '}
        <a
          href='https://www.lifewire.com/how-to-clear-cache-2617980'
          target='_blank'
          rel='noreferrer'
        >
          clearing your cache
        </a>
        . Please{' '}
        <a
          href='https://blog.hubspot.com/marketing/how-ad-blocking-works'
          target='_blank'
          rel='noreferrer'
        >
          disable any adblockers
        </a>{' '}
        you may have on your browser, or allow Tagpros.us to bypass your adblocker. This
        will look different depending on the adblocker you’re using.
      </p>
      <p>
        When participants join or leave the meeting, you will hear a low-pitch swooping
        sound. If you don’t hear this, change the setting when you first open your Jitsi
        meeting.
      </p>
      <p>&nbsp;</p>
      <h3>Other Issues:</h3>
      <p>
        Tagpros relies on many other tools working together correctly. Many issues can be
        resolved by restarting one or more of the tools. If you’re having trouble, we ask
        that you try these steps before reporting a problem to Tagpros.
      </p>
      <ul>
        <li>Quit and restart your browser</li>
        <li>Try a different browser</li>
        <li>Reload the Tagpros website</li>
        <li>Quit and restart Jitsi</li>
        <li>Restart your computer</li>
      </ul>
      <p>
        If technical issues arise and you are not able to attend, we advise that you
        cancel the class and notify the learner and the parents immediately in the Tagpros
        classroom. Learn more on how to cancel your classes{' '}
        <a href='/teachers-guide/running-classes/cancelling-a-class' target='_blank'>
          here
        </a>
        .
      </p>
      <p>
        And finally, if you wish to get in touch with us, use the Help button in the lower
        right-hand corner of the website, or shoot us an email in our{' '}
        <a href='https://tagpros.us/' target='_blank' rel='noreferrer'>
          Chatbot Support
        </a>
      </p>
      <img src={img4} alt='troubleshooting-img4' />
    </Container>
  );
};

export default TroubleshootingTeachers;
