import { useState } from 'react';
import { OnFocus } from 'react-final-form-listeners';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { InputControl, InputPasswordControl } from '../common/Form/Inputs';
import useValidationSchema from '../../hooks/use-validation-schema';
import schema from '../../validators/login';
import ls from 'local-storage';
import { api } from '../../api';
import { getRememberedEmail, setHasEverLoggedIn } from '../../utils/auth';
import VerifyAccountModal from '../common/VerifyAccountModal';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useFreshdeskHelpWidget from "hooks/use-freshdesk-help-widget";

import {
  setAuthToken,
  setAccountType,
  setLastLogin,
  setSocialAuthToken
} from 'redux/actions/auth';
// import { countBy } from "lodash";
import 'css/style.scoped.scss';
import { SOCIAL_AUTH_PROVIDERS } from 'utils/constants';
import { Button } from 'react-bootstrap';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { toast } from 'react-toastify';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Wrapper } from './styles';

const ErrorMessage = ({ status, errorMessage }) => {
  const messages = {
    404: {
      heading: `We couldn't find your account`,
      body: `Please Sign up with the options provided.`,
      type: 'info'
    },
    403: {
      heading: `Invalid Credentials`,
      body: `Kindly review your email/password`
    },
    400: {
      heading: `Unable to Login`,
      body: errorMessage || `We're doing our best to fix this issue.`,
      type: 'info'
    },
    401: {
      type: 'info',
      heading: `Please verify your account`,
      body: `We've sent a confirmation link to your email.`
    },
    423: {
      heading: `Account can't be logged in`,
      body: `Account has been deactivated/suspended.`
    },
    NetworkError: {
      heading: `We couldn't connect you to the server.`,
      body: `Could you please try refreshing this page?`
    }
  };
  return (
    <div
      className={`alert alert-${
        messages[status] ? messages[status].type : 'warning'
      } text-center text m-t-20`}
      role='alert'
      style={{ fontSize: 13 }}
    >
      <span className='font-weight-bold' style={{ fontSize: 17 }}>
        {messages[status] ? messages[status].heading : messages['NetworkError'].heading}
      </span>
      <br />
      {messages[status] ? messages[status].body : messages['NetworkError'].body}
    </div>
  );
};

