import React from 'react';
import { Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Modal from '../common/Register/Modal';
import Input from '../common/Register/Input';
import Button from '../common/Register/Button';
import PageLoader from '../common/Register/PageLoader';

let history = createBrowserHistory();

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      newPassword: '',
      confirmPassword: '',
      isProcessDone: false,
      isModalOpen: false,
      errorList: [{ newPassword: false }, { confirmPassword: false }], // Add Input(name) fields
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleValidationList = this.handleValidationList.bind(this);
    this.onCLickChangePassword = this.onCLickChangePassword.bind(this);
  }

  isFormValid() {
    let { errorList } = this.state;
    let isValid = true;

    errorList.some((field) => {
      let errorListArray = Object.values(field);

      if (errorListArray.includes(false)) {
        isValid = false;

        return true; // stop looping cb function
      }

      return false;
    });

    return isValid;
  }

  isPageLoaderShow() {
    if (!this.props.loadingScreen) return false;

    return true;
  }

  handleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  isModalShow() {
    let { isModalOpen } = this.state;
    let { status, message, loadingScreen } = this.props;

    if (status === '' && message === '') return false;

    if (loadingScreen) return false;

    if (!isModalOpen) return false;

    return true;
  }

  isModalSuccess() {
    var { status } = this.props;

    if (status === 'error') return false;

    return true;
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleValidationList(args) {
    let { name, isValid } = args;

    this.setState((prevState) => ({
      errorList: prevState.errorList.map((fieldObj) =>
        fieldObj.hasOwnProperty(name) ? { ...fieldObj, [name]: isValid } : fieldObj
      ),
    }));
  }

  onCLickChangePassword(event) {
    event.preventDefault();
    let { token, newPassword } = this.state;

    this.setState({ isProcessDone: true }); //* Set submission done.
    this.handleModal(); //* Open Modal.

    this.props.changePasswordNoCB({ token, source: 'forgot', newPassword });
  }

  redirectToLogin() {
    if (
      this.state.isProcessDone &&
      this.props.status === 'success' &&
      !this.state.isModalOpen
    ) {
      return <Navigate to='/login' replace={false} />;
    }
  }

  setEmailAccount() {
    const pathname = history.location.pathname.split('/');
    const token = pathname.pop(); //* get token

    this.setState({ token: token });
  }

  renderPageLoad() {
    return this.isPageLoaderShow() && <PageLoader />;
  }

  renderModal() {
    return (
      this.isModalShow() && (
        <Modal
          content={{ title: 'Password Changed!', message: this.props.message }}
          isSuccess={this.isModalSuccess()}
          onClose={this.handleModal}
        />
      )
    );
  }

  clearError() {
    this.setState({ formError: '' });
  }

  render() {
    return (
      <>
        {this.renderPageLoad()}
        {this.redirectToLogin()}
        {this.renderModal()}
        <section
          id='wrapper'
          className='login-register login-sidebar'
          style={{
            backgroundImage: 'url(./assets/images/loginbg01.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='login-box-left login-box card p-2'>
            <div className='card-body'>
              <div className='row w-100 h-100' style={{ margin: '0 auto' }}>
                <div className='col-lg-12 col-xl-6 p-3'>
                  <form
                    className='form-horizontal floating-labels'
                    id='loginform'
                    action='index.html'
                    _lpchecked='1'
                  >
                    <a href='#/' className='text-center db'>
                      <img src='./assets/images/logo-icon.png' alt='Home' />
                      <br />
                      <img src='./assets/images/logo-text.png' alt='Home' />
                    </a>

                    <Input
                      type={'password'}
                      placeholder={'New Password'}
                      name={'newPassword'}
                      autoComplete={false}
                      required={false}
                      topStyle={'m-t-40'}
                      handleChange={this.handleChange}
                      handleValidationList={this.handleValidationList}
                    />

                    <Input
                      type={'password'}
                      placeholder={'Confirm Password'}
                      name={'confirmPassword'}
                      autoComplete={false}
                      required={false}
                      handleChange={this.handleChange}
                      password={this.state.newPassword}
                      handleValidationList={this.handleValidationList}
                    />

                    <Button
                      onClickSubmit={this.onCLickChangePassword}
                      isFormValid={this.isFormValid()}
                    >
                      Change Password
                    </Button>
                  </form>
                </div>
                <div
                  className='d-none d-xl-block col-xl-6'
                  style={{
                    backgroundImage: 'url(./assets/images/forgotpass01.png)',
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  componentDidMount() {
    setTimeout(() => this.props.offLoadingScreen(), 100);
    this.setEmailAccount();
  }
}

export default ResetPassword;
