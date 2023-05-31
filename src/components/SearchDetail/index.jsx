import React, { useState } from 'react';
import 'css/new-age.scoped.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getClassDetails } from 'api/class';
import { addItemToCart, getShoppingCart, updateCartItem } from 'api/cart';
import { getLearners } from 'api/learners';
import { USER_TYPE } from 'utils/constants';
import Helmet from 'react-helmet';
import moment from 'moment-timezone';
import { getDuration, toMoneyFormat } from 'utils/utils';
import { logOut } from 'redux/actions/auth';
import EnrollToClassForm from './EnrollToClassForm/index';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import { getEnrolledClass } from '../../api/class';
// import ClassRecordings from "components/ClassRecordings";
import he from 'he';
import Tagpi from 'components/common/Tagpi';
import P from 'components/Page';
import styled from 'styled-components';
// import { top } from '@popperjs/core';

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
export default function SearchDetail() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);

  const { classId } = useParams();
  let navigate = useNavigate();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  const classDetails = useSelector(state =>
    state.classes ? state.classes.getIn(['data', 'class']) : []
  );
  const enrolledClasses = useSelector(state =>
    state.classes ? state.classes.getIn(['data', 'enrolledClass']) : []
  );
  const learners = useSelector(state => (state.learners ? state.learners.data : []));
  const userType = useSelector(state =>
    state.auth.accountType ? state.auth.accountType : null
  );
  const isLoggedIn = useSelector(state => state.auth.authToken);
  const cartArray = useSelector(state =>
    state.cart ? state.cart.getIn(['data', 'cart']) : []
  );
  const userAccountId = useSelector(state => state.auth?.user?.accountId);
  // eslint-disable-next-line eqeqeq
  // const isClassCreator = classDetails?.teacherId == userAccountId;
  // const { status, message } = useSelector((state) => state.classes.get('enroll') ? state.classes.get('enroll') : {});

  // const [learnerId, setLearnerId] = useState("");
  let loading = useSelector(state => state.uiElements.getIn(['loadingScreen']));
  const isEnrolledToClass = () =>
    enrolledClasses.find(detail => detail.classId === classId);

  const loadData = async () => {
    // setLearnerId("")
    getClassDetails(dispatch, { id: classId });
    if (isLoggedIn) {
      getShoppingCart(dispatch);
      getEnrolledClass(dispatch);
    }
    const getLearnersParams = { notEnrolledInClass: classId }; // Only show learners w/o pending enrollment for this class
    if (isLoggedIn) {
      getLearners(dispatch, getLearnersParams);
    }
    
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDate = moment(
    classDetails.availableDates && classDetails.availableDates.length > 0
      ? classDetails.availableDates[0]
      : classDetails.startDate
  ).format('YYYY-MM-DD');

  const shouldAllowEnrollToClassAction =
    isLoggedIn &&
    moment(startDate + ' ' + classDetails.startTime, 'YYYY-MM-DD hh:mm A') > moment();

  const addToCart = async values => {
    const enrollees =
      values && values.learners
        ? values.learners.map(({ id, nickname, photo }) => ({ id, nickname, photo }))
        : null;
    const idx = cartArray.findIndex(item => item.classId === classDetails.classId);
    if (idx === -1) {
      classDetails.enrollees = enrollees;
      addItemToCart(dispatch, { classId: classDetails.classId, enrollees }, response => {
        if (response) toast.success('Class has been added to your cart');
        getShoppingCart(dispatch);
      });
    } else {
      if (enrollees) {
        const enrolleesInCart = JSON.parse(cartArray[idx].enrollees).map(item => item.id);
        const enrolleesToBeAdded = enrollees.map(item => item.id);
        if (enrolleesToBeAdded.sort().toString() === enrolleesInCart.sort().toString()) {
          toast.warning('This Class is already in your cart');
        } else {
          updateCartItem(
            dispatch,
            { cartId: cartArray[idx].cartId, enrollees },
            response => {
              if (response) {
                toast.success('Class has been added to your cart');
              }
              getShoppingCart(dispatch);
            }
          );
        }
      } else {
        toast.warning('This Class is already in your cart');
      }
    }
  };

  return (
    <Page withNavBar withFooter>
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
          <Button
            variant='primary'
            onClick={() => {
              dispatch(logOut());
              setShowLogoutConfirmModal(false);
            }}
          >
            Yes
          </Button>
          <Button variant='secondary' onClick={() => setShowLogoutConfirmModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Helmet>
        <link href='./css/b-style.css' rel='stylesheet' type='text/css' />
        {/* <link href='./vendor/bootstrap/css/bootstrap.min.css' rel='stylesheet' />
        <link rel='stylesheet' href='./css/new-age.css' />
        <link href='./css/swiper.min.css' rel='stylesheet' type='text/css' />
        <link href='./css/b-style.css' rel='stylesheet' type='text/css' />

        <link href='./vendor/fontawesome-free/css/all.min.css' rel='stylesheet' />
        <link
          rel='stylesheet'
          href='./vendor/simple-line-icons/css/simple-line-icons.css'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Source+Sans+Pro:wght@400;600&display=swap'
          rel='stylesheet'
        />

        <script src='./vendor/jquery/jquery.min.js' />
        <script src='./vendor/bootstrap/js/bootstrap.bundle.min.js' />
        <script src='./js/swiper.jquery.min.js' />
        <script src='./js/jquery-ui.min.js' />
        <script src='./js/isotope.pkgd.min.js' />
        <script src='./js/simple-lightbox.min.js' />
        <script src='./js/jquery.sumoselect.min.js' />
        <script src='./js/global.js' /> */}
      </Helmet>
      <div className='is-mobile' />
      {/* LOADER */}
      <div id='loader-wrapper' style={{ display: 'none' }}>
        <div className='loader' />
      </div>
      {/*end LOADER */}
      <div class='card card-default'>
        <div class='card-body'>
          <div className='is-mobile' />
          {/* LOADER */}
          <div id='loader-wrapper'>
            <div className='loader' />
          </div>

          {/*end LOADER */}

          <section
            id='content'
            className='tagpros-search pt-0'
            style={{ minHeight: '100vh' }}
          >
            {true && (
              <div className='shop'>
                {/* products */}
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='empty-space h40-md' />
                      <div className='row'>
                        {!!loading ? (
                          <div
                            className={`col-sm-9 float-right p-0 order-first order-sm-last col-md-12`}
                          >
                            <Tagpi
                              type='loading'
                              dataName='Class Details'
                              showSpinner={true}
                            />
                          </div>
                        ) : (
                          classDetails.title && (
                            <div className='col-md-12 col-sm-12 pull-right'>
                              <div className='detail-item'>
                                <div className='row'>
                                  <div className='col-md-5 img-main__container'>
                                    <img
                                      className='img-main'
                                      src={
                                        classDetails.thumbnailImage
                                          ? classDetails.thumbnailImage
                                          : '../assets/images/image-placeholder.jpg'
                                      }
                                      alt='class thumb'
                                      style={{
                                        width: '100%',
                                        height: '18vw',
                                        objectFit: 'cover'
                                      }}
                                    />
                                  

                                    {/* <div className="img-preview">
                                                          <img data-src="img/sem04.png" src="img/sem04.png" alt="" />
                                                          <img data-src="img/sem06.png" src="img/sem06.png" alt="" />
                                                          <img data-src="img/sem05.png" src="img/sem05.png" alt="" />
                                                          <img data-src="img/sem08.png" src="img/sem08.png" alt="" />
                                                      </div> */}
                                    <div className='clear' />
                                    {/* <div className="follow-wrapper">
                                                          <span>Share:</span>
                                                          <div className="follow">
                                                              <a className="item" href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram" /></a>
                                                              <a className="item" href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook" /></a>
                                                              <a className="item" href="https://twitter.com/" target="_blank"><i className="fab fa-twitter" /></a>
                                                          </div>
                                                      </div> */}
                                  </div>
                                  <div className='col-md-7 text-black'>
                                    <article className='description'>
                                      <h3 className='h3'>
                                        {he.decode(classDetails.title)}
                                      </h3>
                                      <div style={{ fontSize: '1.5em' }}>
                                        <div class='d-flex flex-row'>
                                          <div class='p-2'>
                                            <img
                                              className=''
                                              src={
                                                !!classDetails.photo
                                                  ? classDetails.photo
                                                  : './assets/images/image-placeholder.jpg'
                                              }
                                              alt='user'
                                              style={{
                                                width: '70px',
                                                height: '70px',
                                                objectFit: 'cover',
                                                verticalAlign: 'middle',
                                                borderRadius: '100%'
                                              }}
                                            />{' '}
                                          </div>
                                          <div class='p-2 align-self-center'>
                                            <b>
                                              {!!classDetails.salutation &&
                                                classDetails.salutation}{' '}
                                              {!!classDetails.nickname
                                                ? classDetails.nickname
                                                : `${classDetails.lastName}, ${
                                                    classDetails.firstName
                                                  }`}
                                            </b>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='stars mb-3'>
                                        <i className='fa fa-star mr-2 tagstar' />
                                        <i className='fa fa-star mr-2 tagstar' />
                                        <i className='fa fa-star mr-2 tagstar' />
                                        <i className='fa fa-star mr-2 tagstar' />
                                        <i className='fa fa-star mr-2 tagstar' /> 0
                                        ratings{' '}
                                        {/* {isLoggedIn && <i className="fa fa-heart float-right mr-2 tagheart" />} */}
                                      </div>
                                      <Link
                                        state={{
                                          draft: {
                                            mailSubject: '',
                                            mailReceiver: [
                                              {
                                                senderId: classDetails.teacherId,
                                                sender: `${classDetails.firstName} ${
                                                  classDetails.lastName
                                                }`,
                                                photo: classDetails.photo
                                              }
                                            ],
                                            mailContent: {
                                              blocks: [
                                                {
                                                  key: 'bpvgo',
                                                  text: '',
                                                  type: 'unstyled',
                                                  depth: 0,
                                                  inlineStyleRanges: [],
                                                  entityRanges: [],
                                                  data: {}
                                                }
                                              ],
                                              entityMap: {}
                                            },
                                            senderId: userAccountId
                                          }
                                        }}
                                        to='/mail'
                                        className='btn btn-info btn-sm mb-2'
                                        style={{ color: 'white' }}
                                      >
                                        <i
                                          className='fa fa-envelope mr-2'
                                          aria-hidden='true'
                                        />
                                        Message Teacher
                                      </Link>
                                      <p>{he.decode(classDetails.classIntroduction)}</p>
                                      <div className='class-desc'>
                                        {classDetails.classType === 'CLT002' ? (
                                          <>
                                            <p>
                                              <span>
                                                <i className='fa fa-calendar-alt mr-2 text-muted' />
                                                <b>Enrollment Date: </b>
                                                {classDetails.enrollmentStartDate &&
                                                  dayjs(
                                                    classDetails.enrollmentStartDate
                                                  ).format('YYYY/MM/DD')}{' '}
                                                -{' '}
                                                {classDetails.enrollmentEndDate &&
                                                  dayjs(
                                                    classDetails.enrollmentEndDate
                                                  ).format('YYYY/MM/DD')}
                                                {/* <b>Enrollment Date: </b>{classDetails.enrollmentStartDate && dayjs(dayjs.tz(`${classDetails.enrollmentStartDate}`, "YYYY/MM/DD HH:mm:ss", classDetails.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : classDetails.timeZone).format("YYYY/MM/DD")} - {classDetails.enrollmentEndDate && dayjs(dayjs.tz(`${classDetails.enrollmentEndDate}`, "YYYY/MM/DD HH:mm:ss", classDetails.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : classDetails.timeZone).format("YYYY/MM/DD")} */}
                                              </span>
                                            </p>
                                            <p>
                                              {classDetails.availableDates &&
                                              classDetails.availableDates.length > 0 ? (
                                                <span>
                                                  <i className='fa fa-calendar-alt text-muted' />{' '}
                                                  {classDetails.availableDates &&
                                                    'No. of Sessions : ' +
                                                      classDetails.availableDates.length}
                                                  <br />
                                                  {classDetails.availableDates.map(
                                                    date => (
                                                      <div>
                                                        &emsp;
                                                        <i className='fa fa-caret-right text-muted' />
                                                        {' ' +
                                                          dayjs(
                                                            dayjs
                                                              .tz(
                                                                `${dayjs(date).format(
                                                                  'YYYY/MM/DD'
                                                                )} ${
                                                                  classDetails.startTime
                                                                }`,
                                                                'YYYY/MM/DD HH:mm:ss',
                                                                classDetails.timeZone
                                                              )
                                                              .format()
                                                          )
                                                            .tz(
                                                              Intl.DateTimeFormat().resolvedOptions()
                                                                .timeZone
                                                                ? Intl.DateTimeFormat().resolvedOptions()
                                                                    .timeZone
                                                                : classDetails.timeZone
                                                            )
                                                            .format('dddd, LL')}
                                                        <br />
                                                      </div>
                                                    )
                                                  )}
                                                </span>
                                              ) : (
                                                <span>
                                                  <i className='fa fa-calendar-alt mr-2 text-muted' />{' '}
                                                  Starting{' '}
                                                  {dayjs(
                                                    dayjs
                                                      .tz(
                                                        `${classDetails.startDate} ${
                                                          classDetails.startTime
                                                        }`,
                                                        'YYYY/MM/DD HH:mm:ss',
                                                        classDetails.timeZone
                                                      )
                                                      .format()
                                                  )
                                                    .tz(
                                                      Intl.DateTimeFormat().resolvedOptions()
                                                        .timeZone
                                                        ? Intl.DateTimeFormat().resolvedOptions()
                                                            .timeZone
                                                        : classDetails.timeZone
                                                    )
                                                    .format('YYYY/MM/DD')}
                                                </span>
                                              )}
                                              <span>
                                                <i className='fa fa-clock mr-2 text-muted' />
                                                <b>Time: </b>
                                                {dayjs(
                                                  dayjs
                                                    .tz(
                                                      `${classDetails.startDate} ${
                                                        classDetails.startTime
                                                      }`,
                                                      'YYYY/MM/DD HH:mm:ss',
                                                      classDetails.timeZone
                                                    )
                                                    .format()
                                                )
                                                  .tz(
                                                    Intl.DateTimeFormat().resolvedOptions()
                                                      .timeZone
                                                      ? Intl.DateTimeFormat().resolvedOptions()
                                                          .timeZone
                                                      : classDetails.timeZone
                                                  )
                                                  .format('hh:mm A')}
                                                -{' '}
                                                {dayjs(
                                                  dayjs
                                                    .tz(
                                                      `${classDetails.startDate} ${
                                                        classDetails.endTime
                                                      }`,
                                                      'YYYY/MM/DD HH:mm:ss',
                                                      classDetails.timeZone
                                                    )
                                                    .format()
                                                )
                                                  .tz(
                                                    Intl.DateTimeFormat().resolvedOptions()
                                                      .timeZone
                                                      ? Intl.DateTimeFormat().resolvedOptions()
                                                          .timeZone
                                                      : classDetails.timeZone
                                                  )
                                                  .format('hh:mm A')}
                                              </span>
                                              <span>
                                                &nbsp;&nbsp;&emsp;<b>Duration: </b>{' '}
                                                {getDuration(
                                                  classDetails.startTime,
                                                  classDetails.endTime
                                                )}
                                              </span>
                                            </p>
                                          </>
                                        ) : (
                                          <p>
                                            <span>
                                              <i className='fa fa-calendar-alt mr-2 text-muted' />
                                              <b>Start Date: </b>
                                              {classDetails.availabilityStartDate &&
                                                dayjs(
                                                  classDetails.availabilityStartDate
                                                ).format('YYYY/MM/DD')}
                                            </span>
                                            <span>
                                              <i className='fa fa-calendar-alt mr-2 text-muted' />
                                              <b>End Date: </b>
                                              {classDetails.availabilityEndDate &&
                                                dayjs(
                                                  classDetails.availabilityEndDate
                                                ).format('YYYY/MM/DD')}
                                            </span>
                                          </p>
                                        )}
                                        <p>
                                          <span>
                                            <i className='fa fa-graduation-cap mr-2 text-muted' />
                                            {classDetails.ageCategory}
                                          </span>
                                        </p>
                                        {classDetails.classType === 'CLT002' && (
                                          <p>
                                            <span>
                                              <i className='fa fa-users mr-2 text-muted' />
                                              {classDetails.minLearners +
                                                ' - ' +
                                                classDetails.maxLearners}{' '}
                                              learners per class
                                            </span>
                                            {isEnrolledToClass() && (
                                              <span>
                                                <a
                                                  href={classDetails?.jitsiLink}
                                                  target='_blank'
                                                  style={{ color: 'blue' }}
                                                  rel='noreferrer'
                                                >
                                                  <i className='fa fa-video mr-2 text-muted' />
                                                  {
                                                    classDetails?.jitsiLink?.split(
                                                      'https://'
                                                    )[1]
                                                  }
                                                </a>
                                              </span>
                                            )}
                                          </p>
                                        )}
                                      </div>
                                      {(!isEnrolledToClass() ||
                                        userType === 'family') && (
                                        <div className='alert alert-warning'>
                                          <span className='price text-left'>
                                            <div className='class-price'>
                                              <h5>
                                                {classDetails.price
                                                  ? toMoneyFormat(
                                                      classDetails.price,
                                                      classDetails.currency
                                                    ) + ' '
                                                  : 'FREE'}
                                              </h5>{' '}
                                              <span>per class</span>
                                              {/* <span className="badge badge-danger ml-2">50% OFF</span> */}
                                            </div>
                                          </span>
                                        </div>
                                      )}
                                    </article>
                                    {/* <div
                                      style={{
                                        backgroundColor: '#E5F6DF',
                                        paddingTop: '2%',
                                        paddingBottom: '2%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        color: '#023020'
                                      }}
                                    >
                                      <i
                                        style={{ color: '#F7C815', marginRight: '2%' }}
                                        class='fa-duotone fa-calendar-check'
                                      />
                                      <b> The class is ongoing</b>
                                    </div> */}

                                    {(userType === USER_TYPE.FMLY.toLowerCase() ||
                                      userType === USER_TYPE.LRNR.toLowerCase()) &&
                                      classDetails.classScheduleType === 'LCLT002' &&
                                      shouldAllowEnrollToClassAction && (
                                        <div className='py-4'>
                                          <h5>Select Schedule</h5>
                                          <select name='sortby' className='select-box'>
                                            <option disabled selected>
                                              Select Available Schedule
                                            </option>
                                            {classDetails.schedules.map(
                                              (schedule, index) => {
                                                return (
                                                  <option value={index}>
                                                    {schedule}
                                                  </option>
                                                );
                                              }
                                            )}
                                            {/* <option value="sort1">Tuesday, October xx, 2021, 6pm</option>
                                          <option value="sort2">Tuesday, October xx, 2021, 8pm</option>
                                          <option value="sort3">Thursday, October xx, 2021, 6pm</option> */}
                                          </select>
                                        </div>
                                      )}

                                    {/* {isLoggedIn && userType !== USER_TYPE.TCHR.toLowerCase() &&
                                    <button
                                      className="btn btn-success mt-2 w-100"
                                      onClick={onClickEnrollClass}
                                      disabled={!((learnerId !== "" || userType === USER_TYPE.LRNR.toLowerCase()) && shouldAllowEnrollToClassAction)}
                                    >
                                      ENROLL TO CLASS
                                    </button>
                                  } */}
                                    {(!isEnrolledToClass() || userType === 'family') && (
                                      <EnrollToClassForm
                                        userType={userType}
                                        learners={learners}
                                        classDetails={classDetails}
                                        addToCart={addToCart}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* <div className='empty-space h60-xs' /> */}
                              {/* <div className="row" style={{ borderTop: '1px solid #DDD', borderBottom: '1px solid #DDD' }}>
                                              <div className="col-12 py-5">
                                                  <h3>Schedule of Classes</h3>
                                                  <div className="row mt-4">
                                                      <div className="col-lg-3 col-xs-12">
                                                          <div className="card">
                                                              <div className="card-body card-header py-4">
                                                                  <h5 className="card-title">Oct. xx, 2021</h5>
                                                                  <p className="card-text">Tuesday at 6pm</p>
                                                                  <a href="#" className="btn btn-outline-success w-100">Select Class</a>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-3 col-xs-12">
                                                          <div className="card">
                                                              <div className="card-body card-header py-4">
                                                                  <h5 className="card-title">Oct. xx, 2021</h5>
                                                                  <p className="card-text">Tuesday at 8pm</p>
                                                                  <a href="#" className="btn btn-outline-success w-100">Select Class</a>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-3 col-xs-12">
                                                          <div className="card">
                                                              <div className="card-body card-header py-4">
                                                                  <h5 className="card-title">Oct. xx, 2021</h5>
                                                                  <p className="card-text">Thursday at 6pm</p>
                                                                  <a href="#" className="btn btn-outline-success w-100">Select Class</a>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-3 col-xs-12">
                                                          <div className="card">
                                                              <div className="card-body card-header py-4">
                                                                  <h5 className="card-title">Nov. xx, 2021</h5>
                                                                  <p className="card-text">Tuesday at 6pm</p>
                                                                  <a href="#" className="btn btn-outline-success w-100">Select Class</a>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div> */}
                              <div>
                              {classDetails.classType === 'CLT001' && (
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          width: "35%",
                                        }}
                                        className="row ml-2"
                                      >
                                        <b>Modules</b>
                                        {classDetails.lectures.length < 1 ||
                                        !classDetails.lectures ? (
                                          <p>
                                            <i>No Modules Added</i>
                                          </p>
                                        ) : (
                                          <>
                                            {classDetails.lectures.map(element => {
                                              return (
                                                <div className='row'> 
                                                <button
                                                  style={{
                                                    backgroundColor: 'white',
                                                    color: '#0da7ff',
                                                    border: '1px solid rgb(29 186 255)',
                                                    borderRadius: '4px',
                                                    marginBottom: '5px',
                                                    fontWeight: 'lighter',
                                                    width: "100%",
                                                  }}
                                                  className="ml-2"    
                                                  disabled={!isEnrolledToClass()}
                                                  onClick={() =>
                                                    navigate('/ViewRecorded/' + classId)
                                                  }
                                                >
                                                  {element.title}
                                                </button>
                                              </div>
                                              );
                                            })}
                                          </>
                                        )}

                                        {isEnrolledToClass() && (
                                          <>
                                            <button
                                              style={{
                                                marginTop: '3%',
                                                border: '0',
                                                background: 'none',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                color: '#929292',
                                                fontSize: '12px'
                                              }}
                                              onClick={()=> navigate('/ViewRecorded/' + classId) }
                                            >
                                              View More{' '}
                                              <i
                                                style={{
                                                  marginLeft: '2%',
                                                  marginTop: '3px'
                                                }}
                                                class='fas fa-arrow-right'
                                              />
                                            </button>
                                            <hr className='line' />
                                          </>
                                        )}
                                      </div>
                                    )}
                                <div
                                  className='col-12 py-5 text-black'
                                  style={{ borderBottom: '1px solid #DDD' }}
                                >
                                  <div className='mt-2'>
                                    <h3>Class Details</h3>
                                    <div className='accordion mt-4' id='classAccordion'>
                                      <div className='card'>
                                        <div className='card-header' id='headingOne'>
                                          <h2 className='mb-0'>
                                            <button
                                              className='btn btn-link btn-block text-left'
                                              type='button'
                                              data-toggle='collapse'
                                              data-target='#collapseOne'
                                              aria-expanded='true'
                                              aria-controls='collapseOne'
                                            >
                                              <h6> Introduction &amp; Objectives </h6>
                                            </button>
                                          </h2>
                                        </div>
                                        <div
                                          id='collapseOne'
                                          className='collapse show'
                                          aria-labelledby='headingOne'
                                          data-parent='#classAccordion'
                                        >
                                          <div
                                            className='card-body'
                                            style={{ whiteSpace: 'pre-line' }}
                                          >
                                            {he.decode(classDetails.classIntroduction)}
                                          </div>
                                        </div>
                                      </div>
                                      <div className='card'>
                                        <div className='card-header' id='headingTwo'>
                                          <h2 className='mb-0'>
                                            <button
                                              className='btn btn-link btn-block text-left collapsed'
                                              type='button'
                                              data-toggle='collapse'
                                              data-target='#collapseTwo'
                                              aria-expanded='false'
                                              aria-controls='collapseTwo'
                                            >
                                              <h6>Learning Goals</h6>
                                            </button>
                                          </h2>
                                        </div>
                                        <div
                                          id='collapseTwo'
                                          className='collapse show'
                                          aria-labelledby='headingTwo'
                                          data-parent='#classAccordion'
                                        >
                                          <div
                                            className='card-body'
                                            style={{ whiteSpace: 'pre-line' }}
                                          >
                                            {he.decode(classDetails.learningGoals)}
                                          </div>
                                        </div>
                                      </div>
                                      <div className='card'>
                                        <div className='card-header' id='headingThree'>
                                          <h2 className='mb-0'>
                                            <button
                                              className='btn btn-link btn-block text-left collapsed'
                                              type='button'
                                              data-toggle='collapse'
                                              data-target='#collapseThree'
                                              aria-expanded='false'
                                              aria-controls='collapseThree'
                                            >
                                              <h6> External Resources </h6>
                                            </button>
                                          </h2>
                                        </div>
                                        <div
                                          id='collapseThree'
                                          className='collapse show'
                                          aria-labelledby='headingThree'
                                          data-parent='#classAccordion'
                                        >
                                          <div
                                            className='card-body'
                                            style={{ whiteSpace: 'pre-line' }}
                                          >
                                            {he.decode(classDetails.externalResources)}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </Page>
  );
}
