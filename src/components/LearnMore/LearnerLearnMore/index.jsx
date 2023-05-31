import 'css/new-age.scoped.css';
import { Fragment } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

import { FirstOverflowSection, SecondSection } from './styles';
import { FirstSection } from '../TeacherLearnMore/styles';
import Page from 'components/Page';
import Section from 'components/Page/Section';
import { LastActionLink } from '../USVisiting';

export default function LearnerLearnMore() {

  return (
    <Fragment>
      <FirstOverflowSection pageProps={{ withNavBar: true }}>
        <FirstSection>
          <h1>
            <b>Try One-on-One Learning!</b>
          </h1>

          <Link to='/register?type=LEARNER'>
            <button type='button' class='btn btn-warning btn-lg'>
              <b>Sign up and learn</b>
            </button>
          </Link>
        </FirstSection>
      </FirstOverflowSection>
      <Page>
        <SecondSection>
          <div className='col-find text-center'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image' src='./img/learner1.png' />
            </div>{' '}
            <div className='row mr-2 ml-2 d-flex align-items-center justify-content-center text-justify'>
              <h3>Any kid, Any Interest</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>
                Tagpros engages and inspires learning through a wide variety of classes
                and subjects so learners can dive deeper into their favorite interests.
              </p>
            </div>
          </div>
          <div className=' col-xs-12 col-find text-center'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image' src='../img/learner2.png' />
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <h3>Small and Social</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>
                Our Live, small-group format encourages social interactions and builds
                learner friendships.
              </p>
            </div>
          </div>
          <div className=' col-xs-12 col-find text-center'>
            <div className='row d-flex align-items-center justify-content-center'>
              <img alt='img' className='header-image teacher3' src='./img/learner3.png' />
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <h3>Educators You can Trust</h3>
            </div>
            <div className='row ml-2 mr-2 d-flex align-items-center justify-content-center'>
              <p>
                We've Been Providing online classes taught by safe, vetted, and
                experienced teachers.
              </p>
            </div>
          </div>
        </SecondSection>
      </Page>
      <Page withFooter withSubscribeToYoutubeBanner>
        <Section>
          <LastActionLink link={'/register?type=LEARNER'} label='Want to become a learner' buttonText='Sign up now!' />
        </Section>
      </Page>
    </Fragment>
  );
}
