import React, { Fragment, useState }  from 'react';
import Table from 'components/Admin/contents/Table';
import Export from 'components/Admin/contents/Export';
import { api } from '../../../../api';
import { TEACHER_STATUS } from "utils/constants"
import { getApprovedTeachers } from "api/teacher";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';


export default function SchoolDistrictTeacherMasterlist({source}) {
    const attachments = [ 
        {name: 'cvResume', desc: 'Curriculum Vitae/Resume'},
        {name: 'professionalLicense', desc: 'Professional License'}, 
        {name: 'govtId', desc: 'Government ID'}, 
        {name:'refRecommendation', desc: 'References/Recommendations'}
    ];

    const dispatch = useDispatch();
    const [selectedTeacher, setSelectedTeacher] = useState({});
    const [submitLoading, setSubmitLoading] = useState(false);
    // const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [checkedTeacherList, setCheckedTeacherList] = useState([]);

    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));
    const teachers = useSelector((state) => state.teacher ? state.teacher.getIn(['applications', 'teacher']) : []);

    const loadData = () => {
        setErrorTable(false);
        getApprovedTeachers(dispatch, async (status, data)=>{
            if (!status) {
                setErrorTable(true);
                toast.error("Oh no! Something went wrong. Please try again.");
            } else {
                await setErrorTable(false);
                
            }
        })

    }

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getDate = (value, format) =>{
        return moment.utc(value, 'YYYY/MM/DD - hh:mm A').tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Manila').format(format);
    }

    const columns = [
        {
            Header: "Teacher Masterlist",
            columns: [
                {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                    id: "checkbox",
                    accessor: "",
                    Cell: ({ row }) => {
                        return (
                            <div>
                            {!source && 
                                <div className="checkbox checkbox-info">
                                <input
                                    type="checkbox"
                                    id={row.index}
                                    name = {row.index}
                                    onChange={e => {onClickCheckBox(e, 'teacher', teachers[row.index]); e.preventDefault();}} 
                                    checked = {isChecked('teacher', teachers[row.index])}
                                />
                                <label htmlFor={row.index}>
                                </label>
                                </div>}
                            </div>
                        );
                    },
                    Header: x => {
                        return (
                            <div>
                            {!source && <div className="checkbox checkbox-info">
                            <input
                                type="checkbox"
                                id="all"
                                onChange={e => {onClickCheckBox(e, 'all')}} 
                                checked={isChecked('all')}
                            />
                            <label htmlFor="all">
                            </label>
                        </div>}
                        </div>
                            
                        );
                    },
                    sortable: false,
                    width: 45
                  
                },
                {
                    Header: 'No.', accessor: 'accountid',
                    Cell: ({ row }) => (
                        <div>{row.index + 1}</div>
                    ),
                },
                { Header: 'Application Number', accessor: 'applicationNumber' },
                { 
                    Header: 'Name', 
                    accessor: d => [TEACHER_STATUS.PENDING, TEACHER_STATUS.REJECTED].indexOf(d.status) > -1 ? "****" : d.name
                },
                { 
                    Header: 'Email', 
                    accessor: d => [TEACHER_STATUS.PENDING, TEACHER_STATUS.REJECTED].indexOf(d.status) > -1 ? "****" : d.email
                },
                { 
                    Header: 'Total Classes', accessor: 'classCount',
                    Cell: row => (<div style={{textAlign: 'center'}}>{row.value}</div>) 
                },
                {
                    Header: 'Status', accessor: 'status',
                    Cell: row => (
                        <div className={"badge " + getBadge(row.value)}>{getStatus(row.value)}</div>
                    ),
                },
                { Header: 'Update', accessor: 'updatedDatetime',
                    Cell: row => (
                        <div>{getDate(row.value, 'YYYY/MM/DD - hh:mm A')}</div>
                    )
                },
                {
                    Header: 'Action', accessor: d => d.applicationStatus,
                    Cell: ({ row, value }) => (
                        <button
                            data-target="#teacherModal"
                            className="btn btn-sm btn-info"
                            data-toggle="modal"
                            data-original-title="Edit"
                            onClick={() => onClickEdit(row.index)}
                        >   
                            Details
                        </button>
                    ),
                },
            ],
        },
    ];

    if (!!source)
    {
        columns[0].columns.pop();
    }

    const getBadge = (key) => {
        switch (key) {
            case TEACHER_STATUS.PENDING:
                return "badge-primary"
            case TEACHER_STATUS.SHORTLISTED:
                return "badge-success"
            case TEACHER_STATUS.FOR_INTERVIEW:
                return "badge-info"
            case TEACHER_STATUS.REJECTED:
                return "badge-danger"
            default:
                return "badge-primary"
        }
    }

    const getStatus = (value) => {
        return Object.keys(TEACHER_STATUS).find(key => TEACHER_STATUS[key] === value);
    }

    const onClose = (reload) => {
        document.getElementById("modal-close").click()

        setSelectedTeacher({})
        // setStatus("pending")
        // setRemarks("")
        setSubmitLoading(false);
        // setErrorUpdate(false);

        if(reload) {
            loadData();
        }
    }

    const onClickEdit = (index) => {
        setSelectedTeacher(teachers[index]);
    }

    const onClickShortList = async (source) => {
        setSubmitLoading(true);
        try{
        if(source === "table"){
            if(checkedTeacherList.length === teachers.length ){
                teachers.forEach(item => {
                    api.post('/school-leader/shortlist', {teacherId: item.accountId, applicationNumber: item.applicationNumber})
                })
            } else{
                    checkedTeacherList.forEach(item =>{
                            api.post('/school-leader/shortlist', {teacherId: item.accountId, applicationNumber: item.applicationNumber})
                      
                }) 
            }  
        }else{
            await api.post('/school-leader/shortlist', {teacherId: selectedTeacher.accountId, applicationNumber: selectedTeacher.applicationNumber})
        }
        setSubmitLoading(false);
        loadData();
        toast.success("Thank you for your payment. Teacher has been successfully shortlisted.");
        onClose(true);    
    }catch (error){
        toast.error(error.message || "Failed adding teacher to shorlist. Please try again.");
    }
    }

    const onClickCheckBox = async (e, source, teacher) => {
        let checkedTeachers = [...checkedTeacherList];
        switch(source){
            case 'teacher':
                    if(e.target.checked){
                        checkedTeachers.push(teacher);
                    }else{
                       const idx = checkedTeachers.indexOf(teacher);
                       checkedTeachers.splice(idx, 1);
                    }
                setCheckedTeacherList(checkedTeachers);
                break;
            case 'all': 
                checkedTeachers = [];
                if(e.target.checked){
                    teachers.forEach(item => {
                        checkedTeachers.push(item);
                    })
                }else{
                    checkedTeachers = [];
                }

                setCheckedTeacherList(checkedTeachers);
                break;
            default:
        }
    }


    const isChecked = (source, teacher) => {
        if (source === 'all'){ 
            return teachers.length === checkedTeacherList.length;
        }else{
            return checkedTeacherList.indexOf(teacher) > -1;
        }
    }

    // const onClickReject = async () => {
    //     setSubmitLoading(true);
    //     await api.post('/school-leader/reject', {teacherId: selectedTeacher.accountId, applicationNumber: selectedTeacher.applicationNumber})
    //     .then(response => {
    //         onClose(true);
    //         toast.success("Teacher has been reject.");
    //     }).catch(({response}) => {
    //         toast.error(response?.data.message || "Failed rejecting teacher. Please try again.");
    //     }).finally(() => {
    //         setSubmitLoading(false);
    //     });
    // }

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
                                            <a href="#!">
                                                Total Teachers <span>{teachers.length}</span>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <Export source={"school_leader"} dataSource={teachers} />
                                        </li>

                                    </ul>
                                </div>}
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col" style={{ marginLeft: '0px !important', overflowY: "auto" }}>
                                    {/* <div className={`right-aside ${!!source ? 'col' : 'col-9'}`} style={{ marginLeft: !!source ? '15px !important' : '0px !important' }}> */}
                                    
                                   {!source && <div className="row justify-content-end mb-4 mr-2">
                                        <button className="btn btn-info col-3" onClick={() => onClickShortList("table")} disabled={submitLoading || checkedTeacherList.length < 1}>
                                            <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                            Shortlist
                                        </button>
                                    </div>} 
                                    <Table
                                        loading={loading}
                                        error={errorTable}
                                        columns={columns}
                                        data={teachers}
                                        disclaimer={<i><b>Disclaimer: </b>Teachers that were only able to qualify the requirements are displayed.</i>}
                                        title={"Teacher List"}
                                        filterColumn={'status'}
                                        emptyMessage={"It looks like there are no available teacher data at this moment."}
                                        onReload={loadData} />
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
                <div className="modal" id="teacherModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" onContextMenu={(e)=> e.preventDefault()}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Manage Teacher</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onClose()}  disabled={submitLoading}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row" >
                                        <div className="col-12">
                                            <div className="card mb-3">
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        <img src={[TEACHER_STATUS.PENDING, TEACHER_STATUS.REJECTED].indexOf(selectedTeacher.status) > -1 ? "./assets/images/anonymous.png" :
                                                           (selectedTeacher.photo ? selectedTeacher.photo : "./assets/images/image-placeholder.jpg")} className="card-img" alt="..." />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <small className="text-muted">Name </small>
                                                            <h6>{[TEACHER_STATUS.PENDING, TEACHER_STATUS.REJECTED].indexOf(selectedTeacher.status) > -1 ? "****" : selectedTeacher.name}</h6>
                                                            <small className="text-muted">Email address </small>
                                                            <h6>{[TEACHER_STATUS.PENDING, TEACHER_STATUS.REJECTED].indexOf(selectedTeacher.status) > -1 ?  "************" : selectedTeacher.email}</h6>
                                                            <small className="text-muted p-t-10 db">Phone</small>
                                                            <h6>{[TEACHER_STATUS.PENDING, TEACHER_STATUS.REJECTED].indexOf(selectedTeacher.status) > -1 ? "***********" : selectedTeacher.contactNumber}</h6>
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
                                                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#attachments" role="tab">Attachments</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#academic" role="tab">Academic</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#topic" role="tab">Topic</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#description" role="tab">Description</a> </li>
                                                    </ul>
                                                    {/* Tab panes */}
                                                    <div className="tab-content">
                                                        {/*first tab*/}
                                                        <div className="tab-pane active" id="attachments" role="tabpanel">
                                                        <div className="card-body">
                                                            <ul class="list-group">
                                                                {attachments.map((item, key) => 
                                                                    <li key={key} class="list-group-item d-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            <h5 className="mb-1" style={{fontStyle: (!selectedTeacher[item.name] 
                                                                                    || selectedTeacher[item.name] === '{}') && 'italic'}}>
                                                                                {(!selectedTeacher[item.name] 
                                                                                    || selectedTeacher[item.name] === '{}') ? 
                                                                                    'No Attachment yet' : <i>Attachment available</i>}
                                                                            </h5>
                                                                            <small style={{color: 'gray'}}>{item.desc}</small>
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="academic" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{(!selectedTeacher.teacherAchievement 
                                                                                    || selectedTeacher.teacherAchievement === '{}') ? 
                                                                                    'No data available' : selectedTeacher.teacherAchievement}</p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="topic" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{(!selectedTeacher.classTopics
                                                                                    || selectedTeacher.classTopics === '{}') ? 
                                                                                    'No data available' : selectedTeacher.classTopics}</p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="description" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{ (!selectedTeacher.classDescription
                                                                                    || selectedTeacher.classDescription === '{}') ? 
                                                                                    'No data available' : selectedTeacher.classDescription}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="modal-title" id="exampleModalLabel">Action</h5><br />
                                                    <div className="row justify-content-around">
                                                        {/* disabled={submitLoading || selectedTeacher.classCount < 1 || selectedTeacher.status === TEACHER_STATUS.SHORTLISTED} */}
                                                        <button className="btn btn-info col-5" onClick={() => onClickShortList("details")} disabled={true}> 
                                                            <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                                            Shortlist
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal" disabled={submitLoading}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
            <footer className="footer">© 2021 Tagpros Education</footer>
        </Fragment>
    )
}