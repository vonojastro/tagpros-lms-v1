/* eslint-disable react-hooks/exhaustive-deps */
import 'bootstrap/dist/css/bootstrap.css';
import { useBeforeunload } from 'react-beforeunload';
import React, { useEffect, useState } from 'react';
import { JitsiMeeting as Jitsi } from '@jitsi/react-sdk';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import ProtectedRoute from 'components/ProtectedRoute';
import { getMeeting } from 'api/meetings';
import { useParams } from 'react-router';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

/**
 * @typedef {import('@jitsi/react-sdk/lib/types/IJitsiMeetExternalApi').default} api
 */
/**
 * @typedef {Function} apiSetter
 */
function JitsiMeeting() {
  /**
   * @type {[api, apiSetter]}
   */
  const [api, setApi] = useState(null);
  const { userInfo, userType } = useSelector(state => {
    return {
      userType: state?.auth?.user?.type,
      userInfo: {
        displayName: state.auth?.user?.nickname.length
          ? state.auth?.user?.nickname
          : state.auth?.user.firstName + ' ' + state.auth?.user.lastName,
        email: state.auth?.user?.email
      }
    };
  });
  const [recording, setRecording] = useState(false);
  const dispatch = useDispatch();
  const meeting = useSelector(s => s?.meetings?.meeting);
  const {dropboxClientId, dropboxAccessToken} = meeting || {};

  const handleReadyClosed = () => {
    stopRecording();
  };

  const canSecureMeeting = userType === 'teacher';
  const canVerifyParticipant = userType === 'teacher';
  const canRecordMeeting = userType === 'teacher';

  const secureMeeting = () => {
    if (canSecureMeeting) {
      // api.executeCommand('password', params.id);
      // api.executeCommand('toggleLobby', true);
    }
  };

  const initIFrame = iFrameRef => {
    iFrameRef.style.height = '100%';
  };
  const handleVideoConferenceJoined = () =>
    //   {
    //   roomName,
    //   id,
    //   displayName,
    //   avatarURL,
    //   breakoutRoom,
    // }
    {
      secureMeeting();
    };

  useBeforeunload(event => {
    event.preventDefault();
    stopRecording();
  });
  const participantIsAllowedInMeeting = participantId => true; /* Should be implemented */
  const verifyParticipant = ({ id: participantId }) => {
    if (canVerifyParticipant && !participantIsAllowedInMeeting(participantId)) {
      api?.executeCommand('kickParticipant', participantId);
    }
  };
  const photo = useSelector(s => s.auth?.user?.photo);
  const setMyProfile = () => {
    api?.executeCommand('avatarURL', photo);
  };
  const handleParticipantJoinedOnce = () => {
    startRecording();
    setMyProfile();
  };

  const handleParticipantJoined = ({ id, displayName }) => {
    verifyParticipant({ displayName, id });
  };

  const stopRecording = () => {
    if (canRecordMeeting) {
      api?.stopRecording('file');
      setRecording(false);
    }
  };

  const startRecording = () => {
    if (canRecordMeeting) {
      api?.startRecording({
        mode: 'file',
        dropboxToken: dropboxAccessToken
      });
      setRecording(true);
    }
  };

  const continueRecording = () => {
    const numberOfParticipants = api?.getNumberOfParticipants();
    const shouldContinueRecording = numberOfParticipants > 0;
    if (shouldContinueRecording) startRecording();
  };

  useEffect(() => {
    if (api) {
      api.once('videoConferenceJoined', handleVideoConferenceJoined);
      api.once('participantJoined', handleParticipantJoinedOnce);
      api.on('participantJoined', handleParticipantJoined);
      continueRecording();
    }

    return api?.removeAllListeners;
  }, [!!api]);
  const params = useParams();
  const [showConfirmEndModal, setShowConfirmEndModal] = useState(false);

  const handleCloseConfirmEndModal = () => setShowConfirmEndModal(false);
  const handleShowConfirmEndModal = () => setShowConfirmEndModal(true);
  const handleEndMeeting = () => {
    stopRecording();
    handleCloseConfirmEndModal();
  };

  return (
    <ProtectedRoute isAllowed={() => getMeeting(dispatch, params.id)}>
      <Wrapper>
        {canRecordMeeting && recording && (
          <Button
            style={{ position: 'absolute', top: 10, left: 10 }}
            variant='secondary'
            onClick={handleShowConfirmEndModal}
          >
            <i className='fas fa-phone-alt mr-2' />
            End Class
          </Button>
        )}
        <Modal show={showConfirmEndModal} onHide={handleCloseConfirmEndModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm end class</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleEndMeeting}>
              Confirm
            </Button>
            <Button variant='primary' onClick={handleCloseConfirmEndModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Jitsi
          onReadyToClose={handleReadyClosed}
          getIFrameRef={initIFrame}
          userInfo={userInfo}
          roomName={meeting?.room}
          onApiReady={setApi}
          interfaceConfigOverwrite={{
            APP_NAME: 'Tagpros'
          }}
          configOverwrite={{
            apiLogLevels: [],
            remoteVideoMenu: {
              disableKick: !canSecureMeeting
            },
            autoKnockLobby: true,
            prejoinPageEnabled: false,
            toolbarButtons: [
              'camera',
              'chat',
              'fullscreen',
              'participants-pane',
              'raisehand',
              'tileview',
              'toggle-camera',
              'videoquality',
              'microphone',
              'desktop',
              'hangup'
            ],
            localSubject: meeting?.title,
            readOnlyName: true,
            dropbox: {
              appKey: dropboxClientId 
            },
            fileRecordingsServiceEnabled: true
          }}
        />
      </Wrapper>
    </ProtectedRoute>
  );
}

export default JitsiMeeting;
