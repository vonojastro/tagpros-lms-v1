import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import StudentList from './StudentList';
import Attendance from './Attendance';
import { getAllClasses, submitClassApproval } from "api/class";
import { useDispatch, useSelector } from "react-redux";
import { CLASS_STATUS } from "utils/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { getDuration, toMoneyFormat } from 'utils/utils'
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from "dayjs";
import { toast } from 'react-toastify';
import { api } from '../../api';
import './index.css';
import { BsFillInfoCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import { Alert } from "react-bootstrap";
const Entities = require('html-entities').XmlEntities;
const he = new Entities();


const TeacherClasses = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);

  const navigate = useNavigate();
  const [alertError, setAlertError] = useState('')
  const [selectedClass, setSelectedClass] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const activeModule = 0;

  const dispatch = useDispatch();

  const classes = useSelector((state) =>
    state.classes ? state.classes.getIn(["data", "class"]) : []
  );

  const loadData = () => {
    getAllClasses(dispatch);
  };

  React.useEffect(() => {
    getAllClasses(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValue = (value) => {
    return Object.keys(CLASS_STATUS).find((key) => CLASS_STATUS[key] === value);
  };

  const getBadge = (key) => {
    switch (key) {
      case CLASS_STATUS.DRAFT:
        return "badge-info";
      case CLASS_STATUS.PENDING:
        return "badge-primary";
      case CLASS_STATUS.APPROVEDHR:
      case CLASS_STATUS.APPROVEDEDUC:
      case CLASS_STATUS.COMPLETED:
        return "badge-success";
      case CLASS_STATUS.REJECTEDHR:
      case CLASS_STATUS.REJECTEDEDUC:
        return "badge-danger";
      case CLASS_STATUS.RETURNED:
      case CLASS_STATUS.DELETE:
      case CLASS_STATUS.STARTED:
        return "badge-warning";
      case CLASS_STATUS.CANCELLED:
        return "badge-secondary";
      default:
        return "badge-primary";
    }
  };

  const onClickEdit = (index, action) => {
    setSelectedClass(classes[index]);
    console.log('classes[index]', classes[index]);

    if (action === 'edit') {
      navigate(`/editClass`, {
        state: { classDetails: classes[index] },
      });
    }
  };

  const onClose = (index) => {
    document.getElementById("teacherClasses-modal-close").click();
    setSubmitLoading(false);
  };

  const handleClickAction = async (status) => {
    if (!!selectedClass.learnercount && selectedClass.learnercount > 0) {
      setSubmitLoading(true);
      await submitClassApproval(dispatch, { id: selectedClass.currentClassId, classId: selectedClass.id, status, remarks: "set status" }, (response) => {
      if (response) {
        onClose();
        loadData();
        toast.success(`Class Status has been successfully set to ${status}!`);
      }
      // else {
      //     toast.error(`Failed setting class status to ${status}. Please try again later`);
      //     setSubmitLoading(false);
      // }
    });
    }else{
      setAlertError(`At least 1 learner must be enrolled before the class can be started...`);
      setTimeout(()=>{
        setAlertError(``);
      },5000)
    }
    
  }

  const getStartsAt = (d) => {
    let ret = ''
    try {
      ret = d.startDate ? dayjs(dayjs.tz(`${d.startDate} ${d.startTime}`, "YYYY/MM/DD HH:mm:ss", d.timeZone || 'Asia/Manila').format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : d.timeZone || 'Asia/Manila').format("YYYY/MM/DD") : d.startDate
    } catch (error) {
      ret = ''
    } finally {
      return ret
    }
  }

  const getTime = (d) => {
    let ret = ''
    try {
      ret = d.startDate ? dayjs(dayjs.tz(`${d.startDate} ${d.startTime}`, "YYYY/MM/DD HH:mm:ss", d.timeZone || 'Asia/Manila').format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : d.timeZone || 'Asia/Manila').format("hh:mm A") : d.startDate
    } catch (error) {
      ret = ''
    } finally {
      return ret
    }
  }

  const getPricePerSession = (d) => {
    let price = toMoneyFormat(d.priceAmount, d.priceCurrency);

    return price;
  }


  const columns = [
    {
      Header: () => null,
      id: 'expander',
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ?
            <button className="btn btn-link">
              <i className="fas fa-caret-down"></i>
            </button> :
            <button className="btn btn-link" onClick={() => getStudentList(row.index)}>
              <i className="fas fa-caret-right"></i>
            </button>
          }
        </span>
      ),
    },
    {
      Header: "Class List",
      id: 'tbl',
      columns: [
        {
          Header: "No.",
          accessor: "classid",
          Cell: ({ row }) => <div>{row.index + 1}</div>,
        },
        { Header: "Title", accessor: d => (he.decode(d.title)) },
        {
          Header: "Photo",
          accessor: "thumbnailImage",
          Cell: (row) => <img src={row.value} alt={row.title} width="80"></img>,
        },
        {
          Header: 'Price per session',
          accessor: getPricePerSession,
          // Cell: (row) => (
          //   <div style={{textAlign: 'center'}}>{row.value ? toMoneyFormat(row.value, classes[row.index]?.priceCurrency) : ""}</div>
          // ),
        },
        { Header: "Starts At", accessor: getStartsAt },
        { Header: "Time", accessor: getTime },
        {
          Header: 'No. Of Students',
          accessor: 'learnercount',
          Cell: (row) => (
            <div style={{ textAlign: 'center' }}>{row.value > 0 ? row.value : 0}</div>
          ),
        },
        {
          Header: "Status",
          accessor: "status",
          Cell: (row) => (
            <div className={"badge " + getBadge(row.value)}>{getValue(row.value)}</div>
          ),
        },
        {
          Header: "Action",
          accessor: d => d.status,
          Cell: ({ row, value }) => (
            <div className="d-flex">
              <span data-toggle="tooltip" title="Edit Class">
                <button
                  className="btn btn-link col pr-1 pl-1"
                  data-toggle="modal"
                  data-original-title="Edit"
                  onClick={() => onClickEdit(row.index, 'edit')}
                  disabled={[CLASS_STATUS.FOR_EDITING, CLASS_STATUS.APPROVEDEDUC, CLASS_STATUS.APPROVEDHR, CLASS_STATUS.CANCELLED,
                  CLASS_STATUS.DELETED, CLASS_STATUS.PENDING, CLASS_STATUS.STARTED, CLASS_STATUS.COMPLETED].indexOf(value) > -1}>
                  <i className="fas fa-edit" style={{ fontSize: '18px' }}></i>
                </button>
              </span>
              <span data-toggle="tooltip" title="View Class">
                <button
                  data-target="#teacherModal"
                  className="btn btn-link col pr-1 pl-1"
                  data-toggle="modal"
                  data-original-title="View"
                  onClick={() => onClickEdit(row.index, 'view')}>
                  <i className="fas fa-eye" style={{ fontSize: '18px' }}></i>
                </button>
              </span>
              <button
                data-target="tooltip"
                className="btn btn-link col pr-1 pl-1"
                title="Check Attendance"
                data-original-title="Check Attendance"
                disabled={classes[row.index].learnercount < 1}
                onClick={() => onClickAttendance(row.index)}>
                <i className="fas fa-clipboard-list" style={{ fontSize: '18px' }}></i>
              </button>
            </div>

          ),
        },
      ],
    },
  ];

  const onClickAttendance = (rowIndex) => {
    setShowAttendance(true);
    setSelectedClass(classes[rowIndex]);
    // getStudentList(rowIndex, true);
    document.getElementById("page-wrapper").scrollIntoView();
  }

  const getStudentList = async (index) => {
    setStudentList((prevState) => ({
      ...prevState,
      [index]: null
    }));
    await api.get(`/class/${classes[index].accountId}/students`)
      .then(response => {
        // if (isAttendance){
        //   setAttendanceList(response.data);
        // }else{
        setStudentList((prevState) => ({
          ...prevState,
          [index]: response.data
        }));
        // }
      }).catch(() => {
        // setAttendanceList((prevState) => []);
        setStudentList((prevState) => ({
          ...prevState,
          [index]: []
        }));
      });
  }

  const closeAttendance = () => {
    setShowAttendance(false);
  }

  const renderRowSubComponent = React.useCallback(
    ({ row }) => {
      return <StudentList
        row={row}
        students={studentList} />
    },
    // eslint-disable-next-line
    [studentList]
  )

  const renderClassLink = () => {
    let component = <Fragment />;

    if (
      !
      (
        selectedClass.jitsiLink
        &&
        (
          selectedClass.status === CLASS_STATUS.APPROVEDEDUC || selectedClass.status === CLASS_STATUS.STARTED
        )
        &&
        selectedClass.classType === 'CLT002'
      )
    )
      return component;
    return (
      <div className='d-flex flex-column mt-3'>
        <div className="class-info">
          <small className='text-muted classlink'>Class Link </small>
          <div class="tooltip-1">
            <BsFillInfoCircleFill />
            <span class="tooltiptext">
              <div className="tooltip-container">
                <div className="triangle"></div>
                Please note that the class link would only work when there is at least 1 learner enrolled in your class
              </div>
            </span>
          </div>
        </div>

        <div className="tooltip-mobile">
          <BsFillInfoCircleFill className="icon-mobile" />
          <p className="text-mobile">Please note that the class link would only work when there is at least 1 learner enrolled in your class</p>
        </div>

        <a
          href={selectedClass.jitsiLink}
          target='_blank'
          rel='noreferrer'
          className='d-flex align-items-center'
        >
          <img height={35} src='/assets/images/jitsi-icon.png' alt='...' />
          <p className='p-0 m-0'>Start session</p>
        </a>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              {/* <!-- .left-right-aside-column--> */}
              <div className="row" id="attendance">
                {/* <!-- .left-aside-column--> */}
                <div className="left-aside bg-light-part col">
                  <ul className="list-style-none">
                    <li className="box-label">
                      <a href="#/">
                        All Classes <span>{classes.length}</span>
                      </a>
                    </li>
                    <li className="divider"></li>
                    <li className="box-label m-t-20">
                      <NavLink activeClassName="active" to="/createClass">
                        <a
                          href="#/"
                          data-toggle="modal"
                          data-target="#myModal"
                          className="btn btn-info text-white"
                        >
                          + Create New Class
                        </a>
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* <!-- /.left-aside-column--> */}
                <div className="right-aside min-vh-100 col-9">
                  <Table
                    columns={columns}
                    data={classes}
                    title={"Class List"}
                    status={""}
                    onReload={loadData}
                    renderRowSubComponent={renderRowSubComponent}
                  />

                  {/* <!-- .left-aside-column--> */}
                </div>

                {/* <!-- /.left-right-aside-column--> */}
              </div>
              {showAttendance && <Attendance selectedClass={selectedClass} closeAttendance={closeAttendance} />}
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal"
          id="teacherModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Manage Classes
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => onClose()}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src={selectedClass.thumbnailImage}
                            className="card-img"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <small className="text-muted">Title </small>
                            <h6>{he.decode(selectedClass.title)}</h6>
                            <small className="text-muted">Price </small>
                            <h6>{toMoneyFormat(selectedClass.totalPrice, selectedClass.priceCurrency)}</h6>
                            <small className="text-muted">Category </small>
                            <h6>
                              {selectedClass.category
                                ? selectedClass.category + " > "
                                : ""}{" "}
                              {selectedClass.subCategory}
                            </h6>
                            <small className="text-muted p-t-10 db">Level</small>
                            <h6>{selectedClass.skillLevel}</h6>
                            <small className="text-muted p-t-10 db">Ages</small>
                            <h6>{selectedClass.ageCategory}</h6>
                            {renderClassLink()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        {/* Nav tabs */}
                        <ul className="nav nav-tabs profile-tab" role="tablist">
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#video"
                              role="tab"
                            >
                              Class Introduction
                            </a>{" "}
                          </li>
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#attachments"
                              role="tab"
                            >
                              Goals
                            </a>{" "}
                          </li>
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#academic"
                              role="tab"
                            >
                              Resources
                            </a>{" "}
                          </li>
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#topic"
                              role="tab"
                            >
                              Schedule
                            </a>{" "}
                          </li>
                          {selectedClass.classType === 'CLT002' ? (<li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#description"
                              role="tab"
                            >
                              Quizzes
                            </a>{" "}
                          </li>) : (<li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#modules"
                              role="tab"
                            >
                              Modules
                            </a>{" "}
                          </li>)}
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                          <div className="tab-pane fade show active" id="video" role="tabpanel">
                            <div className="card-body">
                              <p style={{ whiteSpace: "pre-line" }}>
                                {he.decode(selectedClass.classIntroduction)}
                              </p>
                            </div>
                          </div>
                          {/*second tab*/}
                          <div className="tab-pane fade" id="attachments" role="tabpanel">
                            <div className="card-body">
                              <p style={{ whiteSpace: "pre-line" }}>
                                {he.decode(selectedClass.learningGoals)}
                              </p>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="academic" role="tabpanel">
                            <div className="card-body">
                              <p style={{ whiteSpace: "pre-line" }}>
                                {he.decode(selectedClass.externalResources)}
                              </p>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="topic" role="tabpanel">
                            <div className="card-body">
                              {/* <span>
                                <i className="fa fa-calendar-alt mr-2 text-muted" />
                                <b>Enrollment Date: </b>{selectedClass.enrollmentStartDate && dayjs(dayjs.tz(`${selectedClass.enrollmentStartDate}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("YYYY/MM/DD")} - {selectedClass.enrollmentEndDate && dayjs(dayjs.tz(`${selectedClass.enrollmentEndDate}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("YYYY/MM/DD")}
                              </span> <br/><br/> */}
                              {((selectedClass.availableDates || selectedClass.startDate) && selectedClass.classType === 'CLT002') && <div>
                                {selectedClass.availableDates ?
                                  <span>
                                    <i className="fa fa-calendar-alt text-muted" /> {selectedClass.availableDates && "No. of Sessions : " + selectedClass.availableDates.length}
                                    <br />
                                    {selectedClass.availableDates.map(date => (
                                      <div>&emsp;<i className="fa fa-caret-right text-muted" />{" " + dayjs(dayjs.tz(`${dayjs(date).format("YYYY/MM/DD")} ${selectedClass.startTime}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format('dddd, LL')}<br /></div>
                                    ))}
                                  </span> :
                                  <span>
                                    <i className="fa fa-calendar-alt mr-2 text-muted" />
                                    <b>Date: </b>{selectedClass.startDate && dayjs(dayjs.tz(`${selectedClass.startDate} ${selectedClass.startTime}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("YYYY/MM/DD")}
                                  </span>
                                }
                                <br />
                                <span>
                                  <i className="fa fa-clock mr-2 text-muted" />
                                  <b>Time: </b>{selectedClass.startDate && dayjs(dayjs.tz(`${selectedClass.startDate} ${selectedClass.startTime}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("hh:mm A")}
                                  - {selectedClass.startDate && dayjs(dayjs.tz(`${selectedClass.startDate} ${selectedClass.endTime}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("hh:mm A")}
                                </span>
                                <br />
                                <span>
                                  &nbsp;&nbsp;&emsp;<b>Duration: </b> {getDuration(selectedClass.startTime, selectedClass.endTime)}
                                </span>
                              </div>}

                              {selectedClass.classType === 'CLT001' && <div>
                                <span>
                                  <i className="fa fa-calendar-alt mr-2 text-muted" />
                                  <b>Availability Date: </b>{selectedClass.availabilityStartDate && dayjs(dayjs.tz(`${selectedClass.availabilityStartDate}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("YYYY/MM/DD")} - {selectedClass.availabilityEndDate && dayjs(dayjs.tz(`${selectedClass.availabilityEndDate}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("YYYY/MM/DD")}
                                </span>
                              </div>}
                            </div>
                          </div>
                          {selectedClass.classType === 'CLT002' && <div className="tab-pane fade" id="description" role="tabpanel">
                            <div className="card-body">
                              <div class="overflow-auto">
                                {(selectedClass.questions && selectedClass.questions.length > 0) ? (
                                  selectedClass.questions.map((question, idx) => {
                                    return (
                                      <div key={question.questionId} className="mb-2">
                                        <div className="mb-1">{idx + 1}. {question.questionDescription}</div>
                                        <div className="container">
                                          <div className="row row-cols-2">
                                            {question.choices && question.choices.map((choice) => (
                                              <div className="col">
                                                <span style={{ color: choice.isAnswer === 'true' && 'green', fontWeight: choice.isAnswer === 'true' && 900 }}>• {choice.choiceDescription}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p>Class has no pop quiz.</p>
                                )}
                              </div>
                            </div>
                          </div>}
                          {selectedClass.classType === 'CLT001' && <div className="tab-pane fade" id="modules" role="tabpanel">
                            <div className="card-body">
                              <div className="overflow-auto">
                                {(!selectedClass.lectures || (!!selectedClass.lectures && selectedClass.lectures.length < 1)) ? (<div><i>No modules added</i></div>) :
                                  (<div class="row module-nav">
                                    <div class="col-3 nav-container">
                                      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        {selectedClass.lectures.map((lecture, index) => (<a class={`nav-link ${activeModule === index && 'active'}`} id={`v-pills-${lecture.id}-tab`} data-toggle="pill" href={`#v-pills-${lecture.id}`} role="tab" aria-controls={`v-pills-${lecture.id}`} aria-selected={activeModule === index ? true : false}>{lecture.title}</a>))}
                                      </div>
                                    </div>
                                    <div class="col-9">
                                      <div class="tab-content" id="v-pills-tabContent">
                                        {selectedClass.lectures.map((lecture, index) => (<div class={`tab-pane fade ${activeModule === index && 'show active'}`} id={`v-pills-${lecture.id}`} role="tabpanel" aria-labelledby={`v-pills-${lecture.id}-tab`}>
                                          <span>
                                            <i className="fa fa-calendar-alt mr-2 text-muted" />
                                            <b>Recommended Due Date: </b>{dayjs(dayjs.tz(`${lecture.recommendedDueDate}`, "YYYY/MM/DD HH:mm:ss", selectedClass.timeZone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedClass.timeZone).format("YYYY/MM/DD")}
                                          </span><br /><br />
                                          <fieldset className="fieldset-border mb-2">
                                            <legend className="fieldset-border"><b>Description</b></legend>
                                            {he.decode(lecture.description)}
                                          </fieldset>

                                          <fieldset className="fieldset-border mb-2">
                                            <legend className="fieldset-border"><b>Content</b></legend>
                                            {he.decode(lecture.content)}
                                          </fieldset>

                                          <fieldset className="fieldset-border mb-2">
                                            <legend className="fieldset-border"><b>Raw Video</b></legend>
                                            <ReactPlayer
                                              autoPlay
                                              url={lecture.videoLink}
                                              style={{ marginBottom: 10 }}
                                              width={"100%"}
                                              controls
                                              height={"auto"} />
                                          </fieldset>

                                          {selectedClass.status !== CLASS_STATUS.DRAFT && <fieldset className="fieldset-border mb-2">
                                            <legend className="fieldset-border"><b>Final Video</b></legend>
                                            {!lecture.finalVideo ? <span><i>No final video yet</i></span> : <ReactPlayer
                                              autoPlay
                                              url={lecture.finalVideo}
                                              style={{ marginBottom: 10 }}
                                              width={"100%"}
                                              controls
                                              height={"auto"} />}
                                          </fieldset>}

                                          <fieldset className="fieldset-border">
                                            <legend className="fieldset-border"><b>Pop Quiz</b></legend>
                                            {(lecture.questions && lecture.questions.length > 0) ? (
                                              lecture.questions.map((question, qstnIdx) => {
                                                return (
                                                  <div key={question.questionId} className="mb-2">
                                                    <div>{qstnIdx + 1}. {question.questionContent}</div>
                                                    <div className="container">
                                                      <div className="row row-cols-2">
                                                        {question.choices.map((choice) => (
                                                          <div className="col">
                                                            <span style={{ color: choice.isAnswer === 'true' && 'green', fontWeight: choice.isAnswer === 'true' && 900 }}>• {choice.choiceContent}</span>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })
                                            ) : (
                                              <p><i>Module has no pop quiz.</i></p>
                                            )}
                                          </fieldset>
                                        </div>))}
                                      </div>
                                    </div>
                                  </div>)}
                              </div>
                            </div>
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="modal-title" id="exampleModalLabel">Action</h5>
                        <br />
                        <div className="row justify-content-around">
                          {/* <button className="btn btn-danger col-5" onClick={() => setModalShow(true)} disabled={selectedPayment.status !== PAYMENT_STATUS.PAID}>
                                For Refund
                            </button> */}
                          <button className="btn btn-info col-5" disabled={selectedClass.status !== CLASS_STATUS.APPROVEDEDUC || submitLoading} onClick={() => handleClickAction('started')}>
                            <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                            Class Started
                          </button>
                          <button className="btn btn-success col-5" disabled={selectedClass.status !== CLASS_STATUS.STARTED || submitLoading} onClick={() => handleClickAction('completed')}>
                            <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                            Class Completed
                          </button>
                        </div>

                      </div>
                      <div>
                        <Alert variant="danger" 
                        // style={{ whiteSpace: "pre-wrap" }}
                        style={{margin: '0  30px', border: 'none', background: 'none',
                         padding: '0 8px 10px 8px', fontSize: '.9rem', fontWeight: '400'}}
                        >
                          {alertError}
                        </Alert>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="teacherClasses-modal-close"
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onClose()}
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                {/* <button type="button" className="btn btn-primary" onClick={() => this.onSubmitReview()}>Submit</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">© 2021 Tagpros Education</footer>
    </Fragment>
  );
};

export default TeacherClasses;
