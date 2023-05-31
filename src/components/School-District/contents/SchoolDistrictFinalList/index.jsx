import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Table from "components/Admin/contents/Table";
import { TEACHER_STATUS } from "utils/constants";
import { getAcceptedTeachers } from "api/school-leader";
import { getRejectedTeachers } from "api/school-leader";
import { Carousel } from 'react-bootstrap';
import ReactPlayer from 'react-player';

export default function SchoolDistrictFinalList({source})
{
    const [acceptData, setAcceptData] = useState([]);
    const [rejectData, setRejectData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [filterValue, setFilterValue] = useState('');
    const [errorTable, setErrorTable] = useState(false);
    // const [hideFilter, setHideFilter] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState({});
    const [index, setIndex] = useState(0);

    const attachments = [ 
        {name: 'cvResume', desc: 'Curriculum Vitae/Resume'},
        {name: 'professionalLicense', desc: 'Professional License'}, 
        {name: 'govtId', desc: 'Government ID'}, 
        {name:'refRecommendation', desc: 'References/Recommendations'}
    ];

    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));
    const dispatch = useDispatch();


    const acceptColumns = [
      {
        Header:"Final List of Teachers",
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
                        onClick={() => onClickAction("detailsAccepted", row.index)}
                    >
                        Details
                    </button>
                </div>
            ),
          }
        ]
      }
    ];

    const rejectColumns = [
        {
          Header:"Final List of Teachers",
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
                          onClick={() => onClickAction("detailsRejected", row.index)}
                      >
                          Details
                      </button>
                  </div>
              ),
            }
          ]
        }
      ];
    
    if (!!source)
    {
        acceptColumns[0].columns.pop();
        rejectColumns[0].columns.pop();
    }

    const getBadge = (key) => {
        switch (key) {
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

    const loadData = async () =>{
      await setErrorTable(false);
        // const args = {};
        await getRejectedTeachers(dispatch, async (status, data)=>{
            if(!status){
                // toast error
                toast.error("Oh no! Something went wrong. Please try again.");
                await setErrorTable(true);
            }
            else
            {
                // toast success
                await setRejectData(data);
                await setOriginalData(data);
            }
        });
        
        await getAcceptedTeachers(dispatch, async (status, data)=>{
            if(!status){
                // toast error
                toast.error("Oh no! Something went wrong. Please try again.");
                await setErrorTable(true);
            }
            else
            {
                // toast success
                await setAcceptData(data);
                await setOriginalData(data);
            }
        });
      
    };

    
    const onClickAction = async (type,index) =>{
      switch(type){
        case 'detailsAccepted':
          await setSelectedTeacher(acceptData[index]);
          break;
        case 'detailsRejected':
           await setSelectedTeacher(rejectData[index]);
            break; 
        default:
          break;
      }
    }

    const onClose = (reload) => {
        document.getElementById("modal-close").click()

        setSelectedTeacher({})

        if(reload) {
            loadData();
        }
    }
    
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    React.useEffect(() => {
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div className="container-fluid">
            {/* <!--Accepted Teachers--> */}
            <div>
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
                                                Total Accepted Teachers <span>{originalData.length}</span>
                                            </a>
                                        </li>

                                        {/* <li className="divider"></li> */}

                                        {/* {Object.keys(ADMIN_TYPES).map((item) =>{
                                            return <li className="box-label">
                                                        <a href="#!">
                                                            {item} <span>{originalData.filter(dataItem=>dataItem.role === ADMIN_TYPES[item]).length}</span>
                                                        </a>
                                                    </li>
                                        })} */}
                                                    
                                        {/* <li className="divider"></li> */}

                                        <li>
                                            <div>
                                                {/* <label>Account Type</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    {Object.keys(ADMIN_TYPES).map((item) =>{
                                                        return <option value={ADMIN_TYPES[item]}>{ADMIN_TYPES[item]}</option>
                                                    })}
                                                </select> */}
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>}
                                <div className="right-aside col" style={{ marginLeft: '0px !important', overflowY: "auto" }}>
                                    {/* <div className="button-fab">
                                    onClick={() => onClickAction('add')}
                                            <button type="button" className="btn btn-info" onClick={(e)=>onClickAction("showUpdateAccountModal")}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div> */}
                                        <Table loading={loading} 
                                        error={errorTable} 
                                        columns={acceptColumns} 
                                        data={acceptData}
                                        disclaimer={<i><b>Disclaimer:</b> Only accepted teachers are displayed in this table.</i>}  
                                        title={"Accepted Teachers"}
                                        filterColumn={'status'} 
                                        filterValue={filterValue} 
                                        onReload={loadData}
                                        />
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Rejected Teachers--> */}
            <div>
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
                                                Total Rejected Teachers <span>{originalData.length}</span>
                                            </a>
                                        </li>

                                        {/* <li className="divider"></li> */}

                                        {/* {Object.keys(ADMIN_TYPES).map((item) =>{
                                            return <li className="box-label">
                                                        <a href="#!">
                                                            {item} <span>{originalData.filter(dataItem=>dataItem.role === ADMIN_TYPES[item]).length}</span>
                                                        </a>
                                                    </li>
                                        })} */}
                                                    
                                        {/* <li className="divider"></li> */}

                                        <li>
                                            <div>
                                                {/* <label>Account Type</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    {Object.keys(ADMIN_TYPES).map((item) =>{
                                                        return <option value={ADMIN_TYPES[item]}>{ADMIN_TYPES[item]}</option>
                                                    })}
                                                </select> */}
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>}
                                <div className="right-aside col" style={{ marginLeft: '0px !important', overflowY: "auto" }}>
                                    {/* <div className="button-fab">
                                    onClick={() => onClickAction('add')}
                                            <button type="button" className="btn btn-info" onClick={(e)=>onClickAction("showUpdateAccountModal")}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div> */}
                                        <Table loading={loading} 
                                        error={errorTable} 
                                        columns={rejectColumns} 
                                        data={rejectData}
                                        disclaimer={<i><b>Disclaimer:</b> Only rejected teachers are displayed in this table.</i>} 
                                        title={"Rejected Teachers"}
                                        filterColumn={'status'} 
                                        filterValue={filterValue} 
                                        onReload={loadData}
                                        />
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="teacherModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Teacher Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onClose()}>
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
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#sample_videos" role="tab">Sample Videos</a> </li>
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
                                                        <div className="tab-pane" id="sample_videos" role="tabpanel">
                                                            <div className="card-body">
                                                                {(!selectedTeacher.displayVideos || selectedTeacher.displayVideos.length < 1) &&
                                                                    <p style={{whiteSpace: "pre-line"}}>
                                                                        No data available
                                                                    </p>}
                                                                {!!selectedTeacher.displayVideos && selectedTeacher.displayVideos.length > 0 &&
                                                                    <Carousel activeIndex={index} interval={null} onSelect={handleSelect} style={{ width:'100%'}}>
                                                                        {selectedTeacher.displayVideos.map((item)=>
                                                                        <Carousel.Item>
                                                                            <ReactPlayer url={item.VIDEO_LINK} controls width={'100%'} height={'100%'} />
                                                                        </Carousel.Item>
                                                                        )}
                                                                    </Carousel>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-12">
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="modal-title" id="exampleModalLabel">Action</h5><br />
                                                    <div className="row justify-content-around">
                                                        <button className="btn btn-info col-5" onClick={() =>onClickAction('forInterviewPost')} disabled={submitLoading || selectedTeacher.status === TEACHER_STATUS.FOR_INTERVIEW}>
                                                            <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                                            For Interview
                                                        </button>
                                                         <button className="btn btn-info col-5" onClick={() =>onClickAction('acceptTeachers', TEACHER_STATUS.ACCEPTED)} >
                                                            <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                                            Accept
                                                        </button>
                                                        <button className="btn btn-info col-5" onClick={() =>onClickAction('rejectTeachers', TEACHER_STATUS.REJECTED)}>
                                                            <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                                            Reject
                                                        </button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
            
        </div>
    );
}