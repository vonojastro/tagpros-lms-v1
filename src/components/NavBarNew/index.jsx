import { Fragment, useState } from 'react';
import Drawer from 'react-modern-drawer';
import { getHasEverLoggedIn } from '../../utils/auth';
import 'css/new-age.scoped.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLogOutModal } from '../../hooks/useLogOutModal';
import { Menu, X } from 'react-feather';
import _ from 'lodash';
import { Dropdown } from 'react-bootstrap';
import { useWindowScrollPosition } from 'rooks';

const useIsScrollOnTop = () => { 
  const {scrollY} = useWindowScrollPosition();  

  return [ scrollY === 0 ];
}

const TeachButton = styled(Dropdown.Toggle)`
  color: black !important;
  background-color: transparent !important;
  font-weight: bolder;
  padding: 0;
  font-size: 1.2rem;
  outline: none !important;
  border: none !important;
`;
const NavButton = styled(Link)`
  white-space: nowrap;
  width: 100%;
  transition: text-decoration-color 0.5s ease-in-out;
  text-decoration: underline transparent !important;
  text-decoration-thickness: 3px !important;
  &:hover,
  &:focus {
    text-decoration-color: rgba(245, 126, 32, 1) !important;
  }
`;
const MobileNavbar = styled(Drawer)`
  display: grid;
  grid-template-rows: repeat(10, min-content);
  padding-inline: 1rem;
  gap: 1rem;
  text-transform: uppercase;
  height: 100vh !important;
  padding-top: 4rem;
  .search-classes-input {
    font-size: 1rem;
  }
  > *:nth-child(2) {
    display: none;
  }
  ${TeachButton} {
    color: rgba(245, 126, 32, 1) !important;
  }
`;
const DesktopNavbar = styled.nav`
  display: grid;
  grid-template-columns: max-content auto;
  width: 100%;
  height: 100%;
  gap: 2rem;
  padding-inline: 0.5rem;
  align-items: center;
  justify-content: space-between;
  a {
    color: black !important;
    text-transform: uppercase;
    &:hover {
      color: rgba(245, 126, 32, 1) !important;
    }
  }
  > *:first-child {
    width: clamp(10rem, 30vw, 20rem) !important;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > *:nth-child(2) {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    align-items: center;
    overflow-x: auto;
    > *:first-child {
      flex-shrink: 0;
      .input-group {
        min-width: 20ch;
      }
    }
  }
`;

