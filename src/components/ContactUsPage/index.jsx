import React, { Fragment } from 'react';
import styled from 'styled-components';
import useFreshdeskHelpWidget from 'hooks/use-freshdesk-help-widget';
import 'css/new-age.scoped.css';
import Page from 'components/Page';
import Section from 'components/Page/Section';
import { FirstOverflowSection, FirstSection } from './styles';

const Container = styled.div`
  > *:first-child {
    white-space: pre-line !important;
    align-self: flex-start;
    margin-bottom: 2rem;
  }
  h5 {
    font-size: unset !important;
  }
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  color: black;
  min-height: 60vh;
  padding: 0.5rem;
  // justify-content: center;
  align-items: center;
  grid-auto-rows: min-content;
  margin-bottom: 10%;
  // background-image: url(img/petr-machacek-BeVGrXEktIk-unsplash.jpeg);
  section {
    max-width: 930px;
    width: 100%;
  }
  > section:first-child {
    display: grid;
    gap: 1em;
    > h1 {
      font-weight: bold !important;
      color: #406be5;
      font-size: 5em;
    }
    > p,
    h4,
    h3 {
      margin-left: 1%;
      margin-top: 1%;
      white-space: pre-line;
    }
  }

  .contact-info {
    padding: 2em;
    background-color: #d9d9d9;
    border-radius: 12px;
    display: grid;
    gap: 2em;
    white-space: pre-line;
    grid-template-rows: auto 1fr auto;
  }

  .contact-info h2 {
    font-weight: bold;
  }

  .form {
    padding: 1em;
  }
  .contact-details {
    display: grid;
    gap: 1em;
    grid-template-rows: repeat(min-content);
  }
  .social-media-links {
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(auto-fill, minmax(1em, 1fr));
    direction: rtl;
    align-items: flex-end;
  }
`;

const ContactDetail = styled.div`
  display: grid;
  grid-template-columns: 1em auto;
  align-items: center;
  font-size: 1.1rem;
  gap: 0.5rem;
  margin-left: 5%;
  .fas,
  .fab {
    color: ${props => props.color || 'gray'};
    display: grid;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
  }

  div:nth-child(2) {
    color: black;
    margin-left: 0.5em;
  }
  li {
  }
`;

export default function ContactUsPage() {
  // const introTextPrimary = `Contact Us`;
  const introTextSecondary = `We love questions and feedback - and we're always happy to help! \n\nHere are some ways to contact us:`;
  const officeAddress = `UPSCALE Room 302, Juinio Hall National Engineering Center Agoncillo corner Osmeña Streets University of the Philippines 1101 Diliman, Quezon City`;
  const supportEmail = `customercare@tagpros.us`;
  const contactInformationTextPrimary = 'Contact Information';
  const businessHours = `Business Hours: 9:00AM to 5:00PM PHT (Excluding Weekends and Holidays)`;
  useFreshdeskHelpWidget();

  const socialMediaLinks = [
    {
      href: 'https://www.youtube.com/c/TagprosEducation/',
      className: 'fab fa-youtube',
      color: '#FF0000'
    },
    {
      href: 'https://twitter.com/TagprosOfficial',
      className: 'fab fa-twitter',
      color: '#1DA1F2'
    },
    {
      href: 'https://www.linkedin.com/company/40834971',
      className: 'fab fa-linkedin',
      color: '#4267B2'
    },
    {
      href: 'https://www.facebook.com/TagprosOfficial',
      className: 'fab fa-facebook-f',
      color: '#4267B2'
    }
  ];
  const contactDetails = [
    { className: 'fas fa-envelope', label: supportEmail },
    { className: 'fas fa-map-pin', label: officeAddress },
    { className: 'fas fa-business-time', label: businessHours },
  ];

  return (
    <Fragment>
      <FirstOverflowSection pageProps={{ withNavBar: true }}>
        <FirstSection>
          <h1>
            <b>Contact Us</b>
          </h1>
        </FirstSection>
      </FirstOverflowSection>
      <Page withFooter withSubscribeToYoutubeBanner>
        <Section className='p-0'>
          <Container>
            <h5>{introTextSecondary}</h5>
            <div className='contact-info'>
              <div>
                <h5>{contactInformationTextPrimary}</h5>
              </div>
              <div className='contact-details'>
                {contactDetails.map(({ className, label }) => (
                  <ContactDetail key={label}>
                    <i className={className} />
                    <div>{label}</div>
                  </ContactDetail>
                ))}
              </div>
              <div className='social-media-links'>
                {socialMediaLinks.map(({ href, className, color }) => (
                  <a key={href} href={href} target='_blank' rel='noreferrer'>
                    <ContactDetail color={color}>
                      <i className={className} />
                    </ContactDetail>
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </Page>
    </Fragment>
    // <Page withFooter withNavBar withSubscribeToYoutubeBanner>
    // </Page>
  );
}
