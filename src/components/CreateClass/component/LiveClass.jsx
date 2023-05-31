import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";
import React, { Component } from "react";
import AddSchedule from "./AddSchedule";

export default class LiveClass extends Component {
  state = {
    liveClassType: "onetime",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    enrollmentStartDate: "",
    enrollmentEndDate: "",
    minLearners: "",
    maxLearners: "",
    timezone: "Asia/Manila",
    error: "",
    dayAvailability: "",
    scheduleLength: " ",
    classUrl: "",
    availableDates: [],
    sessionNumber:""
  };

  componentDidMount() {
    const { schedules } = this.props;
    this.setState((prevState) => ({ ...prevState, ...schedules }))
  }

  onButtonClick = () => {
    this.props.nextButton(4, this.props.schedules, "CLT002");
  };

  render() {
    return (
      <div>
        <AddSchedule classDetails={this.props.classDetails} schedules={this.props.schedules} title={this.props.title} availableDates={this.props.availableDates} pushSchedule={this.props.addSchedule} />
    
        {/* <div className="mt-5">
          <button
            className="btn btn-info text-white"
            onClick={() => this.props.previousButton(2)}
          >
            Previous
          </button>
          <button
            className="btn btn-megna btn-outline-megna text-megna float-right"
            onClick={this.onButtonClick}
          >
            Next
          </button>
        </div> */}
      </div>
    );
  }
}