const StyledNav = styled.nav`
  background-color: ${({transparentOnTop, isScrollOnTop })=> !transparentOnTop ? 'white' : isScrollOnTop ? 'transparent' : 'white'} !important;
  position: fixed !important;
  .drawer-toggler {
    position: absolute;
    top: 10;
    right: 0;
    z-index: 102;
  }
  ${DesktopNavbar} {
    > *:nth-child(2) {
      display: none;
    }
  }
  .input-group-text {
    background-color: transparent !important;
    border: none !important;
  }
  @media (min-width: 1300px) {
    ${DesktopNavbar} {
      > *:nth-child(2) {
        display: grid;
      }
    }
    .drawer-toggler {
      position: absolute;
      top: 25%;
      right: 0;
      z-index: 102;
      display: none;
    }
  }
  .auth-btn {
    color: white !important;
    padding: 1rem;
    background-color: rgb(122, 201, 67) !important;
    border-radius: 0.3rem;
    :focus,
    :hover {
      color: white !important;
      text-decoration-color: white !important;
    }
    text-align: center;
  }
`;
export default function NavBarNew({ className, transparentOnTop = false }) {
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
  // shows navbar items
  const [showNavBarItems, setShowNavBarItems] = useState(false);
  const handleClickToggleMobileNavbarItems = e => {
    e.preventDefault();
    setShowNavBarItems(!showNavBarItems);
  };
  const handleCloseNavBarItems = e => {
    e.preventDefault();
    setShowNavBarItems(false);
  };
  const links = [
    // {
    //   label: 'Teach',
    //   component: (
    //     <Accordion defaultActiveKey='0'>
    //       <Accordion.Item eventKey='0'>
    //         <Accordion.Header>Become a Teacher</Accordion.Header>
    //         <Accordion.Body>
    //           <NavButton to='/learn-more/teacher' />
    //         </Accordion.Body>
    //       </Accordion.Item>
    //       <Accordion.Item eventKey='1'>
    //         <Accordion.Header>US Visiting Teacher Program</Accordion.Header>
    //         <Accordion.Body>
    //           <NavButton to='/learn-more/US-visiting-program' />
    //         </Accordion.Body>
    //       </Accordion.Item>
    //     </Accordion>
    //   )
    // }
    {
      group: 2,
      show: true,
      component: (
        <form
          className='form-horizontal form-material'
          id='loginform'
          target='_blank'
          rel='noreferrer'
          action='/search'
        >
          <div className='form-group d-flex align-items-center justify-content-center'>
            <div class='input-group'>
              <div class='input-group-prepend'>
                <span class='input-group-text' id='basic-addon1'>
                  <i
                    className='fa fa-search'
                    aria-hidden='true'
                    style={{ fontSize: '1.2rem' }}
                  />
                </span>
              </div>
              <input
                type='text'
                class='form-control search-classes-input'
                placeholder='Search Classes'
                aria-label='Username'
                aria-describedby='basic-addon1'
                name='query'
              />
            </div>
          </div>
        </form>
      )
    },
    {
      group: 1,
      show: true,
      linkProps: {
        to: '/landing',
        children: (
          <div>
            <img alt='img' src='./img/tagpros-logo-small2.webp' />
          </div>
        )
      }
    },
    {
      group: 2,
      show: showTeachButton,
      component: (
        <Dropdown>
          <TeachButton variant='light'>Teach</TeachButton>
          <Dropdown.Menu popperConfig={{ strategy: 'fixed' }}>
            <Dropdown.Item>
              <NavButton to='/learn-more/teacher' children='Become a Teacher' />
            </Dropdown.Item>
            <Dropdown.Item>
              <NavButton
                to='/learn-more/US-visiting-program'
                children='US Visiting Teacher Program'
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
    },
    {
      group: 2,
      show: showDashboardButton,
      linkProps: {
        to: '/',
        children: 'dashboard'
      }
    },
    {
      group: 2,
      show: true,
      linkProps: {
        to: '/learn-more/school-leader',
        children: 'school district'
      }
    },
    {
      group: 2,
      show: true,
      linkProps: {
        to: '/contact-us',
        children: 'contact us'
      }
    },
    {
      group: 2,
      show: true,
      linkProps: {
        to: '/webinar',
        children: 'watch'
      }
    },
    {
      group: 2,
      show: isLoggedIn,
      linkProps: {
        to: '/cart',
        children: 'my cart'
      }
    },
    {
      group: 2,
      show: showSignUpButton,
      linkProps: {
        to: '/register',
        children: 'sign up',
        className: 'auth-btn'
      }
    },
    {
      group: 2,
      show: showLogInButton,
      linkProps: {
        to: '/login',
        children: 'log in',
        className: 'auth-btn'
      }
    },
    {
      group: 2,
      show: showLogOutButton,
      linkProps: {
        to: '/#',
        children: 'log out',
        className: 'auth-btn',
        onClick: handleClickLogOut
      }
    }
  ];

  const renderNavButton = props => (
    <Fragment key={props.key}>
      {props.component ? props.component : <NavButton {...props.linkProps} />}
    </Fragment>
  );
  const renderNavButtons = isDesktop => {
    const linksToShow = _.filter(links, 'show');
    if (isDesktop) {
      return _.values(_.groupBy(linksToShow, 'group')).map((v, i) => (
        <div key={i}>
          {v.map(props => renderNavButton({ ...props, key: i + props.show }))}
        </div>
      ));
    }
    return linksToShow.map((props, i) =>
      renderNavButton({ ...props, key: i + props.show })
    );
  };
  const [ isScrollOnTop ] = useIsScrollOnTop()

  return (
    <Fragment>
      {Modal}
      <StyledNav
        isScrollOnTop={isScrollOnTop}
        transparentOnTop={transparentOnTop}
        className={ `navbar navbar-expand-lg navbar-light fixed-top navbar-shrink ${className}` }
        id='mainNav'
      >
        <MobileNavbar
          open={showNavBarItems}
          onClose={handleCloseNavBarItems}
          direction='top'
          style={{ color: 'black !important' }}
          duration={250}
        >
          {renderNavButtons()}
        </MobileNavbar>
        <DesktopNavbar>{renderNavButtons(true)}</DesktopNavbar>
        <button
          className='drawer-toggler btn'
          type='button'
          aria-label='Toggle navigation'
          onClick={handleClickToggleMobileNavbarItems}
        >
          {showNavBarItems ? <X size={30} /> : <Menu size={30} />}
        </button>
      </StyledNav>
    </Fragment>
  );
}
