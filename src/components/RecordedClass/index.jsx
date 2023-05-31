import React, { useState } from 'react';
import 'css/new-age.scoped.css';
import { useDispatch, useSelector } from 'react-redux';
import P from 'components/Page';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
// import Helmet from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getClassDetails } from 'api/class';
import { useNavigate } from 'react-router-dom';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Tagpi from 'components/common/Tagpi';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import ReactPlayer from 'react-player';
import { api } from '../../api';
// import OverflowSection from 'components/Page/OverflowSection';
// import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

const Page = styled(P)`
  .img-main__container {
    height: 20rem !important;
  }
  .img-main {
    height: 100% !important;
    width: 100% !important;
    object-fit: contain !important;
  }
`;

export default function RecordedClass() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classId } = useParams();
  const [index, setIndex] = useState(0);
  const [moduleProgress, setModuleProgress] = useState([]);
  // const { loading, error, user, success } = useSelector(state => state.auth);

  const classDetails = useSelector(state =>
    state.classes ? state.classes.getIn(['data', 'class']) : []
  );

  let loading = useSelector(state => state.uiElements.getIn(['loadingScreen']));

  const loadData = () => {
    // setLearnerId("")
    getModuleProgress();
  };

  const nextModule = source => {
    if (source === 'previous') {
      setIndex(index - 1);
    } else {
      setIndex(index + 1);
    }
  };

  const isChecked = id => {
    return moduleProgress[0]?.lectureIds?.indexOf(id) > -1;
  };

  const getModuleProgress = async () => {
    await getClassDetails(dispatch, { id: classId });
    await api
      .post('/class/moduleProgress', { recordedId: classDetails?.recordedId })
      .then(response => {
        setModuleProgress(response?.data);
        console.log(response?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const showPopQuiz = (id, quizzes) => {
    console.log(quizzes);
    navigate('/popQuiz/', {
      state: {
        quiz: quizzes,
        classId: classId,
        recordedItemId: id,
        recordedId: classDetails.recordedId
      }
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page withNavBar withFooter>
      <Modal
        size='m'
        // show={showLogoutConfirmModal}
        // backdrop='static'
        // keyboard={false}
        // onHide={() => {
        //   setShowLogoutConfirmModal(false);
        // }}
      >
        <Modal.Header>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to leave?</Modal.Body>
        <Modal.Footer>
          <Button variant='primary'>Yes</Button>
          <Button variant='secondary'>No</Button>
        </Modal.Footer>
      </Modal>

      <div style={{ height: !!loading ? '600px' : '' }}>
        {!!loading ? (
          <div className={`col-sm-9 float-right p-0 order-first order-sm-last col-md-12`}>
            <Tagpi type='loading' dataName='Class Details' showSpinner={true} />
          </div>
        ) : (
          <>
            <div className='row' style={{ backgroundColor: 'rgb(232 245 255)' }}>
              <div className='col'>
                <h2 className='p-2 mt-2'>{classDetails.title}</h2>
              </div>
              <div className='col d-flex justify-content-end'>
                <p className='mt-3'>
                  <b>Progress:</b>{' '}
                  <medium style={{ color: '#1d72bc' }}>
                    {moduleProgress[0]?.lectureIds?.length} out{' '}
                    {classDetails.lectures?.length} Modules
                  </medium>
                </p>
              </div>
            </div>

            <div className='row' style={{ backgroundColor: 'rgb(232 245 255)' }}>
              <div className='col-3'>
                {/* {classDetails?.lectures.forEach(item=> console.log(item))} */}
                {classDetails.lectures?.map((lecture, idx) => {
                  return (
                    <div
                      className='row p-2 d-flex justify-content-column align-items-center'
                      style={{
                        borderBottom: 'solid 1px #c6c6c6',
                        backgroundColor: index ===  idx? '#2075c8' : "white",
                        color: index === idx ? 'white' : "black",
                        marginRight: '-10px',
                        borderRadius: '2px',
                        marginBottom: '1px',
                      }}
                    >
                      <div className='col'>
                        <p className='m-0 p-0'>{lecture.title}</p>
                      </div>
                      <div>
                        <input
                          type='checkbox'
                          id={lecture.id}
                          checked={isChecked(lecture.id)}
                          disabled={true}
                        />
                        <label for={lecture.id} className='mt-2' />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='col ' style={{ backgroundColor: 'white' }}>
                <div className='row'>
                  <ReactPlayer
                    autoPlay
                    url={
                      classDetails.lectures[0]?.videoLink
                    }
                    style={{ marginBottom: 10 }}
                    width={'100%'}
                    controls
                    height={'350px'}
                  />
                </div>

                <div className='row'>
                  <div className='col'>
                    <h2>
                      <b>
                        {
                          classDetails.lectures[index]
                            .title
                        }
                      </b>
                    </h2>
                  </div>
                  <div className='col ml-5'>
                    <div className='row d-flex justify-content-center ml-5'>
                      <p className='ml-5 m-0'>
                        <small>Click the button below to test your skills</small>
                      </p>
                    </div>
                    <div className='row d-flex justify-content-center ml-5'>
                      <button
                        class='btn-outline-info p-1 ml-5'
                        type='button'
                        style={{ borderRadius: '4px', width: '75%' }}
                        onClick={() =>
                          showPopQuiz(
                            classDetails.lectures[index]
                              .id,
                            classDetails.lectures[index]
                              .questions
                          )
                        }
                      >
                        Pop quiz
                      </button>
                    </div>
                  </div>
                </div>
                <div className='row ml-1'>
                  <p className='m-0' style={{ color: 'GrayText' }}>
                    <i>Availability</i>
                  </p>
                </div>
                <div className='row ml-1'>
                  <p>
                    <b>
                      {dayjs(classDetails.availabilityStartDate).format('MMMM D, YYYY')}{' '}
                      to {dayjs(classDetails.availabilityEndDate).format('MMMM D, YYYY')}
                    </b>
                  </p>
                </div>
                <div className='row ml-1'>
                  <p className='m-0' style={{ color: 'GrayText' }}>
                    <i>Description</i>
                  </p>
                </div>
                <div className='row ml-1'>
                  <p>
                    {
                      classDetails.lectures[index]
                        .description
                    }
                  </p>
                </div>
                <div className='row mb-2'>
                  <div className='col'>
                    <button
                      type='button'
                      className='btn btn-link'
                      onClick={() => nextModule('previous')}
                      disabled={index === 0}
                    >
                      <i class='fas fa-arrow-left' /> Previous
                    </button>
                  </div>
                  <div className='col d-flex justify-content-end'>
                    <button
                      type='button'
                      className={
                        index === classDetails.lectures?.length - 1
                          ? 'btn btn-info'
                          : 'btn btn-link'
                      }
                      disabled={!(moduleProgress[0]?.lectureIds?.indexOf(classDetails.lectures[index].id) > -1)}
                      onClick={() => nextModule('next')}
                    >
                      {index === classDetails.lectures?.length -1 ? (
                        'Finish'
                      ) : (
                        <>
                          {' '}
                          Next <i class='fas fa-arrow-right' />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Page>
  );
}
