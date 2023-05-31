/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import MyLearnersSchedules from "./MyLearnersSchedules";
import { getAllActiveClasses } from "api/class";
import { getActiveAnnouncements } from "api/announcement";
import TopClasses from "../TopClasses";
import { getPendingEnrollment } from "api/class";
import { useNavigate } from "react-router-dom";
import { api } from '../../../api'
import { toast } from "react-toastify";
import { PAYMENT_STATUS } from "utils/constants";
import Calendar from 'react-calendar';
import 'css/Calendar.css';
import { viewAllMyLearnersClass } from "api/classEnroll";

export default function FamilyDashboardHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrolledClasses = useSelector((state) => state.classes ? state.classes.getIn(['data', 'familyClass']) : []);
  const pendingEnrollment = useSelector((state) => state.classes ? state.classes.getIn(['data', 'pendingEnrollment']) : []);
  const announcements = useSelector((state) => state.announcement ? state.announcement.getIn(['data', 'announcements']) : []);

  const cancelTransaction = async (txnId) => {
    await api.post('/payment/void', { txnId }).then(response => {
      if (response.success) {
        toast.success('Enrollment has been cancelled.');
      }
      getPendingEnrollment(dispatch);
    }).catch(err => {
      console.log(err);
      toast.error('Cannot cancel enrollment. Please try again later.');
    });
  }

  const getBadge = (key) => {
    switch (key) {
      case PAYMENT_STATUS.PAID:
        return "badge-success"
      case PAYMENT_STATUS.CANCELLED:
      case PAYMENT_STATUS.VOID:
        return "badge-danger"
      case PAYMENT_STATUS.REFUNDED:
        return "badge-secondary"
      case PAYMENT_STATUS.FOR_REFUND:
        return "badge-warning"
      default:
        return "badge-primary"
    }
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

  const getValue = (value) => {
    return Object.keys(PAYMENT_STATUS).find(key => PAYMENT_STATUS[key] === value);
  }



  React.useEffect(() => {
    getAllActiveClasses(dispatch);
    getPendingEnrollment(dispatch);
    viewAllMyLearnersClass(dispatch);
    getActiveAnnouncements(dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const datesToAddClassTo = (enrolledClasses.length > 0 && enrolledClasses.availableDates) ? enrolledClasses.map(o => o.availableDates.map(d => new Date(d))).flat() : [];

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


  

  return (
    <div>
      <div className="container-fluid">
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
                  </div>
                </form>
              </div>
            </div>
            <TopClasses />
            <MyLearnersSchedules />
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
                            pendingEnrollment.map(({ createdDateTime, classTitle, price, status, ref, classId, enrollmentId, transactionId }) => (
                              <tr>
                                <td>
                                  <span className="text-muted">
                                    <i className="fa fa-clock-o" /> {moment(createdDateTime).format("MM/DD/YYYY hh:mm a")}
                                  </span>{" "}
                                </td>
                                <td>{ref || transactionId}</td>
                                <td>{classTitle}</td>
                                <td>{price}</td>
                                <td>
                                  <div className={`badge + ${getBadge(status)}`}>
                                    {getValue(status)}
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
          </div>
          <div className="col-lg-4 col-md-5">
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
                  <br />
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
      </div>
    </div>
  );
}
