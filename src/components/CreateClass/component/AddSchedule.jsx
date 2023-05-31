import React, { useEffect, useState, useRef } from 'react'
import { TimezonePicker } from "baseui/timezonepicker";
import { SIZE } from "baseui/input";
import service from '../service';
import dayjs from "dayjs";

import FullCalendar  from "@fullcalendar/react";
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import _ from "lodash";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";


// import Calendar from './FullCalendar';

// const earliestEnrollment= dayjs().add(21, 'days').format("YYYY-MM-DD");

const defaultSchedule = {
    liveClassType: "LCLT001",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    enrollmentStartDate: "",
    enrollmentEndDate: "",
    minLearners: "",
    maxLearners: "",
    timezone: "Asia/Manila",
    dayAvailability: "",
    scheduleLength: "",
    availableDates: [],
    sessionNumber:""
};

// const DAYS_OPTIONS = [
//     { value: "M", label: "Monday" },
//     { value: "T", label: "Tuesday" },
//     { value: "W", label: "Wednesday" },
//     { value: "H", label: "Thursday" },
//     { value: "F", label: "Friday" },
//     { value: "S", label: "Saturday" },
//     { value: "U", label: "Sunday" },
// ];

const TIME_OPTIONS = [
    { value:"00:00", label: "12:00 am" },
    { value:"00:15", label: "12:15 am" },
    { value:"00:30", label: "12:30 am" },
    { value:"00:45", label: "12:45 am" },
    { value:"01:00", label: "01:00 am" },
    { value:"01:15", label: "01:15 am" },
    { value:"01:30", label: "01:30 am" },
    { value:"01:45", label: "01:45 am" },
    { value:"02:00", label: "02:00 am" },
    { value:"02:15", label: "02:15 am" },
    { value:"02:30", label: "02:30 am" },
    { value:"02:45", label: "02:45 am" },
    { value:"03:00", label: "03:00 am" },
    { value:"03:15", label: "03:15 am" },
    { value:"03:30", label: "03:30 am" },
    { value:"03:45", label: "03:45 am" },
    { value:"04:00", label: "04:00 am" },
    { value:"04:15", label: "04:15 am" },
    { value:"04:30", label: "04:30 am" },
    { value:"04:45", label: "04:45 am" },
    { value:"05:00", label: "05:00 am" },
    { value:"05:15", label: "05:15 am" },
    { value:"05:30", label: "05:30 am" },
    { value:"05:45", label: "05:45 am" },
    { value:"06:00", label: "06:00 am" },
    { value:"06:15", label: "06:15 am" },
    { value:"06:30", label: "06:30 am" },
    { value:"06:45", label: "06:45 am" },
    { value:"07:00", label: "07:00 am" },
    { value:"07:15", label: "07:15 am" },
    { value:"07:30", label: "07:30 am" },
    { value:"07:45", label: "07:45 am" },
    { value:"08:00", label: "08:00 am" },
    { value:"08:15", label: "08:15 am" },
    { value:"08:30", label: "08:30 am" },
    { value:"08:45", label: "08:45 am" },
    { value:"09:00", label: "09:00 am" },
    { value:"09:15", label: "09:15 am" },
    { value:"09:30", label: "09:30 am" },
    { value:"09:45", label: "09:45 am" },
    { value:"10:00", label: "10:00 am" },
    { value:"10:15", label: "10:15 am" },
    { value:"10:30", label: "10:30 am" },
    { value:"10:45", label: "10:45 am" },
    { value:"11:00", label: "11:00 am" },
    { value:"11:15", label: "11:15 am" },
    { value:"11:30", label: "11:30 am" },
    { value:"11:45", label: "11:45 am" },
    { value:"12:00", label: "12:00 pm" },
    { value:"12:15", label: "12:15 pm" },
    { value:"12:30", label: "12:30 pm" },
    { value:"12:45", label: "12:45 pm" },
    { value:"13:00", label: "01:00 pm" },
    { value:"13:15", label: "01:15 pm" },
    { value:"13:30", label: "01:30 pm" },
    { value:"13:45", label: "01:45 pm" },
    { value:"14:00", label: "02:00 pm" },
    { value:"14:15", label: "02:15 pm" },
    { value:"14:30", label: "02:30 pm" },
    { value:"14:45", label: "02:45 pm" },
    { value:"15:00", label: "03:00 pm" },
    { value:"15:15", label: "03:15 pm" },
    { value:"15:30", label: "03:30 pm" },
    { value:"15:45", label: "03:45 pm" },
    { value:"16:00", label: "04:00 pm" },
    { value:"16:15", label: "04:15 pm" },
    { value:"16:30", label: "04:30 pm" },
    { value:"16:45", label: "04:45 pm" },
    { value:"17:00", label: "05:00 pm" },
    { value:"17:15", label: "05:15 pm" },
    { value:"17:30", label: "05:30 pm" },
    { value:"17:45", label: "05:45 pm" },
    { value:"18:00", label: "06:00 pm" },
    { value:"18:15", label: "06:15 pm" },
    { value:"18:30", label: "06:30 pm" },
    { value:"18:45", label: "06:45 pm" },
    { value:"19:00", label: "07:00 pm" },
    { value:"19:15", label: "07:15 pm" },
    { value:"19:30", label: "07:30 pm" },
    { value:"19:45", label: "07:45 pm" },
    { value:"20:00", label: "08:00 pm" },
    { value:"20:15", label: "08:15 pm" },
    { value:"20:30", label: "08:30 pm" },
    { value:"20:45", label: "08:45 pm" },
    { value:"21:00", label: "09:00 pm" },
    { value:"21:15", label: "09:15 pm" },
    { value:"21:30", label: "09:30 pm" },
    { value:"21:45", label: "09:45 pm" },
    { value:"22:00", label: "10:00 pm" },
    { value:"22:15", label: "10:15 pm" },
    { value:"22:30", label: "10:30 pm" },
    { value:"22:45", label: "10:45 pm" },
    { value:"23:00", label: "11:00 pm" },
    { value:"23:15", label: "11:15 pm" },
    { value:"23:30", label: "11:30 pm" },
    { value:"23:45", label: "11:45 pm" }
];

