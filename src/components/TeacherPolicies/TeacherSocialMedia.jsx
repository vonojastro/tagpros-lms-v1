import styled from 'styled-components';

const Li = styled.li`
  font-size: 18px;
`;

const TeacherSocialMedia = () => {
  return (
    <div>
      <div>
        <h3>
          <span style={{ fontSize: '22px' }}>Teacher Social Media Policy</span>
        </h3>
        <p>Teacher guidelines for learner safety and privacy</p>
        <p>
          Our foremost concern is learner safety, and we approach this in several ways as
          described by our safety policy. This article describes your responsibility for
          safety as a teacher on Tagpros.
        </p>
        <p>
          Because our goal is to create and safeguard our trusted community, Tagpros’s
          social media policy sets forth parameters, as well as specific examples of
          unacceptable online behavior. These inappropriate behaviors shouldn’t be
          news-worthy to you! So here are some golden rules to follow when you’re engaging
          in Tagpros-affiliated groups and in any online forum:
        </p>
        <p>&nbsp;</p>
        <ul>
          <Li aria-level='1'>
            <span>
              <strong style={{ fontWeight: '500' }}>
                Keep our community dialogue safe and welcoming:
              </strong>{' '}
              Don’t provoke, bully or create unnecessary conflict--debate is only welcomed
              when it’s healthy{' '}
              <strong style={{ fontWeight: '500' }}>
                <em>and</em>
              </strong>{' '}
              invited.
            </span>
          </Li>
          <Li aria-level='1'>
            <span>
              <strong style={{ fontWeight: '500' }}>Be respectful:</strong> Please don’t
              make derogatory or disrespectful comments about learners, teachers, parents,
              or Tagpros staff--even if you don’t identify them by name.
            </span>
          </Li>
          <Li aria-level='1'>
            <span>
              <strong style={{ fontWeight: '500' }}>Be Kind:</strong> Don’t share content
              that contains or promotes hate speech, threats of violence, or endangerment
              of children.{' '}
            </span>
          </Li>
          <Li aria-level='1'>
            <span>
              <strong style={{ fontWeight: '500' }}>Follow our Privacy Policy:</strong>{' '}
              Don’t share any personally identifiable information or pictures about
              parents or learners--that includes descriptions of them, voices, names,
              conversations.
            </span>
          </Li>
        </ul>
        <p>&nbsp;</p>
        <p>
          Additionally, if you are concerned about your privacy,{' '}
          <strong style={{ fontWeight: '500' }}>
            be sure to configure privacy settings
          </strong>{' '}
          to reduce visibility on your personal pages. While this can help you keep your
          personal life separate, we also caution that anything shared online could
          ultimately end up in the public realm. Our unsolicited advice: continue to treat
          anything you share on social media as public!
        </p>
        <p>
          If Tagpros becomes aware of online behavior (whether on a Tagpros-affiliated
          forum or a personal social media account) that violates this policy or our
          community standards. We may remove teachers from the platform. In addition,
          Tagpros reserves the right to monitor and remove any content posted on an
          Tagpros-affiliated forum for any reason.
        </p>
        <p>
          If you have concerns about the online behavior of another community member,
          please make a report to{' '}
          <span style={{ color: 'blue' }}>
            <a href='mailto:cmpalabrica@tagpros.org' target='_blank' rel='noreferrer'>
              cmpalabrica@tagpros.org
            </a>
          </span>
          . Please note that while Tagpros will investigate and determine an appropriate
          course of action, we will not engage in discussions about the outcome nor
          discuss any other contexts in which we implement this policy.
        </p>
      </div>
    </div>
  );
};

export default TeacherSocialMedia;
