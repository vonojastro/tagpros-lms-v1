import 'css/new-age.scoped.css';
import { Fragment } from 'react';
import Page from 'components/Page';
import {
  FirstOverflowSection,
  FirstSection,
  Notice,
  Requirements,
  SecondSection,
  ThirdSection
} from './styles.js';
import './index.css';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { Requirement } from 'components/Landing/index.jsx';
export default function TeacherLearnMore() {
  return (
    <Fragment>
      <FirstOverflowSection pageProps={{ withNavBar: true }}>
        <FirstSection>
          <h1>
            <b>Share Your Knowledge and get U.S. Exposure!</b>
          </h1>

          <Link to='/register?type=TEACHER'>
            <button type='button' class='btn btn-warning btn-lg'>
              <b>Sign Up to Teach</b>
            </button>
          </Link>
        </FirstSection>
      </FirstOverflowSection>

      <Page>
        <SecondSection>
          <div className='col-find text-center teacher1'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image' src='./img/teacher1.png' />
            </div>
            <div className='row mr-2 ml-2 d-flex align-items-center justify-content-center text-justify'>
              <h3>Exposure To US Schools</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>
                Create and Record atleast 1 live class with four enrollees for the next
                six months and get a chance to meet a US School District principal or HR
                Representative.
              </p>
            </div>
          </div>
          <div className=' col-xs-12 col-find text-center'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image' src='../img/teacher2.png' />
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <h3>Secure a Teaching License</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>Secure A Teaching License in one of Our Pilot States.</p>
            </div>
          </div>
          <div className=' col-xs-12 col-find text-center'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image teacher3' src='./img/teacher3.png' />
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <h3>Earn Money Flexibly</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>Design a Curriculum you love and set your Own Prices!</p>
            </div>
          </div>
        </SecondSection>
      </Page>

      <Page withFooter withSubscribeToYoutubeBanner>
        <ThirdSection>
          <h1 className='dark-text'>Requirements to become a TagPros Teacher</h1>

          <div className='row'>
            <div className='orange-divider' />
          </div>
          <div>
            <div>
              <img alt='img' className='rounded' src='./img/teach.jpg' />
            </div>
            <div>
              <h3>Must complete the following:</h3>
              <ul className='pt-3 pb-3 req-teacher'>
                <li>Teacher Profile</li>
                <li>Upload a Short Video</li>
                <li>
                  Create at least 1 regular active live tutoring class (with students)
                  with a session per week for at least six months.
                </li>
              </ul>
              <p className='text-justify'>
                US Schools and its designees reserves the right to select which class(es)
                they would like to observe based on their priorities and needs.Thus,
                Tagpros will not provide any assurance that any virtual class(es) will be
                visited.
              </p>
            </div>
          </div>
          <div className='row d-flex pb-4 justify-content-center align-items-center'>
            <div className='border' />
          </div>

          <h3 className='dark-text responsive-head'>
            <b>Other Requirements:</b>
          </h3>

          <Requirements>
            {[
              {
                title: `Minimum Bachelor's degree or US equivalent in either education or the
                    subject area (or related subjects) from an approved education program.`,
                icon: 'fa fa-graduation-cap fa-lg icon-teacher'
              },
              {
                title: `Currently employed as a teacher at the primary or secondary level or
                    seeking an advanced degree.`,
                icon: 'fa fa-user fa-lg icon-teacher'
              },
              {
                title: `
                    Minimum of two years of post-degree full time teaching experience
                  `,
                icon: 'fa fa-book fa-lg icon-teacher'
              },
              {
                title: `
                    Advanced proficiency of the English language
                  `,
                icon: 'fa fa-globe fa-lg icon-teacher'
              }
            ].map(({ icon, title }) => (
              <Requirement key={title} title={title} icon={icon} />
            ))}
          </Requirements>

          <div className='row d-flex justify-content-center align-items-center'>
            <div className='border' />
          </div>
          <Notice className='row rowfind pb-5 pt-5 justify-content-xl-center'>
            <div className='col col-xs-12 col-find text-left orange-teacher p-3'>
              <h3 className='mt-4'>
                If selected, teachers will be given provisional job offers and will be
                given instructions directly by the HR coordinators of the host schools
                regarding the next step of the onboarding process.
              </h3>
              <p className='mt-4 text-justify'>
                In addition to teaching, educators will sharpen their professional skills
                and participate in cross-cultural activities in schools and communities,
                and return to their home school after two-four years to share experiences
                and increased knowledge of the United States and the U.S. educational
                system. <br /> <br /> Teachers are eligible to repeat the program provided
                that they have resided outside the United States for two years and
                continue to meet the eligibility requirements; or may be able to get a
                waiver from the Philippine Government.
              </p>
            </div>
            <div className='col-xl-5'>
              <img alt='img' className='element-radius' src='./img/teach2.jpg' />
            </div>
          </Notice>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='border' />
          </div>
          <div className='mr-2 pt-4'>
            <h1 className='dark-text'>
              <b>US Visiting Teachers Program:</b>
            </h1>
          </div>

          <div className='orange-divider' />

          <p className='text-dark text-justify'>
            Tagpros is currently in a{' '}
            <b>
              <u>Pilot Program</u>
            </b>{' '}
            with the{' '}
            <a href='https://tea.texas.gov/' target='_blank' rel='noreferrer'>
              <u>Texas Education Agency</u>
            </a>
            . The project’s intent is to share with Texas school leaders, principals, and
            department chairs international educators’ classroom experience, and online
            live classroom best practice(s) for the{' '}
            <a href='/learn-more/US-visiting-program' target='_blank' rel='noreferrer'>
              <u>US Visting Teachers Program</u>
            </a>
            . Participating Texas school districts will review teachers’ profile and will
            watch recorded live classes to get highly qualified participants.
          </p>

          <div className='d-flex justify-content-center align-items-center'>
            <Accordion className='teacher-accordion'>
              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='0' className='dark-text'>
                  What is the US Visiting Teachers Program?{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='0' className='dark-text'>
                  <Card.Body className='text-justify'>
                    If selected by Texas school districts, teachers can work in the United
                    States and earn as regular educators. Between US$ 35K-70K per year
                    depending on years of teaching experience, not to mention medical,
                    life insurance, and selected state or local benefits. Educators get to
                    teach between 1-3 years in a Texas school as a visiting teacher.{' '}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='1' className='dark-text'>
                  Participating school districts{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='1' className='dark-text'>
                  <Card.Body>
                    <div className='row pt-4 pb-5'>
                      <div className='col-xl-4 '>
                        <ul className='faq-teacher'>
                          <li>Aldine Independent School District </li>
                          <li>Alief Independent School District </li>
                          <li>Channelview Independent School District </li>
                          <li>Crosby Independent School District </li>
                          <li>Cypress-Fairbanks Independent School District</li>
                          <li>Galena Park Independent School District</li>
                        </ul>
                      </div>

                      <div className='col-xl-4 '>
                        <ul className='faq-teacher'>
                          <li>Goose Creek Independent School District </li>
                          <li>Houston Independent School District </li>
                          <li>Huffman Independent School District </li>
                          <li>Humble Independent School District </li>
                          <li>Katy Independent School District</li>
                          <li>Klein Independent School District</li>
                        </ul>
                      </div>

                      <div className='col-xl-4 '>
                        <ul className='faq-teacher'>
                          <li>Pasadena Independent School District </li>
                          <li>Sheldon Independent School District </li>
                          <li>Spring Independent School District</li>
                          <li>Spring Branch Independent School </li>
                          <li>Tomball Independent School District</li>
                        </ul>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='2' className='dark-text'>
                  What does Tagpros offer teachers?{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='2' className='dark-text'>
                  <Card.Body className='text-justify'>
                    We offer a video-chat platform to organize, promote, and deliver
                    online live classes for K-12 students; and leverage your virtual
                    teaching skills for international visiting opportunities in the United
                    States.{' '}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='3' className='dark-text'>
                  What classes should I offer?{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='3' className='dark-text'>
                  <Card.Body className='text-justify'>
                    We encourage you to teach classes on topics you are passionate about
                    and experienced with, and ideally that you have taught before. We
                    welcome classes on all subjects and in all formats, for Philippine
                    learners up to age 18. We generally suggest offering a range of
                    classes that would help K-12 students understand their core subjects
                    through different “hacks.” Thus, we highly recommend you to stay away
                    from echoing what you are saying inside classroom, but provide kids
                    creative ways of understanding concepts using online tools,
                    manipulatives, and emerging technologies.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='4' className='dark-text'>
                  Application Process{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='4' className='dark-text'>
                  <Card.Body>
                    Tagpros require a teaching credential and enlistment of at least 1
                    live online class with two enrollees for the next six months on a
                    regular monthly basis.
                    <ul className='faq-teacher'>
                      <li>
                        Sign-up and complete a glowing and well-written profile with
                        corresponding attachments of your teaching license,{' '}
                        <a
                          href='https://www.youtube.com/watch?v=iJSXirV0g0I&t=8s'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <u>sample video or youtube link;</u>
                        </a>{' '}
                        and other work documentation. Tagpros Administrators will evaluate
                        your portfolio; and will communicate on the status of your
                        application within three business days through email.
                      </li>
                      <li>
                        If prequalified, teachers can already create demonstration live
                        class(es); and will receive another email to inform them of its
                        activation.
                      </li>
                      <li>
                        Due to time zone differences with Texas, it is recommended for
                        teachers to record their live classes by saving these material(s)
                        in our platform.
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='5' className='dark-text'>
                  How can I get considered?{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='5' className='dark-text'>
                  <Card.Body>
                    <ul className='faq-teacher'>
                      <li>
                        Your profile and created live online class(es) will populate our
                        school districts’ dashboard; and Texas stakeholders will be
                        notified of your six-months participation in our platform.{' '}
                      </li>
                      <li>
                        Texas school districts’ stakeholders will select the candidates;
                        and will communicate via email if an interview is warranted.
                      </li>
                      <li>
                        If you hurdle the interview and are provided an offer, you will be
                        instructed by school district representatives via email to enroll
                        in an online licensure program endorsed by the Texas Education
                        Agency; and participating{' '}
                        <b>
                          <u>school district representatives</u>
                        </b>{' '}
                        will provide guidance about the next steps of the onboarding
                        process in coordination with Tagpros.
                      </li>
                      <li>
                        Please{' '}
                        <b>
                          <u>refrain from contacting us</u>
                        </b>{' '}
                        about the status of your application as we are not involved in the
                        shortlisting and selection process.
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {/* <Card className="teacher-card">
                          <Accordion.Toggle as={Card.Header} eventKey="5">
                              What’s the next step if I am considered?
                          </Accordion.Toggle>

                          <Accordion.Collapse eventKey="0">
                              <Card.Body></Card.Body>
                          </Accordion.Collapse>
                      </Card> */}
              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='6' className='dark-text'>
                  Will I get paid for my online classes?{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='6' className='dark-text'>
                  <Card.Body className='text-justify'>
                    Tagpros get 30% commission from your class enrollment for
                    administration and cloud services. While we help advertise teachers’
                    classes online, we are encouraging you to invite your own students to
                    join.
                    <br />
                    <br />
                    Moreover, teachers will have full control over the listed price for a
                    class and number of participants, including scheduling the time, days,
                    and hours of session(s); and will receive payment via PayPal within
                    7-10 business days.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className='teacher-card'>
                <Accordion.Toggle as={Card.Header} eventKey='7' className='dark-text'>
                  Will I pay Tagpros placement fee?{' '}
                  <i className='fas fa-angle-down rotate-icon down-button' />
                </Accordion.Toggle>

                <Accordion.Collapse eventKey='7' className='dark-text'>
                  <Card.Body className='text-justify'>
                    To be clear, Tagpros{' '}
                    <b>
                      <u>is not a recruitment firm;</u>
                    </b>{' '}
                    and{' '}
                    <b>
                      <u>we’re not in the business of charging placement fees</u>
                    </b>{' '}
                    or any other type of fees from teachers. Thus, we are an online
                    conduit for US institutions looking for highly qualified participants
                    for the US visiting opportunities, scholarships, licensures, and
                    masteral programs through online live demonstration classes and
                    glowing professional teacher profiles.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          <div className='row d-flex pt-5 justify-content-center align-items-center'>
            <div className='border' />
          </div>
        </ThirdSection>
      </Page>
    </Fragment>
  );
}
