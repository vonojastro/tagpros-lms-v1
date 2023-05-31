import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/actions/auth';
// import { getAllActiveClasses } from 'api/class';
import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';

import 'css/new-age.scoped.css';
import useFreshdeskHelpWidget from 'hooks/use-freshdesk-help-widget';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Page from 'components/Page';
import Section from 'components/Page/Section';

import OverflowSection from 'components/Page/OverflowSection';
import C from 'react-slick';
import { ArrowRight } from 'react-feather';
import { ClassDetails } from './styles';
import SearchClassesInput from 'components/common/SearchClassesInput';
import dayjs from 'dayjs';

import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

import './styles.css';
import Slider from 'react-slick';
import { getAllActiveClasses } from 'api/class';

const compareStartDate = (a, b) => {
  let valA = dayjs(new Date()).diff(dayjs(a), 'day');
  let valB = dayjs(new Date()).diff(dayjs(b), 'day');
  valA *= valA >= 0 ? 1 : -1;
  valB *= valB >= 0 ? 1 : -1;
  return valA - valB;
};
export const compareStatusDisplay = (a, b) => {
  const ref = [
    'CLASS_ONGOING',
    'ONGOING_ENROLLMENT',
    'NOT_STARTED',
    'OPENS_SOON',
    'CLASS_ENDED'
  ];
  const val = (ref.indexOf(a?.statusDisplay) || 0) - (ref.indexOf(b?.statusDisplay) || 0);
  try {
    if (val === 0) {
      return compareStartDate(new Date(a.startDate), new Date(b.startDate));
    }
  } catch (error) {
    return val;
  } finally {
    return val;
  }
};
export const AvailableClasses = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  > * {
    display: grid;
    grid-template-rows: 10rem min-content;
    gap: 0.5rem;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
    > div:nth-child(2) {
      padding-inline: 0.5rem;
      display: grid;
      grid-template-rows: min-content min-content min-content;
      grid-template-columns: min-content auto;
      > *:first-child {
        grid-column: 1 / -1;
      }
      align-items: center;
      gap: 0.6rem;
      h5,
      p {
        margin: 0;
      }
      img {
        border-radius: 999px;
        height: 2rem;
        width: 2rem;
      }
    }
  }
`;
const ArrowedLinkWrapper = styled(Link)`
  display: grid;
  gap: 0.2rem;
  grid-template-columns: max-content auto;
  align-items: center;
`;
const ArrowedLink = ({ label, ...linkProps }) => {
  return (
    <ArrowedLinkWrapper {...linkProps}>
      {label}
      <ArrowRight />
    </ArrowedLinkWrapper>
  );
};
const SearchClassesInputContainer = styled.div`
  margin-bottom: 2rem;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-template-columns: min-content;
  color: ${({ inputTextColor = 'white' }) => inputTextColor} !important;
  gap: 0.5rem;
  // css change input placeholder color to white
  input {
    ::placeholder {
      color: ${({ inputPlaceholderColor = 'white' }) => inputPlaceholderColor} !important;
    }
    :focus {
      background-image: ${({
        inputBottomBorderColor = `
      linear-gradient(
        90deg,
        rgba(228, 227, 232, 1) 0%,
        rgba(255, 255, 255, 1) 51%,
        rgba(231, 238, 240, 1) 100%
      ) !important;
      `
      }) => inputBottomBorderColor};
    }
    color: ${({ inputTextColor = 'white' }) => inputTextColor} !important;
  }
