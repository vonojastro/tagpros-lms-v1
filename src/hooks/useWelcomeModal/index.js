import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLastLogin } from 'redux/actions/auth';

const CustomLink = props => {
  return (
    <Link {...props} state={{ from: 'welcome-modal' }}>
      {props.children}
    </Link>
  );
};
function UserTypeModalContent({ userType, closeModal }) {
  return userType === 'learner' ? (
    <div className='newTeacherTutorial pt-2' style={{ minHeight: 400 }}>
      <div
        id='carouselExampleCaptions'
        className='carousel slide'
        data-ride='carousel'
        data-interval='false'
        style={{ minHeight: 400 }}
      >
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='text-center mx-auto'>
              <img src='../assets/images/tarsier-v2a.png' alt='tagpi' />
            </div>
            <div className='card-body text-center'>
              <h1>Welcome to the Learners Dashboard!</h1>
              <p className='text-center'>
                I'm Tag the Tarsier, and I'm here to guide you through our system.
              </p>
              <a
                className='btn btn-primary mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: Watch a video about Tagpros &gt;
              </a>
            </div>
          </div>
          <div className='carousel-item'>
            <div className='text-center mx-auto m-5'>
              <img src='../img/tagpros-logo-small2.png' alt='tagpi' style={{width: "500px"}}/>
            </div>
            <div className='card-body text-center'>
              <p style={{fontSize:"15px"}}>
                <b>Tagpros</b> is a nonprofit and a community built on diversity, equity,
                and inclusion, where educators, parents, and schools come together on a
                mission to discuss children's learning in the new normal.
              </p>
              <a
                className='btn btn-primary mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: Let's look for classes! &gt;
              </a>
            </div>
          </div>
          <div className='carousel-item'>
            <div className='w-100 mx-auto text-center'>
              <img src='../assets/images/tarsier-tut02.png' alt='tagpi' />
            </div>
            <div className='card-body text-center'>
              <h1>First: Let's look for some cool classes!</h1>
              <p className='text-center'>
                Tagpros has thousands of classes to choose from. Found something that you
                like? Just add that class to your cart and select which learner will
                attend it. Once payment has been finalized, you may now attend that class
                when it begins! Schedules and online links will be sent via email and
                in-app notifications.
              </p>
              <a
                className='btn btn-primary mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: You're ready to go! &gt;
              </a>
            </div>
          </div>
          {/* <div className='carousel-item'>
            <div className='w-100 mx-auto text-center'>
              <img src='../assets/images/tarsier-tut03.png' />
            </div>
            <div className='card-body text-center'>
              <h1>Check and confirm your schedule!</h1>
              <p className='text-center'>
                It's very important to let our teachers know if you can attend a class or
                not. To make this easier, the Tagpros LMS has a Calendar function to allow
                you to confirm your class just by clicking the <b>Check</b> or{' '}
                <b>Confirm</b> button! Class cancellations will also be allowed up to 24
                hours prior to the scheduled class, and is subject to refunds or
                rescheduling.
              </p>
              <a
                className='btn btn-primary mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: You're ready to go! &gt;
              </a>
            </div>
          </div> */}
          <div className='carousel-item'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12 col-md-4 text-center'>
                  <img src='../assets/images/tarsier-v2b.png' alt='tagpi' />
                </div>
                <div className='col-12 col-md-8'>
                  <h2>The New Tagpros LMS is filled with awesome features!</h2>
                  <p>
                    We've taken the time to make sure our new Learning Management System
                    is as easy to use as possible!
                  </p>
                  <button
                    disabled
                    className='btn btn-primary mx-auto'
                    href='#'
                    data-slide='next'
                  >
                    Download the Tagpros LMS Manual Here!
                  </button>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 text-center p-2'>
                  <h3>We would like to know more about you.</h3>
                </div>
                <div className='col-12 col-md-6 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-lightbulb-o' />
                  </p>
                  <p>
                    <CustomLink to='/profile' className='btn btn-outline-primary mx-auto'>
                      Complete my Learners Profile
                    </CustomLink>
                  </p>
                </div>
                <div className='col-12 col-md-6 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-lightbulb-o' />
                  </p>
                  <p>
                    <CustomLink
                      className='btn btn-outline-primary mx-auto'
                      to='/search?query='
                      role='button'
                    >
                      Browse through all classes
                    </CustomLink>
                  </p>
                </div>
              </div>

              {/* <div className='row'>
                <div className='col-12 text-center p-2'>
                  <h3>What would you like to do first?</h3>
                </div>
                <div className='col-12 col-md-6 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-lightbulb-o' />
                  </p>
                  <p>
                    <Link
                      className='btn btn-outline-primary mx-auto'
                      to='/search?query='
                      role='button'
                    >
                      Browse through all classes
                    </Link>
                  </p>
                </div>
                <div className='col-12 col-md-6 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-user-circle-o' />
                  </p>
                  <p>
                    <Link
                      className='btn btn-outline-primary mx-auto'
                      to='/profile'
                      role='button'
                    >
                      Complete my Learners Profile
                    </Link>
                  </p>
                </div>
              </div> */}
              <div className='col-12 text-center p-2'>
                <button
                  onClick={closeModal}
                  className='btn btn-sm mx-auto'
                  href='#'
                  data-dismiss='modal'
                >
                  <u>No thanks, just take me directly to the Dashboard</u>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ol
          className='carousel-indicators'
          style={{ padding: '20px 0px', position: 'static' }}
        >
          <li
            data-target='#carouselExampleCaptions'
            data-slide-to={0}
            className='active'
          />
          <li data-target='#carouselExampleCaptions' data-slide-to={1} />
          <li data-target='#carouselExampleCaptions' data-slide-to={2} />
          <li data-target='#carouselExampleCaptions' data-slide-to={3} />
        </ol>
      </div>
    </div>
  ) : userType === 'family' ? (
    <div className='newTeacherTutorial pt-2' style={{ minHeight: 400 }}>
      <div
        id='carouselExampleCaptions'
        className='carousel slide'
        data-ride='carousel'
        data-interval='false'
        style={{ minHeight: 400 }}
      >
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='text-center mx-auto'>
              <img src='../assets/images/tarsier-v2a.png' alt='tagpi' />
            </div>
            <div className='card-body text-center'>
              <h1>Welcome to the Family Dashboard!</h1>
              <p className='text-center'>
                I'm Tagpi the Tarsier, and I'm here to guide you through our system.
              </p>
              <a
                className='btn btn-megna mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: Watch a video about Tagpros &gt;
              </a>
            </div>
          </div>
          <div className='carousel-item'>
            <div className='text-center mx-auto m-5'>
              <img src='../img/tagpros-logo-small2.png' alt='tagpi' style={{width: "500px"}}/>
            </div>
            <div className='card-body text-center'>
              <p style={{fontSize:"15px"}}>
                <b>Tagpros</b> is a nonprofit and a community built on diversity, equity,
                and inclusion, where educators, parents, and schools come together on a
                mission to discuss children's learning in the new normal.
              </p>
              <a
                className='btn btn-megna mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: Add some learners! &gt;
              </a>
            </div>
          </div>
          <div className='carousel-item'>
            <div className='w-100 mx-auto text-center'>
              <img src='../assets/images/tarsier-tut01.png' alt='tagpi' />
            </div>
            <div className='card-body text-center'>
              <h1>First order of business: Add your Learners!</h1>
              <p className='text-center'>
                Adding learners allows you to register them to the awesome classes we have
                on Tagpros. Learners can be your kids, or anyone you're taking care of.
                They will become the students for our online classes!
              </p>
              <a
                className='btn btn-megna mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: Book some classes &gt;
              </a>
            </div>
          </div>
          <div className='carousel-item'>
            <div className='w-100 mx-auto text-center'>
              <img src='../assets/images/tarsier-tut02.png' alt='tagpi' />
            </div>
            <div className='card-body text-center'>
              <h1>Let's look for some cool classes!</h1>
              <p className='text-center'>
                Tagpros has thousands of classes to choose from. Found something that you
                like? Just add that class to your cart and select which learner will
                attend it. Once payment has been finalized, you may now attend that class
                when it begins! Schedules and online links will be sent via email and
                in-app notifications.
              </p>
              <a
                className='btn btn-megna mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: You're ready to go! &gt;
              </a>
            </div>
          </div>
          {/* <div className='carousel-item'>
            <div className='w-100 mx-auto text-center'>
              <img src='../assets/images/tarsier-tut03.png' />
            </div>
            <div className='card-body text-center'>
              <h1>Check and confirm your schedule!</h1>
              <p className='text-center'>
                It's very important to let our teachers know if you can attend a class or
                not. To make this easier, the Tagpros LMS has a Calendar function to allow
                you to confirm your class just by clicking the <b>Check</b> or{' '}
                <b>Confirm</b> button! Class cancellations will also be allowed up to 24
                hours prior to the scheduled class, and is subject to refunds or
                rescheduling.
              </p>
              <a
                className='btn btn-megna mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: You're ready to go! &gt;
              </a>
            </div>
          </div> */}
          <div className='carousel-item'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12 col-md-4 text-center'>
                  <img src='../assets/images/tarsier-v2b.png' alt='tagpi' />
                </div>
                <div className='col-12 col-md-8'>
                  <h2>The New Tagpros LMS is filled with awesome features!</h2>
                  <p>
                    We've taken the time to make sure our new Learning Management System
                    is as easy to use as possible!
                  </p>
                  <button
                    disabled
                    className='btn btn-megna mx-auto'
                    href='#'
                    data-slide='next'
                  >
                    Download the Tagpros LMS Manual Here!
                  </button>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 text-center p-2'>
                  <h3>We would like to know more about you.</h3>
                </div>
                <div className='col-12 col-md-4 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-lightbulb-o' />
                  </p>
                  <p>
                    <CustomLink
                      className='btn btn-outline-info mx-auto'
                      onClick={closeModal}
                      to='/'
                      state={{ from: 'welcome-modal' }}
                    >
                      Create accounts for my Learners
                    </CustomLink>
                  </p>
                </div>

                <div className='col-12 col-md-4 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-lightbulb-o' />
                  </p>
                  <p>
                    <CustomLink
                      className='btn btn-outline-info mx-auto'
                      to='/search?query='
                      role='button'
                    >
                      Browse through all classes
                    </CustomLink>
                  </p>
                </div>
                <div className='col-12 col-md-4 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='mdi mdi-arrange-send-backward' />
                  </p>
                  <p>
                    <CustomLink
                      className='btn btn-outline-info mx-auto'
                      to='/profile'
                      role='button'
                    >
                      Complete my Profile
                    </CustomLink>
                  </p>
                </div>
                <div className='col-12 text-center p-2'>
                  <button
                    onClick={closeModal}
                    className='btn btn-sm mx-auto'
                    href='#'
                    data-dismiss='modal'
                  >
                    <u>No thanks, just take me directly to the Dashboard</u>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ol
          className='carousel-indicators'
          style={{ padding: '20px 0px', position: 'static' }}
        >
          <li
            data-target='#carouselExampleCaptions'
            data-slide-to={0}
            className='active'
          />
          <li data-target='#carouselExampleCaptions' data-slide-to={1} className />
          <li data-target='#carouselExampleCaptions' data-slide-to={2} className />
          <li data-target='#carouselExampleCaptions' data-slide-to={3} className />
          <li data-target='#carouselExampleCaptions' data-slide-to={4} className />
        </ol>
      </div>
    </div>
  ) : userType === 'teacher' ? (
    <div className='newTeacherTutorial pt-2' style={{ minHeight: '400px' }}>
      <div
        id='carouselExampleCaptions'
        className='carousel slide'
        data-ride='carousel'
        data-interval='false'
        style={{ minHeight: '400px' }}
      >
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            &lt;
            <div className='text-center mx-auto'>
              <img src='./assets/images/tarsier-v2a.png' alt='tagpi' />
            </div>
            <div className='card-body text-center'>
              <h1>Welcome to the Tagpros Teachers Dashboard!</h1>
              <p className='text-center'>
                I'm Tagpi the Tarsier, and I'm here to guide you through our system.
              </p>
              <a
                className='btn btn-info mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: Watch a video about Tagpros &gt;
              </a>
            </div>
          </div>
          <div className='carousel-item'>
            <div className='mx-auto text-center'>
              <iframe
                width={922}
                height={465}
                src='https://www.youtube.com/embed/619RMlsKRwI'
                title='YouTube video player'
                frameBorder={0}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
            <div className='card-body text-center'>
              <h3>Learn more about us by watching this short video!</h3>
              <p>
                <b>Tagpros</b> is a nonprofit and a community built on diversity, equity,
                and inclusion, where educators, parents, and schools come together on a
                mission to discuss children's learning in the new normal.
              </p>
              <a
                className='btn btn-info mx-auto'
                href='#carouselExampleCaptions'
                role='button'
                data-slide='next'
              >
                Next: How do I use the Tagpros LMS? &gt;
              </a>
            </div>
          </div>
          <div className='carousel-item'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-12 col-md-4 text-center'>
                  <img src='./assets/images/tarsier-v2b.png' alt='tagpi' />
                </div>
                <div className='col-xs-12 col-md-8'>
                  <h2>The New Tagpros LMS is filled with awesome features!</h2>
                  <p>
                    We've taken the time to make sure our new Learning Management System
                    is as easy to use as possible!
                  </p>
                  <button
                    disabled
                    className='btn btn-info mx-auto'
                    href='#'
                    data-slide='next'
                  >
                    Download the Tagpros LMS Manual Here!
                  </button>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 text-center p-2'>
                  <h3>What would you like to do first?</h3>
                </div>
                <div className='col-xs-12 col-md-4 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-lightbulb-o' />
                  </p>
                  <p>
                    <CustomLink
                      className='btn btn-outline-info mx-auto'
                      to='/application'
                      role='button'
                    >
                      Apply as a Tagpros Teacher
                    </CustomLink>
                  </p>
                </div>
                <div className='col-xs-12 col-md-4 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='fa fa-lightbulb-o' />
                  </p>
                  <p>
                    <a
                      className='btn btn-outline-info mx-auto'
                      href='https://tagpros.org/'
                      role='button'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Learn More About Tagpros
                    </a>
                  </p>
                </div>
                <div className='col-xs-12 col-md-4 text-center'>
                  <p style={{ fontSize: '4em', marginBottom: 0 }}>
                    <i className='mdi mdi-arrange-send-backward' />
                  </p>
                  <p>
                    <CustomLink
                      className='btn btn-outline-info mx-auto'
                      to='/profile'
                      role='button'
                    >
                      Complete my Teacher's Profile
                    </CustomLink>
                  </p>
                </div>
                <div className='col-12 text-center p-2'>
                  <button onClick={closeModal} className='btn btn-sm mx-auto'>
                    <u>No thanks, just take me directly to the Dashboard</u>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ol
            className='carousel-indicators carousel-indicators-info'
            style={{ padding: '20px 0px', position: 'static' }}
          >
            <li
              data-target='#carouselExampleCaptions'
              data-slide-to={0}
              className='active'
            />
            <li data-target='#carouselExampleCaptions' data-slide-to={1} className />
            <li data-target='#carouselExampleCaptions' data-slide-to={2} className />
          </ol>
        </div>
      </div>
    </div>
  ) : (
    <Fragment />
  );
}

/**
 * @param  {any} [ userType ]
 */
export const useWelcomeModal = userType => {
  const dispatch = useDispatch();

  const isFirstTimeLogin = useSelector(state => !state?.auth?.lastLogin);
  const [hasDismissed, setHasDismissed] = useState(false);

  const closeModal = () => {
    setHasDismissed(true);
    dispatch(setLastLogin(new Date().toUTCString()));
  };

  useEffect(() => {
    return () => {
      if (hasDismissed) dispatch(setLastLogin(new Date().toUTCString()));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    <Modal centered size='xl' show={isFirstTimeLogin} onHide={closeModal}>
      <UserTypeModalContent userType={userType} closeModal={closeModal} />
    </Modal>
  ];
};
