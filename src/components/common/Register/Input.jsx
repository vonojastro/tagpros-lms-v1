import React from 'react';
import schema from '../../../validators/registration';

import { errorMessage } from '../../../validators/errorMessages';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationType: '',
      isShowPassword: false,
    };
  }

  async onBlurValidate(event) {
		let { handleValidationList, password } = this.props;
    let { name, value } = event.target;

    try {
      if (name === 'confirmPassword') {
        value = { value, password };
      }

      await schema.validateAt(name, { [name]: value });

      this.setState({ validationType: 'valid' });
      handleValidationList({ name: name, isValid: true });
    } catch (error) {
      let errorType = error.errors.toString(); //* yup error: { ValidationError, errors }

      this.setState({ validationType: errorType });
      handleValidationList({ name: name, isValid: false });
    }
  }

  onClickShowHidePassword() {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  }

  handleInputType() {
    let { type } = this.props;
    let { isShowPassword } = this.state;

    if (type === 'password') {
      if (!isShowPassword) {
        return 'password';
      } else {
        return 'text';
      }
    }

    return type;
  }

  errorMessage() {
    let { validationType } = this.state;

    if (validationType) {
      if (validationType in errorMessage) {
        if (['too_short', 'too_long', 'special_char'].includes(validationType)) {
          return this.props.placeholder + errorMessage[validationType];
        }
        return errorMessage[validationType];
      }
    }

    return '';
  }

  validationFieldColor() {
    let { validationType } = this.state;

    if (validationType) {
      if (validationType in errorMessage) return 'has-danger has-error';
      else return 'has-success'; /**Enable valid field color */
    }

    return '';
  }

  validationInputIcon() {
    let { validationType } = this.state;

    if (validationType) {
      if (validationType in errorMessage) return 'is-invalid';
      else return 'valid-feedback';
    }

    return '';
  }

  validationMessage() {
    let { validationType } = this.state;

    if (validationType) {
      if (validationType in errorMessage) return 'invalid-feedback';
      else return 'valid-feedback';
    }

    return '';
  }

  renderEyeIcon() {
    let { type } = this.props;
    let { isShowPassword } = this.state;

    if (type === 'password') {
      if (!isShowPassword) {
        return (
          <span
            className='register input-icon'
            onClick={() => this.onClickShowHidePassword()}
          >
            <i className='far fa-eye-slash'></i>
          </span>
        );
      } else {
        return (
          <span
            className='register input-icon'
            onClick={() => this.onClickShowHidePassword()}
          >
            <i className='far fa-eye'></i>
          </span>
        );
      }
    }
  }

  renderValidationMessage() {
    let { name } = this.props;

    return <div className={this.validationMessage(name)}>{this.errorMessage(name)}</div>;
  }

  renderInput() {
    let { name, placeholder, required, autoComplete, handleChange } = this.props;

    return (
      <input
        className={`form-control ${this.validationInputIcon()}`}
        type={this.handleInputType()}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        name={name}
        onBlur={(e) => this.onBlurValidate(e)}
        onChange={(e) => {handleChange(e);this.onBlurValidate(e)}}
      />
    );
  }

  render() {
    return (
      <div className={`col-xs-12 ${this.props.topStyle ? this.props.topStyle : ''}`}>
        <div className={`form-group ${this.validationFieldColor()} has-feedback`}>
          {this.renderInput()}

          {this.renderEyeIcon()}
          <span className='bar'></span>

          {this.renderValidationMessage()}
        </div>
      </div>
    );
  }
}

export default Input;
