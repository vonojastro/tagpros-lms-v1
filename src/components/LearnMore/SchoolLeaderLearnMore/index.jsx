import 'css/new-age.scoped.css';
import { Fragment, useState } from 'react';
import './index.css';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  FirstOverflowSection,
  Requirement,
  Requirements,
  ThirdOverflowSection,
  SecondOverflowSection,
  SecondSection,
  ThirdSection
} from './styles';
import { FirstSection } from '../TeacherLearnMore/styles';
import Page from 'components/Page';
import { ParticipatingSchoolDistricts } from 'components/Landing';
import Section from 'components/Page/Section';
import { LastActionLink } from '../USVisiting';

export default function SchoolLeaderLearnMore() {
  const [showRequestDemo, setShowRequestDemo] = useState(false);
  const [roleTypes] = useState([
    'HR Practioner',
    'SuperIntendent',
    'Principal',
    'Assistant/Vice Principal',
    'Department Chair',
    'School Board member',
    'Government Employee',
    'Nonprofit Officer',
    'Teacher',
    'Others'
  ]);
  const toggleOnShowRequestDemo = e => {
    e.preventDefault();
    setShowRequestDemo(true);
  };

  return (
    <Fragment>
      <Modal
        size='l'
        show={showRequestDemo}
        backdrop='static'
        keyboard={false}
        centered
        onHide={() => {
          setShowRequestDemo(false);
        }}
      >
        <Modal.Header>
          <Modal.Title color='text-primary'>Request A Demo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class='row text-center'>
            <p className='modal-beginning-text'>
              Are you an HR practitioner or school leader interested in learning more
              about Philippine teachers? <br />
              <br />
              Please Fill Out The Form Below
            </p>
          </div>
          <div class='row'>
            <div className='col text-left'>
              <h6 className='modal-title' id='exampleModalLabel'>
                First Name<small style={{ color: 'red' }}>*</small>
              </h6>
              <div className='form-group mb-3'>
                <input className='form-control' type='text' name='name' required />
              </div>
            </div>
            <div className='col text-left'>
              <h6 className='modal-title' id='exampleModalLabel'>
                Last Name<small style={{ color: 'red' }}>*</small>
              </h6>
              <div className='form-group mb-3'>
                <input className='form-control' type='text' name='code' />
              </div>
            </div>
          </div>
          <h6 className='modal-title' id='exampleModalLabel'>
            Which Most Closely Matches your Title?
            <small style={{ color: 'red' }}>*</small>
          </h6>
          <div className='form-group mb-3'>
            <select className='form-control select' name='type' id='type' required>
              <option value='' disabled selected>
                Please select
              </option>
              {roleTypes.map(item => {
                return <option value={item}>{item}</option>;
              })}
              ;
            </select>
          </div>
          <div class='row'>
            <div className='col text-left'>
              <h6 className='modal-title' id='exampleModalLabel'>
                Business Email<small style={{ color: 'red' }}>*</small>
              </h6>
              <div className='form-group mb-3'>
                <input className='form-control' type='text' name='name' required />
              </div>
            </div>
            <div className='col text-left'>
              <h6 className='modal-title' id='exampleModalLabel'>
                Phone Number<small style={{ color: 'red' }}>*</small>
              </h6>
              <div className='form-group mb-3'>
                <input className='form-control' type='text' name='code' />
              </div>
            </div>
          </div>
          <h6 className='modal-title' id='exampleModalLabel'>
            Company Name<small style={{ color: 'red' }}>*</small>
          </h6>
          <div className='form-group mb-3'>
            <input className='form-control' type='text' name='name' required />
          </div>
          <h6 className='modal-title' id='exampleModalLabel'>
            How did you hear about Tagpros?
          </h6>
          <div className='form-group mb-3'>
            <textarea className='form-control text-area' name='help' type={'text'} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowRequestDemo(false)}>
            Cancel
          </Button>
          <Button className='btn btn-primary'>Submit</Button>
        </Modal.Footer>
      </Modal>
      <FirstOverflowSection pageProps={{ withNavBar: true }}>
        <FirstSection>
          <h1>
            <b>Managing Teacher Shortage in a Sustainable way</b>
          </h1>

          <Link to='/' onClick={toggleOnShowRequestDemo}>
            <button type='button' class='btn btn-warning btn-lg'>
              <b>Request a demo</b>
            </button>
          </Link>
        </FirstSection>
      </FirstOverflowSection>
      <Page>
        <SecondSection>
          <div className=' col-xs-12 col-find text-center h-100'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image' src='./img/leader1.png' />
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <h3>Matching made easy.</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>
                Our AI technology determines not the best, but the right match for your
                institution’s leadership, culture, and student population.
              </p>
            </div>
          </div>
          <div className=' col-xs-12 col-find text-center'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image' src='../img/leader2.png' />
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <h3>Minimize attrition.</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>
                Teachers and institutions get to know each other through our video-chat
                technology while collaborating in numerous class walkthroughs and endless
                exchanges.
              </p>
            </div>
          </div>
          <div className=' col-xs-12 col-find text-center'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image teacher3' src='./img/leader3.png' />
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <h3>Time saving.</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>
                Instead of flying to the Philippines, get to know and meet the brightest
                teachers; and witness live their teaching and class management skills in
                the comfort of your own home and office.
              </p>
            </div>
          </div>
        </SecondSection>
      </Page>
      <SecondOverflowSection>
        <ThirdSection>
          <h1>
            Tagpros and Schools in Texas is rolling out an experimental Pilot Program!
          </h1>
          <p>
            <i>
              School Leaders, HR practitioners, and licensure personnel will be assessing
              Teachers via Live classes observation and professional evaluation for
              inclusion in their respective teaching pipelines.
            </i>
          </p>
        </ThirdSection>
      </SecondOverflowSection>
      <Page>
        <Section className='pb-0'>
          <ParticipatingSchoolDistricts title={<h3>Participating institutions</h3>} />
        </Section>
        <Section className='pt-0'>
          <Requirements>
            {[
              {
                title: `Pay`,
                description: '$31,000 - $75,000 per year',
                icon: 'fa fa-credit-card fa-lg icon-teacher'
              },
              {
                title: `Country`,
                description: 'State of Texas, USA',
                icon: 'fa fa-map-marker fa-lg icon-teacher'
              },
              {
                title: `Term of Employment`,
                description: '10 months, unless otherwise specified.',
                icon: 'fa fa-hourglass fa-lg icon-teacher'
              },
              {
                title: `
                Evaluation
                  `,
                description: `
                  Performance will be evaluated in accordance to guidelines specified by the school board of host school district.
                  `,
                icon: 'fa fa-file fa-lg icon-teacher'
              },
              {
                title: `
                Work Hours
                  `,
                icon: 'fa fa-clock-o fa-lg icon-teacher',
                description: `
Varies based on school schedule. Based on a standard 40 hr work week, but additional hours may be required.
                `
              }
            ].map(({ icon, title, description }) => (
              <Requirement
                key={title}
                title={title}
                icon={icon}
                description={description}
              />
            ))}
          </Requirements>
        </Section>
      </Page>
      <ThirdOverflowSection>
        <Section>
          <div className='row rowfind justify-content-xl-center'>
            <div className='col-xl-4 col-xs-12 col-find text-left'>
              <h2 className='request-demo-text'>HR and School Leaders:</h2>
              <h1 className='request-demo-text'>
                Do You want to Observe and Get to Know Our Teachers?
              </h1>
              <button
                type='button'
                class='btn btn-info'
                onClick={() => setShowRequestDemo(true)}
              >
                Request a Demo
              </button>
            </div>
            <div className='col-xl-4 col-xs-12 col-find text-center'>
              <img alt='img' src='./img/working.png' />
            </div>
          </div>
        </Section>
      </ThirdOverflowSection>
      <Page withFooter withSubscribeToYoutubeBanner>
        <Section>
          <LastActionLink link={'/register?type=SCHOOL_LEADER'} label='Interested?' buttonText='Sign up now!' />
        </Section>
      </Page>
    </Fragment>
  );
}
