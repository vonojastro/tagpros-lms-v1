import React from "react";
import FullCalendar, { Fragment } from "@fullcalendar/react";
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";

class Calendar extends React.Component {

  state = { events: [] }

  componentDidMount() {
    const { newClass } = this.props.data;
    const { schedules, title } = newClass;
    const eventResult = this.getCalendarEvents(schedules, title);
    this.setState({ events: eventResult })
  }

  componentDidUpdate(prevProps) {
    const { data: { newClass: { schedules: newSchedules } } } = this.props;
    const { data: { newClass: { schedules: prevSchedules } } } = prevProps;

    if (newSchedules !== prevSchedules) {
      const { newClass } = this.props.data;
      const { schedules, title } = newClass;
      const eventResult = this.getCalendarEvents(schedules, title);
      this.setState({ events: eventResult })
    }


  }

  getCalendarEvents(schedules, title) {
    let eventData = [];
    let normalizedDays = [];

    if (!schedules || !title) {
      return []
    }

    const { startDate, endDate, startTime, endTime, dayAvailability } = schedules;

    if (!startDate || !endDate || !dayAvailability) {
      return [];
    }

    const normalizedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const normalizedEndDate = dayjs(endDate).format('YYYY-MM-DD');

    if (typeof dayAvailability === 'string' && dayAvailability === 'everyday') {
      return [{ title: `${title} - (${startTime} - ${endTime})`, start: normalizedStartDate, end: dayjs(normalizedEndDate).add(1, 'day').format('YYYY-MM-DD'), customRender: true }]
    }

    if (Array.isArray(dayAvailability) && !dayAvailability.length) {
      return [{ title: `${title} - (${startTime} - ${endTime})`, start: normalizedStartDate, end: dayjs(normalizedEndDate).add(1, 'day').format('YYYY-MM-DD'), customRender: true }]
    }

    if (typeof dayAvailability === 'string' && dayAvailability !== 'everyday') {
      normalizedDays = dayAvailability.split(',').map(data => data.toUpperCase());
    }

    if (dayAvailability && Array.isArray(dayAvailability)) {
      normalizedDays = dayAvailability.map(data => data.value.toUpperCase());
    }

    let currentDate = dayjs(normalizedStartDate);
    while (currentDate <= dayjs(normalizedEndDate)) {
      const currentDay = dayjs(currentDate).format('dddd').toString().toUpperCase();
      if (normalizedDays.includes(currentDay)) {
        const selectedDate = dayjs(currentDate).format('YYYY-MM-DD');
        eventData.push({ title: `${title} - (${startTime} - ${endTime})`, start: selectedDate, end: selectedDate, customRender: true });
      }
      currentDate = dayjs(currentDate).add(1, 'day');
    }

    return eventData;

  }

  customDisplay = ({ event, el }) => {
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 50, hide: 200 }}
        overlay={<Tooltip>{event.title}</Tooltip>}
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

  render() {
    const { events } = this.state;
    return (
      <Fragment>
        <FullCalendar
          height={700}
          aspectRatio={1.95}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          nowIndicator={true}
          eventContent={this.customDisplay}
        />
      </Fragment>
    );
  }
}

export default Calendar;
