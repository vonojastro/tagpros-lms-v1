import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogoutModal } from 'redux/actions/ui-elements';
import { logOut } from "redux/actions/auth";
import { useNavigate } from 'react-router';

export default function LogoutModal() {
  const nav = useNavigate()
  const dispatch = useDispatch();
  const show = useSelector((state) => state.uiElements.getIn(['logoutModal']));
  const toggleOff = () => dispatch(toggleLogoutModal(false))
  const NAVIGATE_PATH_AFTER_LOGOUT = useSelector((state)=>state.auth?.accountType?.includes("adm") ? "admin" : "login")
  const proceedLogout = () => { dispatch(logOut()); toggleOff(); nav(NAVIGATE_PATH_AFTER_LOGOUT); };

  return (
    <Modal
      size='m'
      show={show}
      backdrop='static'
      keyboard={false}
      onHide={toggleOff}
    >
      <Modal.Header>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to leave?</Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={proceedLogout}
        >
          Yes
        </Button>
        <Button variant='secondary' onClick={toggleOff}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
