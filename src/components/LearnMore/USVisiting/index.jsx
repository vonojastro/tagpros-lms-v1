/* eslint-disable jsx-a11y/alt-text */
import Page from 'components/Page';
import 'css/new-age.scoped.css';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './index.css';
import {
  Detail,
  Details,
  FirstOverflowSection,
  FirstSection,
  SecondSection
} from './styles';
const H2 = styled.h2`
  font-size: 2rem !important;
  text-align: center;
`;
export const LastActionLink = ({
  label = 'What are you waiting for?',
  buttonText = 'Join Now!',
  link
}) => {
  return (
    <Fragment>
      <div className='mb-5 mt-5 d-flex justify-content-center align-items-center'>
        <div className='border' />
      </div>
      <div className='mt-5 pb-5 ml-2 d-flex justify-content-center align-items-center flex-column'>
        <H2>{label}</H2>
        <Link
          // to='/register'
          to={!!link && link.length > 0? link : '/register'}
          className='text-light p-3 rounded-sm'
          style={{ backgroundColor: 'orange' }}
        >
          <H2 className='m-0'>{buttonText}</H2>
        </Link>
      </div>
    </Fragment>
  );
};
const details = [
  {
    imgProps: {
      src: './img/ibrahim-boran-3ijHgGTSDi8-unsplash.jpeg',
      alt: 'cost'
    },
    labelProps: {
      className: 'hero-action rounded-sm',
      children: `
              The cost is roughly between USD 8K to USD 12K dollars for a three year stint
              which will be paid directly to a visa provider affiliated with the US State
              Department. If your preference is only for a year, then ⅓ of the cost
              mentioned above should be provided. Our participating school districts may
              or may not shoulder the entire cost of the program. Some of them will be
              willing to share via 50/50 split, but others will let you shoulder the
              entire program or some part of the visa and other documentation expenses.
        `
    }
  },
  {
    imgProps: {
      src: './img/headway-5QgIuuBxKwM-unsplash.jpeg',
      alt: 'follow-up'
    },
    labelProps: {
      className: 'cost-blue rounded-sm',
      children: `
                School district representatives will directly inform you
                through email the next steps once you are provided an offer to join their teacher visiting corps.
                Moreover, we would like to again reiterate that Tagpros is a mere conduit  to connect you with
                Texas school districts, and not, in any way, involved with the BridgeUSA program.  
        `
    },
    parentProps: {
      reverse: true
    }
  }
];

export default function USVisitingProgram() {
  return (
    <Fragment>
      <FirstOverflowSection pageProps={{ withNavBar: true }}>
        <FirstSection>
          <h1>
            <b>US Visiting Program</b>
          </h1>
        </FirstSection>
      </FirstOverflowSection>
      <Page withFooter withSubscribeToYoutubeBanner>
        <SecondSection>
          <div className='shadow-sm'>
            <img alt='img' src='./img/thought-catalog-xHaZ5BW9AY0-unsplash.png' />
          </div>
          <div>
            <p className='text-justify'>
              Tagpros is currently engaged in a Pilot Program with the Texas Education
              Agency. Our project charter’s intent is to share with Texas school leaders,
              principals, and department chairs international educators’ classroom
              experience, teaching skills, and online live classroom best practice(s) to
              provide highly qualified participants for the US Teacher Exchange Program.
            </p>
          </div>
        </SecondSection>
        <div>
          <div className='ml-2 d-flex justify-content-center align-items-center'>
            <h1>The US Visiting Teacher Program</h1>
          </div>
          <div className='ml-5 pb-5 d-flex justify-content-center align-items-center'>
            <div className='blue-accent-line ' />
          </div>

          <Details>
            {details.map(({ imgProps, labelProps, parentProps }) => (
              <Detail key={imgProps.src} {...parentProps}>
                <div>
                  <img {...imgProps} />
                </div>
                <p {...labelProps} />
              </Detail>
            ))}
          </Details>

          <LastActionLink />
        </div>
      </Page>
    </Fragment>
  );
}
