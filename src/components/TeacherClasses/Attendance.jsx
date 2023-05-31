import React, { Fragment, useState } from "react";
import { api } from '../../api';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import DefaultPic from '../../img/default-pic-blue1.png'
const Entities = require('html-entities').XmlEntities;
const he = new Entities();

export default function TeacherClasses({selectedClass, closeAttendance}){
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);
    const [attendanceRecord, setAttendanceRecord] = useState([]);
    const [sessionList, setSessionList] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadData = () => {
        setLoading(true);
        getStudents();
    }

    const getStudents = async() => {
        api.get(`/class/${selectedClass.accountId}/students`)
        .then(response => {
            setStudents(response.data);
            getAttendance();
        }).catch(() => {
            setLoading(false);
            setLoadError(true);
            setStudents((prevState) => []);
        });
    }

    const getAttendance = async() => {
        await api.post(`/attendance/class`, {classId:selectedClass.id })
        .then(response => {
            setAttendanceRecord(response.data.attendance);
            setSessionList(response.data.sessionStatus);
            setLoadError(false);
        }).catch(() => {
            setLoadError(true);
            setAttendanceRecord((prevState) => []);
        }).finally(() => {
            setLoading(false);
        });
    }

    const getStudentAttendance = ({accountId, learnerId}, index) => {
        const session = index !==undefined ? index : parseInt(currentSession)+1;
        const attendance = attendanceRecord.find(item => (
            item.session?.toString() === session?.toString() 
            && item.accountId?.toString() === accountId?.toString() 
            && item.learnerId?.toString() === learnerId?.toString()
        ));

        return attendance;
    }

    const onTickAttendance = async (student, remarks) => {
        // const { learnerId, accountId } = student;
        const attendance = getStudentAttendance(student);
        
        if(!!attendance){
            updateAttendance(attendance, remarks)
        }else{
            addAttendance(student, remarks);
        }
    }

    const addAttendance = async({learnerId, accountId}, remarks) => {
        const session = parseInt(currentSession)+1;
        await toast.promise(
            api.post(`/attendance/add`, {classId:selectedClass.id, session, learnerId, accountId, remarks, isPresent: (remarks ? false : true)}),
            {
              success: {
                render({data}) {
                    console.log('setAttendanceRecord', data);
                    setAttendanceRecord(prevState => {
                        prevState.push({
                            id: data.data.attendanceId,
                            learnerId,
                            accountId,
                            isPresent: true,
                            session,
                            remarks
                        });
                        return [...prevState]
                    });
                  return 'Saved...'
                }
              },
              pending: 'Updating...',
              error: {
                render({ data }) {
                  return (data.response?.data?.message ||
                  'An unexpected error occurred. Please try again later.');
                }
              }
            },
            { position: toast.POSITION.TOP_RIGHT, 
                style: {width: 'min-content', fontSize: '14px', position: 'absolute', right: 0}, 
                closeButton: false,
                autoClose: 1000 
            }
        );
        
    }

    const updateAttendance = async({id, isPresent}, remarks) => {
        const index = attendanceRecord.findIndex(item => (item.id === id));

        await toast.promise(
            api.post(`/attendance/update`, {attendanceId:id, isPresent: !!remarks ? isPresent : !isPresent, remarks}),
            {
              success: {
                render() {
                    setAttendanceRecord(prevState => {
                        prevState[index].isPresent = !!remarks ? isPresent : !isPresent;
                        prevState[index].remarks = remarks;
                        return [...prevState]
                    });
                  return 'Saved...'
                }
              },
              pending: 'Updating...',
              error: {
                render({ data }) {
                  return (data.response?.data?.message ||
                  'An unexpected error occurred. Please try again later.');
                }
              }
            },
            { position: toast.POSITION.TOP_RIGHT, 
                style: {width: 'min-content', fontSize: '14px', position: 'absolute', right: 0}, 
                closeButton: false,
                autoClose: 1000 
            }
        );
    }

    const saveAttendance = async () => {
        const session = parseInt(currentSession) + 1;
        setSubmitLoading(true);
        await toast.promise(
            api.post(`/attendance/final`, {session, classId: selectedClass.id}),
            {
              success: {
                render() {
                    setSessionList(prevState => ({
                        ...prevState,
                        [session]: true
                    }));
                    setModalShow(false);
                    setSubmitLoading(false);
                  return `Attendance for session ${session} has been successfully saved.`
                }
              },
              pending: 'Saving...',
              error: {
                render({ data }) {
                  return (data.response?.data?.message ||
                  'An unexpected error occurred. Please try again later.');
                }
              }
            },
            { position: toast.POSITION.TOP_RIGHT, 
                closeButton: true,
                autoClose: 1000 
            }
        );
    }

    return (
        <Fragment>
            <div className="right-aside attendance">
                <div className="d-flex justify-content-between mb-4">
                    <h3>
                        <img
                            src={selectedClass.thumbnailImage ? selectedClass.thumbnailImage : "./assets/images/anonymous.png"}
                            alt="user"
                            height={50}
                            width={50}
                            style={{objectFit: 'cover'}}
                            className="mr-2"/>
                            <b>{he.decode(selectedClass.title)}</b>
                    </h3>
                    <button data-target="tooltip" className="btn btn-link" data-original-title="Close" onClick={closeAttendance}>
                        <i class="fas fa-times" style={{ fontSize: '22px' }}></i>
                    </button>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <div className="card">
                        <div className="card-body">
                            {/* <!-- Row --> */}
                            <div className="row">
                            <div className="col-8">
                                <h2> {selectedClass.availableDates ? selectedClass.availableDates.length : 1} </h2>
                                <h6>Total Sessions</h6>
                            </div>
                            <div className="col-4 align-self-center text-right  p-l-0">
                                <div id="sparklinedash3"></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                        <div className="card-body">
                            {/* <!-- Row --> */}
                            <div className="row">
                            <div className="col-8">
                                <h2> {students.length} </h2>
                                <h6>Total Enrollees</h6>
                            </div>
                            <div className="col-4 align-self-center text-right  p-l-0">
                                <div id="sparklinedash3"></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-center data-loading" style = {{display: loading ? 'block': 'none'}}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="loading-text">Loading Attendance List ...</div>
                    </div>
                    <div className="text-center" style = {{display: (!loading && ((!!students && students.length < 1) || !!loadError)) ? 'block': 'none'}}>
                        {(!!students && students.length < 1 && !loadError) && <div className="no-data">No Data Available</div>}
                        {!!loadError && <div className="no-data error">
                            There was an error loading the data. <br/>
                            <button className="btn btn-link" onClick={loadData}>Reload</button>
                        </div>}
                    </div>
                    {!loading && !loadError && <div>
                        <div style={{width: '100%'}} className="d-flex flex-row align-items-center justify-content-between mb-2">
                            <div className="d-flex flex-row align-items-center w-50">
                                <h6 className="mr-3">Select Session: </h6>
                                <div className="w-50">
                                    <select className="form-control" onChange={(e) => setCurrentSession(e.target.value)}>
                                        <option value="" disabled selected>Select current session</option>
                                        {selectedClass.availableDates.map((item, idx) => (<option value={idx}>Session {idx+1}</option>))}
                                    </select>
                                </div>
                            </div>
                            <button className="btn btn-info" onClick={() => setModalShow(true)} disabled={!currentSession || sessionList[(parseInt(currentSession)+1)] === true}>
                                Save Attendance
                            </button>
                        </div>
                        {sessionList[(parseInt(currentSession)+1)] === true && <div style={{color:'red'}}>
                            <small>Attendance for this session has already been submitted. No more updates can be made.</small>
                        </div>}
                        <div className="table-responsive">
                            <table class="table table-sm attendance-table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th colspan={selectedClass.availableDates.length}>Sessions</th>
                                <th scope="col">Remarks</th>
                                </tr>
                                <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                {selectedClass.availableDates.map((item, index) => (
                                    <th scope="col" className={(index.toString() !== currentSession?.toString() || sessionList[index+1] === true) && 'inactive-session'}>{index+1}</th>
                                ))}
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((item, index) => (
                                <tr>
                                    <td className="text-center">{index+1}</td>
                                    <td style={{verticalAlign: 'middle'}}>
                                        <img className="profile-pic mr-2" 
                                        // src={item.photo ? item.photo :"./assets/images/anonymous.png"}
                                        src={item.photo !== undefined && 
                                            item.photo !== null && 
                                            item.photo.includes('https://tagprosbucket')? item.photo : DefaultPic}
                                        alt="user" height={20} width={20} style={{objectFit: 'cover'}}/> 
                                        {item.name}
                                    </td>
                                    {selectedClass.availableDates.map((dte, dteIndex) => (
                                        <td style={{verticalAlign: 'middle'}} className={(dteIndex.toString() !== currentSession?.toString() || sessionList[dteIndex+1] === true) && 'inactive-session'}>
                                            {/* 
                                            {item[`session${dteIndex}`] && <i style={{color:'green'}} className="fas fa-check align-self-center"></i>}
                                            </div> */}
                                            {/* (dteIndex+1).toString() === getStudentAttendance(item)?.session.toString() &&  */}
                                            {getStudentAttendance(item, (dteIndex+1))?.isPresent && getStudentAttendance(item, (dteIndex+1))?.session === (dteIndex+1) && (dteIndex.toString() !== currentSession?.toString() || sessionList[dteIndex+1] === true) && 
                                                <div className="d-flex justify-content-center"><i style={{color:'green', opacity: '0.6'}} className="fas fa-check align-self-center"></i></div>}
                                            {dteIndex.toString() === currentSession?.toString() && sessionList[dteIndex+1] !== true && <div className="d-flex justify-content-center">
                                                <div className="checkbox checkbox-info">
                                                    <input
                                                        type="checkbox"
                                                        id={`session${dteIndex}-${index}`}
                                                        name={`session${dteIndex}-${index}`}
                                                        onClick={() => onTickAttendance(item)}
                                                        // onClick={() => onClickSession(index, dteIndex, item)}
                                                        // onChange={(e) => onClickCheckBox(e, 'teacher', item)}
                                                        // checked={item[`session${dteIndex}`]}
                                                        checked={getStudentAttendance(item)?.isPresent}
                                                    />
                                                    <label htmlFor={`session${dteIndex}-${index}`} style={{paddingLeft: '15px', marginBottom:0}}>
                                                        {" "} 
                                                    </label>
                                                </div>
                                            </div>}
                                        </td>
                                    ))}
                                    <td>
                                        {item.remarks}
                                        <input type="text" className="form-control" name="remarks"
                                            placeholder="Remarks here..." initialValue={item.remarks} onBlur={(e) => onTickAttendance(item, e.target.value)}/>
                                    </td>
                                </tr>))}
                            </tbody>
                            </table>
                        </div>
                    </div>}
                </div>
            </div>

            <Modal size='s' show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Save attendance?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6>
                    Clicking continue will mark attendance for <b>Session {parseInt(currentSession)+1}</b> as final and you will not be able to make changes.
                    Are you sure you want to continue?
                </h6>
                </Modal.Body>
                <Modal.Footer>
                <Button variant='link' type='button' onClick={() => setModalShow(false)}>
                    Cancel
                </Button>
                <Button
                    variant='info'
                    type='submit'
                    onClick={saveAttendance}
                    disabled={submitLoading === true}
                >
                    <span
                    style={{ display: submitLoading ? 'inline-block' : 'none' }}
                    class='spinner-border spinner-border-sm btn-load'
                    role='status'
                    aria-hidden='true'
                    />
                    Continue
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>)
}