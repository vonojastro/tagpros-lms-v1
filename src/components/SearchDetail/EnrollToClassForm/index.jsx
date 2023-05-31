import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";
import { CheckboxGroupControl } from "../../common/Form/Inputs";
// import { enrollClassSoloLearner } from "api/classEnroll";
import { enrollClassSuccess } from '../../../redux/actions/class';
// import { enrollClassSoloLearner, enrollClassFamily } from "api/classEnroll";
import { Button, Modal } from "react-bootstrap";
import "./index.css";
import { USER_TYPE, CLASS_STATUS, CLASS_STATUS_ALERT } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { api } from '../../../api';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayjs from "dayjs";
import { useEffect } from "react";
import styled from "styled-components";

export default function EnrollToClassForm({ userType, learners, classDetails, addToCart }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(LocalizedFormat);

  const [modalShow, setModalShow] = useState(false);
  const [promptShow, setPromptShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [classStatus, setStatus] = useState("");

  const isFamilyAccount = USER_TYPE.FMLY.toLowerCase() === userType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getOptions = () =>
    learners.map((learner) => ({ label: learner.nickname, value: learner }));

  const { status, message } = useSelector((state) => state.classes.get('enroll') ? state.classes.get('enroll') : {});
  const { classId } = classDetails;

  const isLoggedIn = useSelector((state) => state.auth.authToken);

  const checkIfEnrolledToClass = async(callback, learners) => {
    const learnersParam = learners ? learners.map(item => item.id) : null
    await api.post("/class-enroll/availability", {classId, userType, learners: learners? learnersParam.join(",") : null}).then(response => {
      if(response.data.status === 'success'){
        callback(true);
      }
    }).catch(err => {
      dispatch(enrollClassSuccess(err.response.data));
      setModalShow(true);
      callback(false);
    });
    setIsLoading(false);
  }

  const handleAddToCart = async (values) => {
    setIsLoading(true);
    checkIfEnrolledToClass(status => {
      if(status){
        addToCart(values);
      }
    }, values ? values.learners : null);
  }

  const submit = async (values) => {
    // We pass relevant information to CheckoutPage through location.state
    // CheckoutPage accesses state with useLocation hook
    setIsLoading(true);
    classDetails.enrollees = values ? values.learners : null;

    checkIfEnrolledToClass(status => {
      if(status){
        navigate(`/checkout`, { state: { classId, classes: [classDetails]} });
      }
    }, values ? values.learners : null);
  };

  const modalSubmit = (action) => {
    switch(action){
      case 'cancel': navigate('/'); break;
      case 'proceed': navigate(`/checkout`, { state: { classId, classes: [classDetails] } }); break;
      default: return;
    }
  };

  const Wrapper = styled.span`
    .btn-success {
      background: green;
      border: 1px solid green;
      text-transform: uppercase;
    }
  `

  useEffect(() => {
    // const enrollmentStart = classDetails.enrollmentStartDate;
    // const enrollmentEnd = classDetails.enrollmentEndDate;
    const startDate = classDetails.classType === "CLT002" ? classDetails.startDate : classDetails.availabilityStartDate;
    const endDate = classDetails.classType === "CLT002" ? classDetails.endDate : classDetails.availabilityEndDate;

    console.log(startDate);
    console.log(endDate)
    if(classDetails.status === 'CSTAT010'){
      setStatus("CLASS_ONGOING")
    }else if(classDetails.status === 'CSTAT011'){
        setStatus("CLASS_ENDED")
    }else{
        // if(!!enrollmentStart && dayjs().isBefore(dayjs(enrollmentStart), new Date())){
        //     setStatus("NOT_STARTED")
        // }else  if(!!enrollmentStart && !!enrollmentEnd && dayjs().isSameOrAfter(dayjs(enrollmentStart), new Date()) && dayjs().isSameOrBefore(dayjs(enrollmentEnd), new Date())){
        if(!!startDate && dayjs().isSameOrBefore(startDate)){
            setStatus("ONGOING_ENROLLMENT")
        }
        // else if(!!enrollmentEnd && !!startDate && dayjs().isAfter(dayjs(enrollmentEnd), new Date()) && dayjs().isBefore(dayjs(startDate), new Date())){
        //     setStatus("OPENS_SOON")
        // }
        else if(!!startDate && !!endDate && dayjs().isSameOrAfter(dayjs(startDate), new Date()) && dayjs().isSameOrBefore(dayjs(endDate), new Date())){
            setStatus("CLASS_ONGOING")
        }else{
            setStatus("CLASS_ENDED")
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOnSubmit = ()=>{
    if (!isLoggedIn) {
      setPromptShow(true);
    } else {
      submit();
    }
  }
  return (
    <Wrapper>
      <Form
        onSubmit={handleOnSubmit}
        // onSubmit={!isLoggedIn ? () => window.location.href = '/register' : submit}
        render={({ handleSubmit, values }) => (
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid #DDD" }}>
            {isFamilyAccount && (
              <div className="row">
                <div className="col-xs-12 col-md-6">
                  <h5>Who will attend this class?</h5>
                </div>
                <div className="col-xs-12 col-md-6 text-right">
                  {/* <a href="#"><i className="fa fa-plus mr-2" /> Add Learners</a> */}
                </div>
              </div>
            )}

            {classStatus === 'ONGOING_ENROLLMENT' && <form onSubmit={handleSubmit} id="enroll-to-class">
              {isFamilyAccount && (
                <CheckboxGroupControl options={getOptions()} name="learners"/>
              )}

              <button
                className="btn btn-success mt-2 w-100"
                disabled={(isFamilyAccount ? !values.learners?.length > 0 : false) || isLoading }
                onClick={!isLoggedIn ? () => window.location.href = '/register' : () => handleAddToCart(values)}
                type="button"
                // onClick={onClickEnrollClass}
                // disabled={!learnerId && userType !== USER_TYPE.LRNR.toLowerCase()}
              >
                {/* ADD CLASS TO CART */}
                <span style={{ display: isLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                Add to Cart
              </button>
              <button
                className="btn btn-success mt-2 w-100"
                disabled={(isFamilyAccount ? !values.learners?.length > 0 : false) || isLoading || classDetails.status !== CLASS_STATUS.APPROVEDEDUC}
                // onClick={onClickEnrollClass}
                // disabled={!learnerId && userType !== USER_TYPE.LRNR.toLowerCase()}
              >
                {/* ADD CLASS TO CART */}
                <span style={{ display: isLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                ENROLL NOW
              </button>
            </form>}
            
            {classStatus !== "" && classStatus !== 'ONGOING_ENROLLMENT' && <div className={`alert alert-${CLASS_STATUS_ALERT[classStatus].type} text-center`} role="alert">
                <i className={`${CLASS_STATUS_ALERT[classStatus].icon} mr-2`} style={{color:"orange"}}></i>
                {CLASS_STATUS_ALERT[classStatus].message} 
                {/* {classStatus === "NOT_STARTED" && classDetails.enrollmentStartDate && (<b>{dayjs(classDetails.enrollmentStartDate).format('ll')}</b>)} */}
            </div>}
          </div>
        )}
      />
      <Modal size="m" show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {status === "success" ? "Enrollment Pending" : "Enrollment Failed"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {message} {status === "success" ? "Proceed to Payment?" : "Find other classes?"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {status === "error" && (
            <Button variant="primary" onClick={() => modalSubmit("cancel")}>
              Continue
            </Button>
          )}
          {status === "success" && (
            <Button variant="link" onClick={() => modalSubmit("cancel")}>
              Maybe Later
            </Button>
          )}
          {status === "success" && (
            <Button variant="primary" onClick={() => modalSubmit("proceed")}>
              Proceed
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal size="m" show={promptShow} onHide={() => setPromptShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Continue to Login/Register?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You should login to your account to proceed with enrollment.
          </p>
        </Modal.Body>
        <Modal.Footer>
          {
            <Button variant="danger" 
            onClick={() => setPromptShow(false)}
            >
              Cancel
            </Button>
          }
          {
            <Button variant="primary" onClick={() => window.location.href = '/register'}>
              Proceed
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
}