import React, { Fragment, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import FullCalendar  from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import Table from "components/Admin/contents/Table";
import dayjs from "dayjs";
import './index.css';
import { getSurveillanceData } from "api/admin";
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Configurations() {
    const dispatch = useDispatch();
    // const toastLoading = React.useRef(null);
    // toastLoading.current = toast('🦄 Wow so easy!', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     });
    const now = new Date();
    const [selectedDate, setSelectedDate]=useState({
        month: now.getMonth(),
        date: now.getDate(),
        year: now.getFullYear()
    });
    const calendarRef = useRef(null);

    const [errorData, setErrorData] = useState({surveillance: false, constants: false});
    const [hideFilter, setHideFilter] = useState(false);
    const [activeTab, setActiveTab] = useState("Completed");
    const [clickedEvent, setClickedEvent] = useState({isSelected: false, date: null, classes: []});
    const [surveillance, setSurveillance] = useState([]);
    const [totalClasses, setTotalClasses] = useState({completed: 0, ongoing: 0});
    const [selectedClass, setSelectedClass] = useState({});

    // const loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));
    const [toggleSortFilter, setToggleSortFilter] = useState({});
    const columns = [{
        Header: "asds",
        id: 'surveillanceTable',
        columns: [
            // {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            //     id: "checkbox",
            //     accessor: "",
            //     Cell: ({ row }) => {
            //         return (
            //             <div>
            //                 <div className="checkbox checkbox-info">
            //                     <input type="checkbox" id={`check-${row.index}`} name = {`check-${row.index}`}/>
            //                     <label htmlFor={`check-${row.index}`}></label>
            //                 </div>
            //             </div>
            //         );
            //     },
            //     Header: x => {
            //         return (
            //             <div>
            //                 <div className="checkbox checkbox-info">
            //                     <input type="checkbox" id="all"/>
            //                     <label className="mb-0" htmlFor="all"></label>
            //                 </div>
            //             </div>
            //         );
            //     },
            //     sortable: false,
            //     width: 45
              
            // },
            {
                Header: 'No.', accessor: 'status',
                Cell: ({ row }) => (
                    <div>{row.index + 1}</div>
                ),
            },
            {
                Header: 'Title',
                accessorFilter: 'Title',
                filterType: 'sortOnly',
                columnFilter: true,
                accessor: d => `${d.TITLE} ${d.SESSION ? `- Session ${d.SESSION }`: ''}`,
            },
            {
                Header: 'Time',
                accessorFilter: 'Time',
                filterType: 'sortOnly',
                columnFilter: true,
                accessor: d => d.CLASS_TYPE==='CLT002' ? `${dayjs(d.TBL_LMS_CLASS_SCHEDULED.START_TIME, "HH:mm:ss").format('hh:mm A')} - ${dayjs(d.TBL_LMS_CLASS_SCHEDULED.END_TIME, "HH:mm:ss").format('hh:mm A')}` : '',
            },
            {
                Header: 'Teacher',
                accessorFilter: 'Teacher',
                filterType: 'sortOnly',
                columnFilter: true,
                accessor: d => `${d.TEACHER.LAST_NAME}, ${d.TEACHER.FIRST_NAME}`,
            },
            {
                Header: 'No. of Learners',
                accessorFilter: 'No_of_Learners',
                filterType: 'sortOnly',
                columnFilter: true,
                accessor: d => d.TBL_LMS_CLASS_ENROLLMENTs ? d.TBL_LMS_CLASS_ENROLLMENTs.length : '',
            },
            {
                Header: 'Action',
                accessor: 'action',

                Cell: ({ row }) => (
                    <div style={{ display: 'flex' }}>
                        <div data-toggle="tooltip" title={(!clickedEvent.classes[row.index].VIDEO_RECORDING || !clickedEvent.classes[row.index].VIDEO_RECORDING.link) ? 'No Recordings Found' : 'Download Recording'}>
                            <a
                                className={`btn btn-link ${(!clickedEvent.classes[row.index].VIDEO_RECORDING || !clickedEvent.classes[row.index].VIDEO_RECORDING.link) ? 'disabled' : ''}`}
                                role="button"
                                target="_blank"
                                rel='noreferrer'   
                                href={clickedEvent.classes[row.index].VIDEO_RECORDING?.link}      
                                aria-disabled={(!clickedEvent.classes[row.index].VIDEO_RECORDING || !clickedEvent.classes[row.index].VIDEO_RECORDING.link).toString()}
                            >
                                <i className="fas fa-download"></i>
                            </a>
                        </div>
                        <div data-toggle="tooltip" title={(!clickedEvent.classes[row.index].VIDEO_RECORDING || !clickedEvent.classes[row.index].VIDEO_RECORDING.link) ? 'No Recordings Found' : 'View Recording'}>
                            <button
                                data-target="#surveillanceModal"
                                className="btn btn-link"
                                data-toggle="modal"
                                data-original-title="View"
                                onClick={() => handleClickView(row.index)}
                                disabled={!clickedEvent.classes[row.index].VIDEO_RECORDING || !clickedEvent.classes[row.index].VIDEO_RECORDING.link}
                            >
                                <i className="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                ),
            },
        ],
    }];

    const loadData = async (argDate) => {
        let total = 0;
        setErrorData({surveillance: false});
        await toast.promise(
            getSurveillanceData(dispatch, {month: parseInt(argDate.month)+1, year: argDate.year, classStatus: 'CSTAT011'}, (status, data) => {
                if(status){
                    const survData = data.data.map((item) => {
                        // { title: "1 class", start: "YYYY-MM-DD", allDay: true }
                        total = total + item.classes.length;
                        const event = {
                            title: `${item.classes.length} ${item.classes.length > 1 ? 'sessions' : 'session'}`,
                            start: item.date,
                            allDay: true,
                            color: "#dc3545",
                            borderColor: '#117bff',
                            backgroundColor: '#117bff',
                            classes: item.classes
                        }
    
                        return event;
                    });
                    setSurveillance(survData);
                    setTotalClasses(prevState => ({...prevState, completed: total}));
                }else{
                    setErrorData({surveillance: true});
                }
    
            }),
            {
              success: 'Classes successfully loaded.',
              pending: 'Please wait while classes are loading...',
              error: 'Error loading classes. Please try again.'
            },
            { position: toast.POSITION.TOP_RIGHT, autoClose: 900 }
        );
        
    }

    const customDisplay = ({ event, el }) => {
        return (
          <OverlayTrigger
            placement="right"
            delay={{ show: 50, hide: 200 }}
            overlay={<Tooltip>{event.title}</Tooltip>}
            style={{cursor: 'pointer'}}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "2px 0",
                overflow: "hidden",
                cursor: 'pointer'
              }}
            >
             
              <div
                style={{
                  flexGrow: "1",
                  flexShrink: "1",
                  minWidth: "0",
                  overflow: "hidden",
                  fontWeight: "bold",
                  paddingLeft: "10px"
                }}
              >
                {event.title}
              </div>
            </div>
          </OverlayTrigger>
        );
    };

    const goToDate = (event) => {
        const objDate = { ...selectedDate };
        if(event){
            const name = event.target.name;
            objDate[name] = event.target.value;
            setSelectedDate(prevState => ({
                ...prevState,
                [name]:event.target.value
            }));

            loadData(objDate);
        }
        
        const calendarApi = calendarRef.current.getApi();
        const strDate = `${objDate.year}-${parseInt(objDate.month)+1}-${objDate.date}`
        const dte = new Date(strDate);
        calendarApi.gotoDate(dte);
    }

    const handleEventClick = (info) => {
        const event = info.event;
        const eventDate = dayjs(event.start).format('YYYY-MM-DD');
        const { classes } = surveillance.find((item) => item.start === eventDate);
        setClickedEvent({isSelected: true, date: dayjs(event.start).format('MMM DD, YYYY'), classes});
    }

    const handleClickNav = () => {
        setClickedEvent({isSelected: false, date: null, classes: []});
        setTimeout(() => {
            goToDate();
        }, 300);
    }

    const handleClickView = (index) => {
        setSelectedClass(clickedEvent.classes[index]);
    }

    const onClose = () => {
        setSelectedClass({});
    }

    React.useEffect(() => {
        loadData(selectedDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <div id="surveillance-module">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* <!-- .left-right-aside-column--> */}
                            <div className="row">
                                {/* <!-- /.left-aside-column--> */}
                                <div className="left-aside bg-light-part col">
                                    <div className={`row ${!hideFilter ? 'justify-content-end' : 'justify-content-center'}`}>
                                        <button className="btn btn-link" data-toggle="tooltip" title={`${!hideFilter ? 'Minimize Filter Section' : 'Expand Filter Section'}`} onClick={() => setHideFilter(!hideFilter)}>
                                            <i className={`fas ${!hideFilter ? 'fa-minus-square' : 'fa-expand-alt'}`}></i>
                                        </button>
                                    </div>
                                    {!hideFilter && <ul className="list-style-none">
                                        <li className="box-label">
                                            <a data-toggle="tab" href="#ongoing-classes" style={{pointerEvents:'none'}}>
                                                Total Ongoing Classes <span>{totalClasses.ongoing}</span>
                                            </a>
                                        </li>

                                        <li className="divider m-0"></li>

                                        <li className="box-label">
                                            <a data-toggle="tab" href="#completed-classes" style={{pointerEvents:'none'}}>
                                                Total Completed Classes <span>{totalClasses.completed}</span>
                                            </a>
                                        </li>
                                        
                                    </ul>}
                                </div>
                                <div className={`right-aside ${!hideFilter ? 'col-9' : 'col-11'} surveillance`}>
                                    {/* <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                                        Single toggle
                                    </button> */}
                                    {!clickedEvent.isSelected && <div>
                                        <ul className="nav nav-pills nav-fill" role="tablist" id="surveillance-nav-pills">
                                            <li className="nav-item m-1" >
                                                <a className="nav-link btn btn-info btn-outline-info p-1 disabled"
                                                    id="ongoing-tab" data-toggle="tab" href="#ongoing-classes" role="tab" 
                                                    onClick={() => setActiveTab('Ongoing')}
                                                    aria-controls="ongoing-classes" aria-selected="false">Ongoing Classes 
                                                </a>
                                            </li>
                                            <li className="nav-item m-1">
                                                <a className="nav-link btn btn-outline-info active p-1"
                                                    id="completed-tab" data-toggle="tab" href="#completed-classes" role="tab" 
                                                    onClick={() => setActiveTab('Completed')}
                                                    aria-controls="completed-classes" aria-selected="true">Completed Classes</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content mt-3" id="myTabContent">
                                            <div className="tab-pane fade" id="ongoing-classes" role="tabpanel" aria-labelledby="ongoing-tab">
                                                Ongoing
                                            </div>
                                            <div className="tab-pane fade show active" id="completed-classes" role="tabpanel" aria-labelledby="completed-tab">
                                                <FullCalendar
                                                    height={700}
                                                    aspectRatio={1.95}
                                                    plugins={[dayGridPlugin, interactionPlugin]}
                                                    customButtons={{
                                                        monthSelect: {
                                                        text: <div className="form-group">
                                                                    <select title="Select Month" className="custom-select" name="month" defaultValue={selectedDate.month} onChange={(e) => goToDate(e)}>
                                                                        {months.map((monthName, idx) => (<option value={idx} disabled={idx<now.getMonth()-2 || idx>now.getMonth()}>{`${monthName} ${selectedDate.year}`}</option>))}
                                                                        {/* {months.map((monthName, idx) => (<option value={idx}>{`${monthName} ${selectedDate.year}`}</option>))} */}
                                                                    </select>
                                                                </div>,
                                                        click: function (e) {
                                                            // const calendarAPI = calendarRef.current.getApi();
                                                            // console.log('monthSelect',calendarAPI.getDate());
                                                        }
                                                        },
                                                        // yearSelect:  {
                                                        //     text: <div className="form-group">
                                                        //         <select className="custom-select" name="year" defaultValue={selectedDate.year} onChange={(e) => goToDate(e)}>
                                                        //             {(function (rows, i, len) {
                                                        //                 while (++i <= len) {
                                                        //                     rows.push(<option value={i}>{i}</option>)
                                                        //                 }
                                                        //                 return rows;
                                                        //             })([], 2018, ((new Date()).getFullYear()+10))}
                                                        //         </select>
                                                        //     </div>,
                                                        //     click: function (e) {}
                                                        // }
                                                    }}
                                                    headerToolbar={{
                                                        right: '',
                                                        center: 'monthSelect',
                                                        left: ''
                                                    }}
                                                    events={surveillance}
                                                    ref={calendarRef}
                                                    initialView="dayGridMonth"
                                                    themeSystem={'bootstrap'}
                                                    nowIndicator={true}
                                                    // dateClick={handleEventAdd}
                                                    eventClick={(e) => handleEventClick(e)}
                                                    eventContent={customDisplay}
                                                    // validRange={} 
                                                    />
                                            </div>
                                        </div>
                                    </div>}
                                    {clickedEvent.isSelected && <div>
                                        <div className="mb-4">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item" role="button" onClick={handleClickNav}>{activeTab} Class</li>
                                                <li className="breadcrumb-item active"><span>{clickedEvent.date}</span></li>
                                            </ol>
                                        </div>
                                        <Table 
                                            loading={false} 
                                            error={errorData.constants} 
                                            columns={columns} 
                                            data={clickedEvent.classes} 
                                            title={""}
                                            toggleSortFilter={toggleSortFilter}
                                            setToggleSortFilter={setToggleSortFilter}
                                            // title={<button className="btn btn-info">Download</button>}
                                            onReload={loadData}
                                            />
                                    </div>}
                                </div>
                                    
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>

                { /* MODAL */}
                <div
                className="modal"
                id="surveillanceModal"
                tabIndex={-1}
                aria-labelledby="surveillanceModal"
                aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="surveillanceModalLabel">
                                    {selectedClass.TITLE}
                                    {selectedClass.SESSION && <small style={{display:'block'}}>Session {selectedClass.SESSION}</small>}
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
                                    url={selectedClass.VIDEO_RECORDING?.link} 
                                    controls width={'100%'} height={'100%'} />     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}