function AddSchedule(props) {
    const [modalSchedShow, setModalSchedShow] = useState(false);
    const [selectedDisplayDates, setSelectedDisplayDates] = useState([]);
    const [modalSchedErrDesc, setModalSchedErrDesc] = useState("");
    const [modalSchedErrTitle, setModalSchedErrTitle] = useState("");
    const [schedule, setSchedule] = useState(defaultSchedule);
    const [isChange, setIsChange] = useState(props.classDetails !== undefined ? true : false);
    const [isEdit, setIsEdit] = useState(props.classDetails !== undefined ? true : false);
    const [selectedDates, setSelectedDates] = useState([]);
    const calendarRef = useRef(null);
    const { schedules, title } = props;

    useEffect(() => {
        if ((schedules && schedules !== {})) {
            const { liveClassType, dayAvailability } = schedules;
            const selectedDayAvailability = liveClassType === 'LCLT001' ? 'onetime' : service.normalizedDayAvialability(dayAvailability);
            setSchedule({ 
                ...defaultSchedule, 
                ...schedules, 
                dayAvailability: selectedDayAvailability
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (isChange) {
            const { startDate, endDate, dayAvailability, liveClassType } = schedule;
            const selectedEndDate = liveClassType === 'LCLT001' ? startDate : endDate;
            const scheduleLength = `${startDate}, ${selectedEndDate}`;

            if(isEdit){
                setInitialData();
            }

            const normalizedDayAvialability = service.flattenDayAvailability(dayAvailability)
            props.pushSchedule({
                ...schedule, endDate: selectedEndDate,
                scheduleLength,
                availableDates: selectedDates,
                dayAvailability: normalizedDayAvialability,
            });
            setIsChange(false);
        }
    })

    const setInitialData = async() => {
        const { startTime: sTime, endTime: eTime, minLearners, maxLearners, timeZone,
            dayAvailability: days, availableDates, title: classTitle, classType } = props.classDetails;
        const selectedDayAvailability = classType === 'LCLT001' ? 'onetime' : service.normalizedDayAvialability(days);
        if(!!availableDates && availableDates.length > 0){
            const displayDatesArray = []
            const datesArray = []
            await availableDates.forEach((item) => {
                var dateItem = dayjs(item);
                var aWeekFromNow = dayjs(new Date()).add(7, 'days').format("YYYY-MM-DD");
                if(dateItem.diff(aWeekFromNow, 'day') >= 0)
                {
                    var temp ={
                        title: classTitle,
                        start: dayjs(item).format("YYYY-MM-DD"),
                        allDay: true,
                        color: "#dc3545"
                    };
                    displayDatesArray.push(temp);
                    datesArray.push(temp.start);
                }
            });


            await setSelectedDisplayDates(displayDatesArray);
            await setSelectedDates(datesArray.sort());
            await setSchedule({ ...schedules, availableDates: datesArray.sort()});
            props.pushSchedule({
                ...schedule, availableDates: datesArray.sort(),
                sessionNumber: datesArray.length
            });
        }

        await setSchedule({ ...schedules, classType: classType,
            startTime: sTime ? moment(sTime, "hh:mm A").format("HH:mm") : "",
            endTime: eTime ? moment(eTime, "hh:mm A").format("HH:mm") : "",
            minLearners,
            maxLearners,
            // enrollmentStartDate: enrollmentStartDate ? moment(enrollmentStartDate).format('YYYY-MM-DD') : "",
            // enrollmentEndDate: enrollmentEndDate ? moment(enrollmentEndDate).format('YYYY-MM-DD'): "",
            timezone: timeZone || 'Asia/Manila',
            scheduleLength: "",
            dayAvailability: selectedDayAvailability,
            sessionNumber: availableDates ? availableDates.length : null
        });

        setIsEdit(false);
        setIsChange(true);
    }

    const onInputChange = (event) => {
        if (event.target.name === "sessionNumber" || event.target.name === "minLearners" || event.target.name === "maxLearners")
        {
            if (event.target.name === "sessionNumber")
            {
                if (parseInt(event.target.value) > 1)
                {
                    setSchedule({ ...schedule, liveClassType: 'LCLT002' });
                }
                else if (parseInt(event.target.value) === 1)
                {
                    setSchedule({ ...schedule, liveClassType: 'LCLT001' });
                }
            }
            setSchedule({ ...schedule, [event.target.name]: !!event.target.value ? parseInt(event.target.value) : "" });
        }
        else
        {
            setSchedule({ ...schedule, [event.target.name]: event.target.value });
        }
        setIsChange(true);
    }

    const onTimeSelect = (value, name) => {
        setSchedule({ ...schedule, [name]: value })
        setIsChange(true);
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
                  paddingLeft: "10px",
                }}
              >
                {event.title}
              </div>
            </div>
          </OverlayTrigger>
        );
      };


      const addOrRemoveDate = (item) => {
        let datesDisplayedArray = [...selectedDisplayDates];
        var temp = _.findIndex(datesDisplayedArray, (item2)=>{
            return datesDisplayedArray.length > 0 && dayjs(item2.start).format("MM-DD-YYYY") === dayjs(item.start).format("MM-DD-YYYY");
        });
      
        if (temp > -1){
            datesDisplayedArray.splice(temp, 1);
        }
        else{
            datesDisplayedArray.push(item);}

        
        addOrRemoveToState(item.start);
        setSelectedDisplayDates(datesDisplayedArray);
      }

     const addOrRemoveToState = (item) =>{
        let datesArray = [...selectedDates];
        let temp = _.findIndex(datesArray, (item2)=>{
            return datesArray.length > 0 && dayjs(item2).format("MM-DD-YYYY") === dayjs(item).format("MM-DD-YYYY");
        });

        if (temp > -1)
        {
            datesArray.splice(temp, 1);
        }
        else{
            datesArray.push(item);
        }
        setSelectedDates(datesArray.sort());
        
     }

    const handleEventAdd = (event) =>{
        console.log("Session Number", schedule.sessionNumber);

        if (!schedule.sessionNumber || schedule.sessionNumber === "" || schedule.sessionNumber === null || schedule.sessionNumber === "0" || schedule.sessionNumber === 0)
        {
                //change message here
                setModalSchedErrTitle("Oh no!");
                setModalSchedErrDesc("You have not set the number of sessions for this class");
                setModalSchedShow(true);

        }
        // else if (!schedule.enrollmentEndDate || schedule.enrollmentEndDate === ""){
        //     setModalSchedErrTitle("Oh no!");
        //     setModalSchedErrDesc("You have not yet set enrollment date for this class");
        //     setModalSchedShow(true);
        // }
        else
        {
            const tempIndex = _.findIndex(selectedDates, (item)=>{
                return item === dayjs(event.date).format("YYYY-MM-DD");
            });
            if (selectedDates.length < schedule.sessionNumber || tempIndex > -1)
            {
                var temp ={
                    title: title,
                    start: dayjs(event.date).format("YYYY-MM-DD"),
                    allDay: true,
                    color: "#dc3545"};
                addOrRemoveDate(temp);
            
                // compare (dates)
                const calendarApi = calendarRef.current.getApi();
                calendarApi.gotoDate(event.date);
        
                setSchedule({ ...schedule, availableDates: selectedDates });
                setIsChange(true);
            }
            else
            {
                // show modal
                //change message here
                setModalSchedErrTitle("Oh no!");
                setModalSchedErrDesc("You have reached the number of sessions for this class");
                setModalSchedShow(true);
            }
        }
        
    };

    const handleEventClick=(event)=>{
        console.log("Session Number", schedule.sessionNumber);
        if (!schedule.sessionNumber || schedule.sessionNumber === "" || schedule.sessionNumber === null || schedule.sessionNumber === "0" || schedule.sessionNumber === 0)
        {
                //change message here
                setModalSchedErrTitle("Oh no!");
                setModalSchedErrDesc("You have not set the number of sessions for this class");
                setModalSchedShow(true);

        }
        // else if (!schedule.enrollmentEndDate || schedule.enrollmentEndDate === ""){
        //     setModalSchedErrTitle("Oh no!");
        //     setModalSchedErrDesc("You have not yet set enrollment date for this class");
        //     setModalSchedShow(true);
        // }
        else
        {
            const tempIndex = _.findIndex(selectedDates, (item)=>{
                return item === dayjs(event.event.start).format("YYYY-MM-DD");
            });
            if (selectedDates.length < schedule.sessionNumber || tempIndex > -1)
            {
                var temp ={
                    title: title,
                    start: dayjs(event.event.start).format("YYYY-MM-DD"),
                    allDay: true,
                    color: "#dc3545"};
                addOrRemoveDate(temp);
            
                // compare (dates)
                const calendarApi = calendarRef.current.getApi();
                calendarApi.gotoDate(event.date);
        
                setSchedule({ ...schedule, availableDates: selectedDates });
                setIsChange(true);
            }
            else
            {
                // show modal
                //change message here
                setModalSchedErrTitle("Oh no!");
                setModalSchedErrDesc("You have reached the number of sessions for this class");
                setModalSchedShow(true);
            }
        }
    };

    
    const getValidRange = (date) =>{
        return {start: dayjs(date).add(7, 'days').format("YYYY-MM-DD")};

        // return {start: dayjs(schedule.enrollmentEndDate).add(1, 'days').format("YYYY-MM-DD")};
    };

    window.$(document).on("input", ".sessionNumber", function() {
        this.value = this.value.replace(/\D/g,'');
        if (this.value === '0')
        {
            this.value = 1;
            setSchedule(prevState => ({...prevState, sessionNumber: 36}));
        }
        if (this.value > 36)
        {
            this.value = 36;
            setSchedule(prevState => ({...prevState, sessionNumber: 36}));
        }
        // this.value = this.value === '0' ? 1 : this.value;
    });

    window.$(document).on("input", ".number2", function() {
        this.value = this.value.replace(/\D/g,'');
    });

    return (
        <>
            <Modal
                size="m"
                show={modalSchedShow}
                backdrop="static"
                keyboard={false}
                onHide={() => setModalSchedShow(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title>{modalSchedErrTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalSchedErrDesc}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setModalSchedShow(false)}>
                    Ok
                    </Button>
                </Modal.Footer>
                </Modal>
            <div>
                <div className="row mt-4">
                    <div className="col-12">
                        {/* <div className="form-group row">
                            <div className="col-md-6">
                            <label className="lms-input-label" htmlFor="enrollmentStartDate">
                                Enrollment Start Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="enrollmentStartDate"
                                name="enrollmentStartDate"
                                placeholder="Enrollment Date"
                                onChange={onInputChange}
                                onKeyDown={(e) => e.preventDefault()}
                                value={schedule.enrollmentStartDate}
                                min={earliestEnrollment}
                            />
                            </div>
                            <div className="col-md-6">
                            <label className="lms-input-label" htmlFor="enrollmentEndDate">
                                Enrollment End Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="enrollmentEndDate"
                                name="enrollmentEndDate"
                                placeholder="Enrollment Date"
                                onChange={onInputChange}
                                onKeyDown={(e) => e.preventDefault()}
                                value={schedule.enrollmentEndDate}
                                disabled={!schedule.enrollmentStartDate || schedule.enrollmentStartDate === ""}
                                min={dayjs(schedule.enrollmentStartDate).add(1, 'days').format("YYYY-MM-DD")}
                            />
                            </div>
                        </div> */}

                        <div className="form-group row">
                            <div className="col-md-6">
                                <label className="lms-input-sublabel">Number of Sessions</label>
                                <input
                                    type="number"
                                    className="form-control sessionNumber"
                                    min="1"
                                    max="9"
                                    pattern="[0-9]{1}"
                                    name="sessionNumber"
                                    defaultValue={schedule.sessionNumber}
                                    onInput={onInputChange}
                                />
                                <div style={{fontSize: "12px"}}>
                                    Note: The minimum number of sessions is 1 and the maximum is 36
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="lms-input-sublabel">Timezone</label>
                                <TimezonePicker
                                    value={schedule.timezone}
                                    onChange={({ id }) => onTimeSelect(id, 'timezone')}
                                    size={SIZE.compact}
                                    overrides={{
                                        Select: {
                                            props: {
                                                overrides: {
                                                    ControlContainer:{
                                                        style: ({ $theme }) => ({
                                                            borderColor: `#ced4da!important`,
                                                            borderRadius: `0.25em!important`,
                                                            borderWidth: `thin!important`,
                                                            backgroundColor: $theme.colors.white,
                                                            minHeight: `38px`
                                                          }),
                                                    },
                                                    Input:{
                                                        style: ({ $theme }) => ({
                                                            cursor:`text`
                                                        })
                                                    },
                                                    InputContainer:{
                                                        style: ({ $theme }) => ({
                                                            cursor:`text`
                                                        })
                                                    },
                                                    ValueContainer:{
                                                        style: ({ $theme }) => ({
                                                            cursor:`pointer`
                                                        })
                                                    }
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label className="lms-input-sublabel">Minimum learners</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control number2"
                                    name="minLearners"
                                    defaultValue={schedule.minLearners}
                                    onInput={onInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="lms-input-sublabel">Maximum learners</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control number2"
                                    name="maxLearners"
                                    defaultValue={schedule.maxLearners}
                                    onInput={onInputChange}
                                />
                            </div>
                        </div>
                        
                    </div>    
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label className="lms-input-sublabel mr-4" forHtml="startTime">Start Time</label>
                                <select
                                    name="startTime"
                                    id="startTime"
                                    value={schedule.startTime}
                                    className="custom-select lms-portal-select"
                                    classNamePrefix="select"
                                    onChange={onInputChange}
                                >
                                    <option value=""></option>
                                    {TIME_OPTIONS.map((item)=>{
                                        return (
                                            <option value={item.value}>{item.label}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="lms-input-sublabel mr-4">End Time</label>
                                <select
                                    name="endTime"
                                    id="endTime"
                                    value={schedule.endTime}
                                    className="custom-select lms-portal-select"
                                    classNamePrefix="select"
                                    onChange={onInputChange}
                                >
                                    <option value=""></option>

                                    {TIME_OPTIONS.map((item)=>{
                                      return  (
                                            <option value={item.value}>{item.label}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <br></br>
                <div>
                    Please select the preferred dates for your class session/s
                </div>
                <div>
                    Selected days: <b>{selectedDates.length || 0}</b>
                </div>
                <FullCalendar
                    height={700}
                    aspectRatio={1.95}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    events={selectedDisplayDates}
                    ref={calendarRef}
                    initialView="dayGridMonth"
                    themeSystem={'bootstrap'}
                    nowIndicator={true}
                    dateClick={handleEventAdd}
                    eventClick={handleEventClick}
                    eventContent={customDisplay}
                    validRange={getValidRange} />
                <div style={{fontSize: "12px"}}>
                    Note: Unselect a date by clicking the date again.
                </div>
            </div>

            
        </>
    );
}

export default AddSchedule;