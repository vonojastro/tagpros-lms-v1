import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { getAllMyStudents } from "api/class";
import { useDispatch, useSelector } from "react-redux";
import {LEARNER_GRADE_LEVELS} from "utils/constants";
import LearnerInfoModal from "components/LearnerInfoModal";
import _ from "lodash";
import dayjs from 'dayjs';

const TeacherLearners = () => {
  const [openLearnerInfoModal, setOpenLearnerInfoModal] = useState(false);
  const [modalLearnerInfo, setModalLearnerInfo] = useState(null);

  
  const [selectedClass] = useState({});

  const dispatch = useDispatch();

  const learners = useSelector((state) =>
    state.classes ? state.classes.getIn(["data", "learner"]) :[] 
  );

  const handleClickMyStudent = (row) => {
    // find the learner by learner id, then convert keys from snake case to camel case
    const learnerClicked = _.mapKeys(learners.find(({accountId})=> row.original.accountId === accountId),(v,key)=> _.camelCase(key))
    // key learnerPhoto must be instead passed as photo
    learnerClicked.photo = learnerClicked.learnerPhoto; 
    learnerClicked.dateOfBirth = dayjs(learnerClicked.dateOfBirth).format('YYYY-MM-DD');
    setModalLearnerInfo(learnerClicked) 
    setOpenLearnerInfoModal(true);
  }
  React.useEffect(() => {
    getAllMyStudents(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBadge = (key) => {
    switch (key) {
      case "KINDER TO GRADE 6 / ELEMENTARY":
        return "badge-info";
      case "GRADE 7 TO 10 / JUNIOR HIGH":
        return "badge-primary";
      case "GRADE 11 TO 12 / SENIOR HIGH":
        return "badge-success";
      case "COLLEGE":
        return "badge-danger";
      default:
        return "badge-primary";
    }
  };

  const getValue = (key) =>{
    let temp = LEARNER_GRADE_LEVELS.filter((object)=>{
      return object.value === key;
    });
    return temp.length > 0 ? temp[0].label : "";
  }

  const getCountByAgeCategory = (category) =>{
    return learners.filter((learner)=>{
      return learner.AGE_CATEGORY === category;
    }).length;
  };

  // const onClickEdit = (index) => {
  //   setSelectedClass(learners[index]);
  //   console.log(index);
  //   console.log(selectedClass);
  //   console.log(learners);
  // };

  const onClose = (index) => {
    document.getElementById("modal-close").click();
  };

  const columns = [
    {
      Header: "Student List",
      columns: [
        {
          Header: "No.",
          // accessor: "LEARNER_ID",
          Cell: ({ row }) => <div>{row.index + 1}</div> // Removed since accessor was set to LEARNER_ID
        },
        { Header: "Student Name", accessor: (d) => (`${d['FIRST_NAME']} ${d['LAST_NAME']}`) },
        { Header: "Account Type", accessor: "USER_CODE" },
        {
          Header: "Grade Level",
          accessor: "AGE_CATEGORY",
          Cell: (row) => <div class={"badge " + getBadge(getValue(row.value))}>{getValue(row.value)}</div>,
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

  return (
    <Fragment>
      <LearnerInfoModal info={modalLearnerInfo} mode='view' customCloseModalHandler={()=>setOpenLearnerInfoModal(false)} customIsOpen={openLearnerInfoModal}/> 
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              {/* <!-- .left-right-aside-column--> */}
              <div className="row">
                {/* <!-- .left-aside-column--> */}
                <div className="left-aside bg-light-part col">
                  <ul className="list-style-none">
                    <li className="box-label">
                      <a href="#!" onClick={(event)=>{ event.preventDefault();}}>
                        All Students <span>{learners.length}</span>
                      </a>
                    </li>
                    <li className="divider"></li>
                    {LEARNER_GRADE_LEVELS.map((item) =>{
                      return (<li>
                        <a href="#!" onClick={(event)=>{ event.preventDefault();}}>
                          {item.label} <span>{getCountByAgeCategory(item.value)}</span>
                        </a>
                      </li>)
                    })}
                    {/* <li>
                      <a href="#!" onClick={(event)=>{ event.preventDefault();}}>
                        Grade School <span>{getCountByAgeCategory()}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#!" onClick={(event)=>{ event.preventDefault();}}>
                        Junior High <span>{0}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#!" onClick={(event)=>{ event.preventDefault();}}>
                        Senior High <span>{0}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#!" onClick={(event)=>{ event.preventDefault();}}>
                        All High School <span>{0}</span>
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="#/">
                        Grade School <span>{0}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#/">
                        Junior High <span>{0}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#/">
                        Senior High <span>{0}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#/">
                        All High School <span>{0}</span>
                      </a>
                    </li> */}
                  </ul>
                </div>
                {/* <!-- /.left-aside-column--> */}
                

                {/* <!-- /.left-right-aside-column--> */}
              <div className="right-aside min-vh-100 col-9">
                  <Table
                    columns={columns}
                    data={learners}
                    title={"Student List"}
                    filterColumn={'AGE_CATEGORY'}
getRowProps={row => ({
                      onClick: ()=>handleClickMyStudent(row),style:{cursor:'pointer'}
                      
        })}
                  />

                  {/* <!-- .left-aside-column--> */}
                </div>
              </div>
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
                            <h6>{selectedClass.title}</h6>
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
                          <li className="nav-item">
                            {" "}
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#description"
                              role="tab"
                            >
                              Quizzes
                            </a>{" "}
                          </li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                          <div className="tab-pane active" id="video" role="tabpanel">
                            <div className="card-body">
                              <p style={{whiteSpace: "pre-line"}}>{selectedClass.classIntroduction}</p>
                            </div>
                          </div>
                          {/*second tab*/}
                          <div className="tab-pane" id="attachments" role="tabpanel">
                            <div className="card-body">
                              <p style={{whiteSpace: "pre-line"}}>{selectedClass.learningGoals}</p>
                            </div>
                          </div>
                          <div className="tab-pane" id="academic" role="tabpanel">
                            <div className="card-body">
                              <p style={{whiteSpace: "pre-line"}}>{selectedClass.externalResources}</p>
                            </div>
                          </div>
                          <div className="tab-pane" id="topic" role="tabpanel">
                            <div className="card-body">
                              <p>
                                <b>Start Date:</b>
                                {selectedClass.startDate}
                              </p>
                              <p>
                                <b>End Date:</b>
                                {selectedClass.endDate
                                  ? selectedClass.endDate
                                  : selectedClass.startDate}
                              </p>
                              <p>
                                <b>Start Time:</b>
                                {selectedClass.startTime}
                              </p>
                              <p>
                                <b>End Time:</b>
                                {selectedClass.endTime}
                              </p>
                            </div>
                          </div>
                          <div className="tab-pane" id="description" role="tabpanel">
                            <div className="card-body">
                              {/* <p>{selectedClass.classDescription}</p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="modal-title" id="exampleModalLabel">Decision</h5>

                        <div className="form-group">
                          <select value={status} onChange={(event) => this.setState({ status: event.target.value })} className="form-control">
                            <option value={"100"}></option>
                            <option value={"200"}>Approved</option>
                            <option value={"400"}>Returned</option>
                            <option value={"300"}>Rejected</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <textarea defaultValue={remarks}
                            onChange={(event) => this.setState({ remarks: event.target.value })} className="form-control" rows="3" placeholder="Write your remarks here ..."></textarea>
                        </div>

                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="modal-close"
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

export default TeacherLearners;
