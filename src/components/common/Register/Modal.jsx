import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnHoverStyle: {},
      style: {
        mouseHover: {
          cursor: 'pointer',
          display: 'inline-block',
          backgroundColor: 'rgb(140, 212, 245)',
          boxShadow:
            'rgba(140, 212, 245, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset',
        },
        mouseUnHover: {
          display: 'inline-block',
          backgroundColor: 'rgb(134, 204, 235)',
          boxShadow:
            'rgba(140, 212, 245, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset',
        },
      },
    };
  }

  handleBtnHover(val) {
    this.setState({ btnHoverStyle: val });
  }

  renderOpacity() {
    return (
      <div
        className='sweet-overlay'
        tabIndex='-1'
        style={{ opacity: '1.07', display: 'block' }}
      ></div>
    );
  }

  renderWhiteBox() {
    let { isSuccess } = this.props;

    return (
      <div
        className='sweet-alert showSweetAlert visible'
        data-custom-classname=''
        data-has-cancel-button='false'
        data-has-confirm-button='true'
        data-allow-outside-click='false'
        data-has-done-function='false'
        data-animation='pop'
        data-timer='null'
        style={{ display: 'block', marginTop: '-178px' }}
      >
        {isSuccess ? this.renderSuccessIcon() : this.renderErrorIcon()}
        {this.renderTextContents(isSuccess)}
        {this.renderButton()}
      </div>
    );
  }

  renderButton() {
    let { onClose } = this.props;
    let { style } = this.state;

    return (
      <div className='sa-button-container'>
        <div className='sa-confirm-button-container'>
          <button
            className='confirm'
            tabIndex='1'
            onMouseOver={() => this.handleBtnHover(style.mouseHover)}
            onMouseLeave={() => this.handleBtnHover(style.mouseUnHover)}
            onClick={() => onClose()}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  renderTextContents() {
    let { isSuccess, content } = this.props;
    let { title, message } = content;

    if (!title) {
      title = isSuccess ? 'Success!' : 'Error!';
    }

    return (
      <>
        <h2>{isSuccess ? title:"Error"}</h2>
        <p style={{ display: 'block' }}>{message}</p>
      </>
    );
  }

  renderErrorIcon() {
    return (
      <div className='sa-icon sa-error animateErrorIcon' style={{ display: 'block' }}>
        <span className='sa-x-mark animateXMark'>
          <span className='sa-line sa-left'></span>
          <span className='sa-line sa-right'></span>
        </span>
      </div>
    );
  }

  renderSuccessIcon() {
    return (
      <div className='sa-icon sa-success animate' style={{ display: 'block' }}>
        <span className='sa-line sa-tip animateSuccessTip'></span>
        <span className='sa-line sa-long animateSuccessLong'></span>

        <div className='sa-placeholder'></div>
        <div className='sa-fix'></div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ display: 'block' }}>
        {this.renderOpacity()}
        {this.renderWhiteBox()}
      </div>
    );
  }
}
export default Modal;
