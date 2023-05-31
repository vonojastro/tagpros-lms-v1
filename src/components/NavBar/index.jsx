import React, { Fragment } from 'react';
import { getHasEverLoggedIn } from '../../utils/auth';
import 'css/new-age.scoped.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { useLogOutModal } from '../../hooks/useLogOutModal';
import { Menu } from 'react-feather';
const NavButton = styled.li`
  white-space: nowrap;
  width: 100%;
`;
const SignUpButton = styled(NavButton)``;
const LogInButton = styled(NavButton)``;
const LogOutButton = styled(NavButton)``;
const StyledNav = styled.nav`
  ul {
    align-items: flex-start !important;
    /* width: 100vw;
    padding: 2rem; */
    /* li {
      margin-left: 0px !important;
    } */
  }
  ${NavButton} {
    width: 100%;
  }
  @media (min-width: 992px) {
    ul {
      align-items: center !important;
    }
    ${NavButton} {
      width: auto;
    }
  }
`;
const MobileDrawer = styled.ul`
`;

export default function NavBar() {
  const user = useSelector(state => state.auth?.user);
  const hasEverLoggedIn = getHasEverLoggedIn();
  const isLoggedIn = !!user;
  const showSignUpButton = !isLoggedIn && !hasEverLoggedIn;
  const showLogOutButton = isLoggedIn;
  const showLogInButton = !isLoggedIn && hasEverLoggedIn;
  const showDashboardButton = isLoggedIn;
  const showTeachButton = !isLoggedIn;
  const [Modal, toggle] = useLogOutModal();
  const handleClickLogOut = e => {
    e.preventDefault();
    toggle();
  };
  return (
    <Fragment>
      {Modal}
      <StyledNav
        className='navbar navbar-expand-lg navbar-light fixed-top navbar-shrink'
        id='mainNav'
      >
        <div className='container-fluid'>
          <a className='navbar-brand js-scroll-trigger' href='/landing'>
            <img alt='img' id='tagpros-logo-nav' src='./img/tagpros-logo-small2.webp' />
          </a>
          <button
            className='navbar-toggler navbar-toggler-right mr-1'
            type='button'
            data-toggle='collapse'
            data-target='#navbarResponsive'
            aria-controls='navbarResponsive'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <Menu size={30} />
          </button>
          <div className='collapse navbar-collapse' id='navbarResponsive'>
            <MobileDrawer className='navbar-nav ml-auto d-flex bg-white'>
              <li
                className='nav-item nav-item-mobile-01 nav-item-search'
                id='mainNavSearch'
              >
                <form
                  className='form-horizontal form-material'
                  id='loginform'
                  target='_blank'
                  rel='noreferrer'
                  action='/search'
                >
                  <div className='form-group d-flex align-items-center justify-content-center'>
                    <div className='mr-3'>
                      <i
                        className='fa fa-search'
                        aria-hidden='true'
                        style={{ fontSize: '1.2rem' }}
                      />
                    </div>
                    <div className='form-g01-div'>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Search Classes'
                        name='query'
                        id='loginform-input'
                      />
                    </div>
                  </div>
                </form>
              </li>
              <NavButton
                className='nav-item nav-item-mobile-01'
                hidden={!showTeachButton}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    variant='primary-outline'
                    id='dropdown-basic'
                    className='nav-link js-scroll-trigger landing-dropdown'
                    style={{ paddingTop: 0 }}
                  >
                    <b>TEACH</b>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item to='/learn-more/teacher' as={Link}>
                      Becoming a Teacher
                    </Dropdown.Item>
                    <Dropdown.Item to='/learn-more/US-visiting-program' as={Link}>
                      US Visiting Teacher Program
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </NavButton>
              <NavButton
                className='nav-item nav-item-mobile-01'
                hidden={!showDashboardButton}
              >
                <Link className='nav-link js-scroll-trigger' to='/'>
                  DASHBOARD
                </Link>
              </NavButton>
              <NavButton className='nav-item nav-item-mobile-01'>
                <Link
                  className='nav-link js-scroll-trigger'
                  to='/learn-more/school-leader'
                >
                  SCHOOL DISTRICT
                </Link>
              </NavButton>
              <NavButton className='nav-item nav-item-mobile-01'>
                <Link className='nav-link js-scroll-trigger' to='/contact-us'>
                  CONTACT US
                </Link>
              </NavButton>
              <NavButton className='nav-item nav-item-mobile-01 active'>
                <Link className='nav-link js-scroll-trigger' to='/webinar'>
                  WATCH
                </Link>
              </NavButton>
              {isLoggedIn && (
                <NavButton className='nav-item nav-item-mobile-01 active'>
                  <Link className='nav-link js-scroll-trigger' to='/cart'>
                    MY CART
                  </Link>
                </NavButton>
              )}
              <SignUpButton
                className='nav-item nav-item-mobile-01'
                hidden={!showSignUpButton}
              >
                <Link
                  className='nav-link js-scroll-trigger btn btn-signup'
                  to='/register'
                >
                  Sign Up
                </Link>
              </SignUpButton>
              <LogInButton
                className='nav-item nav-item-mobile-01'
                hidden={!showLogInButton}
              >
                <Link className='nav-link js-scroll-trigger btn btn-signup' to='/login'>
                  Log In
                </Link>
              </LogInButton>
              <LogOutButton
                className='nav-item nav-item-mobile-01'
                hidden={!showLogOutButton}
              >
                <Link
                  className='nav-link js-scroll-trigger btn btn-signup'
                  onClick={handleClickLogOut}
                  to='/'
                >
                  Log Out
                </Link>
              </LogOutButton>
            </MobileDrawer>
          </div>
        </div>
      </StyledNav>
    </Fragment>
  );
}
