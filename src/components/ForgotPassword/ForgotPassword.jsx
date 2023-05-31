import React from 'react';

import Modal from '../common/Register/Modal';
import PageLoader from '../common/Register/PageLoader';
import Input from '../common/Register/Input';
import Button from 'components/common/Register/Button';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isModalOpen: false,
      errorList: [{ email: false }], // Add Input fields
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleValidationList = this.handleValidationList.bind(this);
    this.onCLickResetPassword = this.onCLickResetPassword.bind(this);
  }

  handleValidationList(args) {
    let { name, isValid } = args;
    // let { errorList } = this.state;
    // let duplicateErrorList = errorList.slice();

    // if (errorList.length === 0) {
    //   duplicateErrorList.push({ [name]: isValid });

    //   this.setState({ errorList: duplicateErrorList });
    // } else {
    //   duplicateErrorList.map((fieldObj) => {
    //     if (!fieldObj.hasOwnProperty(name)) {
    //       duplicateErrorList.push({ [name]: isValid });
    //     }

    //     return duplicateErrorList;
    //   });
    // }

    this.setState((prevState) => ({
      errorList: prevState.errorList.map((fieldObj) =>
        fieldObj.hasOwnProperty(name) ? { ...fieldObj, [name]: isValid } : fieldObj
      ),
    }));
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

  onCLickResetPassword(event) {
    event.preventDefault();

    this.handleModal(); //* Open Modal.

    var { email } = this.state;

    this.props.forgotPassword({ email });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
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

  renderPageLoad() {
    return this.isPageLoaderShow() && <PageLoader />;
  }

  renderModal() {
    return (
      this.isModalShow() && (
        <Modal
          content={{ title: 'Email Sent', message: this.props.message }}
          isSuccess={this.isModalSuccess()}
          onClose={this.handleModal}
        />
      )
    );
  }

  render() {
    return (
      <>
        {this.renderPageLoad()}
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
            <div className='card-body d-flex w-100'>
              
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
                    <div className='form-group m-t-40'>
                      <div className='col-xs-12'>
                        <h3 className='box-title m-b-20'>Forgot Password?</h3>
                      </div>
                    </div>

                    <Input
                      type={'text'}
                      placeholder={'Email'}
                      name={'email'}
                      autoComplete={false}
                      required={false}
                      handleChange={this.handleChange}
                      handleValidationList={this.handleValidationList}
                    />

                    <Button
                      onClickSubmit={this.onCLickResetPassword}
                      isFormValid={this.isFormValid()}
                    >
                      Reset Password
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
        </section>
      </>
    );
  }

  componentDidMount() {
    setTimeout(() => this.props.offLoadingScreen(), 100);
  }
}

export default ForgotPassword;
