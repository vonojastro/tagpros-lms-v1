import { Link } from 'react-router-dom';

import styles from 'css/new-age.scoped.css';
import styled from 'styled-components';
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
const SubscribeToYoutubeBanner = () => {
  return (
    <section id='subscribe' className={styles}>
      <div className='cta-content'>
        <FlexContainer className='container-fluid'>
          <div
            className='col-lg-5 offset-lg-1 p-5 wow fadeInleft'
            data-wow-delay='0.1s'
            style={{
              backgroundColor: '#F6DA27',
              backgroundImage: 'url("img/school_whiteboard.webp")'
            }}
          >
            <h3>
              <a
                href='https://www.youtube.com/c/TagprosEducation/'
                target='_blank'
                rel='noreferrer'
                style={{ color: 'red' }}
              >
                <i className='fab fa-youtube' style={{ fontSize: '1.6em' }} />
              </a>
              <br />
              Subscribe to our Youtube Channel!
            </h3>
            <span>Tagpros Education on Youtube</span>
            <p className='my-3'>
              <Link to='/register'>
                <a
                  href='#!'
                  className='btn btn-primary-shoprize scrollto js-scroll-trigger'
                  data-toggle='modal'
                  data-target='#modalteach'
                >
                  Sign Up Now!
                </a>
              </Link>
            </p>
          </div>
          <div
            className='col-lg-5 wow fadeInRight m-0 p-0 subscribe-img'
            data-wow-delay='0.1s'
          />
        </FlexContainer>
      </div>
    </section>
  );
};
export default SubscribeToYoutubeBanner;
