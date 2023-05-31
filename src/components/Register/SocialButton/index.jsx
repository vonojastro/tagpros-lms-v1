import React from "react";
import { Button } from "react-bootstrap";
import SocialLogin from "react-social-login";

class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <Button variant="light" onClick={triggerLogin} {...props}>
        {children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);

