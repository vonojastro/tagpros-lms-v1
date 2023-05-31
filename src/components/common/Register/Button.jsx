import React from 'react';

class Button extends React.Component {
  renderButton() {
    let { children, onClickSubmit, isFormValid } = this.props;

    return (
      <div className='form-group text-center m-t-20'>
        <div className='col-xs-12'>
          <button
            className='btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light'
            type='submit'
            onClick={(e) => onClickSubmit(e)}
            disabled={!isFormValid}
          >
            {children} <i className='fa fa-arrow-right m-l-5'></i>
          </button>
        </div>
      </div>
    );
  }

  render() {
    return this.renderButton();
  }
}
export default Button;
