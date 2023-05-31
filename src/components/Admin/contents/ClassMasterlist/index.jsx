import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { getClassesAdmin, getFinalRecordedClassesDispatch, submitClassApproval } from "api/class";
import { getEmailTemplates } from "api/email-template";
import { useDispatch, useSelector } from "react-redux";
import Export from "../Export";
import { toast } from 'react-toastify';
// import moment from 'moment';
import { getDuration, toMoneyFormat } from 'utils/utils'
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from "dayjs";
import { ADMIN_TYPES, CLASS_STATUS } from "utils/constants";
import ReactPlayer from "react-player";
import { s3Config } from "config";
import S3 from "aws-s3-pro";
import { Modal, Button } from "react-bootstrap";
import { saveModule } from "api/classes";
import { api } from "../../../../api";

export default function ClassMasterlist({ source }) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(LocalizedFormat);
    
    const [toggleSortFilter, setToggleSortFilter] = useState({
        email: false
      });
    const [selectedClass, setSelectedClass] = useState({});
    const [classEnrollees, setClassEnrollees] = useState([]);
    const [editHistoryData, setEditHistoryData] = useState([]);
    const [cloneSelectedClass, setCloneSelectedClass] = useState({});
    const [selectedClassIndex, setSelectedClassIndex] = useState();
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    // const [filterValue, setFilterValue] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [videoUploading, setVideoUploading] = useState(false);
    const [videoSaving, setVideoSaving] = useState(false);
    const [/* initialStatus */, setInitialStatus] = useState(null);
    const activeModule = 0;
    const [editClass, setEditClass] = useState(false);
    const [editValue, setEditValue]= useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [editColumn, setEditColumn] = useState("");
    const [tab, setTab] = useState("");
    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const s3Client = new S3(s3Config);

    const userType = useSelector((state) =>
    //state.auth.user ? state.auth.user.type : "teacher"
        state.auth.accountType ? state.auth.accountType : "teacher"
    );

    const dispatch = useDispatch();

    const classes = useSelector((state) => state.classes ? state.classes.getIn(['data', 'class']) : []);
    // console.log('data: ', classes)
    // const classes = useSelector((state) => {
    //     if(state.classes){
    //         const data = state.classes.getIn(['data', 'class']);
    //         console.log('class data :', data);
    //         return data;
    //     }else return [];
    // });
    const emailTemplates = useSelector((state) => state.emailTemplate ? state.emailTemplate.getIn(['data', 'templates']) : []);
    const Entities = require('html-entities').XmlEntities;
    const he = new Entities();

    const loadData = () => {
        setErrorTable(false);
        if (userType !== ADMIN_TYPES.CURATOR.toLowerCase())
        {
            getClassesAdmin(dispatch, (status) => {
                
                if (!status) {
                    setErrorTable(true);
                }
            });
        }
        else
        {
            getFinalRecordedClassesDispatch(dispatch, (status) => {
                
                if (!status) {
                    setErrorTable(true);
                }
            });
        }
        getEmailTemplates(dispatch, (status) => {
            if (!status) {
                setErrorTable(true);
            }
        });
    }

    const onUploadVideo = async (event, index) => {
        // const index = parseInt(event.target.id, 10);
        setVideoUploading(true);
        if (!!cloneSelectedClass.lectures[index].finalVideo && cloneSelectedClass.lectures[index].finalVideo.length > 0)
        {
            cloneSelectedClass.lectures[index].finalVideo = "";
        }
        const uploadResponse = await s3Client.uploadFile(event.target.files[0]);
        
        if (uploadResponse.status === 204)
            cloneSelectedClass.lectures[index].finalVideo = uploadResponse.location;

        setVideoUploading(false);        
    };

    const saveModuleClick = async (lecture, index) =>{
        setVideoSaving(true);
        saveModule(dispatch, lecture, (response)=>{
            console.log();
            if (!response)
            {
                toast.error("Internal Server Error. Please Try Again Later.");
            }
            else
            {
                selectedClass.lectures[index].finalVideo = lecture.finalVideo;
                toast.success("Module has been updated");
            }
            setVideoSaving(false);
        });
    };

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitReview = async () => {
        setShowSubmitModal(false);
        setSubmitLoading(true);
        await submitClassApproval(dispatch, { classId: selectedClass.id, status, remarks, index: selectedClassIndex, actualClassId: selectedClass.classId }, (status) => {
            if (status) {
                onClose(true);
                toast.success("Class Status has been successfully updated!");
            } else {
                setErrorUpdate(true);
                setSubmitLoading(false);
            }
        });
    }

    const onClickSubmit = () =>{
        if (userType.toLowerCase() === ADMIN_TYPES.CURATOR.toLowerCase())
        {
            setShowSubmitModal(true);
        }
        else
        {
            submitReview();
        }
    }

    const onClickEdit = (index) => {
        setSelectedClassIndex(index);
        setSelectedClass(classes[index]);
        setCloneSelectedClass(JSON.parse(JSON.stringify(classes[index])));
        setStatus(getStatus(classes[index].status));
        setInitialStatus(getStatus(classes[index].status));
        setRemarks(classes[index].remarks)
        getClassEnrollees(classes[index].classId);
    }

    const showEditHistoryModal = async (data, tab)=>{
        await setTab(tab);
        await setEditHistoryData(data);
        await setShowHistoryModal(true);

    }

    const getClassEnrollees = (classId) =>{
        api.get("/class/" + classId + "/students").then((response)=>{
            setClassEnrollees(response.data);
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        });
    }

    const applyChanges = async ()=>{

        let original;

        if(editColumn === "introduction"){
            original = classes[selectedClassIndex].classIntroduction;
        } else if(editColumn === "goals"){
            original = classes[selectedClassIndex].learningGoals;
        }else{
            original = classes[selectedClassIndex].externalResources
        }
        await api.post("/class/updateClass", {column: editColumn, value: editValue, classId: cloneSelectedClass.classId, original: original}).then(async (response)=>{
                    console.log(response);
                    if (editColumn === "introduction"){
                        classes[selectedClassIndex].classIntroduction = response.data["CLASS_INTRODUCTION"];
                        classes[selectedClassIndex].introduction_edit_log = response.data["INTRODUCTION_EDIT_LOG"];
                        cloneSelectedClass.classIntroduction = response.data["CLASS_INTRODUCTION"];
                        cloneSelectedClass.introduction_edit_log = response.data["INTRODUCTION_EDIT_LOG"];
                    } else if( editColumn === "goals"){
                        classes[selectedClassIndex].learningGoals = response.data["LEARNING_GOALS"];
                        classes[selectedClassIndex].goals_edit_log = response.data["GOALS_EDIT_LOG"];
                        cloneSelectedClass.learningGoals = response.data["LEARNING_GOALS"];
                        cloneSelectedClass.goals_edit_log = response.data["GOALS_EDIT_LOG"];
                    }else{
                        classes[selectedClassIndex].externalResources = response.data["EXTERNAL_RESOURCES"];
                        classes[selectedClassIndex].resources_edit_log = response.data["RESOURCES_EDIT_LOG"];
                        cloneSelectedClass.externalResources = response.data["EXTERNAL_RESOURCES"];
                        cloneSelectedClass.resources_edit_log = response.data["RESOURCES_EDIT_LOG"];
                    }
        
                    toast.success('Successfully Updated Class Details')
                }).catch((error)=>{
                    toast.error("Failed Updating Class Details");
                });
        
                setEditClass(false);
                setShowConfirmationModal(false);
                setEditValue("");
            
    }

    const updateClass = (column, data) =>{
        console.log(column)
        console.log(data);
        console.log(editValue);
        if (editValue === data){
            toast.error("No changes has been made for Class " + column)
        }else if(editValue === ""){
            toast.error("Class " + column + " is required. Field cannot be empty")
        } else{
            setEditColumn(column);
            setShowConfirmationModal(true);
        }
    }

    const editDetails = (length, data)=>{
        if(length >= 5){
            toast.error("Number of Maximum edits(5) has already been Exceeded");
        }else{
            setEditClass(true);
            setEditValue(data);
        }

    }


    const onClose = (reload) => {
        document.getElementById("classMasterlist-modal-close").click()
        setSelectedClass({});
        setCloneSelectedClass({});
        setStatus("pending")
        setRemarks("")
        setSubmitLoading(false);
        setErrorUpdate(false);
        setCancelModal(false); 
        setEditClass(false); 
        setEditValue("");

        if(reload){
            loadData();
        }
    }

    const onChange = (value) => {
        var template = { body: "" };
        switch (value) {
            case 'approve':
                template = emailTemplates.filter(email => email.code === 'M0019')[0];
                break;
            case 'return':
                template = emailTemplates.filter(email => email.code === 'M0020')[0];
                break;
            case 'reject':
                template = emailTemplates.filter(email => email.code === 'M0021')[0];
                break;
            default:
                break;
        }
        setRemarks(template.description);
        setStatus(value);
    }

    const columns = [{
        Header: "Class List",
        columns: [
            {
                Header: 'No.', accessor: 'classid',
                Cell: ({ row }) => (
                    <div>{row.index + 1}</div>
                ),
            },
            {
                Header: 'Title',
                accessor: d => (he.decode(d.title)),
                accessorFilter: 'Title',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Teacher',
                accessor: d => `${d.lastName}, ${d.firstName}`,
                accessorFilter: 'Teacher',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Email',
                accessor: 'email',
                accessorFilter: 'email',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Type',
                accessor: 'classType',
                accessorFilter: 'classType',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Total Enrollees',
                accessor: 'totalEnrollees',
                accessorFilter: 'totalEnrollees',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Start Date',
                accessor: d => (d.startDate && d.timezone) ? 
                dayjs(dayjs.tz(`${d.startDate} ${d.startTime}`, "YYYY/MM/DD HH:mm:ss", 
                d.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? 
                Intl.DateTimeFormat().resolvedOptions().timezone : 
                d.timezone).format("YYYY/MM/DD") : d.startDate,
                accessorFilter: 'Start Date',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'End Date',
                accessor: d => (d.endDate && d.timezone) ? dayjs(dayjs.tz(`${d.endDate} ${d.endTime}`, "YYYY/MM/DD HH:mm:ss", d.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : d.timezone).format("YYYY/MM/DD") : d.endDate,
                accessorFilter: 'End Date',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Date Created',
                accessor: 'createdDatetime',
                accessorFilter: 'createdDatetime',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Status', accessor: 'status',
                accessorFilter: 'status',
                filterType: 'multipleSelectGetValue',
                getValueType: 'ClassStatus',
                // getValueConstants: 'CLASS_STATUS',
                columnFilter: true,
                filter: multiSelectFilter,
                Cell: row => (
                    <div className={"badge " + getBadge(row.value)}>{getValue(row.value)}</div>
                ),
            },
            {
                Header: 'Action',
                accessor: d => d.status,

                Cell: ({ row }) => (
                    <button
                        data-target="#exampleModal"
                        className="btn btn-link"
                        data-toggle="modal"
                        data-original-title="Edit"
                        onClick={() => onClickEdit(row.index)}>
                        <i className="ti-marker-alt"></i>
                    </button>
                ),
            },
        ],
    }];
    function multiSelectFilter(rows, columnIds, filterValue) {
        return filterValue.length === 0
          ? rows
          : rows.filter((row) =>
              filterValue.includes(String(row.original[columnIds])),
            );
      }
    const getValue = (value) => {
        return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
    }

    const checkChanges = (data)=>{
        if (editValue!== data){
            setCancelModal(true);
        }else{
            setEditClass(false);
        }
    }

    const getBadge = (key) => {
        switch (key) {
            case CLASS_STATUS.DRAFT:
                return "badge-info"
            case CLASS_STATUS.PENDING:
                return "badge-primary"
            case CLASS_STATUS.APPROVEDHR:
            case CLASS_STATUS.APPROVEDEDUC:
            case CLASS_STATUS.COMPLETED:
                return "badge-success"
            case CLASS_STATUS.REJECTEDHR:
            case CLASS_STATUS.REJECTEDEDUC:
                return "badge-danger"
            case CLASS_STATUS.RETURNED:
            case CLASS_STATUS.DELETE:
            case CLASS_STATUS.STARTED:
                return "badge-warning"
            case CLASS_STATUS.CANCELLED:
                return "badge-secondary"
            default:
                return "badge-primary"
        }
    }

    const getStatus = (key) => {
        switch (key) {
            case CLASS_STATUS.REJECTEDHR:
            case CLASS_STATUS.REJECTEDEDUC:
                return "reject"
            case CLASS_STATUS.RETURNED:
                return "return"
            case CLASS_STATUS.APPROVEDHR:
            case CLASS_STATUS.APPROVEDEDUC:
                return "approve"
            default:
                return "pending"
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* <!-- .left-right-aside-column--> */}
                            <div className="row">
                                {/* <!-- .left-aside-column--> */}
                                {!source && <div className="left-aside bg-light-part col-3">
                                    <ul className="list-style-none">
                                        <li className="box-label">
                                            {/* <a href="#!">
                                                Total Classes <span>{classes.length}</span>
                                            </a> */}
                                            <div className="admin-table-total">
                                                <h5>
                                                    Total Classes 
                                                </h5>
                                                <span>{classes.length}</span>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <Export source={"class"} dataSource={classes} />
                                            {/* <button onClick={() => this.onClick()}>test</button> */}
                                        </li>
                                        <li className="divider"></li>
                                        {/* <li ><b>Filter</b></li>

                                        <li>
                                            <div className="form-inline align-self-end">
                                                <label className="pr-2">Status</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control w-auto">
                                                    <option value="">All</option>
                                                    <option value={CLASS_STATUS.PENDING}>Pending</option>
                                                    <option value={CLASS_STATUS.APPROVEDHR}>Approved by HR</option>
                                                    <option value={CLASS_STATUS.APPROVEDEDUC}>Approved by Educ</option>
                                                    <option value={CLASS_STATUS.RETURNED}>Returned</option>
                                                    <option value={CLASS_STATUS.REJECTEDHR}>Rejected by HR</option>
                                                    <option value={CLASS_STATUS.REJECTEDEDUC}>Rejected by Educ</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li> */}
                                    </ul>
                                </div>
                                }
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col" style={{ marginLeft: !!source ? '15px !important' : '0px !important', overflowY: "auto" }}>
                                    {/* <div className={`right-aside ${!!source ? 'col' : 'col-9'}`} style={{ marginLeft: !!source ? '15px !important' : '0px !important' }}> */}
                                    <Table
                                        loading={loading}
                                        error={errorTable}
                                        columns={columns}
                                        data={classes}
                                        title={"Class List"}
                                        // filterColumn={'status'}
                                        // filterValue={filterValue}
                                        onReload={loadData} 
                                        toggleSortFilter={toggleSortFilter}
                                        setToggleSortFilter={setToggleSortFilter}
                                    />
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ============================================================== -->
                <!-- End PAge Content -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->*/}
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true"  style={{overflowY : "auto"}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Manage Class</h5>
                                <button id="classMasterlist-modal-close" type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {!!errorUpdate && <div className="alert alert-warning text-center text m-t-20"
                                style={{ fontSize: 10 }}>
                                <i className="fas fa-times float-right" style={{ cursor: 'pointer' }} onClick={() => setErrorUpdate(false)}></i>
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
                                                    <img src={cloneSelectedClass.thumbnailImage} className="card-img" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <small className="text-muted p-t-0">Title </small>
                                                        <h6>{he.decode(cloneSelectedClass.title)}</h6>
                                                        <small className="text-muted p-t-5 db">Teacher </small>
                                                        <h6>{cloneSelectedClass.firstName} {cloneSelectedClass.lastName} ({cloneSelectedClass.email})</h6>
                                                        <small className="text-muted p-t-5 db">Category</small>
                                                        <h6>{cloneSelectedClass.categoryCode} {'>'}</h6>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <small className="text-muted p-t-5 db">Price</small>
                                                                <h6>{toMoneyFormat(cloneSelectedClass.price,cloneSelectedClass.currency)}</h6>
                                                            </div>
                                                            <div className="col-sm">
                                                                <small className="text-muted p-t-5 db">Level</small>
                                                                <h6>{cloneSelectedClass.skillLevel}</h6>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <small className="text-muted p-t-5 db">Ages</small>
                                                                <h6>{cloneSelectedClass.ageCategory}</h6>
                                                            </div>
                                                            <div className="col-sm">
                                                                <small className="text-muted p-t-5 db">Type</small>
                                                                <h6>{cloneSelectedClass.classType}</h6>
                                                            </div>
                                                        </div>
                                                        <small className="text-muted p-t-5 db">Date Submitted</small>
                                                        <h6>{dayjs(cloneSelectedClass.updatedDatetime, "YYYY/MM/DD - HH:mm A").format("YYYY/MM/DD HH:mm A")}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body pb-2">
                                                {/* Nav tabs */}
                                                <ul className="nav nav-tabs profile-tab" role="tablist">
                                                    {/* <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#video" role="tab">Teaser Video</a> </li> */}
                                                    <li className="nav-item" style={{pointerEvents: editClass ? 'none' : ''}} > <a className="nav-link active" data-toggle="tab" href="#introduction" role="tab">Class Introduction</a> </li>
                                                    <li className="nav-item"  style={{pointerEvents: editClass? 'none' : ''}} > <a className="nav-link" data-toggle="tab" href="#goals" role="tab">Goals</a> </li>
                                                    {/* <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#materials" role="tab">Materials</a> </li> */}
                                                    <li className="nav-item" style={{pointerEvents: editClass ? 'none' : ''}} > <a className="nav-link" data-toggle="tab" href="#resources" role="tab">Resources</a> </li>
                                                    <li className="nav-item" style={{pointerEvents: editClass? 'none' : ''}} > <a className="nav-link" data-toggle="tab" href="#schedules" role="tab">Schedules</a> </li>
                                                    {cloneSelectedClass.classTypeCode === 'CLT002' && <li className="nav-item" style={{pointerEvents: editClass ? 'none' : ''}} > <a className="nav-link" data-toggle="tab" href="#quizzes" role="tab">Quizzes</a> </li>}
                                                    {cloneSelectedClass.classTypeCode === 'CLT001' && <li className="nav-item" style={{pointerEvents: editClass ? 'none' : ''}} > <a className="nav-link" data-toggle="tab" href="#modules" role="tab">Modules</a> </li>}
                                                    <li className="nav-item" style={{pointerEvents: editClass ? 'none' : ''}} > <a className="nav-link" data-toggle="tab" href="#enrollees" role="tab">Enrollees</a> </li>
                                                </ul>
                                                {/* Tab panes */}
                                                <div className="tab-content">
                                                    {/* <div className="tab-pane active" id="video" role="tabpanel">
                                                        <div className="card-body">
                                                            <div className="embed-responsive embed-responsive-16by9">
                                                                <iframe className="embed-responsive-item"
                                                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                                                    title="Test Video" allowFullScreen></iframe>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    {/*second tab*/}
                                                    <div className="tab-pane fade show active" id="introduction">
                                                        <div className="card-body pb-0">
                                                            <div className="row">
                                                                <div className={!editClass ? "col-11" : "col-10"}>
                                                                    {editClass ? <textarea type="text" className="w-100" defaultValue={he.decode(cloneSelectedClass.classIntroduction)} style={{minHeight: '100%', maxHeight: '130px'}} onChange={(e) => {setEditValue(e.target.value); console.log(editValue)}} ></textarea> 
                                                                    : 
                                                                    <p style={{ whiteSpace: "pre-line" }}>{he.decode(cloneSelectedClass.classIntroduction)}</p>}
                                                                    {/* <p style={{ whiteSpace: "pre-line" }}>{he.decode(cloneSelectedClass.classIntroduction)}</p> */}
                                                                </div>
                                                                {(userType.toLowerCase() === 'admsa' || userType.toLowerCase() === 'admeduc') &&
                                                                <div className={!editClass ? "col-1 d-flex flex-column" : "col d-flex flex-column"} style={{justifyContent: editClass ? "center" : "start" }}>
                                                                    {!editClass ? 
                                                                        <button className="btn btn-link mb-4" style={{height: "30px"}} onClick={() => editDetails(cloneSelectedClass.introduction_edit_log.length, cloneSelectedClass.classIntroduction)}>
                                                                            <i class="fas fa-edit" ></i>
                                                                        </button>
                                                                    :
                                                                    <>
                                                                        <button type="button" className="btn btn-dark w-100 mb-1" onClick={() => updateClass('introduction', cloneSelectedClass.classIntroduction)}>
                                                                            Save
                                                                        </button>
                                                                         <button className="btn btn-danger w-100" onClick={() => checkChanges(cloneSelectedClass.classIntroduction)}>
                                                                            Cancel
                                                                        </button>
                                                                    </>
                                                                    }
                                                                    
                                                                </div>
                                                                }
                                                            </div>
                                                            {(userType.toLowerCase() === 'admsa' || userType.toLowerCase() === 'admeduc') &&
                                                            <>
                                                            <div className="row d-flex justify-content-end mr-1" style={{height:"30px"}}>
                                                                <div className="d-flex" style={{alignItems: "end"}}>
                                                                    {cloneSelectedClass.introduction_edit_log?.length ? 
                                                                    <p className="mb-0" style={{color : "#bbbbbb", fontSize: "11px"}} onClick={()=> showEditHistoryModal(cloneSelectedClass['introduction_edit_log'], 'Class Introduction')}><u><i class="fas fa-history"></i> <b>Edited by:</b> {cloneSelectedClass['introduction_edit_log'][cloneSelectedClass['introduction_edit_log'].length-1].adminType} <b>| Last:</b>  {dayjs(cloneSelectedClass['introduction_edit_log'][cloneSelectedClass['introduction_edit_log'].length-1].date_edited).format('MM/DD/YYYY h:mm A')}</u></p>
                                                                    : <p className="mb-0" style={{color : "#bbbbbb", fontSize: "11px"}}><b><i class="fas fa-history"></i> No Edit History</b></p>}
                                                                </div>
                                                               
                                                            </div>
                                                            <div className="row d-flex justify-content-end mr-1">
                                                                <p className="mb-0" style={{fontSize: "10px", color: "indianred"}}><b>Note:</b> Maximum of 5 edits only.</p>
                                                            </div>
                                                            </>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="goals">
                                                        <div className="card-body pb-0">
                                                            <div className="row">
                                                                <div className={!editClass ? "col-11" : "col-10"}>
                                                                    {editClass ? 
                                                                    <textarea type="text" className="w-100" defaultValue={he.decode(cloneSelectedClass.learningGoals)} style={{minHeight: '100%', maxHeight: '130px'}}  onChange={(e) => {setEditValue(e.target.value)}}></textarea> 
                                                                    : 
                                                                    <p style={{ whiteSpace: "pre-line" }}>{he.decode(cloneSelectedClass.learningGoals)}</p>}
                                                                    {/* <p style={{ whiteSpace: "pre-line" }}>{he.decode(cloneSelectedClass.classIntroduction)}</p> */}
                                                                </div>
                                                                {(userType.toLowerCase() === 'admsa' || userType.toLowerCase() === 'admeduc') &&
                                                                <div className={!editClass ? "col-1 d-flex flex-column" : "col d-flex flex-column"} style={{justifyContent: editClass ? "center" : "start" }}>
                                                                    {!editClass ? 
                                                                        <button className="btn btn-link mb-4" style={{height: "30px"}} onClick={() => editDetails(cloneSelectedClass.goals_edit_log.length, cloneSelectedClass.learningGoals)}>
                                                                            <i class="fas fa-edit" ></i>
                                                                        </button>
                                                                    :
                                                                    <>
                                                                        <button type="button" className="btn btn-dark w-100 mb-1" onClick={()=>updateClass('goals', cloneSelectedClass.learningGoals)}>
                                                                            Save
                                                                        </button>
                                                                        <button className="btn btn-danger w-100" onClick={() => checkChanges(cloneSelectedClass.learningGoals)}>
                                                                            Cancel
                                                                        </button>
                                                                    </>
                                                                    }                                
                                                                </div>
                                                                }
                                                            </div>
                                                            {(userType.toLowerCase() === 'admsa' || userType.toLowerCase() === 'admeduc') &&<>
                                                            <div className="row d-flex justify-content-end mr-1" style={{height:"30px"}}>
                                                                <div className="d-flex" style={{alignItems: "end"}}>
                                                                    {cloneSelectedClass.goals_edit_log?.length ? 
                                                                    <p className="mb-0" style={{color : "#bbbbbb", fontSize: "11px"}} onClick={()=> showEditHistoryModal(cloneSelectedClass['goals_edit_log'], 'Class Learning Goals')}><u><i class="fas fa-history"></i> <b>Edited by:</b> {cloneSelectedClass['goals_edit_log'][cloneSelectedClass['goals_edit_log'].length-1].adminType} <b>| Last:</b>  {dayjs(cloneSelectedClass['goals_edit_log'][cloneSelectedClass['goals_edit_log'].length-1].date_edited).format('MM/DD/YYYY h:mm A')}</u></p>
                                                                    : <p className="mb-0" style={{color : "#bbbbbb", fontSize: "11px"}}><b><i class="fas fa-history"></i> No Edit History</b></p>}
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-end mr-1">
                                                                <p className="mb-0" style={{fontSize: "10px", color: "indianred"}}><b>Note:</b> Maximum of 5 edits only.</p>
                                                            </div>
                                                            </>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="resources">
                                                        <div className="card-body pb-0">
                                                            <div className="row">
                                                                <div className={!editClass ? "col-11" : "col-10"}>
                                                                    {editClass ? 
                                                                    <textarea type="text" className="w-100" defaultValue={he.decode(cloneSelectedClass.externalResources)} style={{minHeight: '100%', maxHeight: '130px'}}  onChange={(e) => {setEditValue(e.target.value)}}></textarea> 
                                                                    : 
                                                                    <p style={{ whiteSpace: "pre-line" }}>{he.decode(cloneSelectedClass.externalResources)}</p>}
                                                                    {/* <p style={{ whiteSpace: "pre-line" }}>{he.decode(cloneSelectedClass.classIntroduction)}</p> */}
                                                                </div>
                                                                {(userType.toLowerCase() === 'admsa' || userType.toLowerCase() === 'admeduc') &&
                                                                <div className={!editClass ? "col-1 d-flex flex-column" : "col d-flex flex-column"} style={{justifyContent: editClass ? "center" : "start" }}>
                                                                    {!editClass ? 
                                                                        <button className="btn btn-link mb-4" style={{height: "30px"}} onClick={() => editDetails(cloneSelectedClass.resources_edit_log.length, cloneSelectedClass.externalResources)}>
                                                                            <i class="fas fa-edit" ></i>
                                                                        </button>
                                                                    :
                                                                    <>
                                                                        <button type="button" className="btn btn-dark w-100 mb-1" onClick={()=>updateClass('resources', cloneSelectedClass.externalResources)}>
                                                                            Save
                                                                        </button>
                                                                        <button className="btn btn-danger w-100" onClick={() => checkChanges(cloneSelectedClass.externalResources)}>
                                                                            Cancel
                                                                        </button>
                                                                    </>
                                                                    }
                                                                            
                                                                </div>
                                                                }
                                                            </div>
                                                            {(userType.toLowerCase() === 'admsa' || userType.toLowerCase() === 'admeduc') &&<>
                                                            <div className="row d-flex justify-content-end mr-1" style={{height:"30px"}}>
                                                                <div className="d-flex" style={{alignItems: "end"}}>
                                                                    {cloneSelectedClass.resources_edit_log?.length ? 
                                                                    <p className="mb-0" style={{color : "#bbbbbb", fontSize: "11px"}} onClick={()=> showEditHistoryModal(cloneSelectedClass['resources_edit_log'], 'Class External Resources')}><u><i class="fas fa-history"></i> <b>Edited by:</b> {cloneSelectedClass['resources_edit_log'][cloneSelectedClass['resources_edit_log'].length-1].adminType} <b>| Last:</b>  {dayjs(cloneSelectedClass['resources_edit_log'][cloneSelectedClass['resources_edit_log'].length-1].date_edited).format('MM/DD/YYYY h:mm A')}</u></p>
                                                                    : <p className="mb-0" style={{color : "#bbbbbb", fontSize: "11px"}}><b><i class="fas fa-history"></i> No Edit History</b></p>}
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-end mr-1">
                                                                <p className="mb-0" style={{fontSize: "10px", color: "indianred"}}><b>Note:</b> Maximum of 5 edits only.</p>
                                                            </div>
                                                            </>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="schedules">
                                                        <div className="card-body">
                                                            {/* <span>
                                                                <i className="fa fa-calendar-alt mr-2 text-muted" />
                                                                <b>Enrollment Date: </b>{cloneSelectedClass.enrollmentStartDate && dayjs(dayjs.tz(`${cloneSelectedClass.enrollmentStartDate}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("YYYY/MM/DD")} - {cloneSelectedClass.enrollmentEndDate && dayjs(dayjs.tz(`${cloneSelectedClass.enrollmentEndDate}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("YYYY/MM/DD")}
                                                            </span><br/><br/> */}
                                                            {((cloneSelectedClass.availableDates || cloneSelectedClass.startDate) && cloneSelectedClass.classTypeCode==='CLT002')&& <div>
                                                                {cloneSelectedClass.availableDates ?
                                                                    <span>
                                                                        <i className="fa fa-calendar-alt text-muted" /> {cloneSelectedClass.availableDates && "No. of Sessions : " + cloneSelectedClass.availableDates.length}
                                                                        <br />
                                                                        {cloneSelectedClass.availableDates.map(date => (
                                                                            <div>&emsp;<i className="fa fa-caret-right text-muted" />{" " + dayjs(dayjs.tz(`${dayjs(date).format("YYYY/MM/DD")} ${cloneSelectedClass.startTime}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format('dddd, LL')}<br /></div>
                                                                        ))}
                                                                    </span> :
                                                                    <span>
                                                                        <i className="fa fa-calendar-alt mr-2 text-muted" />
                                                                        <b>Date: </b> {cloneSelectedClass.startDate && dayjs(dayjs.tz(`${cloneSelectedClass.startDate} ${cloneSelectedClass.startTime}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("YYYY/MM/DD")}
                                                                    </span>
                                                                }
                                                                <br />
                                                                <span>
                                                                    <i className="fa fa-clock mr-2 text-muted" />
                                                                    <b>Time: </b>{cloneSelectedClass.startDate && dayjs(dayjs.tz(`${cloneSelectedClass.startDate} ${cloneSelectedClass.startTime}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("hh:mm A")}
                                                                            - {cloneSelectedClass.startDate && dayjs(dayjs.tz(`${cloneSelectedClass.startDate} ${cloneSelectedClass.endTime}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("hh:mm A")}
                                                                </span>
                                                                <br />
                                                                <span>
                                                                    &nbsp;&nbsp;&emsp;<b>Duration: </b> {getDuration(cloneSelectedClass.startTime, cloneSelectedClass.endTime)}
                                                                </span>
                                                            </div>}
                                                            {cloneSelectedClass.classTypeCode==='CLT001' && <div>
                                                                <span>
                                                                    <i className="fa fa-calendar-alt mr-2 text-muted" />
                                                                    <b>Availability Date: </b>{cloneSelectedClass.availabilityStartDate && dayjs(dayjs.tz(`${cloneSelectedClass.availabilityStartDate}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("YYYY/MM/DD")} - {cloneSelectedClass.availabilityEndDate && dayjs(dayjs.tz(`${cloneSelectedClass.availabilityEndDate}`, "YYYY/MM/DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("YYYY/MM/DD")}
                                                                </span>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                    {cloneSelectedClass.classTypeCode === 'CLT002' && <div className="tab-pane fade" id="quizzes">
                                                        <div className="card-body">
                                                            <div className="overflow-auto">
                                                                {(selectedClass.questions && selectedClass.questions.length > 0) ? (
                                                                    selectedClass.questions.map((question, idx) => {
                                                                        return (
                                                                        <div key={question.questionId} className="mb-2">
                                                                            <div className="mb-1">{idx+1}. {question.questionDescription}</div>
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
                                                    {cloneSelectedClass.classTypeCode === 'CLT001' && <div className="tab-pane fade" id="modules" role="tabpanel">
                                                        <div className="card-body">
                                                        <div className="overflow-auto">
                                                            {(!cloneSelectedClass.lectures || (!!cloneSelectedClass.lectures && cloneSelectedClass.lectures.length < 1)) ? (<div><i>No modules added</i></div>) :
                                                            (<div className="row module-nav">
                                                                <div className="col-3 nav-container">
                                                                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                                    {cloneSelectedClass.lectures.map((lecture, index) => (<a class={`nav-link ${activeModule===index && 'active'}`} id={`v-pills-${lecture.id}-tab`} data-toggle="pill" href={`#v-pills-${lecture.id}`} role="tab" aria-controls={`v-pills-${lecture.id}`} aria-selected={activeModule===index?true:false}>{lecture.title}</a>))}
                                                                    </div>
                                                                </div>
                                                                <div className="col-9">
                                                                    <div className="tab-content" id="v-pills-tabContent">
                                                                    {cloneSelectedClass.lectures.map((lecture, index) => (<div class={`tab-pane fade ${activeModule===index && 'show active'}`} id={`v-pills-${lecture.id}`} role="tabpanel" aria-labelledby={`v-pills-${lecture.id}-tab`}>
                                                                        <span>
                                                                            <i className="fa fa-calendar-alt mr-2 text-muted" />
                                                                            <b>Recommended Due Date: </b>{lecture.recommendedDueDate && dayjs(dayjs.tz(`${lecture.recommendedDueDate}`, "YYYY-MM-DD HH:mm:ss", cloneSelectedClass.timezone).format()).tz(Intl.DateTimeFormat().resolvedOptions().timezone ? Intl.DateTimeFormat().resolvedOptions().timezone : cloneSelectedClass.timezone).format("YYYY/MM/DD")}
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

                                                                        <fieldset className="fieldset-border mb-2">
                                                                            <legend className="fieldset-border"><b>Final Video</b></legend>
                                                                            <ReactPlayer
                                                                            autoPlay
                                                                            url={lecture.finalVideo}
                                                                            style={{ marginBottom: 10 }}
                                                                            width={"100%"}
                                                                            controls
                                                                            height={"auto"} />
                                                                            {/* <form> */}
                                                                            {/* <FileInputControl
                                                                                name="finalVideo"
                                                                                placeholder=""
                                                                                maxSize=""
                                                                                fileType="video"></FileInputControl>
                                                                                </form> */}
                                                                            {selectedClass.status === CLASS_STATUS.FOR_EDITING && <div className="flex-column">
                                                                                <button className="btn btn-info ml-2 col-3 align-self-end" onClick={() => document.getElementById(`upload-${index}`).click()} disabled={videoUploading}>
                                                                                    <span style={{ display: videoUploading ? 'inline-block' : 'none' }} className="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                                                                    Choose File
                                                                                </button>
                                                                                {!!lecture.finalVideo && lecture.finalVideo.length > 0 && <button className="btn btn-info ml-2 col-3 align-self-end" onClick={(event) => {saveModuleClick(lecture, index)}} disabled={videoSaving}>
                                                                                    <span style={{ display: videoSaving ? 'inline-block' : 'none' }} className="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                                                                    Save
                                                                                </button>}
                                                                            </div>}
                                                                            <input
                                                                                name="upload"
                                                                                id={`upload-${index}`}
                                                                                type="file"
                                                                                accept=".mp4"
                                                                                style={{ display: "none" }}
                                                                                onChange={(event)=> onUploadVideo(event, index)}
                                                                                />
                                                                        </fieldset>

                                                                        <fieldset className="fieldset-border">
                                                                            <legend className="fieldset-border"><b>Pop Quiz</b></legend>
                                                                            {(lecture.questions && lecture.questions.length > 0) ? (
                                                                            lecture.questions.map((question, qstnIdx) => {
                                                                                return (
                                                                                <div key={question.questionId} className="mb-2">
                                                                                    <div className="mb-1">{qstnIdx+1}. {question.questionContent}</div>
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
                                                                            <p>Module has no pop quiz.</p>
                                                                            )}
                                                                        </fieldset>
                                                                    </div>))}
                                                                    </div>
                                                                </div>
                                                            </div>)}
                                                        </div>
                                                        </div>
                                                    </div>}
                                                    <div className="tab-pane fade" id="enrollees">
                                                        <div className="row">
                                                            <div className="card col">
                                                                <div className="card-body">     
                                                                    <div className="history">
                                                                        {classEnrollees.length === 0 ? <p><i>This Class has no Enrollees yet</i></p> :<>
                                                                            <div className="row mb-2" style={{borderBottom: "solid 1px"}}>
                                                                                <div className="col">
                                                                                    <th>Name</th>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <th>Gender</th>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <th>Account Type</th>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <th>Guardian</th>
                                                                                </div>
                                                                            </div>
                                                                            {classEnrollees.map(student => (  
                                                                            <div className="mb-2">                                                                              
                                                                                <div className="row" style={{borderBottom: "solid #b6b6b6 0.3px"}}>
                                                                                        <div className="col">
                                                                                            <td>{student.name}</td>
                                                                                        </div>
                                                                                        <div className="col">
                                                                                            <td>{student.gender === "1" ? 'Male' : student.gender === "2" ? 'Female' : "Undefined"}</td>
                                                                                        </div>
                                                                                        <div className="col">
                                                                                            <td>
                                                                                                <div className={`badge ${student.accountType === 'family' ? 'badge-info':'badge-primary'}`}>{student.accountType}</div>
                                                                                            </td>
                                                                                        </div>
                                                                                        <div className="col mb-2">
                                                                                            <td>{student.guardian || 'n/a'}</td>
                                                                                        </div>
                                                                                </div>
                                                                            </div>
                                                                            ))}
                                                                        </>
                                                                        }
                                                                    </div>
                                                                        
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {!!userType && userType !== 'admcurator' && <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="modal-title" id="exampleModalLabel">Decision</h5>

                                                <div className="form-group">
                                                    <select className="form-control" value={status} onChange={e => onChange(e.target.value)}>
                                                        <option value="pending"></option>
                                                        <option value="approve">Approve</option>
                                                        <option value="return">Return</option>
                                                        <option value="reject">Reject</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <textarea defaultValue={remarks} className="form-control" rows="3" placeholder="Write your remarks here ..." onChange={e => setRemarks(e.target.value)}></textarea>
                                                </div>

                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            {((userType.toLowerCase() === ADMIN_TYPES.CURATOR.toLowerCase() && selectedClass.status === CLASS_STATUS.FOR_EDITING) || userType.toLowerCase() !== ADMIN_TYPES.CURATOR.toLowerCase()) && <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal">Cancel</button>
                                <button type="button" style={{ cursor: (submitLoading) && 'not-allowed' }} className="btn btn-primary" onClick={() => onClickSubmit()} >
                                    <span style={{ display: submitLoading ? 'inline-block' : 'none' }} className="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                    Submit
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>


                <Modal
                    size="m"
                    show={showSubmitModal}
                    backdrop="static"
                    keyboard={false}
                    onHide={() => {setShowSubmitModal(false)}}
                    >
                    <Modal.Header>
                        <Modal.Title>Mark class as Pending?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Clicking "Submit" will mark this class as pending (for Admin Education's approval). You will not be able to update this class. Do you want to continue?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {submitReview()}}>
                        Ok
                        </Button>
                        <Button variant="danger" onClick={() => {setShowSubmitModal(false)}}>
                        Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size="m"
                    show={showConfirmationModal}
                    backdrop="static"
                    keyboard={false}
                    onHide={() => {setShowConfirmationModal(false)}}
                    >
                    <Modal.Header>
                        <Modal.Title>Edit Class Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to Make these changes?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {applyChanges()}}>
                        Yes
                        </Button>
                        <Button variant="danger" onClick={() => {setShowConfirmationModal(false)}}>
                        Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size="m"
                    show={cancelModal}
                    backdrop="static"
                    keyboard={false}
                    onHide={() => {setCancelModal(false)}}
                    >
                    <Modal.Header>
                        <Modal.Title>Edit Class Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        All Changes will not be saved. Are you sure you want to continue?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {setCancelModal(false); setEditClass(false); setEditValue("")}}>
                        Yes
                        </Button>
                        <Button variant="danger" onClick={() => {setCancelModal(false)}}>
                        Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    size="xl"
                    show={showHistoryModal}
                    backdrop="static"
                    keyboard={false}
                    onHide={() => {setShowHistoryModal(false)}}
                    >
                    <Modal.Header>
                        <Modal.Title>Revision History - {tab}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mb-3">
                            <h4 className="ml-3"><b>History:</b></h4>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <p><b>Edited by</b></p>
                            </div>
                            <div className="col-3">
                                <p><b>Time Stamp</b></p>
                            </div>
                            <div className="col-3">
                                <p><b>Original text</b></p>
                            </div>
                            <div className="col-3">
                                <p><b>Updated text</b></p>
                            </div>
                        </div>
                        {
                        editHistoryData.map(item=>(
                        <div className="row mt-2" style={{backgroundColor: "rgb(233 239 240)"}}>
                            <div className="col-3 d-flex align-items-center mt-2 mb-2">
                                <p className="mb-0">{item.adminType}</p>
                            </div>
                            <div className="col-3 d-flex align-items-center mt-2 mb-2">
                                <p className="mb-0">{dayjs(item.date_edited).format('MM/DD/YYYY h:mm A')}</p>
                            </div>
                            <div className="col-3 d-flex align-items-center mt-2 mb-2">
                                <p className="mb-0">{item.originalText}</p>
                            </div>
                            <div className="col-3 d-flex align-items-center mt-2 mb-2">
                                <p className="mb-0">{item.updatedText}</p>
                            </div>
                        </div>))
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {setShowHistoryModal(false)}}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>



            </div>
            <footer className="footer">© 2021 Tagpros Education</footer>
        </Fragment>
    );
};
