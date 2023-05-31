import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses, getAllMyStudents } from "api/class";
// import { APPLICATION_STATUS, CLASS_STATUS } from "utils/constants";
import { CLASS_STATUS, LEARNER_GRADE_LEVELS } from "utils/constants";
import Table from "components/Admin/contents/Table";
import AccountTodos from "components/AccountTodos";
import AccountTodo from 'components/AccountTodos/AccountTodo'
// import { NavLink } from "react-router-dom";
// import { getCheckBoxState, isFormSegementAccomplished } from 'utils/teacherApplication';
// import { GROUP_0_FIELD_NAMES, GROUP_1_FIELD_NAMES, GROUP_2_FIELD_NAMES, GROUP_3_FIELD_NAMES, GROUP_4_FIELD_NAMES } from "components/TeacherApplication/fields";
import { Link } from "react-router-dom";
import { getTeacherApplication, getTeacherPayoutAccount } from "api/teacher";
import { getActiveAnnouncements } from "api/announcement";
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from "dayjs";
const Entities = require('html-entities').XmlEntities;
const he = new Entities();

export default function TeacherDashboardHome() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);

  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes ? state.classes.getIn(['data', 'class']) : []);
  const learners = useSelector((state) => state.classes ? state.classes.getIn(['data', 'learner']) : []);
  const earnings = useSelector((state) => state.teacher ? state.teacher.getIn(['payoutAccount', 'earnings']) : {});
  const applicationStatus = useSelector((state) =>
    state.teacherApp.data.applicationStatus
  );
  const application = useSelector((state) => state.teacher ? state.teacher.getIn(['applications', 'application']) : {});
  const announcements = useSelector((state) => state.announcement ? state.announcement.getIn(['data', 'announcements']) : []);

  // const teacherAppData = useSelector((state) => state.teacherApp.data);
  React.useEffect(() => {
    getAllClasses(dispatch);
    getAllMyStudents(dispatch);
    getTeacherApplication(dispatch);
    getTeacherPayoutAccount(dispatch);
    getActiveAnnouncements(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const teacherApplicationAccepted = () => APPLICATION_STATUS['APPROVED'] === applicationStatus;

  const todoItems = [
    { title: "Fulfill Requirements", done: application.applicationStatus, link: "/application" },
    { title: "Watch Tagpros 101", done: application.watchedVideo, link: "/application/step-1" },
    { title: "Complete Personal Details", done: application.professionalTitle, link: "/application/step-2" },
    { title: "Input Class Descriptions", done: application.classTopics, link: "/application/step-3" },
    { title: "Upload Sample Classes", done: application.classSampleVid, link: "/application/step-4" },
    { title: "Review Policies", done: application.agreeTerms, link: "/application/step-5" },
  ];

  const columns = [
    {
      Header: "Class List",
      columns: [
        {
          Header: 'No.', accessor: 'classid',
          Cell: ({ row }) => (
            <div>{row.index + 1}</div>
          ),
        },
        { Header: 'Title', accessor: d => (he.decode(d.title)) },
        {
          Header: 'Photo', accessor: 'thumbnailImage',
          Cell: row => (
            <img src={row.value} alt={row.title} width="80"></img>
          ),
        },
        { Header: "Starts At", accessor: d => d.startDate ? dayjs(dayjs.tz(`${d.startDate} ${d.startTime}`, "YYYY/MM/DD HH:mm:ss", d.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : d.timeZone).format("YYYY/MM/DD") : d.startDate },
        { Header: "Time", accessor: d => d.startDate ? dayjs(dayjs.tz(`${d.startDate} ${d.startTime}`, "YYYY/MM/DD HH:mm:ss", d.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : d.timeZone).format("hh:mm A") : d.startDate },
        // { Header: 'No. Of Students', accessor: 'studentCount', },
        {
          Header: 'Status', accessor: 'status',
          Cell: row => (
            <div className={"badge " + getBadge(row.value)}>{getValue(row.value)}</div>
          ),
        },
        // {
        //   Header: 'Action', accessor: 'action',
        //   Cell: ({ row }) => (
        //     <div>
        //       <button
        //         data-target="#teacherModal"
        //         className="btn btn-link"
        //         data-toggle="modal"
        //         data-original-title="Edit"
        //         onClick={() => onClickEdit(row.index)}
        //       >
        //         <i className="ti-marker-alt"></i>
        //       </button>
        //       <button
        //         data-target="#teacherModal"
        //         className="btn btn-link"
        //         data-toggle="modal"
        //         data-original-title="Delete"
        //         onClick={() => onClickEdit(row.index)}
        //       >
        //         <i className="ti-trash"></i>
        //       </button>
        //     </div>
        //   ),
        // },
      ],
    },
  ];

  const getValue = (value) => {
    return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
  }

  const getBadge = (key) => {
    switch (key) {
      case CLASS_STATUS.DRAFT:
        return "badge-info"
      case CLASS_STATUS.PENDING:
        return "badge-primary"
      case CLASS_STATUS.APPROVEDHR:
      case CLASS_STATUS.APPROVEDEDUC:
        return "badge-success"
      case CLASS_STATUS.REJECTEDHR:
      case CLASS_STATUS.REJECTEDEDUC:
        return "badge-danger"
      case CLASS_STATUS.RETURNED:
      case CLASS_STATUS.DELETE:
        return "badge-warning"
      case CLASS_STATUS.CANCELLED:
        return "badge-secondary"
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

  const columnsLearner = [
    {
      Header: "Student List",
      columns: [
        {
          Header: "No.",
          accessor: "LEARNER_ID",
          Cell: ({ row }) => <div>{row.index + 1}</div>,
        },
        { Header: "Student Name", accessor: (d) => (`${d['FIRST_NAME']} ${d['LAST_NAME']}`) },
        { Header: "Account Type", accessor: "USER_CODE" },
        {
          Header: "Grade Level",
          accessor: "AGE_CATEGORY",
          Cell: (row) => <div class={"badge " + getBadgeLearner(getValueAge(row.value))}>{getValueAge(row.value)}</div>,
        }
        // {
        //   Header: "Action",
        //   accessor: "action",
        //   Cell: ({ row }) => (
        //     <div>
        //       <button
        //         data-target="#teacherModal"
        //         className="btn btn-link"
        //         data-toggle="modal"
        //         data-original-title="Edit"
        //         onClick={() => onClickEdit(row.index)}
        //       >
        //         <i className="fa fa-eye fa-2x text-muted"></i>
        //       </button>
        //       {/* <button
        //         data-target="#teacherModal"
        //         className="btn btn-link"
        //         data-toggle="modal"
        //         data-original-title="Delete"
        //         onClick={() => onClickEdit(row.index)}
        //       >
        //         <i className="ti-trash"></i>
        //       </button> */}
        //     </div>
        //   ),
        // },
      ],
    },
  ];

  const getBadgeLearner = (key) => {
    switch (key) {
      case 'KINDER TO GRADE 6 / ELEMENTARY':
        return "badge-info";
      case 'GRADE 7 TO 10 / JUNIOR HIGH':
        return "badge-primary";
      case 'GRADE 11 TO 12 / SENIOR HIGH':
        return "badge-success";
      case 'COLLEGE':
        return "badge-danger";
      default:
        return "badge-primary";
    }
  }

  const getValueAge = (key) => {
    let temp = LEARNER_GRADE_LEVELS.filter((object) => {
      return object.value === key;
    });
    return temp.length > 0 ? temp[0].label : "";
  }

  const getClassCount = () => {
    return classes.filter(item => 
      item.status === CLASS_STATUS.APPROVEDEDUC &&
      (dayjs(item.startDate).format('MMMM') === dayjs().format('MMMM') || dayjs(item.endDate).format('MMMM') === dayjs().format('MMMM') )
    ).length;
  }

  const getStudentCount = () => {
    return learners.filter(item => 
      dayjs(item.createdDatetime).format('MMMM') === dayjs().format('MMMM') 
    ).length;
  }

  // const onClickEdit = (index) => {
  //   console.log(index)
  //   console.log(classes)
  // }

  return (
    <div className="container-fluid">
      {/* <!-- ============================================================== -->
                <!-- Start Page Content -->
                <!-- ============================================================== --> */}
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              {/* <!-- Row --> */}
              <div className="row">
                <div className="col-8">
                  <h2> {classes && classes.length > 0 ? getClassCount() : 0} </h2>
                  <h6>My Classes This Month</h6>
                </div>
                <div className="col-4 align-self-center text-right  p-l-0">
                  <div id="sparklinedash3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              {/* <!-- Row --> */}
              <div className="row">
                <div className="col-8">
                  <h2> {learners && learners.length > 0 ? getStudentCount() : 0} </h2>
                  <h6>My Students This Month</h6>
                </div>
                <div className="col-4 align-self-center text-right  p-l-0">
                  <div id="sparklinedash3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              {/* <!-- Row --> */}
              <div className="row">
                <div className="col-8">
                  <h2>
                    {" "}
                    <i className="fa fa-dollar mr-1"></i> {earnings || 0} {" "}
                  </h2>
                  <h6>My Earnings This Month</h6>
                </div>
                <div className="col-4 align-self-center text-right  p-l-0">
                  <div id="sparklinedash3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              {/* <!-- Row --> */}
              <div className="row">
                <div className="col-8">
                  <h2>
                    {" "}
                    0 <i className="fa fa-star mr-1"></i>
                  </h2>
                  <h6>Overall Rating</h6>
                </div>
                <div className="col-4 align-self-center text-right  p-l-0">
                  <div id="sparklinedash3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Row --> */}
      <div className="row">
        <div className="col-lg-8 col-md-7">
          <div className="card" style={{ display: "none" }}>
            <div className="card-body">
              <div id="morris-area-chart2" style={{ height: "0" }}></div>
            </div>
          </div>
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
              <h4 className="card-title m-b-0">My Classes</h4>
            </div>
            <div className="card-body collapse show">
              {classes && classes.length > 0 ? (
                <div>
                  <Table columns={columns} data={classes} title={""} />

                  <div className="text-left">
                    <a href="/classes" className="btn btn-info">
                      View All Classes
                    </a>

                    {/* <a href="/classes"
                      data-toggle="modal"
                      data-target="#myModal"
                      className="btn btn-info text-white"
                    >
                     
                    </a> */}
                  </div>
                </div>
              ) : (
                <div className="col-12 text-center">
                  <img
                    src="/assets/images/tarsier-v2a.png"
                    style={{ width: "180px", height: "180px" }}
                    alt="mascot"
                  />
                  <h3>Uh oh!Looks like you haven't added any classes yet.</h3>
                  {applicationStatus === "ASTAT008" ? (
                    <a href="/createClass" className="btn btn-info">
                      + Create New Class
                    </a>

                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
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
              <h4 className="card-title m-b-0">My Students</h4>
            </div>
            <div className="card-body collapse show">
              {learners && learners.length > 0 ? (
                <div>
                  <Table columns={columnsLearner} data={learners} title={"Student List"}
                    filterColumn={'AGE_CATEGORY'} />
                  <div className="text-left">
                    <a href="/students" className="btn btn-info">
                      View All Learners
                    </a>
                  </div>
                </div>
              ) : (
                <div className="col-12 text-center">
                  <img
                    src="/assets/images/tarsier-v2a.png"
                    style={{ width: "180px", height: "180px" }}
                    alt="mascot"
                  />
                  <h3>Uh oh!Looks like you don't have any students yet.</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-5">
          {/* <!-- Column --> */}

          {application !== null && (
            <AccountTodos title="Complete Your Application">
              {todoItems.map((props, index) =>
                /*Don't allow user to skip a step*/
                index === 0 || todoItems[index - 1].done ? (
                  <Link to={props.link}>
                    <AccountTodo {...props} />
                  </Link>
                ) : (
                  <AccountTodo {...props} />
                )
              )}
            </AccountTodos>
          )}

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
                {((!announcements || announcements.filter(item=> item.userTypes.includes('TEACHER')).length === 0)) ? 
                   <div className="carousel-item flex-column active ">
                       
                        <h3 className="text-light font-light"><i>
                         No Announcements
                         </i></h3>
                      </div>: 
                    (announcements.filter(item=> item.userTypes.includes('TEACHER')).map((announcement, index) =>
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
                    (announcements.filter(item=> item.userTypes.includes('TEACHER')).map((announcement, index) =>
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
      {/* <!-- Row -->
                
                
                <!-- Row -->
                
                <!-- Row -->
                <!-- Row -->
                
                <!-- Row -->
                <!-- ============================================================== -->
                <!-- End PAge Content -->
                <!-- ============================================================== --> */}
    </div>
  );
}
