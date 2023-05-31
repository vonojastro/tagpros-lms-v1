import React from 'react';

const documents = [
  {
    label: 'Teacher Social Media Policy',
    href: 'teacher-policies/teacher-social-media-policy'
  },
  {
    label: 'Tagpros Class Content Policy',
    href: 'teacher-policies/class-content'
  },
  {
    label: 'Tagpros Learner Safety and Privacy',
    href: 'teacher-policies/learner-safety-and-privacy-for-teacher'
  }
];

export class CommunityStandards extends React.Component {
  render() {
    return (
      <div>
        <h3>
          <span style={{ fontSize: '22px' }}>Tagpros Community&nbsp; Standards</span>
        </h3>
        <p>&nbsp;</p>
        <p>
          <span>
            Tagpros is an open community of learners (children ages 18 and under), parents
            and teachers. We are connected by technology and united by a desire to teach,
            inspire, and serve children to{' '}
          </span>
          <b>become smarter, wiser, and stronger</b>
          <span>
            . All our classes are offered by independent teachers, who determine the
            content and format of their own classes. &nbsp;
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>
            While our open community is our greatest source of strength, it also brings
            challenges. &nbsp;It is important to us that Tagpros is a safe space for our
            users. &nbsp;Our members should treat each other without bias or prejudice
            across all pillars of diversity including, but not limited to, race,
            ethnicity, nationality, religion, sexual orientation, and gender identity.
            &nbsp;Here are some guidelines that we ask our members to observe. Tagpros
            members who do not meet these guidelines will be removed from the site.&nbsp;
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span>Teacher Code of Conduct</span>
        </p>
        <ul>
          <li aria-level='1'>
            <span>
              Offer classes only where you have appropriate background or expertise.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Teach classes professionally: be prepared, begin on-time, and treat all
              learners with respect. Do not teach while impaired by alcohol or drugs, and
              do not model any behavior that a student age 18 or younger is restricted
              from doing.
            </span>
          </li>
          <li aria-level='1'>
            <span>Respond promptly to parent questions and requests.</span>
          </li>
          <li aria-level='1'>
            <span>
              Communicate with parents and learners in a professional manner, both in
              messages and in-class.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Treat all members of the Tagpros community respectfully, including our
              staff.&nbsp;
            </span>
          </li>
          <li aria-level='1'>
            <span>Adhere to </span>
            {/* 'https://docs.google.com/document/d/1YNjhJJMkPNyY3X7gUK4rM6eVNm4zqJjN2hliG_ENrX4/edit#heading=h.8u85t9f35nan' */}
            <b>our </b>
            <a href={documents[0].href}>
              <span>{documents[0].label}</span>
            </a>
            <span>&nbsp; by remaining thoughtful and professional online.</span>
          </li>
          <li aria-level='1'>
            <span>Adhere to </span>
            <b>our</b>{' '}
            <a href={documents[1].href}>
              <span>{documents[1].label}</span>
            </a>
            <span>.</span>
          </li>
          <li aria-level='1'>
            <span>Create a </span>
            <a href={documents[2].href}>
              <span>{documents[2].label}</span>
            </a>
            <span>
              &nbsp;for learners and families from all backgrounds, beliefs, and
              locations.
            </span>
          </li>
        </ul>
        <p>
          <span>Parent Code of Conduct</span>
        </p>
        <ul>
          <li aria-level='1'>
            <span>
              Ask questions of teachers to clarify any missing details about classes.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Show up for your class; many classes depend on group conversation, and the
              absence of a single student can have a big impact.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Provide constructive feedback about your class experience, for the benefit
              of the teacher and other parents.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Engage in civil conversation, and speak and act with respect for different
              opinions.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Help keep Tagpros safe for&nbsp; learners, families, and teachers from all
              backgrounds, beliefs, and locations. &nbsp;Refer to our{' '}
            </span>
            <a href={documents[1].href}>
              <span>{documents[1].label}&nbsp;</span>
            </a>
          </li>
        </ul>
        <p>&nbsp;</p>
        <p>
          <span>Learner Code of Conduct</span>
        </p>
        <ul>
          <li aria-level='1'>
            <span>Join class on time and be ready to learn.</span>
          </li>
          <li aria-level='1'>
            <span>
              Dress in a manner appropriate for class to help create a safe and
              comfortable environment for all learners and the teacher. Always show up for
              class fully clothed (shirts required).
            </span>
          </li>
          <li aria-level='1'>
            <span>Treat the teacher and your classmates with respect.</span>
          </li>
          <li aria-level='1'>
            <span>
              Take responsibility for making each class a great learning experience for
              yourself and your classmates: participate, stay on topic, and avoid
              distractions.&nbsp;
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Contribute to a class environment in a way that is safe and welcoming for
              learners and teachers from all backgrounds, beliefs, and locations.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              Keep your personal information private and don't ask others to share
              personal information (e.g., email address, mailing address, phone number,
              gamer tags, etc.).
            </span>
          </li>
        </ul>
        <p>&nbsp;</p>
        <p>
          <span>Tagpros Code of Conduct</span>
        </p>
        <ul>
          <li aria-level='1'>
            <span>
              We welcome members from all backgrounds, beliefs, and locations and are
              committed to creating a safe space for our users across all pillars of
              diversity.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              We will listen to feedback from parents, teachers, and learners, and make
              changes accordingly.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              We will create and enforce policies to create a high quality, trusted, and
              safe community for learning. This may include removing content or users from
              the platform.
            </span>
          </li>
          <li aria-level='1'>
            <span>
              We will respond as promptly as possible to questions and issues that arise.
              We appreciate your patience
            </span>
          </li>
        </ul>
        <p>
          <span>Finally, we ask that all members </span>
          <b>assume the best intentions</b>
          <span>
            {' '}
            in others. &nbsp;When something goes wrong, whether it's a technical glitch,
            an email without a response, or something else, we ask that you share feedback
            in a constructive way.&nbsp;
          </span>
        </p>
        <p />
      </div>
    );
  }
}
