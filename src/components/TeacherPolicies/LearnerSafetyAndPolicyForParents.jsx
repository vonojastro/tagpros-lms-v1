import styled from 'styled-components';

const Li = styled.li`
  font-size: 18px;
`;

const LearnerSafetyAndPolicyForParents = () => {
  return (
    <div>
      <div>
        <h3>
          <span style={{ fontSize: '22px' }}>
            Learner Safety and Privacy: For Parents
          </span>
        </h3>
        <p>
          Tagpros classes are open to children ages 3-18 (no adults!), and learner safety
          is our top priority. We safeguard our community in a variety of ways as
          described by our safety policy. You can check out our Privacy Policy and Terms
          of Service for more information on our security practices. We also rely on
          Tagpros parents and teachers to help us promote a safe and positive online
          learning environment.
        </p>
        <p>&nbsp;</p>
        <p>To that end, as an Tagpros parent we ask that you:</p>
        <ul>
          <Li aria-level='1'>
            <span>
              <strong>
                Help your children learn and practice positive classroom behaviors before
                class starts.
              </strong>{' '}
              This includes helping them understand the basic features of{' '}
              <a
                href='https://www.youtube.com/watch?v=kNc7x5aJAMg'
                target='_blank'
                rel='noreferrer'
              >
                Jitsi
              </a>
              , which will allow them to engage respectfully in class without distracting
              other learners.
            </span>
          </Li>
          <Li aria-level='1'>
            <span>
              <strong>
                Supervise your learners (from a comfortable distance 🙂) while they attend
                class, until you’re confident they can participate safely and respectfully
                on their own.
              </strong>{' '}
              For older learners, this may take just a few minutes. For younger learners,
              or those with behavioral challenges, you may need to be nearby for every
              class. You know your children best! We encourage parents to stay off-screen
              as much as possible, so if your learner needs hands-on assistance or
              supervision, please reach out to the teacher before class to let them know.
            </span>
          </Li>
          <Li aria-level='1'>
            <span>
              <strong>
                Make sure your learner connects with each new teacher at least once with
                video enabled to allow the teacher to confirm your learner’s identity.
              </strong>{' '}
              This can be a quick check-in at the beginning of the first class meeting,
              and is required to promote classroom safety. We encourage learners to enable
              their audio/video during the rest of class to create a more social
              experience for all learners, but it’s not required.
            </span>
          </Li>
        </ul>
        <p>&nbsp;</p>
        <p>
          Additionally, we are big believers in the value of digital citizenship education
          for all kids. To help your learners develop the skills to stay safe on the
          Internet, check out the following resources:
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline', fontWeight: '600' }}
            href='https://beinternetawesome.withgoogle.com/en_ph'
            target='_blank'
            rel='noreferrer'
          >
            Be Internet Awesome
          </a>
          <p>Internet privacy, safety, and behavior tips from Google. </p>
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline', fontWeight: '600' }}
            href='https://safeandsecureonline.org/s/'
            target='_blank'
            rel='noreferrer'
          >
            Safe and Secure Online
          </a>
          <p>
            This resource is provided by the nonprofit{' '}
            <a href='https://iamcybersafe.org/s/' target='_blank' rel='noreferrer'>
              Center for Cyber Safety and Education.
            </a>
          </p>
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline', fontWeight: '600' }}
            href='https://www.consumer.ftc.gov/topics/protecting-kids-online'
            target='_blank'
            rel='noreferrer'
          >
            Federal Trade Commission - Protecting Kids Online
          </a>
          <p>This government resource covers cyber-bullying and more.</p>
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline', fontWeight: '600' }}
            href='https://www.commonsensemedia.org/'
            target='_blank'
            rel='noreferrer'
          >
            Common Sense Media
          </a>
          <p>
            This organization provides advice on media consumption for children, including
            an overview of{' '}
            <a
              href='https://www.commonsensemedia.org/articles/online-safety'
              target='_blank'
              rel='noreferrer'
            >
              privacy and internet
            </a>{' '}
            safety and tips for different ages. They also offer a selection of video
            recommendations, like this video of{' '}
            <a
              href='https://www.commonsensemedia.org/videos/5-internet-safety-tips-for-kids'
              target='_blank'
              rel='noreferrer'
            >
              5 Internet safety tips for kids
            </a>
            .
          </p>
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline', fontWeight: '600' }}
            href='https://www.fosi.org/'
            target='_blank'
            rel='noreferrer'
          >
            Family Online Safety Institute
          </a>
          <p>
            This organization provides a range of articles searchable by age, and is
            funded by a group of major technology companies.
          </p>
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline', fontWeight: '600' }}
            href='https://studentprivacymatters.org/'
            target='_blank'
            rel='noreferrer'
          >
            Parent Coalition for Student Privacy
          </a>
          <p>
            A national coalition of parents and advocates to defend the rights of parents
            and students to protect their data. Including a{' '}
            <a
              href='https://www.studentprivacymatters.org/wp-content/uploads/2017/05/Parent-Toolkit-for-Student-Privacy.pdf'
              target='_blank'
              rel='noreferrer'
            >
              Parent Toolkit for Student Privacy
            </a>
            .{' '}
          </p>
        </p>
        <p>
          We also suggest you seek out best practices from your friends and local
          communities.{' '}
        </p>
      </div>
    </div>
  );
};

export default LearnerSafetyAndPolicyForParents;
