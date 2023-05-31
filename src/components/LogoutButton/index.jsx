import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toggleLogoutModal } from 'redux/actions/ui-elements';

export default function LogoutButton({iconOnly, color}) {
  const dispatch = useDispatch();
  const toggleOn = e => {
    e.preventDefault();
    dispatch(toggleLogoutModal(true));
  };

  return (
    <Button variant='link' onClick={toggleOn}>
      <i className='fas fa-sign-out-alt' style={{color: color}}/> {iconOnly ? '' : 'Logout'}
    </Button>
  );
}
