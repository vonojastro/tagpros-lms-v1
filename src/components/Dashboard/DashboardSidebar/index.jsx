import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/actions/auth';
import { Modal, Button } from 'react-bootstrap';
import LogoutButton from 'components/LogoutButton';
import DefaultPic from '../../../img/default-pic-blue1.png';

import './index.css';
import TeacherDashboardSidebar from './TeacherDashboardSidebar';
import FamilyDashboardSidebar from './FamilyDashboardSidebar';
import LearnerDashboardSidebar from './LearnerDashboardSidebar';
import AdminSidebar from './AdminSidebar';

export default function DashboardSidebar({ userType, applicationStatus }) {
  const dispatch = useDispatch();
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
  const { firstName, lastName, photo, type: accountType } = useSelector(state =>
    state.auth.user ? state.auth.user : {}
  );

  let accountTitle =
    userType === 'teacher'
      ? 'Teacher Account'
      : userType === 'family'
      ? 'Family Account'
      : userType === 'admin'
      ? 'Admin Account'
      : 'Solo Learner Account';

  if (userType === 'admin') {
    switch (accountType) {
      case 'admsa':
        accountTitle = 'Super Admin Account';
        break;
      case 'admma':
        accountTitle = 'Main Admin Account';
        break;
      case 'admhr':
        accountTitle = 'Human Resource Admin Account';
        break;
      case 'admeduc':
        accountTitle = 'Education Admin Account';
        break;
      case 'admacctg':
        accountTitle = 'Accounting Admin Account';
        break;
      case 'admmktg':
        accountTitle = 'Marketing Admin Account';
        break;
      case 'admcurator':
        accountTitle = 'Curator Admin Account';
        break;
      default:
        accountTitle = 'Admin Account';
    }
  }

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  return (
    <aside className='left-sidebar'>
      <div style={{ 
        // overflow: 'hidden', 
        width: 'auto', height: '100%' }}>
        <div className='user-profile' style={{ background: 'url() no-repeat' }}>
          <div className='profile-img'>
            <img
              src={!!photo ? photo : DefaultPic}
              alt='user'
              style={{ objectFit: 'cover' }}
            />{' '}
          </div>
          <div className='profile-text'>
            <a href='/profile' className='link u-dropdown' role='button'>
              {firstName + ' ' + lastName}
            </a>
            <p>
              <small>{accountTitle}</small>
            </p>
          </div>
        </div>

        <nav className='sidebar-nav' style={{ height: '90%' }}>
          {
            {
              teacher: <TeacherDashboardSidebar applicationStatus={applicationStatus} />,
              family: <FamilyDashboardSidebar />,
              learner: <LearnerDashboardSidebar />,
              admin: <AdminSidebar />
            }[userType]
          }
        </nav>

        <div
          className='sidebar-footer d-flex justify-content-center'
          style={{ marginBottom: '60px' }}
        >
          <a
            href='#!'
            className='link'
            data-toggle='tooltip'
            title='Settings'
            style={{ visibility: 'hidden' }}
          >
            <i className='ti-settings' />
          </a>
          <LogoutButton
            className='align-self-end mr-3'
            data-toggle='tooltip'
            title='Logout'
            iconOnly={true}
            color={'#455a64'}
          />
        </div>
      </div>
      <Modal
        size='m'
        show={showLogoutConfirmModal}
        backdrop='static'
        keyboard={false}
        onHide={() => {
          setShowLogoutConfirmModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to leave?</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClickLogout}>
            Yes
          </Button>
          <Button variant='secondary' onClick={() => setShowLogoutConfirmModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </aside>
  );
}
