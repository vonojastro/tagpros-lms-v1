import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from "react-redux";
import { getSchoolLeaders, submitSchoolLeaderReview } from "api/schoolLeader";
import { getTeachersBySchoolLeader } from "api/school-leader";
import moment from "moment";
import { toast } from 'react-toastify';
import { SCHOOL_LEADERS_STATUS } from "utils/constants"
// import './index.css';
import { TEACHER_STATUS } from "utils/constants";

const initialValue = {
    name: "",
    code: "",
    type: "promo",
    price: null,
    percentage: null,
    startDate: null,
    endDate: null,
    currency: "",
    limit: null,
    status: 'A',
}

export default function SchoolLeaders() {
    const attachments = [ 
        {name: 'cvResume', desc: 'Curriculum Vitae/Resume'},
        {name: 'professionalLicense', desc: 'Professional License'}, 
        {name: 'govtId', desc: 'Government ID'}, 
        {name:'refRecommendation', desc: 'References/Recommendations'}
    ];
    const dispatch = useDispatch();
    const [teacherTableData, setTeacherTableData] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState({});
    // const [filterValue, setFilterValue] = useState("");
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [selectedSchoolLeader, setSelectedSchoolLeader] = useState(initialValue);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    const schoolLeaders = useSelector((state) => state.schoolLeader ? state.schoolLeader.getIn(['data', 'schoolLeader']) : []);
    const [initialStatus, setInitialStatus] = useState(null);
    const hiring = ["YES", "NOT RIGHT NOW", "NO"];
    const [isModified, setIsModified] = useState(false);
    const loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const loadData = () => {
        setErrorTable(false);

        getSchoolLeaders(dispatch, (status, data) => {
            if (!status) {
                setErrorTable(true);
            }
        });
    }

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [toggleSortFilter, setToggleSortFilter] = useState({});
    const columns = [
        {
            Header: "School Leaders",
            columns: [
                {
                    Header: 'No.',
                    accessor: 'schoolLeadersId',
                },
                {
                    Header: 'School Name',
                    accessor: 'schoolName',
                    accessorFilter: 'schoolName',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Country',
                    accessor: 'country',
                    accessorFilter: 'country',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'School Type',
                    accessor: 'schoolType',
                    accessorFilter: 'schoolType',
                    filterType: 'multipleSelect',
                    columnFilter: true,
                    filter: multiSelectFilter
                },
                {
                    Header: 'Application Date',
                    accessor: d => moment(d.applicationDate).format("MM/DD/YYYY hh:mm a"),
                    accessorFilter: 'Appliction_Date',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    accessorFilter: 'status',
                    filterType: 'multipleSelectGetValue',
                    getValueType: 'SchoolLeadersStatus',
                    columnFilter: true,
                    filter: multiSelectFilter,
                    Cell: row => (
                        <div className={"badge " + getBadge(row.value)}>{getValue(row.value)}</div>
                    )
                },
                {
                    Header: 'Action',
                    accessor: d => d.status,
                    Cell: ({ row, value }) => (
                        <div style={{ display: 'flex' }}>
                            <button
                                data-target="#exampleModal"
                                className="btn btn-link"
                                data-toggle="modal"
                                data-original-title="Edit"
                                onClick={() => onClickAction('edit', row.index)}
                                // disabled={value === SCHOOL_LEADERS_STATUS.FOR_VERIFICATION ? true : false}
                            >
                                <i className="ti-marker-alt"></i>
                            </button>
                            <button
                                className="btn btn-sm btn-info"
                                data-toggle="modal"
                                data-original-title="Edit"
                                onClick={() => onClickAction('viewSchoolLeaderTeachers', row.index)}
                            >
                                <i className="ti-user"></i>
                            </button>
                        </div>
                    ),
                }
            ]
        }
    ];
    function multiSelectFilter(rows, columnIds, filterValue) {
        return filterValue.length === 0
            ? rows
            : rows.filter((row) =>
                filterValue.includes(String(row.original[columnIds])),
            );
    }
    const teacherColumns = [
        {
          Header: " List of Teachers",
          id:"tbl",
          columns: [
            {
              Header: 'No',
              accessor: "no",
              Cell: ({ row }) => (
                  <div>{row.index + 1}</div>
              ),
            },
            {
              Header: 'Application No.',
              accessor: "applicationNumber"
            },
            {
              Header: 'Name',
              accessor: "name"
            },
            {
                Header: 'Email',
                accessor: "email"
            },
            {
              Header: 'Status', accessor: "status",
              Cell: row => (
                  <div className={"badge " + getBadge(row.value)}>{getStatus(row.value)}</div>
              ),
              },
            {
              Header: 'Updated Date',
              accessor: "updatedDatetime"
            },
            {
              Header: 'Action',
              accessor: 'id',
      
              Cell: ({ row, value }) => (
                  <div style={{display: 'flex'}}>
                      <button
                          data-target="#teacherModal"
                          className="btn btn-sm btn-info"
                          data-toggle="modal"
                          data-original-title="Edit"
                          onClick={() => onClickAction("viewDetails", row.index)}
                      >
                          Details
                      </button>
                  </div>
              ),
            }
          ]
        }
      ];

    const getValue = (value) => {
        return Object.keys(SCHOOL_LEADERS_STATUS).find(key => SCHOOL_LEADERS_STATUS[key] === value);
    }

    const getBadge = (key) => {
        switch (key) {
            case SCHOOL_LEADERS_STATUS.FOR_VERIFICATION:
                return "badge-info"
            case SCHOOL_LEADERS_STATUS.PENDING:
                return "badge-primary"
            case SCHOOL_LEADERS_STATUS.APPROVED:
                return "badge-success"
            case SCHOOL_LEADERS_STATUS.REJECTED:
                return "badge-danger"
            case TEACHER_STATUS.PENDING:
                return "badge-primary"
            case TEACHER_STATUS.SHORTLISTED:
                return "badge-success"
            case TEACHER_STATUS.REJECTED:
                return "badge-danger"
            default:
                return "badge-primary"
        }
    }

    const getStatus = (value) => {
        return Object.keys(TEACHER_STATUS).find(key => TEACHER_STATUS[key] === value);
    }

    const onClickAction = (action, index) => {
        switch(action){
            case 'edit':
                setSelectedSchoolLeader({
                    ...schoolLeaders[index],
                });
                setInitialStatus(schoolLeaders[index].status);
                setStatus(schoolLeaders[index].status);
                setRemarks(schoolLeaders[index].remarks);
                break;
            case 'viewSchoolLeaderTeachers': 
                const args = {schoolLeaderId: schoolLeaders[index].schoolLeadersId};
                getTeachersBySchoolLeader (dispatch, args, async (status, data)=>{
                    if(!status){
                        toast.error("Oh no! Something went wrong. Please try again.");
                    }
                    else{
                        setTeacherTableData(data);
                        console.log(data);
                    }
                });
        
                console.log(teacherTableData);
                setIsModified(!isModified);
                setSelectedSchoolLeader({
                    ...schoolLeaders[index],
                });
                setInitialStatus(schoolLeaders[index].status);
                setStatus(schoolLeaders[index].status);
                setRemarks(schoolLeaders[index].remarks);
                break;
            case 'viewDetails':
                setSelectedTeacher(teacherTableData[index])
                break;    
            default:
        }
        
    }

    const onClose = (reload) => {
        // document.getElementById("updateForm").reset();
        document.getElementById("modal-close").click()

        setSelectedSchoolLeader({ ...initialValue });
        setErrorUpdate(false);

        loadData();
    }

    const onChange = (value) => {
        // setRemarks(template.description);
        setStatus(value);
    }

    const submitReview = async () => {
        setSubmitLoading(true);

        await submitSchoolLeaderReview(dispatch, { schoolLeadersId: selectedSchoolLeader.schoolLeadersId, status, remarks }, status => {

            console.log("STATUS " + status);
            if (status) {
                onClose(true);
                toast.success('School Leader has been successfully saved.');
            } else {
                setErrorUpdate(true);
            }
        });
        setSubmitLoading(false);

    }

    return (
        <Fragment>
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* <!-- .left-right-aside-column--> */}
                            <div className="row">
                                {/* <!-- .left-aside-column--> */}
                                <div className="left-aside bg-light-part col">
                                    <ul className="list-style-none">
                                        <li className="box-label">
                                            {isModified ?
                                            // <a href="#!">
                                            //     Total {selectedSchoolLeader.schoolName} Teachers<span>{teacherTableData.length}</span>
                                            // </a> 
                                                <div className="admin-table-total">
                                                    <h5>
                                                        Total {selectedSchoolLeader.schoolName} Teachers
                                                    </h5>
                                                    <span>{teacherTableData.length}</span>
                                                </div>
                                            :
                                            // <a href="#!">
                                            //     Total School Leaders <span>{schoolLeaders.length}</span>
                                            // </a>
                                                <div className="admin-table-total">
                                                    <h5>
                                                        Total School Leaders 
                                                    </h5>
                                                    <span>{schoolLeaders.length}</span>
                                                </div>
                                            }
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <CSVLink data={[]} className="btn btn-success" filename="School-Leaders-List.csv" style={{ color: "white" }}>
                                                Export to CSV
                                            </CSVLink>
                                            {/* <button onClick={() => this.onClick()}>test</button> */}
                                        </li>
                                        <li className="divider"></li>
                                        {/* <li ><b>Filter</b></li>

                                        <li>
                                            <div className="col">
                                                <label className="row">{!isModified ? 'School Leaders' : 'Teacher' } Status</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control row">
                                                    <option value="">All</option>
                                                    {!isModified ? <>
                                                    <option value="A">Active</option>
                                                    <option value="I">Inactive</option>
                                                    </>
                                                    :
                                                    <>
                                                    <option value={TEACHER_STATUS.PENDING}>Pending</option>
                                                    <option value={TEACHER_STATUS.SHORTLISTED}>Shortlisted</option>
                                                    <option value={TEACHER_STATUS.FOR_INTERVIEW}>For Interview</option>
                                                    <option value={TEACHER_STATUS.ACCEPTED}>Accepted</option>
                                                    <option value={TEACHER_STATUS.REJECTED}>Rejected</option> </>}
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li> */}
                                    </ul>
                                </div>
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col-9">
                                    {/* <div className="button-fab">
                                        <button type="button" className="btn btn-info"
                                            data-target="#exampleModal" data-toggle="modal" onClick={() => onClickAction('add')}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div> */}
                                    {isModified ?<>
                                        <Table
                                        loading={loading}
                                        error={errorTable}
                                        columns={teacherColumns}
                                        data={teacherTableData}
                                        title={selectedSchoolLeader.schoolName + " Teachers"}
                                        // filterColumn={'status'}
                                        // filterValue={filterValue}
                                        toggleSortFilter={toggleSortFilter}
                                        setToggleSortFilter={setToggleSortFilter}
                                        onReload={loadData}
                                    />
                                    <div className="d-flex align-items-end justify-content-end">

                                    {isModified ? <button className="btn btn-danger btn-info col-2 " onClick={() => setIsModified(!isModified)}>
                                            Back
                                    </button> : <></>
                                    }
                                    </div>
                                        </>  
                                     : <Table
                                        loading={loading}
                                        error={errorTable}
                                        columns={columns}
                                        data={schoolLeaders}
                                        title={"School Leaders"}
                                        // filterColumn={'status'}
                                        // filterValue={filterValue}
                                        toggleSortFilter={toggleSortFilter}
                                        setToggleSortFilter={setToggleSortFilter}
                                        onReload={loadData}
                                    />} 
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Manage School Leaders</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {!!errorUpdate && <div className="alert alert-warning text-center text m-t-20"
                                style={{ fontSize: 10 }}>
                                <i class="fas fa-times float-right" style={{ cursor: 'pointer' }} onClick={() => setErrorUpdate(false)}></i>
                                <span className="font-weight-bold" style={{ fontSize: 12 }}>
                                    Something went wrong.
                                </span>
                                <br />
                                Please try again later.
                            </div>}
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="row no-gutters">
                                                <div className="col-md-4">
                                                    <img src="./assets/images/image-placeholder.jpg" className="card-img" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <small className="text-muted p-t-0">Name </small>
                                                        <h6>{selectedSchoolLeader.name}</h6>
                                                        <small className="text-muted p-t-5 db">Email </small>
                                                        <h6>{selectedSchoolLeader.email}</h6>
                                                        {/* <small className="text-muted p-t-5 db">Work Email</small>
                                                        <h6>{selectedSchoolLeader.workEmail}</h6> */}
                                                        <small className="text-muted p-t-5 db">Institution/School Name</small>
                                                        <h6>{selectedSchoolLeader.schoolName}</h6>
                                                        <small className="text-muted p-t-5 db">Country</small>
                                                        <h6>{selectedSchoolLeader.country}</h6>
                                                        <small className="text-muted p-t-5 db">Date Submitted</small>
                                                        <h6>2021/08/12 - 10:04 AM</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">


                                                {/* Nav tabs */}
                                                <ul className="nav nav-tabs profile-tab">
                                                    <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#details">Details</a> </li>
                                                    {/* <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#goals" role="tab">Goals</a> </li> */}
                                                </ul>
                                                {/* Tab panes */}
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="details">
                                                        <br />
                                                        <p>
                                                            <b><i className="fa fa-graduation-cap text-muted" /> School Type: </b> {selectedSchoolLeader.schoolType}
                                                        </p>
                                                        <p>
                                                            <b><i className="fa fa-user text-muted" /> I’m currently looking to hire teachers for my school(s). </b> - {hiring[selectedSchoolLeader.hiring]}
                                                        </p>
                                                        <p>
                                                            <b><i className="fa fa-question text-muted" /> How can we can help with your recruitment? </b> <br /> - {selectedSchoolLeader.recHelp}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="modal-title" id="exampleModalLabel">Decision</h5>

                                                <div className="form-group">
                                                    <select className="form-control" value={status} onChange={e => onChange(e.target.value)}>
                                                        <option value="SDSTAT002"></option>
                                                        <option value="SDSTAT003">Approve</option>
                                                        {/* <option value="return">Return</option> */}
                                                        <option value="SDSTAT004">Reject</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <textarea defaultValue={remarks} value={remarks} className="form-control" rows="3" placeholder="Write your remarks here ..." onChange={e => setRemarks(e.target.value)}></textarea>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal">Cancel</button>
                                <button type="button" style={{ cursor: (submitLoading || initialStatus === status) && 'not-allowed' }} className="btn btn-primary" onClick={() => submitReview()} disabled={submitLoading || initialStatus === status}>
                                    <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
               {/* Modal */}
               <div className="modal" id="teacherModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Manage School Leaders</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card mb-3">
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        <img src={selectedTeacher.photo ? selectedTeacher.photo : "./assets/images/image-placeholder.jpg"} className="card-img" alt="..." />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <small className="text-muted">Name </small>
                                                            <h6>{selectedTeacher.name}</h6>
                                                            {/* <h6>{selectedTeacher.name}</h6> */}
                                                            <small className="text-muted">Email address </small>
                                                            {/* <h6>************</h6> */}
                                                            <h6>{selectedTeacher.email}</h6>
                                                            <small className="text-muted p-t-10 db">Phone</small>
                                                            {/* <h6>***********</h6> */}
                                                            <h6>{selectedTeacher.contactNumber}</h6>
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
                                                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#video" role="tab">Intro Video</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#attachments" role="tab">Attachments</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#academic" role="tab">Academic</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#topic" role="tab">Topic</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#description" role="tab">Description</a> </li>
                                                        {(selectedTeacher.status === 'TSTAT001' || selectedTeacher.status === 'TSTAT002') ? <></> :  <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#interviewNotes" role="tab">Interview Notes</a> </li>}
                                                    </ul>
                                                    {/* Tab panes */}
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="video" role="tabpanel">
                                                            <div className="card-body">
                                                                {(!selectedTeacher.classSampleVid
                                                                    || selectedTeacher.classSampleVid=== '{}') && <h3><i>No video uploaded</i></h3>}
                                                                {!(!selectedTeacher.classSampleVid
                                                                    || selectedTeacher.classSampleVid=== '{}') && <div className="embed-responsive embed-responsive-16by9">
                                                                    <iframe className="embed-responsive-item"
                                                                        src={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${selectedTeacher.classSampleVid}`}
                                                                        title="Test Video" allowFullScreen></iframe>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                        {/*second tab*/}
                                                        <div className="tab-pane" id="attachments" role="tabpanel">
                                                            <div className="card-body">
                                                            <ul class="list-group">
                                                                {attachments.map((item, key) => 
                                                                    <li key={key} class="list-group-item d-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            <h5 className="mb-1" style={{fontStyle: (!selectedTeacher[item.name] 
                                                                                    || selectedTeacher[item.name] === '{}') && 'italic'}}>
                                                                                {(!selectedTeacher[item.name] 
                                                                                    || selectedTeacher[item.name] === '{}') ? 
                                                                                    'No Attachment yet' : selectedTeacher[item.name]}
                                                                            </h5>
                                                                            <small style={{color: 'gray'}}>{item.desc}</small>
                                                                        </div>
                                                                        { !(!selectedTeacher[item.name] || selectedTeacher[item.name] === '{}') && 
                                                                        <div>
                                                                            <a className="btn btn-link" href={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${selectedTeacher[item.name]}`} target="_blank" rel="noreferrer">
                                                                                <i className="far fa-eye" aria-hidden="true"></i></a>
                                                                            <button className="btn btn-link" onClick={() => this.downloadFile(selectedTeacher[item.name])}>
                                                                                <i className="fas fa-download" aria-hidden="true"></i></button>
                                                                        </div> }
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="academic" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{selectedTeacher.teacherAchievement}</p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="topic" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{selectedTeacher.classTopics}</p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="description" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{selectedTeacher.classDescription}</p>
                                                            </div>
                                                        </div>
                                                        {(selectedTeacher.status === 'TSTAT001' || selectedTeacher.status === 'TSTAT002') ? <></> : <div className="tab-pane" id="interviewNotes" role="tabpanel">
                                                            <div className="card-body">
                                                                {/* <p style={{whiteSpace: "pre-line"}}>{ (!selectedTeacher.classDescription
                                                                                    || selectedTeacher.classDescription === '{}') ? 
                                                                                    'No data available' : selectedTeacher.classDescription}</p> */}
                                                                <textarea disabled className="w-100" id="" cols="30" rows="10"></textarea>
                                                            </div>
                                                        </div>}
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button id="modal-close" type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
        </Fragment>
    )
}