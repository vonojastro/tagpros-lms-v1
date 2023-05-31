import 'react-responsive-modal/styles.css';
import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-modern-drawer/dist/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './app.css'

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRoutes } from 'react-router-dom';

import { api } from './api';
import getRoutes from './routes';
import ThemeProvider from 'components/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

import useGoogleAnalytics from 'useGoogleAnalytics';
import { setLastLogin } from 'redux/actions/auth';
import { gapi, loadAuth2 } from 'gapi-script';
import LogoutModal from 'components/LogoutModal';
//

function App() {
  useGoogleAnalytics();

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    loadAuth2(gapi, googleClientId, 'email')
      .then(result => {
        console.log('🚀 ~ file: App.js -> gapi ~ line 30 ~ useEffect ~ result', result);
      })
      .catch(err => {
        console.log('🚀 ~ file: App.js -> gapi ~ line 33 ~ useEffect ~ err', err);
      });
  }, [googleClientId]);

  const [showExpiredSessionModal, setShowExpiredSessionModal] = useState(false);
  const authToken = useSelector(state => state.auth.authToken);
  // const socialAuthToken = useSelector(state => state.auth.socialAuthToken);
  const userType = useSelector(state =>
    //state.auth.user ? state.auth.user.type : "teacher"
    state.auth.accountType ? state.auth.accountType : 'teacher'
  );

  // Set Auth Token
  api.defaults.headers = { Authorization: `Bearer ${authToken}` };
  // api.defaults.data = {authToken: }
  const routing = useRoutes(getRoutes(authToken, userType));

  // useEffect(() => {
  //   if(!!socialAuthToken)
  // api.interceptors.request.use(
  //   function (req) {
  //     req.data = {...( !!socialAuthToken && { authToken: socialAuthToken } ), ...req.data}
  //     return req;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );
  // }, [socialAuthToken])

  api.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response);
      return response;
    },
    error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      if (
        !!error.response &&
        !!error.response.data &&
        !!error.response.data.type &&
        (error.response.data.type === 'token_invalid' ||
          error.response.data.type === 'blank_token') &&
        error.response.config.url !== '/admin/saveAdminPassword'
      ) {
        // show modal here

        setShowExpiredSessionModal(true);
      }

      return Promise.reject(error);
    }
  );

  const returnToLogin = () => {
    api.defaults.headers = { Authorization: null };

    if (userType.indexOf('adm') > -1) {
      window.location.pathname = '/admin-login';
      localStorage.clear();
    } else {
      window.location.pathname = '/login';
      localStorage.clear();
    }
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const welcomeModalDismissIntent = location.state?.from === 'welcome-modal';

  React.useEffect(() => {
    if (welcomeModalDismissIntent) dispatch(setLastLogin(new Date().toUTCString()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [welcomeModalDismissIntent]);

  return (
    <div>
      <LogoutModal />
      <ToastContainer
        pauseOnHover
        position='top-right'
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
      />
      <Modal
        size='m'
        show={showExpiredSessionModal}
        backdrop='static'
        keyboard={false}
        onHide={() => {
          setShowExpiredSessionModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Session Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>Oh no! Session Expired, Please Reauthenticate</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => returnToLogin()}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Helmet>
        <title>{`${process.env.REACT_APP_NAME}${
          process.env.REACT_APP_ENV !== 'Production'
            ? ` - ${process.env.REACT_APP_ENV}`
            : ''
        }`}</title>
      </Helmet>
      <ThemeProvider
        color={
          userType === 'teacher'
            ? 'blue'
            : userType === 'family'
            ? 'megna'
            : userType === 'learner'
            ? 'purple'
            : 'blue'
        }
      >
        {routing}
      </ThemeProvider>
    </div>
  );
}

export default App;
