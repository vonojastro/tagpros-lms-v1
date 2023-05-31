import OverflowSection from 'components/Page/OverflowSection';
import Section from 'components/Page/Section';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SecondSection = styled(Section)`
  #links {
    @media (max-width: 530px) {
      display: grid;
      gap: 0 20px;
      grid-template-columns: 1fr 1fr 1fr;
      > *:nth-child(2),
      > *:nth-child(3) {
        grid-column: 1;
      }
      > *:nth-child(4),
      > *:nth-child(5) {
        grid-column: 2/4;
      }
      > *:nth-child(4) {
        grid-row: 1 / 1;
      }
      > *:nth-child(5) {
        grid-row: 2 / 2;
      }
    }
  }
  padding: 1rem 0;
  align-items: center;
  display: flex;
  color: white !important;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    > div:first-child {
      margin-bottom: 1rem;
      justify-content: center;
    }
  }

  > *:first-child {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    text-transform: uppercase;
    justify-content: flex-start;
    > a > * {
      font-style: bold;
      white-space: nowrap;
      color: white !important;
      margin-bottom: 0;
    }
  }
  > *:last-child,
  p {
    text-align: center;
    margin: 0 auto;
    padding: 0;
  }
`;
const FirstSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: right;
  img {
    object-fit: contain;
  }
  h4 {
    color: white !important;
  }
  padding: 2rem 0;
  > *:nth-child(2) {
    text-align: right;
  }
  #icon {
    display: none;
  }

  @media (max-width: 450px) {
    margin-bottom: 155px !important;
  }

  @media (max-width: 650px) {
    margin-bottom: 120px !important;
    #logo {
      display: none;
    }
    #icon {
      display: block;
      flex-shrink: 1;
      margin-right: 1rem;
    }
  }

  @media (max-width: 750px) {
    margin-bottom: 120px !important;
  }

  @media (max-width: 950px) {
    margin-bottom: 95px;
  }

  @media (max-width: 1180px) {
    margin-bottom: 80px;
  }
`;
const links = [
  { to: '/learn-more/teacher', label: 'TEACH' },
  { to: '/learn-more/learner', label: 'LEARN' },
  { to: '/learn-more/school-leader', label: 'OBSERVE' },
  { to: '/learn-more/about-us', label: 'ABOUT US' },
  { to: '/contact-us', label: 'CONTACT US' },
  { to: '/support-and-policies', label: 'SUPPORT & POLICIES' }
];

const dashLinks = [
  { to: '/learn-more/about-us', label: 'ABOUT US' },
  { to: '/contact-us', label: 'CONTACT US' },
  { to: '/support-and-policies', label: 'SUPPORT & POLICIES' }
];
export default function Footer({ className, type }) {
  return (
    <Fragment>
      {type === 'dash' ? (
        <OverflowSection
          wrapperProps={{
            style: {
              backgroundColor: 'black',
              position: 'fixed',
              bottom: '0',
              left: '0',
              right: '0',
              zIndex: '1000'
            }
          }}
        >
          <SecondSection>
            <div id='links'>
              {links.map(({ to, label }) =>
                label !== 'TEACH' && label !== 'LEARN' && label !== 'OBSERVE' ? (
                  <Link to={to} key={to} className='mr-3'>
                    <h4>{label}</h4>
                  </Link>
                ) : (
                  ''
                )
              )}
            </div>
            <p>© Tagpros Education 2021. All Rights Reserved.</p>
          </SecondSection>
        </OverflowSection>
      ) : (
        <>
          <OverflowSection
            wrapperProps={{
              style: { backgroundColor: 'rgb(0, 171, 219)', marginBottom: '50px' }
            }}
            className={className}
          >
            <FirstSection as='footer'>
              <img alt='img' id='logo' src='img/tagpros-logo-small.webp' />
              <img alt='img' id='icon' src='./assets/images/logo-icon.webp' />
              <div>
                <h4>
                  <b>Like, Follow &amp; Subscribe!</b>
                </h4>
                <a
                  href='https://www.facebook.com/TagprosOfficial'
                  target='_blank'
                  rel='noreferrer'
                  style={{ color: 'white' }}
                >
                  <i
                    className='fab fa-facebook-square mr-3'
                    style={{ fontSize: '1.6em' }}
                  />
                </a>
                <a
                  href='https://www.linkedin.com/company/40834971/'
                  target='_blank'
                  rel='noreferrer'
                  style={{ color: 'white' }}
                >
                  <i className='fab fa-linkedin mr-3' style={{ fontSize: '1.6em' }} />
                </a>
                <a
                  href='https://twitter.com/TagprosOfficial'
                  target='_blank'
                  rel='noreferrer'
                  style={{ color: 'white' }}
                >
                  <i className='fab fa-twitter mr-3' style={{ fontSize: '1.6em' }} />
                </a>
                <a
                  href='https://www.youtube.com/c/TagprosEducation/'
                  target='_blank'
                  rel='noreferrer'
                  style={{ color: 'white' }}
                >
                  <i className='fab fa-youtube' style={{ fontSize: '1.6em' }} />
                </a>
              </div>
            </FirstSection>
          </OverflowSection>

          <OverflowSection
            wrapperProps={{
              style: {
                backgroundColor: 'black',
                position: 'fixed',
                bottom: '0',
                left: '0',
                right: '0',
                zIndex: '1000'
              }
            }}
          >
            <SecondSection>
              <div id='links'>
                {type === 'dash'
                  ? dashLinks.map(({ to, label }) => (
                      <Link to={to} key={to} className='mr-3'>
                        <h4>{label}</h4>
                      </Link>
                    ))
                  : links.map(({ to, label }) => (
                      <Link to={to} key={to} className='mr-3'>
                        <h4>{label}</h4>
                      </Link>
                    ))}
              </div>
              <p>© Tagpros Education 2021. All Rights Reserved.</p>
            </SecondSection>
          </OverflowSection>
        </>
      )}
    </Fragment>
  );
}
