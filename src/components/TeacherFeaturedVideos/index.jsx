import React, {Fragment, useEffect, useState} from "react";
import { getAllClassRecordings, saveSelectedClassRecordings, getAllSelectedVideosByTeacher } from "api/teacher";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
const Entities = require('html-entities').XmlEntities;
const he = new Entities();

export default function TeacherFeaturedVideos(){
    const dispatch = useDispatch();
    const [loadPage, setLoadPage] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorList, setErrorList] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [videoPreview, setVideoPreview] = useState({});
    const [selectedVideosClone, setSelectedVideosClone] = useState({});
    
    const recordedClasses = useSelector((state) => state.teacher ? state.teacher.getIn(['recordedClasses', 'recorded']) : []);
    const selectedVideos = useSelector((state) => state.teacher ? state.teacher.getIn(['recordedClasses', 'featured']) : []);
    
    const loadData = async ()=>{
        setErrorList(false);
        setSubmitLoading(false);
        setLoadPage(true);
        await getAllClassRecordings(dispatch, async (response)=>{
            if (response === false)
            {
                await setErrorList(true);
                toast.error("Oh no! Something went wrong. Please try again.");
                setLoadPage(false);
            }
            else
            {
                await getAllSelectedVideosByTeacher(dispatch, async(response, data)=>{
                    if (response === false)
                    {
                        await setErrorList(true);
                        toast.error("Oh no! Something went wrong. Please try again.");
                    }
                    else
                    {
                        await setErrorList(false);
                        setSelectedVideosClone(JSON.parse(JSON.stringify(data)));
                    }
                    setLoadPage(false);
                });
            }
        })
    };

    const getTotalVideos = () =>{
        let count = 0;
        if (recordedClasses.length > 0)
        {
            recordedClasses.map((item)=>{
                if(!!item['RECORDINGS'] && item['RECORDINGS'].length > 0)
                {
                    count += item['RECORDINGS'].length;
                }
                return item;
            });
        }
        

        return count;
    };
    
    const getFeaturedVideos = ()=>{
        if (selectedVideos.length > 0)
            return selectedVideos.length;
        return 0;
    };

    const submitButton = ()=> {
        if(selectedVideosClone.length > 5)
        {
            toast.error('You have selected more than 5 videos.'); 
        }
        else
        {
            setSubmitLoading(true);
            saveSelectedClassRecordings(dispatch, {selectedVideos: selectedVideosClone}, (status) => {
                if(status){
                    toast.success('Successfully saved featured videos.');
                    setEditMode(false);
                    loadData();
                }else{
                    toast.error('Failed saving featured videos. Please try again later.');
                }

                setSubmitLoading(false);
            })
        }
    };

    const handleVideoClick = (sessionNum, title, videoLink) => {
        setVideoPreview({sessionNum, title, videoLink});
    }

    const onClose = () => {
        document.getElementById("modal-close").click();
        setVideoPreview({sessionNum: "", title: "", videoLink: ""});
    };

    const checkChange = async (event, recordItem) =>{
        const recordItemVideoName = recordItem['fileName'] || recordItem['VIDEO_NAME'];
        let clone = [...selectedVideosClone];
        let index = clone.findIndex((item) => {
            const itemVideo = item['fileName'] || item['VIDEO_NAME'];
            return itemVideo === recordItemVideoName;
        });

        if (index > -1)
        {
            clone.splice(index, 1);
            setSelectedVideosClone(clone);
        }
        else
        {
            clone.push(recordItem);
            setSelectedVideosClone(clone);
        }

        console.log("clone", clone);
        console.log("selectedVideosClone", selectedVideosClone);
    };

    const cancelButtonClick = async ()=>{
        console.log(selectedVideos);
        setSelectedVideosClone([...selectedVideos]);
        await setEditMode(false);
    };

    const editButtonClick = async ()=>{
        setSelectedVideosClone([...selectedVideos]);
        await setEditMode(true);
    };

    const isVideoSelected = (recordItem) => {
        return selectedVideosClone.findIndex((video)=>{
            const recordItemVideoName = recordItem['fileName'] || recordItem['VIDEO_NAME'];
            const videoName = video['fileName'] || video['VIDEO_NAME'];
            return recordItemVideoName === videoName;
        }) > -1;
    }

    useEffect(() => {
        loadData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* <!-- .left-right-aside-column--> */}
                            <div className="row">
                                {/* <!-- .left-aside-column--> */}
                                 <div className="left-aside bg-light-part col-3">
                                    <ul className="list-style-none">
                                        <li className="box-label">
                                            <a style={{pointerEvents: 'none'}} href="#!" onClick={(event)=>{event.stopPropagation();return false;}}>
                                                Total Videos <span>{getTotalVideos()}</span>
                                            </a>
                                        </li>
                                        <li className="box-label">
                                            <a style={{pointerEvents: 'none'}} href="#!" onClick={(event)=>{event.stopPropagation();return false;}}>
                                                Featured Videos <span>{getFeaturedVideos()}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col" style={{ marginLeft: '0px !important', overflowY: "auto" }}>
                                    {loadPage === true && 
                                        <div className="text-center data-loading" style = {{display: loadPage ? 'block': 'none'}}>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                    {loadPage === false &&
                                        <div>
                                            {errorList === true && 
                                                <div className="column d-flex justify-content-center">
                                                    <div className="text-center no-data error">
                                                        There was an error loading the data.<br/>
                                                        <button className="btn btn-link" onClick={()=>loadData()}>Reload</button>
                                                    </div>
                                                </div>
                                            }
                                            {errorList === false &&
                                                <div>
                                                    {getTotalVideos() === 0 ?
                                                        <div className="column d-flex justify-content-center">
                                                            <div className="text-center no-data error">
                                                                It seems you have no recorded videos yet.<br/>
                                                                
                                                            </div>
                                                        </div>
                                                    :
                                                    <div>
                                                        <div className="row d-flex justify-content-end">
                                                            { editMode === false
                                                                ? <button className="btn btn-primary" name="editButton" type="button" onClick={()=>editButtonClick()}>Edit Featured Videos</button>
                                                                : <div>
                                                                    <button className="btn btn-danger" style={{marginRight: '12px'}} name="cancelEdit" type="button" onClick={()=>cancelButtonClick()}>Cancel</button>
                                                                    <button className="btn btn-primary" name="saveButton" type="button" onClick={()=>submitButton()} disabled={submitLoading}>
                                                                        <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                                                        Save Featured Videos
                                                                    </button>
                                                                </div>}
                                                        </div>

                                                        {editMode === false && !!selectedVideos && selectedVideos.length === 0 &&
                                                            <div className="column d-flex justify-content-center">
                                                                <div className="text-center no-data error">
                                                                    No featured videos selected<br/>
                                                                    
                                                                </div>
                                                            </div>
                                                        }

                                                        {editMode === false && !!selectedVideos && selectedVideos.length > 0 &&
                                                            <div>
                                                                <div className="row row-cols-2 m-2">
                                                                    {selectedVideos.map((selectedItem, idx)=>
                                                                    <div key={idx} className="p-2">
                                                                        <fieldset className="fieldset-border">
                                                                            <legend className="fieldset-border mb-0"><b>Featured Video {idx+1}</b></legend>
                                                                            <ReactPlayer
                                                                                url={selectedItem.VIDEO_LINK} 
                                                                                controls width={'100%'} height={'100%'} />   
                                                                            
                                                                        </fieldset>
                                                                    </div>)
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        
                                                        {editMode === true && !!recordedClasses && recordedClasses.length > 0 && recordedClasses.map((recordedClassItem, idx)=>
                                                            <div key={idx}>
                                                                    {!!recordedClassItem.RECORDINGS && recordedClassItem.RECORDINGS.length > 0 && <h3>{he.decode(recordedClassItem.TITLE)}</h3>}
                                                                    {!!recordedClassItem.RECORDINGS && recordedClassItem.RECORDINGS.length > 0 && <div>
                                                                        <div className="row m-2 d-flex flex-row">
                                                                            <ul className="list-group list-group-flush w-100 p-2">
                                                                        {recordedClassItem.RECORDINGS.map((recordItem, index)=>
                                                                            <li key={index} className="list-group-item d-flex flex-row">
                                                                                <div className="checkbox checkbox-info mr-2">
                                                                                    <input id={`check-${index}`} name={`check-${index}`} type="checkbox" onClick={(event)=>checkChange(event, recordItem, index)} checked={isVideoSelected(recordItem)}/>
                                                                                    <label className="mb-0" htmlFor={`check-${index}`}>Session {index+1}</label>
                                                                                </div>
                                                                                <div className="ml-auto"
                                                                                    role="button"
                                                                                    data-target="#videoModal"
                                                                                    data-toggle="modal"
                                                                                    data-original-title="View"
                                                                                    onClick={(event)=>{handleVideoClick((index+1), recordedClassItem.TITLE, recordItem.link); event.preventDefault()}}>
                                                                                    <a href="#!" onClick={()=>{return false}}>
                                                                                        <i className="fas fa-play" style={{ fontSize: '18px' }}></i>
                                                                                    </a>
                                                                                </div>
                                                                            </li>
                                                                            // {[1,2,3,4,5,6,7,8].map((item, index) => (
                                                                                // <div key={index} className="p-2">
                                                                                //     <fieldset className="fieldset-border">
                                                                                //         <legend className="fieldset-border mb-0"><b>Session {index+1}</b></legend>
                                                                                //         <div className="row d-flex justify-content-end" style={{display: editMode === true ? 'auto': 'none'}}>
                                                                                //             <div className="checkbox checkbox-info mr-2">
                                                                                //                 <input id={`check-${index}`} name={`check-${index}`} type="checkbox" onClick={(event)=>checkChange(event, recordItem, index)} checked={isVideoSelected(recordItem)}/>
                                                                                //                 <label className="mb-0" htmlFor={`check-${index}`}></label>
                                                                                //             </div>
                                                                                //         </div>
                                                                                //         <img className={!editMode ? 'mt-2': ''} role="button" 
                                                                                //             data-target="#videoModal"
                                                                                //             data-toggle="modal"
                                                                                //             data-original-title="View"
                                                                                //             src="/img/Jitsi-Virtual-Meeting.png" 
                                                                                //             onClick={() => handleVideoClick((index+1), recordedClassItem.TITLE, recordItem.link)}
                                                                                //             alt={`Session ${index+1}`} 
                                                                                //             width={'100%'} height={'100%'}/>
                                                                                        
                                                                                //     </fieldset>   
                                                                                // </div>
                                                                            )}
                                                                            </ul>
                                                                        </div>
                                                                            
                                                                    </div>}
                                                                {/* )} */}
                                                                {!!recordedClassItem.RECORDINGS && recordedClassItem.RECORDINGS.length > 0 && idx !== recordedClassItem.RECORDINGS.length-1 &&<hr />}
                                                            </div>
                                                        )}
                                                    </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                                {/* Modal */}
                                <div
                                className="modal"
                                id="videoModal"
                                tabIndex={-1}
                                aria-labelledby="videoModal"
                                aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">
                                                    {he.decode(videoPreview.title)}
                                                    <small style={{display:'block'}}>Session {videoPreview.sessionNum}</small>
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
                                                <ReactPlayer
                                                    url={videoPreview.videoLink} 
                                                    controls width={'100%'} height={'100%'} />     
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}