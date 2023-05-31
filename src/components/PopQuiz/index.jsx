import React, { useState } from 'react';
import 'css/new-age.scoped.css';
import { useDispatch, useSelector } from 'react-redux';
import P from 'components/Page';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
// import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { getClassDetails } from 'api/class';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

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

export default function PopQuiz() {
  const location = useLocation();
  const dispatch = useDispatch();
  const classId = location.state.classId;
  const [quizzes] = useState(location.state.quiz);
  const [recordedItemId] = useState(location.state.recordedItemId);
  const [recordedId] = useState(location.state.recordedId)
  const [idx, setIndex] = useState(0);
  const [record, setRecord] = useState({});
  const [answers, setAnswers] = useState({});
  let [score] = useState(0);
  const navigate = useNavigate();

  const classDetails = useSelector(state =>
    state.classes ? state.classes.getIn(['data', 'class']) : []
  );

  const loadData = async () => {
    // setLearnerId("")
    getClassDetails(dispatch, { id: classId });
    api
      .post('/class/quizRecord', { recordedItemId: recordedItemId })
      .then(response => {
        setRecord(response?.data);
        console.log(response?.data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(record);
    console.log(quizzes);
    console.log(recordedItemId);
  };

  const nextModule = source => {
    if (source === 'previous') {
      setIndex(idx - 1);
    } else {
      setIndex(idx + 1);
    }
  };

  const selectAnswer = answer => {
    setAnswers(prevState => ({
      ...prevState,
      [quizzes[idx].questionId]: {
        user_answer: answer,
        correct_answer: quizzes[idx].choices?.filter(
          item => item.isAnswer === 'true'
        )[0].choiceId
      }
    }));
  };

  const isSelected = id => {
    return answers[quizzes[idx].questionId]?.user_answer === id;
  };

  const filledUpAllAnswers = () => {
    const keys = Object.keys(answers);
    console.log(keys.length === quizzes.length);
    return keys.length === quizzes.length;
  };

  const submit = async () => {
    const keys = Object.keys(answers);
    console.log(keys)

    await keys.forEach(item =>{
      if(answers[item].user_answer === answers[item].correct_answer){
        score++
      }
    })

    api.post('/class/recordLearnerQuiz', { recorded: recordedId, recordedItemId: recordedItemId, answers: answers,  score: score})
    .then(response => {
      setRecord(response?.data);
      console.log(response?.data);
      navigate('/ViewRecorded/' + classId)
    })
    .catch(error => {
      console.log(error);
    });
  }

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

      <div>
        <div className='row' style={{ backgroundColor: "rgb(232 245 255)" }}>
          <h3 className='p-3'>
            <b>{classDetails.title}</b>
          </h3>
        </div>

        <div className='row'>
          {/* 
      {quizzes.length ? 
     <>
     
     </> 
    } */}

          <div className='col-3' style={{ backgroundColor: 'rgb(232 245 255)' }}>
            {/* {classDetails.lectures.map((element)=>{return <p>{element.title}</p>})} */}
            {quizzes.map((item, index) => {
              return (
                <div
                      className='row p-2 d-flex justify-content-column align-items-center'
                      style={{
                        borderBottom: 'solid 1px #c6c6c6',
                        backgroundColor: index === idx? '#2075c8' : "white",
                        color: index === idx ? 'white' : "black",
                        marginRight: '-10px',
                        borderRadius: '2px',
                        marginBottom: '1px',
                      }}
                    >
                  <div className='col' onClick={()=> setIndex(index)}>
                    <p className='m-0 p-0'>Question {index + 1}</p>
                  </div>
                  <div>
                    {/* <i class="fa-light fa-stop"></i> */}
                    <input
                      type='checkbox'
                      id={quizzes[index].questionId}
                      checked={answers[quizzes[index].questionId]}
                      disabled={true}
                    />
                    <label for={quizzes[index].questionId} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className='col mt-3' >
            <div className='row ml-2'>
              <div className='col'>
                <h2>Question {idx + 1}</h2>
              </div>
              <div className='col d-flex justify-content-end'>
                <p>
                  <b>Progress:</b> <medium style={{color: "#1d72bc"}}> {Object.keys(answers).length} out {quizzes.length}{' '}
                  Questions Answered</medium>
                </p>
              </div>
            </div>
            <div
              className='mb-5'
              style={{ backgroundColor: '#eef3f9', padding: '30px', borderRadius: "10px" }}
            >
              <div className='row ml-1'>
                <p>
                  {idx + 1}. {quizzes[idx].questionContent}
                </p>
              </div>
              <div className='row mb-2'>
                <div className='col-1 d-flex align-items-center'>
                  <input
                    type='radio'
                    id='radio1'
                    onChange={() => selectAnswer(quizzes[idx].choices[0].choiceId)}
                    checked={isSelected(quizzes[idx].choices[0].choiceId)}
                  />
                  <label for='radio1' />
                </div>
                <div
                  className='col'
                  style={{ backgroundColor: 'white', borderRadius: '12px' }}
                >
                  <p className='p-2'>{quizzes[idx].choices[0].choiceContent}</p>
                </div>
                <div className='col-1 d-flex align-items-center'>
                  <input
                    type='radio'
                    id='radio2'
                    onChange={() => selectAnswer(quizzes[idx].choices[1].choiceId)}
                    checked={isSelected(quizzes[idx].choices[1].choiceId)}
                  />
                  <label for='radio2' />
                </div>
                <div
                  className='col mr-3'
                  style={{ backgroundColor: 'white', borderRadius: '12px' }}
                >
                  <p className='p-2'>{quizzes[idx].choices[1].choiceContent}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-1 d-flex align-items-center'>
                  <input
                    type='radio'
                    id='radio3'
                    onChange={() => selectAnswer(quizzes[idx].choices[2].choiceId)}
                    checked={isSelected(quizzes[idx].choices[2].choiceId)}
                  />
                  <label for='radio3' />
                </div>
                <div
                  className='col'
                  style={{ backgroundColor: 'white', borderRadius: '12px' }}
                >
                  <p className='p-2'>{quizzes[idx].choices[2].choiceContent}</p>
                </div>
                <div className='col-1 d-flex align-items-center'>
                  <input
                    type='radio'
                    id='radio4'
                    onChange={() => selectAnswer(quizzes[idx].choices[3].choiceId)}
                    checked={isSelected(quizzes[idx].choices[3].choiceId)}
                  />
                  <label for='radio4' />
                </div>
                <div
                  className='col mr-3'
                  style={{ backgroundColor: 'white', borderRadius: '12px' }}
                >
                  <p className='p-2'>{quizzes[idx].choices[3].choiceContent}</p>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <button
                  type='button'
                  className='btn btn-link'
                  onClick={() => nextModule('previous')}
                  disabled={idx === 0}
                >
                  <i class='fas fa-arrow-left' /> Previous
                </button>
              </div>
              <div className='col d-flex justify-content-end'>
                <button
                  type='button'
                  className={
                    idx + 1 === quizzes.length ? 'btn btn-info' : 'btn btn-link'
                  }
                  disabled={
                    idx + 1 === quizzes.length
                      ? filledUpAllAnswers()
                        ? false
                        : true
                      : false
                  }
                  onClick={() => {idx + 1 === quizzes.length ? submit() : nextModule('next')}}
                >
                  {idx + 1 === quizzes.length ? (
                    'Submit'
                  ) : (
                    <>
                      {' '}
                      Next <i class='fas fa-arrow-right' />{' '}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