export default function Login({ user }) {
  useFreshdeskHelpWidget();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validate = useValidationSchema(schema);
  const navigate = useNavigate();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleSubmit = async ({ email, password, provider = 'none', authToken }) => {
    try {
      setLoading(true);
      let endpoint = '/auth/login';
      if (!!user) {
        endpoint = '/admin/login';
      }

      const account = await api.post(endpoint, {
        email,
        password,
        provider,
        ...(provider !== 'none' && {
          authToken: authToken
        })
      });
      const token = account.data.token;
      const accountType = account.data.type;

      if (!!token) {
        dispatch(setLastLogin(account.data.lastLogin));
      }

      setHasEverLoggedIn(true);
      dispatch(setAuthToken(token));
      dispatch(setAccountType(accountType));
      if (accountType.indexOf('adm') > -1) {
        navigate('/admin', { replace: true });
      } else {
        if (account.data.lastLogin === null) {
          navigate('/profile', { replace: true });
          return;
        }
        navigate('/', { replace: true });
      }
    } catch (error) {
      const messages = {
        404: {
          heading: `We couldn't find your account`,
          body: !!user ? 'Kindly review your email/password.':`Please Sign up with the options provided.`,
          type: 'info'
        },
        403: {
          heading: `Invalid Credentials`,
          body: `Kindly review your email/password`,
          type: 'error'
        },
        400: {
          heading: `Unable to Login`,
          body: `We're doing our best to fix this issue.`,
          type: 'error'
        },
        401: {
          heading: `Please verify your account`,
          body: `We've sent a confirmation link to your email.`,
          type: 'info'
        },
        423: {
          heading: `Account can't be logged in`,
          body: `Account has been deactivated/suspended.`,
          type: 'error'
        },
        NetworkError: {
          heading: `We couldn't connect you to the server.`,
          body: `Please make sure you are connected to the internet or you could try refreshing the page.`,
          type: 'error'
        }
      };
      let heading = messages['NetworkError'].heading;
      let body = messages['NetworkError'].body;
      let type = messages['NetworkError'].type;

      if (error.response) {
        const s = '' + error.response.status;
        setError(parseInt(s));
        heading = messages[s]?.heading || messages['400'].heading;
        body = messages[s]?.body || messages['400'].body;
        type = messages[s]?.type || messages['400'].type;
        // statusMessage = error.response.data?.message;
      }
      if (!error.response || error.response.status !== 401)
        toast[type](
          <div>
            <h5>
              <b>{heading}</b>
            </h5>
            <h6>{body}</h6>
          </div>,
          { autoClose: 5000 }
        );
    } finally {
      setLoading(false);
    }
  };
  const { signOut: googleLogout } = useGoogleLogout({
    clientId: googleClientId,
    onFailure: e => {
      throw e;
    },
    scope: ''
  });

  const socialLogout = async () => {
    googleLogout();
  };
  const { signIn: googleLogin } = useGoogleLogin({
    onSuccess: async ({
      profileObj: { imageUrl: photo, email, givenName: firstName, familyName: lastName },
      tokenId: authToken
    }) => {
      window.form.change('email', email);
      window.form.change('authToken', authToken);
      window.form.change('provider', 'google');
      dispatch(setSocialAuthToken(authToken));
      handleSubmit({ email, authToken, provider: 'google' });
    },
    clientId: googleClientId,
    onFailure: e => {
      throw e;
    },
    scope: ''
  });

  const handleClickSelectProvider = async provider => {
    const handler = provider === 'google' ? googleLogin : () => {};
    try {
      socialLogout();
      await handler();
    } catch (error) {
      console.error('🚀 ~ file: index.jsx ~ line 157 ~ Login ~ error', error);
    }
  };

  const handleClickRememberMe = email => {
    ls.set('tagpros-education-user-email', email);
  };

  return (
    <Wrapper
      id='wrapper'
      className='login-register login-sidebar'
      style={{
        backgroundImage: 'url(./assets/images/loginbg01.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      isAdmin = {user === 'admin'}
    >
      <div
        className={`login-box card p-2 ${
          user === 'admin' ? 'login-box-center' : 'login-box-left'
        }`}
      >
        <div className='card-body'>
              <Form
                initialValues={{
                  email: getRememberedEmail(),
                  provider: 'none'
                }}
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit, hasValidationErrors, values, form }) => {
                  window.form = form;
                  return (
                    <form
                      className='form-horizontal form-material'
                      onSubmit={handleSubmit}
                    >
                      <div className='text-center db'>
                        <Link to='/'>
                          <img src='./assets/images/logo-icon.png' alt='Home' />
                        </Link>
                        <br />
                        <img src='./assets/images/logo-text.png' alt='Home' />
                        {user === 'admin' && (
                          <h2>
                            <span class='badge badge-info'>ADMIN</span>
                          </h2>
                        )}
                      </div>

                      <div className='col-xs-12 m-t-40'>
                        <InputControl name='email' disabled={loading} type='text' />
                      </div>
                      <div className='col-xs-12 m-t-40 m-b-40'>
                        <InputPasswordControl name='password' disabled={loading} />
                      </div>
                      <div className='form-group'>
                        <div className='col-md-12'>
                          <div
                            className='checkbox checkbox-primary pull-left p-t-0'
                            onClick={() => handleClickRememberMe(values.email)}
                          >
                            <input id='checkbox-signup' type='checkbox' />
                            <label htmlFor='checkbox-signup'> Remember me </label>
                          </div>
                        </div>
                      </div>
                      <div className='form-group text-center m-t-20'>
                        <div className='col-xs-12'>
                          <button
                            disabled={hasValidationErrors}
                            className='btn btn-info btn-block text-uppercase waves-effect waves-light'
                            type='submit'
                          >
                            {loading ? (
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div
                                  className='spinner-border text-primary text-white'
                                  role='status'
                                >
                                  <span className='sr-only'>Loading...</span>
                                </div>
                                <div style={{ marginLeft: 10 }}>Logging in</div>
                              </div>
                            ) : (
                              'Log In'
                            )}
                          </button>
                        </div>
                        <div className='col-xs-12 mt-2 text-center'>
                          <Link
                            to='/forgot-password'
                            id='to-recover'
                            className='text-dark font-14'
                          >
                            <i className='fa fa-lock m-r-5' /> Forgot password?
                          </Link>
                        </div>
                      </div>
                      <VerifyAccountModal
                        email={values.email}
                        open={error === 401}
                        onClose={() => setError(null)}
                      />
                      {!user && (
                        <div className='h-100'>
                          <h6 className='w-100 text-center my-3'>or</h6>
                          <div style={{ display: 'grid', gap: 5 }} className='mb-4'>
                            {SOCIAL_AUTH_PROVIDERS.map(({ label, icon, provider }) =>
                              provider === 'facebook' ? (
                                <FacebookLogin
                                  fields='email,first_name,last_name'
                                  scope='public_profile'
                                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                  onSuccess={({ accessToken }) => {
                                    window.form.change('authToken', accessToken);
                                    dispatch(setSocialAuthToken(accessToken));
                                  }}
                                  onProfileSuccess={({ email }) => {
                                    window.form.change('email', email);
                                    window.form.change('provider', 'facebook');
                                    handleSubmit();
                                  }}
                                  render={renderProps => (
                                    <Button
                                      key={provider}
                                      active={values.provider === provider}
                                      type='button'
                                      className='d-flex w-100 my-2'
                                      variant='light'
                                      onClick={e => {
                                        e.preventDefault();
                                        form.change('provider', provider);
                                        form.change('password', null);
                                        form.change('email', null);
                                        renderProps.onClick();
                                      }}
                                    >
                                      {icon}
                                      <div
                                        key={provider}
                                        className='ml-3 text-center w-100'
                                      >
                                        Log in with <b>{label}</b>
                                      </div>
                                    </Button>
                                  )}
                                />
                              ) : (
                                <Button
                                  key={provider}
                                  active={values.provider === provider}
                                  type='button'
                                  className='d-flex w-100 my-2'
                                  variant='light'
                                  onClick={e => {
                                    e.preventDefault();
                                    form.change('provider', provider);
                                    form.change('password', null);
                                    form.change('email', null);
                                    handleClickSelectProvider(provider);
                                  }}
                                >
                                  {icon}
                                  <div key={provider} className='ml-3 text-center w-100'>
                                    Log in with <b>{label}</b>
                                  </div>
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      )}
                      <OnFocus name='email'>
                        {() => {
                          form.change('provider', 'none');
                          dispatch(setSocialAuthToken(null));
                        }}
                      </OnFocus>
                      <OnFocus name='password'>
                        {() => {
                          form.change('provider', 'none');
                          dispatch(setSocialAuthToken(null));
                        }}
                      </OnFocus>

                    </form>
                  );
                }}
              />
            
                      {user !== 'admin' && (
                        <div className='form-group m-b-0 sign-up-info'>
                          <div className='col-sm-12 text-center'>
                            <p className='text-center'>
                              {`Don't have an account?`}
                              <Link to={`/register`} className='text-primary m-l-5'>
                                <b>Sign Up</b>
                              </Link>
                            </p>
                          </div>
                        </div>
                      )}

              <div
                className='children-photo'
                style={{
                  backgroundImage: 'url(../../../img/children5.png)',
                  backgroundSize: 'cover',
                  overflow: 'hidden',
                  height: '100%',
                  width: '100%',
                }}
              />

          
        </div>
      </div>
    </Wrapper>
  );
}

ErrorMessage.propTypes = {
  status: PropTypes.string
};
