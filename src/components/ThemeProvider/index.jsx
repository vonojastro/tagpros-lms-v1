import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import styled, { ThemeProvider as TP } from 'styled-components';

const GlobalStyles = styled.div`
  .left-sidebar > div {
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    min-height: 0;
    nav {
      min-height: 0;
      overflow-y: auto;
    }
    .sidebar-nav {
      height: 100% !important;
    }
    .sidebar-footer {
      position: static !important;
    }
  }
  .row.page-titles {
    @media (max-width: 767px) {
      margin-top: 0 !important;
    }
  }
  #sidebarnav {
    height: 100% !important;
    > li:not(li:first-of-type) {
      > a {
        white-space: nowrap !important;
        width: 100%;
        i {
          margin-right: 0.7rem;
        }
        display: inline-block !important;
      }
      @media (max-width: 1169px) {
        display: flex !important;
      }
    }
  }
`;

// import 'css/style.css';
const theme = {
  primary1: '#17a2b8',
  primary2: 'rgb(245, 126, 32, 1)',
  primary3: '#b3d236'
};

export default function ThemeProvider({ children, color = 'blue' }) {
  const isLoggedIn = useSelector(state => state.auth.authToken);
  // When the 3 stylesheets are included in the Landing Page
  // it messes up the styling

  // So we need to conditionally include these stylesheets
  const pathname = useLocation().pathname;
  const atLanding = pathname === '/landing';
  const atSearch = pathname === '/search';
  const atClass = pathname.includes('/class/enroll');
  // const atClass = pathname.includes("/class") && pathname !== '/admin/class-masterlist' && pathname !== '/classes';
  const shouldNotIncludeStyles = (!isLoggedIn && atLanding) || atSearch || atClass;

  return (
    <TP theme={theme}>
      <GlobalStyles
        className={
          color === 'megna' ? 'family' : color === 'purple' ? 'solo-learner' : 'teacher'
        }
      >
        {!shouldNotIncludeStyles && (
          <Helmet>
            <link href={`css/colors/${color}.css`} id='theme' rel='stylesheet' />
          </Helmet>
        )}
        {children}
      </GlobalStyles>
    </TP>
  );
}