`;
const Carousel = styled(C)`
  height: 100%;
  width: 100%;
  .slick-track {
    display: flex;
    align-items: center;
    > * {
      margin-inline: 0.5rem;
    }
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const SubjectItemContainer = styled.div`
  color: white !important;
  display: grid;
  justify-content: center !important;
  align-items: center;
  width: 100%;
  gap: 1rem;
  > h6 {
    text-align: center;
  }
`;

const IMAGE_MAX_HEIGHT = '20rem';
const schoolDistricts = [
  { src: './img/schoolDistricts/schoolsLogo01.webp' },
  { src: './img/schoolDistricts/schoolsLogo02.webp' },
  { src: './img/schoolDistricts/schoolsLogo03.webp' },
  { src: './img/schoolDistricts/schoolsLogo04.webp' },
  { src: './img/schoolDistricts/schoolsLogo05.webp' },
  { src: './img/schoolDistricts/schoolsLogo06.webp' },
  {
    src: './img/schoolDistricts/schoolsLogo07.webp'
  },
  {
    src: './img/schoolDistricts/schoolsLogo08.webp'
  },
  {
    src: './img/schoolDistricts/schoolsLogo09.webp'
  },
  {
    src: './img/schoolDistricts/schoolsLogo10.webp'
  },
  {
    src: './img/schoolDistricts/schoolsLogo11.webp'
  },
  { src: './img/schoolDistricts/schoolsLogo12.webp' },
  { src: './img/schoolDistricts/schoolsLogo13.webp' },
  { src: './img/schoolDistricts/schoolsLogo14.webp' },
  { src: './img/schoolDistricts/schoolsLogo15.webp' },
  { src: './img/schoolDistricts/schoolsLogo16.webp' },
  { src: './img/schoolDistricts/schoolsLogo17.webp' }
];

function BlackNextArrow({ onClick }) {
  return (
    <div onClick={onClick} className='arrow-black arrow-right'>
      <IoIosArrowForward />
    </div>
  );
}

function BlackPrevArrow({ onClick }) {
  return (
    <div onClick={onClick} className='arrow-black arrow-left'>
      <IoIosArrowBack />
    </div>
  );
}

function WhiteNextArrow({ onClick }) {
  return (
    <div onClick={onClick} className='arrow-white arrow-right'>
      <IoIosArrowForward />
    </div>
  );
}

function WhitePrevArrow({ onClick }) {
  return (
    <div onClick={onClick} className='arrow-white arrow-left'>
      <IoIosArrowBack />
    </div>
  );
}

const schooldistrictSettings = {
  className: 'center',
  centerPadding: '60px',
  slidesToShow: 5,
  infinite: false,
  swipeToSlide: true,
  nextArrow: <BlackNextArrow />,
  prevArrow: <BlackPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const passionSettings = {
  className: 'center',
  centerPadding: '60px',
  slidesToShow: 5,
  swipeToSlide: true,
  infinite: false,
  nextArrow: <WhiteNextArrow />,
  prevArrow: <WhitePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const teacherSettings = {
  className: 'center',
  centerPadding: '60px',
  slidesToShow: 4,
  swipeToSlide: true,
  infinite: false,
  nextArrow: <BlackNextArrow />,
  prevArrow: <BlackPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const schoolTeachers = [
  {
    teacherName: 'Joselle Salvador',
    img: './img/pion01.webp',
    imgD: './img/teachers/pion01.webp',
    ytLink: 'https://www.youtube.com/watch?v=0WDyS0axr50&t=1533s',
    passion: 'Art, Technology'
  },
  {
    teacherName: 'Luis Pelea',
    img: './img/pion02.webp',
    imgD: './img/teachers/pion02.webp',
    ytLink:
      'https://www.youtube.com/watch?v=daOXPeYP6rA&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=2',
    passion: 'Music'
  },
  {
    teacherName: 'Dominic Sales',
    img: './img/pion03.webp',
    imgD: './img/teachers/pion03.webp',
    ytLink:
      'https://www.youtube.com/watch?v=2PC7krwoOeU&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=6',
    passion: 'Robotics'
  },
  {
    teacherName: 'Nico Fos',
    img: './img/pion04.webp',
    imgD: './img/teachers/pion04.webp',
    ytLink:
      'https://www.youtube.com/watch?v=vPOoMoM1xGk&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=5',
    passion: 'Filipino'
  },
  {
    teacherName: 'JP Viernes',
    img: './img/pion05.webp',
    imgD: './img/teachers/pion05.webp',
    ytLink:
      'https://www.youtube.com/watch?v=uavO66LvpJA&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=1',
    passion: 'Creative Learning'
  },
  {
    teacherName: 'Joyce Zerda',
    img: './img/pion06.webp',
    imgD: './img/teachers/pion06.webp',
    ytLink:
      'https://www.youtube.com/watch?v=ffGZC3bAQAU&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=3',
    passion: 'Art, Augmented Reality'
  },
  {
    teacherName: 'Lea Abarentos',
    img: './img/pion07.webp',
    imgD: './img/teachers/pion07.webp',
    ytLink:
      'https://www.youtube.com/watch?v=gZOEql9640A&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=4',
    passion: 'Coding, Design'
  },
  {
    teacherName: 'Ivy Enaje',
    img: './img/pion08.webp',
    imgD: './img/teachers/pion08.webp',
    ytLink:
      'https://www.youtube.com/watch?v=xcMzCt0c_lk&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=8',
    passion: 'Filipino'
  }
];

const RegisterLinkWrapper = styled(Link)`
  display: grid;
  gap: 0.5rem;
  color: black !important;
  img {
    width: 100%;
  }
  h3 {
    margin-bottom: 0;
  }
  > div:nth-child(2) {
    display: grid;
    gap: 0.5rem;
    grid-auto-flow: column;
    align-items: center;
    > *:nth-child(2) {
      display: block;
      margin-left: auto;
    }
  }
`;
export const RequirementWrapper = styled.div`
  display: grid;
  align-items: start;
  justify-content: center;
  gap: 2rem;
  grid-template-rows: 2rem 2rem;
  text-align: center;
  i {
    height: min-content;
    font-size: 64px;
  }
`;
export const Requirement = ({ icon, title, className, description }) => {
  return (
    <RequirementWrapper className={className}>
      <i className={icon} />
      <h6>{title}</h6>
      {description && <p>{description}</p>}
    </RequirementWrapper>
  );
};

const RegisterLink = ({ linkProps, title, icon, imgProps, buttonBackgroundColor }) => {
  return (
    <RegisterLinkWrapper {...linkProps}>
      <img alt={title} {...imgProps} className='w-100 h-100' />
      <div
        style={{
          padding: '0.7rem',
          boxShadow: '6px 6px #ccc',
          backgroundColor: buttonBackgroundColor
        }}
      >
        <h3>{title}</h3>
        <i className={icon} aria-hidden='true' />
      </div>
    </RegisterLinkWrapper>
  );
};
const RegisterLinks = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column: 1 / -1;
  gap: 1rem;
  padding: 0 !important;
  @media (max-width: 500px) {
    > * {
      grid-column: 1 / -1;
    }
  }
`;
const SeventhSection = styled(Section)`
  > *:first-child {
    margin-bottom: 4rem;
  }
  a {
    color: black !important;
    text-decoration: underline;
  }
`;

const SixthSection = styled(Section)`
  display: grid;
  align-items: center;
  gap: 2rem;
  > *:first-child {
    grid-column: 1 / -1;
  }
  > div:nth-child(3) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1rem;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    h3 {
      padding: 0 !important;
    }
    > * {
      gap: 1rem;
      display: grid;
      grid-template-rows: min-content auto;
      > *:nth-child(2) {
        display: grid;
        > *:nth-child(2) {
          align-self: flex-start;
        }
        > *:last-child {
          align-self: flex-end;
        }
      }
    }
  }
`;

const FifthSection = styled(Section)`
  > *:first-child {
    margin-bottom: 4rem;
    color: white !important;
  }
  a {
    color: white !important;
    text-decoration: underline;
  }
`;

const FourthSection = styled(Section)`
  > *:first-child {
    margin-bottom: 4rem;
    text-align: center;
    text-transform: uppercase;
  }
  /* display: grid;
  align-items: center;
  height: 20rem;
  gap: 2rem;
  > *:first-child {
    grid-column: 1 / -1;
  }
  grid-template-rows: min-content min-content; */
`;
const ThirdSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  margin-bottom: 5rem;
  @media (max-width: 1154px) {
    > *:last-child {
      grid-column: 1 / -1;
    }
  }
`;
const SecondSection = styled(Section)`
  padding: 0 !important;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  > h3:first-child {
    grid-column: span 2;
  }
  > div:last-child {
    height: 100%;
    > img {
      object-fit: cover;
    }
  }
  a {
    color: #189099 !important;
    text-decoration: underline;
  }
  @media (max-width: 750px) {
    > *:last-child {
      display: none;
    }
    > p:first-child {
      grid-column: 1 / -1;
    }
    padding: 2rem 0 !important;
  }
`;

const FirstSection = styled(Section)`
  padding-top: 0 !important;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(min-content);
  gap: 1rem;
  .form-recom {
    > div:first-child {
        display: flex;
        flex-wrap: wrap;
        max-width: 700px;
    }
  }

  > *:first-child {
    align-self: center;
    justify-self: center;
    text-align: center;
    flex-shrink: 0;
    grid-column: 1 / 3;
  }
  .hero-action {
    grid-column: 1 / 3;
    box-shadow: 6px 6px #ccc;
  }
  #parallax {
    display: none;
    // max-height: ${IMAGE_MAX_HEIGHT};
    // max-width: ${IMAGE_MAX_HEIGHT};
    grid-row: span 2;
    > img {
      object-fit: cover;
      object-position: center;

      // Overrides
      @media (min-width: 1200px) {
        position: static !important;
      }
    }
  }
  > div:last-child { 
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items:center;
    justify-content:center;
    width: 100%;
    grid-column: span 2;
    > *:nth-child(2) {
      background: yellow;
    }
  }
  @media (min-width: 1280px) {
    grid-template-columns: max-content auto;
    #parallax {
      display: block;
    }
    > *:first-child {
      grid-column: 1 / 2;
    }
    .hero-action {
      grid-column: 1 / 2;
    }
  }
`;

const Wrapper = styled.div``;

const getRandomNineClass = array => {
  if (!array?.length) return null;
  if (array.length <= 9) {
    return array;
  } else {
    let classArrayTemp = [];
    //
    let randNums = [];
    let randNum = 0;
    while (randNums.length < 9) {
      randNum = Math.floor(Math.random() * (array.length - 1));
      if (!randNums.includes(randNum)) {
        randNums.push(randNum);
      }
    }
    randNums.sort().forEach(item => {
      classArrayTemp.push(array[item]);
    });
    return classArrayTemp;
  }
};

export const ParticipatingSchoolDistricts = ({
  title = <h3>Participating School Districts</h3>
}) => {
  return (
    <FourthSection
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {title}
      <Carousel {...schooldistrictSettings} style={{ width: '100%' }}>
        {schoolDistricts.map(imgProps => (
          <img
            key={imgProps.src}
            {...imgProps}
            alt={imgProps.src}
            style={{ width: '100%' }}
          />
        ))}
      </Carousel>
    </FourthSection>
  );
};
export default function Landing() {
  useFreshdeskHelpWidget();
  const dispatch = useDispatch();
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  const classData = useSelector(state =>
    state.classes ? state.classes.getIn(['data', 'class']) : []
  );

  React.useEffect(() => {
    getAllActiveClasses(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [teachers] = useState([
  //   {
  //     name: 'Joselle Salvador',
  //     subjects: ['Art,', 'Technology'],
  //     src: './img/pion01.webp',
  //     href: 'https://www.youtube.com/watch?v=0WDyS0axr50&t=1533s'
  //   },
  //   {
  //     name: 'Luis Pele',
  //     subjects: ['Music'],
  //     src: './img/pion02.webp',
  //     href:
  //       'https://www.youtube.com/watch?v=daOXPeYP6rA&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=2'
  //   },
  //   {
  //     name: 'Dominic Sales',
  //     subjects: ['Robotics'],
  //     src: './img/pion03.webp',
  //     href:
  //       'https://www.youtube.com/watch?v=2PC7krwoOeU&list=PLZRpbnc528P-Q71YcSs3LXO02TBHeTcD9&index=6'
  //   },
  //   {
  //     name: 'Nico Fos',
  //     src: './img/pion04.webp'
  //   }
  // ]);
  const [subjects] = useState([
    {
      src: './img/subjects/find01.webp',
      title: 'Visual Arts'
    },
    {
      src: './img/subjects/find02.webp',
      title: 'Mathematics'
    },
    {
      src: './img/subjects/find03.webp',
      title: 'Science'
    },
    {
      src: './img/subjects/find04.webp',
      title: 'Cooking'
    },
    {
      src: './img/subjects/find05.webp',
      title: 'Technology'
    },
    {
      src: './img/subjects/find06.webp',
      title: 'Animation'
    },
    {
      src: './img/subjects/find07.webp',
      title: 'Creative Design'
    }
  ]);
  return (
    <Wrapper>
      <Modal
        size='m'
        show={showLogoutConfirmModal}
        backdrop='static'
        keyboard={false}
        onHide={() => {
          setShowLogoutConfirmModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to leave?</Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={() => {
              dispatch(logOut());
              setShowLogoutConfirmModal(false);
            }}
          >
            Yes
          </Button>
          <Button variant='secondary' onClick={() => setShowLogoutConfirmModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Helmet>
        <script src='vendor/jquery/jquery.min.js' />
        <script src='vendor/bootstrap/js/bootstrap.bundle.min.js' />
        <script src='vendor/jquery-easing/jquery.easing.min.js' />
        <script src='js/new-age.js' />
      </Helmet>
      {/* ========================================= FIND ========================================= */}
      {/* ========================================= FIND ========================================= */}
      {/* ========================================= FIND ========================================= */}
      <OverflowSection
        pageProps={{ withNavBar: true }}
        wrapperProps={{
          style: {
            backgroundImage: 'url(img/school_whiteboard.webp)'
          }
        }}
        navBarProps={{
          transparentOnTop: true
        }}
      >
        <FirstSection>
          <div>
            <h1>
              Teach Live Online Classes
              <br />
              Get noticed by US Schools.
            </h1>
            <p>Get a chance to become a visiting teacher in the United States!</p>
            <Link to='/register'>
              <button type='button' class='btn btn-warning'>
                Join Us Now!
              </button>
            </Link>
          </div>

          <div id='parallax'>
            <img alt='img' className='w-100 h-100' src='./img/heroImg/heroImg1.webp' />
          </div>
          <SearchClassesInput variant='hero' />

          <RegisterLinks>
            <RegisterLink
              linkProps={{ to: '/learn-more/teacher' }}
              title='Become a Teacher'
              icon='fa fa-play'
              imgProps={{
                src: './img/become01c.webp'
              }}
              buttonBackgroundColor={'#f57e20'}
            />
            <RegisterLink
              linkProps={{ to: '/learn-more/learner' }}
              title='Become a Learner'
              icon='fa fa-play'
              imgProps={{
                src: './img/become02c.webp'
              }}
              buttonBackgroundColor={'#7ac943'}
            />
            <div className='d-none'>
              <img alt='img' src='./img/become02c.webp' className='w-100 h-100' />
              <div className='become-a-learner'>
                <a href='/register'>
                  <h3>Become a Learner</h3>
                  <i
                    className='fa fa-play'
                    aria-hidden='true'
                    style={{ lineHeight: '33px' }}
                  />
                </a>
              </div>
            </div>
          </RegisterLinks>
        </FirstSection>
      </OverflowSection>
      <OverflowSection wrapperProps={{ className: 'hero-action' }}>
        <SecondSection>
          <p className='text-justify mb-0'>
            The Visiting Teachers’ Program, a pilot-project of Tagpros and{' '}
            <Link to='https://tea.texas.gov/' target={'_blank'} rel='noreferrer'>
              Texas Education Agency
            </Link>
            , invites Philippine Teachers to share with Texas school leaders, principals,
            and department chairs their online live classroom best practice(s) for the{' '}
            <Link to='/learn-more/US-visiting-program'>US Visiting Teachers Program</Link>
            . Participating Texas school districts will review your teacher's profile and
            will watch your recorded live classes here in Tagpros starting on April 2022.
            <br />
            <br />
            <ArrowedLink
              to={'/learn-more/US-visiting-program'}
              label={<h3 className='mb-0'>Learn more</h3>}
            />
          </p>
          <div>
            <img alt='img' src='../img/landing1r.webp' className='w-100 h-100' />
          </div>
        </SecondSection>
      </OverflowSection>
      <Page>
        <ThirdSection>
          {[
            {
              title: 'Minimum of two years full-time teaching experience',
              icon: 'fa fa-graduation-cap fa-lg icon-teacher'
            },
            {
              title:
                "Bachelor's degree or US equivalent in either education or any subject area.",
              icon: 'fa fa-book fa-lg icon-teacher'
            },

            {
              title:
                'Employed as a teacher at the primary or secondary level or seeking an advanced degree.',
              icon: 'fa fa-user fa-lg icon-teacher'
            }
          ].map(({ icon, title }) => (
            <Requirement key={title} title={title} icon={icon} />
          ))}
        </ThirdSection>

        <ParticipatingSchoolDistricts />
      </Page>
      <OverflowSection
        wrapperProps={{
          style: { backgroundColor: 'rgb(64, 107, 230)' }
        }}
      >
        <FifthSection>
          <h3>Find what you are passionate about.</h3>
          <SearchClassesInputContainer>
            <li className='fa fa-search' />
            <SearchClassesInput />
          </SearchClassesInputContainer>
          <Carousel {...passionSettings}>
            {subjects.map(imgProps => (
              <div>
                <SubjectItemContainer key={imgProps.src}>
                  <div className='zoom-img'>
                    <img
                      alt={imgProps.title}
                      {...imgProps}
                      id={imgProps.title}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <h6>{imgProps.title}</h6>
                </SubjectItemContainer>
              </div>
            ))}
          </Carousel>
          <ArrowedLink
            to={'/search?query='}
            target='_blank'
            rel='noreferrer'
            className='mt-4'
            label={<h3 className='mb-0'>Search for more subjects</h3>}
          />
        </FifthSection>
      </OverflowSection>
      <Page>
        <SixthSection>
          <h3>Pioneering Online Education Through Passion-based Learning</h3>
          <p>
            Find what you love. Learn what you love. Tagpros has thousands of teachers and
            educational videos all within a push of a button.
          </p>
          <div>
            {[
              {
                href: 'learn-more/teacher',
                src: './img/sec01.webp',
                srcD: './img/sections/sec01.webp',
                title: 'Teachers',
                body:
                  'Create engaging lessons and showcase your teaching skills as US School principals might one day visit your live class(es) and recruit you on the spot'
              },
              {
                href: 'learn-more/learner',
                src: './img/sec02.webp',
                srcD: './img/sections/sec02.webp',
                title: 'Learners',
                body:
                  'Our online program provides students with a platform to learn, practice, and maintain a portfolio of their work.'
              },
              {
                href: 'learn-more/school-leader',
                src: './img/sec03.webp',
                srcD: './img/sections/sec03.webp',
                title: 'US School Leaders',
                body:
                  "Observe our teachers' online classes just like any regular classroom visits. Join US school leaders who can access our community of thousands of educators for talent pool development and future prospects."
              }
            ].map(({ href, src, srcD, body, title }) => (
              <div key={href}>
                <div>
                  <picture>
                    <source media='(min-width: 1200px)' srcSet={srcD} />
                    <img alt='img' src={src} className='w-100 h-100' />
                  </picture>
                </div>
                <div>
                  <h3 className='pt-5'>{title} </h3>
                  <p className='text-justify'>{body}</p>
                  <h5>
                    <a href={href}>
                      Learn More <i className='fa fa-arrow-right' aria-hidden='true' />
                    </a>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </SixthSection>
      </Page>
      <OverflowSection
        wrapperProps={{
          style: { backgroundColor: '#f8d90f' }
        }}
      >
        <SeventhSection>
          <h3>Meet the Tagpros Teachers!</h3>

          <Slider {...teacherSettings}>
            {schoolTeachers.map((teacher, index) => (
              <div className='p-2' key={index}>
                <a
                  href={teacher.ytLink}
                  target='_blank'
                  rel='noreferrer'
                  data-toggle='#'
                  data-target='#'
                >
                  <div className='zoom-img'>
                    <picture>
                      <source media='(min-width: 1200px)' srcSet={teacher.imgD} />
                      <img src={teacher.img} alt='teacher' className='w-100 h-100' />
                    </picture>
                  </div>
                  <h5 className='pt-4 pb-0'>{teacher.teacherName}</h5>
                </a>

                <p className='my-2'>is passionate about</p>
                <h5>{teacher.passion}</h5>
              </div>
            ))}
          </Slider>
        </SeventhSection>
      </OverflowSection>
      <Page withFooter={true} withSubscribeToYoutubeBanner>
        <Section>
          <h4>Find the best online classes</h4>
          <p>
            Find the best online classes for kids 18 and under, guided by talented and
            gifted professional educators.
          </p>
          <SearchClassesInputContainer
            inputPlaceholderColor='gray'
            inputTextColor='black'
            inputBottomBorderColor='black'
          >
            <li className='fa fa-search' />
            <SearchClassesInput />
          </SearchClassesInputContainer>

          {/* <AvailableClasses>
            {getRandomNineClass(classData)?.map(item => (
              <Link
                to={'/class/enroll/' + item.classId}
                target='_blank'
                rel='noreferrer'
                className='shadow-sm text-dark'
              >
                <div>
                  <img
                    src={
                      item.thumbnailImage?.length
                        ? item.thumbnailImage
                        : '../assets/images/image-placeholder.jpg'
                    }
                    alt={he.decode(item.title)}
                  />
                </div>
                <div>
                  <h5>{he.decode(item.title)}</h5>
                  <img
                    src={item?.photo || '../assets/images/image-placeholder.jpg'}
                    alt={he.decode(item.title)}
                  />
                  <p>{item?.firstName + ' ' + item?.lastName}</p>
                </div>
              </Link>
            ))}
          </AvailableClasses> */}
          {classData?.length && (
            <ClassDetails
              data={getRandomNineClass(classData).sort(compareStatusDisplay)}
            />
          )}
          {classData?.length > 9 && (
            <a
              href='/search?query='
              style={{ width: '100%' }}
              className='btn btn-outline mt-5 mb-5 p-3'
              target='_blank'
              rel='noreferrer'
            >
              View All
            </a>
          )}
        </Section>
      </Page>
    </Wrapper>
  );
}
