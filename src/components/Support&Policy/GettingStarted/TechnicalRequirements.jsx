import { Container } from '../style';

const TechnicalRequirements = () => {
  return (
    <Container>
      <h3>The Tagpros Website</h3>
      <p>Our site is designed to work with all major browsers on desktop, including:</p>
      <ul>
        <li>Google Chrome</li>
        <li>Safari</li>
        <li>Firefox</li>
        <li>Edge</li>
      </ul>
      <p>
        For each browser, we support the two most recent versions. You can see the most
        recent versions{' '}
        <a href='https://updatemybrowser.org/' target='_blank' rel='noreferrer'>
          here
        </a>
        . You may be able to use older versions or other browsers on Tagpros, but we're
        unable to provide tech support for those. If you encounter an error or a bug,
        please let us know!
      </p>
      <p>&nbsp;</p>
      <p>
        <b>Ad blockers and privacy plugins</b>
      </p>
      <p>
        Browser extensions can interfere with the Tagpros website and break our customer
        support tool. Each plugin offers the ability to exclude specific websites so that
        the websites you still want to access can operate without interference. We
        strongly recommend that you add tagpros.us to your list of permitted websites
        (this setting will look different for each plugin).
      </p>
      <p>&nbsp;</p>
      <h3>Live online classes</h3>
      <p>
        Most Tagpros classes are live online classes, meaning they meet using video chat.
        For safety, we require learners in live classes to connect over video chat with
        each new teacher at least once so the teacher can verify your learner’s identity.
        (We encourage learners to enable their audio/video during the rest of class to
        create a more social experience, but it’s not required). For this reason, you
        should be using a computer or device with a microphone and webcam. Most laptops,
        tablets, and phones now have these built-in. Older computers might have them as
        separate attachments. If you don’t have access to a webcam, you will not be able
        to join live Tagpros classes but you are welcome to participate in our
        asynchronous flex classes.
      </p>
      <p>
        For reliable video chat, the most important thing is to have a reliable internet
        connection. Faster is better, but most DSL and Cable internet plans will be
        sufficient. If you want to test your internet connection speed, you can do so
        using{' '}
        <a href='http://www.speedtest.net/' target='_blank' rel='noreferrer'>
          Speedtest.net
        </a>
        . The suggested minimum speed for reliable video chat is 3Mbps for both upload and
        download. Tagpros uses an app called Jitsi as its video chat platform. Jitsi works
        with all kinds of devices and operating systems. If you want, you can read more
        about{' '}
        <a
          href='https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-requirements/'
          target='_blank'
          rel='noreferrer'
        >
          Jitsi Technical Requirements
        </a>
        , but you don't need to - for 99% of people, it just works. You will be prompted
        to download Jitsi the first time you join a Tagpros class. Families from all over
        the world are able to use Jitsi, but there are a few countries or regions in which
        it is not supported due to regulatory reasons.{' '}
      </p>
      <p>&nbsp;</p>
      <h3>Flexible schedule classes</h3>
      <p>
        Flexible Classes do not have any pre-scheduled meeting times. Most official
        communication occurs through email, discussion forums, or other websites, so there
        are no particular technical requirements aside from Internet access..
      </p>
    </Container>
  );
};

export default TechnicalRequirements;
