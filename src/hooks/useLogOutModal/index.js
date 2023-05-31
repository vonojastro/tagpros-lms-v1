import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/actions/auth';
/**
 * @param  {any} [ confirmLogOutMessage ] - Content / message to be shown upon calling the click handler. 
 */
export const useLogOutModal = (
  confirmLogOutMessage = 'Are you sure you want to log out?'
) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const dispatch = useDispatch();
  return [
    <Modal size='m' show={open} backdrop='static' keyboard={false} onHide={toggleOpen}>
      <Modal.Header>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>{confirmLogOutMessage}</Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            dispatch(logOut());
            toggleOpen();
          }}
        >
          Yes
        </Button>
        <Button variant='secondary' onClick={toggleOpen}>
          No
        </Button>
      </Modal.Footer>
    </Modal>,
    toggleOpen
  ];
};
