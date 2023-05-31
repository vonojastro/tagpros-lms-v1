/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledClass, getAllActiveClasses, getPendingEnrollment } from "api/class";
import { getActiveAnnouncements } from "api/announcement";
import TopClasses from "../TopClasses";
// import { useNavigate } from "react-router-dom";
import { toMoneyFormat } from 'utils/utils'
import { api } from '../../../api'
import { toast } from "react-toastify";
import Calendar from 'react-calendar';
import 'css/Calendar.css';
import { useNavigate } from "react-router";
const Entities = require('html-entities').XmlEntities;
const he = new Entities();

export default function LearnerDashboardHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrolledClasses = useSelector((state) => state.classes ? state.classes.getIn(['data', 'enrolledClass']) : []);
  const pendingEnrollment = useSelector((state) => state.classes ? state.classes.getIn(['data', 'pendingEnrollment']) : []);
  let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));
  const announcements = useSelector((state) => state.announcement ? state.announcement.getIn(['data', 'announcements']) : []);
  


  React.useEffect(() => {
    getEnrolledClass(dispatch);
    getAllActiveClasses(dispatch);
    getActiveAnnouncements(dispatch); 
    getPendingEnrollment(dispatch);

    announcements.filter(item=> item.userTypes.includes('SCHOOL_LEADER'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datesToAddClassTo = enrolledClasses.length > 0 ? enrolledClasses.map(o => o.availableDates ? o.availableDates.map(d => new Date(d)) : []).flat() : [];

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      console.log(datesToAddClassTo);
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find(dDate => dDate.getFullYear() === date.getFullYear() && dDate.getMonth() === date.getMonth() && dDate.getDate() === date.getDate())) {
        return 'react-calendar__tile react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend';
      }
    }
  }

  const handleClassImageNotFound = (e) => {
    e.target.src = 'assets/images/image-placeholder.jpg'
  }
  
  const handleClickMyClass = (e) => navigate(`class/enroll/${e.currentTarget.id}`)

  const displayEnrolledClasses = () => {
    return enrolledClasses.map(
      ({ title, startDate, startTime, fullName, thumbnailImage, classId, /* zoomLink */ jitsiLink ='https://meet.jit.si/jitsi-link-not-found', availableDates }) => {
        return (
          !loading && (
            <div
              className='col-12 col-md-3'
              onClick={handleClickMyClass}
              id={classId}
              style={{ cursor: 'pointer' }}
            >
              <div className='card'>
                <img
                  className='card-img-top'
                  style={{ width: '100%', height: '7vw', objectFit: 'cover' }}
                  src={thumbnailImage}
                  alt={title}
                  onError={handleClassImageNotFound}
                />
                <div className='card-body p-3'>
                  <div className='card-text pb-5'>
                    <h4>{title}</h4>
                    <small>by {fullName}</small>
                    <br />
                    <small>
                      {availableDates
                        ? moment(availableDates[0]).format('MMM. D, YYYY')
                        : moment(new Date(startDate)).format('MMM. D, YYYY')}{' '}
                      at {startTime}
                    </small>
                    <small>
                      <br />
                      <a href={jitsiLink} target='_blank' rel='noreferrer'>
                        <img
                          height={30}
                          src='/assets/images/jitsi-icon.png'
                          alt='...'
                        />
                      </a>
                    </small>
                  </div>
                  {/* {(paymentStatus === null || paymentStatus === "PSTAT001") && 
                  <button class="btn btn-info" onClick={() => navigate(`/checkout`, { state: { classId, enrollmentId } })} style={{width: '100%'}}>Pay</button>} */}
                </div>
              </div>
            </div>
          )
        );
      }
    )
  }

  const displayNotEnrolled = () => {
    return (
      !loading && <div className="card-body">
        <div className="tab-content br-n pn">
          <div id="navtabs-1" className="tab-pane active">
            <div className="px-3 pb-4 mt-4 row">
              <div className="col-xs-12 offset-md-2 col-md-8 text-center">
                <img
                  src="../assets/images/tarsier-v2a.png"
                  style={{ width: "180px", height: "180px" }}
                />
                <h3>Uh-oh! Looks like you haven't added any classes yet. </h3>
                {/* <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  <i className="fa fa-plus" /> Add Classes
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const cancelTransaction = async (txnId) => {
    await api.post('/payment/void', {txnId}).then(response => {
      if(response.success){
        toast.success('Enrollment has been cancelled.');
      }
      getPendingEnrollment(dispatch);
    }).catch(err => {
      console.log(err);
      toast.error('Cannot cancel enrollment. Please try again later.');
    });
  }

  const getIcon = (key) => {
    switch (key) {
      case "promo":
        return "fa-shopping-cart"
      case "event":
        return "fa-calendar"
      case "info":
        return "fa-info-circle"
      case "other":
      default:
        return "fa-question-circle"
    }
  }

  return (
    <div className="container-fluid">
      {/* ============================================================== */}
      {/* Start Page Content */}
      {/* ============================================================== */}
      {/* Row */}
      <div className="row">
        <div className="col-12">
          {/* <div className="alert alert-danger p-3">
            <img
              src="../assets/images/tarsier-v2c.png"
              className="float-left mr-4"
              style={{ width: "100px" }}
            />
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              {" "}
              <span aria-hidden="true">×</span>{" "}
            </button>
            <h3 className="text-danger">
              <i className="fa fa-smile-o" /> Hello! Have you completed your profile yet?
            </h3>{" "}
            Just checking to see if you've completed your Learners profile yet! Simply
            click on your profile picture on the sidebar to the left, or{" "}
            <a href="#">CLICK HERE</a> to start editing! Completed profiles get to unlock
            all the features of the Tagpros LMS!
          </div> */}
        </div>
        <div className="col-lg-8 col-md-7">
          <div className="card card-default">
            <div className="hero-action p-4 col-xl-12">
              <div class="d-flex">
                <div>
                  <h4>
                    <i className="fa fa-lightbulb-o" /> What do you want to learn today?
                  </h4>
                </div>
                <div class="ml-auto">
                  <a href="/search">Advanced Search</a>
                </div>
              </div>
              <form
                className="form-horizontal form-material"
                id="loginform"
                action="/search"
              >
                <div className="form-group mb-0">
                  <div className="col-xs-12 form-G01-div">
                    <input
                      className="form-control form-G01 mt-2 pl-3"
                      type="text"
                      placeholder="Search all classes"
                      name="query"
                      id="loginform-input"
                    />
                  </div>
                  {/* <div className="mt-2 form-recom">
                    We recommend:{" "}
                    <span>
                      <a href="#">Science</a>
                    </span>
                    ,{" "}
                    <span>
                      <a href="#">Mathematics</a>
                    </span>
                    ,{" "}
                    <span>
                      <a href="#">Visual Arts</a>
                    </span>
                    ,{" "}
                    <span>
                      <a href="#">Cooking</a>
                    </span>
                    ,{" "}
                    <span>
                      <a href="#">Technology</a>
                    </span>
                    ,{" "}
                    <span>
                      <a href="#">Animation</a>
                    </span>
                    ,{" "}
                    <span>
                      <a href="#">Design</a>
                    </span>
                    ,{" "}
                    <span>
                      <a href="#">English Language</a>
                    </span>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
          <TopClasses />
          {/* UI 2 */}
          {/* UI 2 */}
          {/* UI 2 */}
          <div className="card card-default learner-ui">
            <div className="card-header">
              <h4 className="card-title m-b-0 float-left">My Class Schedules</h4>
              {/* <div className="card-actions">
                <a className data-action="collapse">
                  <i className="ti-minus" />
                </a>
                <a className="btn-minimize" data-action="expand">
                  <i className="mdi mdi-arrow-expand" />
                </a>
                <a className="btn-close" data-action="close">
                  <i className="ti-close" />
                </a>
              </div> */}
            </div>
            <div className="card-body collapse show py-2">
              <div className="tab-content br-n pn">
                <div className="row">
                  <div className="col-6 text-left">
                    {/* <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      <i className="fa fa-plus" /> Add Classes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      View Calendar
                    </button> */}
                  </div>
                  <div className="col-6 text-right">
                    <ul className="nav justify-content-end customtab2">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#navtabs-1"
                          role="tab"
                        >
                          <i className="fa fa-th" />{" "}
                          {/* <span className="hidden-xs-down">Card View</span>{" "} */}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#navtabs-2"
                          role="tab"
                        >
                          <i className="fa fa-list" />{" "}
                          {/* <span className="hidden-xs-down">List View</span> */}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="dropdown-divider" />
                {/* NAVTABS-1 */}
                {/* NAVTABS-1 */}
                {/* NAVTABS-1 */}
                <div id="navtabs-1" className="tab-pane active">
                  {/* <div className="row mt-4">
                    <div className="col-8">
                      <h4 style={{ position: "absolute", bottom: "0" }}>
                        <b>
                          <i className="fa fa-book mr-2" />
                          Latest Classes
                        </b>
                      </h4>
                    </div>
                    <div className="col-4 text-right">
                      <select className="custom-select">
                        <option selected>Arrange by Time &amp; Date</option>
                        <option value="#">By Subject</option>
                        <option value="#">By Teacher</option>
                      </select>
                      <br/>
                    </div>
                  </div> */}
                  <div className="mt-4 row">
                    <div className="text-center data-loading" style={{ width: '100%', display: loading ? 'block' : 'none' }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div className="loading-text">Loading Enrolled Class/es ...</div>
                    </div>
                    {enrolledClasses && (enrolledClasses.length > 0)
                      ? displayEnrolledClasses()
                      : displayNotEnrolled()
                    }
                  </div>
                </div>
                {/* NAVTABS-2 */}
                {/* NAVTABS-2 */}
                {/* NAVTABS-2 */}
                <div id="navtabs-2" className="tab-pane">
                  <div className="row mt-4">
                    <div className="col-8">
                      <h4 style={{ position: "absolute", bottom: "0" }}>
                        <b>
                          <i className="fa fa-book mr-2" />
                          Latest Classes
                        </b>
                      </h4>
                    </div>
                    <div className="col-4 text-right">
                      {/* <select className="custom-select">
                        <option selected>Arrange by Time &amp; Date</option>
                        <option value="#">By Subject</option>
                        <option value="#">By Teacher</option>
                      </select> */}
                    </div>
                  </div>
                  <div className="table-responsive mt-1">
                    <table className="table table-striped mt-3">
                      <thead>
                        <tr>
                          <th>Class</th>
                          <th>Teacher</th>
                          <th>Date</th>
                          <th>Class Link</th>
                          <th>Status</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {enrolledClasses.map(
                          ({ availableDates, title, startDate, startTime, fullName, jitsiLink }) => (
                            <tr>
                              <td>
                                <a href="javascript:void(0)">{he.decode(title)}</a>
                              </td>
                              <td>{fullName}</td>
                              <td>
                                <span className="text-muted">
                                  <i className="fa fa-clock-o" /> {availableDates ? moment(availableDates[0]).format("MMM. D, YYYY") : moment(new Date(startDate)).format("MMM. D, YYYY")} at{" "}
                                  {startTime}
                                </span>{" "}
                              </td>
                              <td>
                                <small>
                                  <a href={jitsiLink}>
                                    <img height={30}
                                      src="/assets/images/jitsi-icon.png"
                                      alt="..."
                                    />
                                  </a>
                                </small>
                              </td>
                              <td>
                                <div className="label label-table label-success">
                                  Confirmed
                                </div>
                              </td>
                              {/* <td>
                                <a
                                  href="#"
                                  data-toggle="tooltip"
                                  data-original-title="Confirm"
                                >
                                  {" "}
                                  <i className="fa fa-check text-inverse m-r-10 text-megna" />{" "}
                                </a>
                                <a
                                  href="#"
                                  data-toggle="tooltip"
                                  data-original-title="Cancel"
                                  aria-describedby="tooltip54382"
                                >
                                  {" "}
                                  <i className="fa fa-close text-danger" />{" "}
                                </a>
                              </td> */}
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-default learner-ui">
            <div className="card-header">
              <h4 className="card-title m-b-0 float-left">My Pending Enrollments</h4>
              {/* <div className="card-actions">
                <a className data-action="collapse">
                  <i className="ti-minus" />
                </a>
                <a className="btn-minimize" data-action="expand">
                  <i className="mdi mdi-arrow-expand" />
                </a>
                <a className="btn-close" data-action="close">
                  <i className="ti-close" />
                </a>
              </div> */}
            </div>
            <div className="card-body collapse show py-2">
              <div className="tab-content br-n pn">
                <div className="dropdown-divider" />
                <div id="navtabs-3" className="tab-pane active">
                  <div className="table-responsive mt-1">
                    <table className="table table-striped mt-3">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Reference</th>
                          <th>Class Title</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          pendingEnrollment.map(({ createdDateTime, classTitle, price, currency, status, ref, classId, enrollmentId, transactionId }) => (
                            <tr>
                              <td>
                                <span className="text-muted">
                                  <i className="fa fa-clock-o" /> {moment(createdDateTime).format("MM/DD/YYYY hh:mm a")}
                                </span>{" "}
                              </td>
                              <td>{ref || transactionId}</td>
                              <td>{he.decode(classTitle)}</td>
                              <td>{toMoneyFormat(price,currency)}</td>
                              <td>
                                <div className="label label-table label-success">
                                  {he.decode(status)}
                                </div>
                              </td>
                              <td>
                              <button className="btn btn-danger btn-sm" onClick={() => cancelTransaction(transactionId)}>Cancel</button>
                                {(transactionId === '' || transactionId === null) 
                                  && <button className="btn btn-info btn-sm" onClick={() => navigate(`/checkout`, { state: { classId, enrollmentId } })}> Pay</button>}
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* UI 4 - No Learners Added Yet */}
          {/* UI 4 - No Learners Added Yet */}
          {/* UI 4 - No Learners Added Yet */}
          {/* <div className="card card-default learner-ui">
            <div className="card-header">
              <div className="card-actions">
                <a className data-action="collapse">
                  <i className="ti-plus" />
                </a>
                <a className="btn-minimize" data-action="expand">
                  <i className="mdi mdi-arrow-expand" />
                </a>
                <a className="btn-close" data-action="close">
                  <i className="ti-close" />
                </a>
              </div>
              <h4 className="card-title m-b-0">My Class Schedules (No Classes Addded)</h4>
            </div>
            <div className="card-body collapse py-2">
              <div className="tab-content br-n pn">
                <div id="navtabs-1" className="tab-pane active">
                  <div className="px-3 pb-4 mt-4 row">
                    <div className="col-xs-12 offset-md-2 col-md-8 text-center">
                      <img
                        src="../assets/images/tarsier-v2a.png"
                        style={{ width: "180px", height: "180px" }}
                      />
                      <h3>Uh-oh! Looks like you haven't added any classes yet. </h3>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                      >
                        <i className="fa fa-plus" /> Add Classes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-lg-4 col-md-5">
          {/* Column */}
          {/* <div className="card card-default">
            <div className="card-header">
              <div className="card-actions">
                <a className data-action="collapse">
                  <i className="ti-minus" />
                </a>
                <a className="btn-minimize" data-action="expand">
                  <i className="mdi mdi-arrow-expand" />
                </a>
                <a className="btn-close" data-action="close">
                  <i className="ti-close" />
                </a>
              </div>
              <h4 className="card-title m-b-0">Complete Your Profile</h4>
            </div>
            <div className="card-body collapse show pt-0">
              <div className="alert alert-warning py-3">
                <div className="text-center">Your profile is 50% complete!</div>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "50%", height: "10px" }}
                  >
                    {" "}
                    <span className="sr-only">50% Complete</span>
                  </div>
                </div>
              </div>
              <div className="to-do-widget">
                <ul className="list-task todo-list list-group m-b-0" data-role="tasklist">
                  <li className="list-group-item" data-role="task">
                    <div className="checkbox checkbox-info">
                      <input
                        type="checkbox"
                        id="inputSchedule"
                        name="inputCheckboxesSchedule"
                      />
                      <label htmlFor="inputSchedule" className>
                        {" "}
                        <span>Watch Tagpros 101</span>{" "}
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item" data-role="task">
                    <div className="checkbox checkbox-info">
                      <input type="checkbox" id="inputCall" name="inputCheckboxesCall" />
                      <label htmlFor="inputCall" className>
                        {" "}
                        <span>Complete Personal Details</span>{" "}
                        <span className="label label-danger">Today</span>{" "}
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          {/* Column */}
          <div className="card card-default">
            <div className="card-header">
              {/* <div className="card-actions">
                <a className data-action="collapse">
                  <i className="ti-minus" />
                </a>
                <a className="btn-minimize" data-action="expand">
                  <i className="mdi mdi-arrow-expand" />
                </a>
                <a className="btn-close" data-action="close">
                  <i className="ti-close" />
                </a>
              </div> */}
              <h4 className="card-title m-b-0">My Calendar</h4>
            </div>
            <div className="card-body collapse show pt-0 my-learners-card">
              <div className="calendar-container">
                <div className="calendar-box">
                  <Calendar
                    // value={new Date(2021, 11, 12)}
                    tileClassName={tileClassName}
                    nextLabel={"Next"}
                    next2Label={null}
                    prevLabel={"Prev"}
                    prev2Label={null}
                    calendarType={"US"}
                    formatShortWeekday={(locale, value) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][value.getDay()]}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Column --> */}
          <div className="card card-default">
            <div className="card-header">
              {/* <div className="card-actions">
                <a href="#/" className="" data-action="collapse">
                  <i className="ti-minus"></i>
                </a>
                <a href="#/" className="btn-minimize" data-action="expand">
                  <i className="mdi mdi-arrow-expand"></i>
                </a>
                <a href="#/" className="btn-close" data-action="close">
                  <i className="ti-close"></i>
                </a>
              </div> */}
              <h4 className="card-title m-b-0">TAGPROS Announcements</h4>
            </div>
            <div className="card-body collapse show bg-info">
              <div id="announcementCarousel" className="carousel slide" data-ride="carousel">
                {/* <!-- Carousel items --> */}
                <div className="carousel-inner">
                {((!announcements || announcements.filter(item=> item.userTypes.includes('LEARNER')).length === 0)) ? 
                   <div className="carousel-item flex-column active ">
                       
                        <h3 className="text-light font-light"><i>
                         No Announcements
                         </i></h3>
                      </div>: 
                    (announcements.filter(item=> item.userTypes.includes('LEARNER')).map((announcement, index) =>
                      <div className={"carousel-item flex-column " + (index === 0 ? "active" : "")}>
                        <h3 className="text-white d-flex align-items-center"><i className={"fa " + getIcon(announcement.type) + " fa-2x text-white"}></i>&nbsp; {announcement.title}</h3>
                        <p className="text-white font-light">
                          {announcement.description}
                        </p>
                      </div>
                    ))
                    
                  }

                </div>
                <br/>
                <ol class="carousel-indicators">
                  {announcements &&
                    (announcements.filter(item=> item.userTypes.includes('LEARNER')).map((announcement, index) =>
                      <li data-target="#announcementCarousel" data-slide-to={index} class={(index === 0 ? "active" : "")}></li>
                    ))
                  }
                </ol>
              </div>
            </div>
          </div>
          {/* <!-- Column --> */}
        </div>
      </div>
      {/* Row */}
      {/* Row */}
      {/* Row */}
      {/* Row */}
      {/* Row */}
      {/* ============================================================== */}
      {/* End PAge Content */}
      {/* ============================================================== */}
    </div>
  );
}
