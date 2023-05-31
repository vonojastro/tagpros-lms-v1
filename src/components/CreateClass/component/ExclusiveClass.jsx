import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import AddSchedule from './AddSchedule'
export default class ExclusiveClass extends Component {
  state = {
    classType: "onetime",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    minLearners: "",
    maxLearners: "",
    timezone: "Asia/Manila",
    error: "",
    dayAvailability: "",
    scheduleLength: "",
    isChanged: false,
    email: ""
  };

  componentDidMount() {
    const { schedules } = this.props;
    this.setState((prevState) => ({ ...prevState, ...schedules }))
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, isChanged: true });
  };


  addToEmails = () => {
    const { email } = this.state;
    if (email) {
      this.props.addEmail(email);
      this.setState({ email: "" });
    }
  };

  removeFromEmails = (key) => {
    this.props.removeEmail(key);
  };

  render() {
    return (
      <div>
        <hr />
        {/* Email list */}
        <div className="mt-4">
          <h5>Emails</h5>
          <br />
          {this.props.addedEmails && this.props.addedEmails.length > 0 ? (
            this.props.addedEmails.map((item, index) => (
              <div key={index} className="row mb-4">
                <div className="col-md-4">{item}</div>
                <div className="col-md-2">
                  <span
                    className="lms-text-red clickable"
                    onClick={() => this.removeFromEmails(index)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            ))
          ) : (
            <span>No emails added</span>
          )}
        </div>
        <hr />
        {/* Email adder */}
        <div>
          <div className="form-row align-items-end">
            <div className="col-md-6">
              <label className="lms-input-label" htmlFor="classUrl">
                Add student
              </label>
              <br />
              <label className="lms-input-sublabel">
                Use the email of the student's parent
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Type the email address here..."
                name="email"
                value={this.state.email}
                onChange={this.onInputChange}
              />
            </div>
            <div className="col-md-3 pb-1">
              <button
                className="btn lms-btn lms-btn-gradient"
                type="button"
                onClick={this.addToEmails}
              >
                <FontAwesomeIcon icon="plus"></FontAwesomeIcon> Add
              </button>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div>
          <AddSchedule schedules={this.props.schedules} pushSchedule={this.props.addSchedule} />
        </div>
        <div className="mt-5">
          <button
            className="lms-btn lms-btn-dblue"
            onClick={() => this.props.previousButton(2)}
          >
            Previous
          </button>
          <button
            className="lms-btn lms-btn-dblue float-right"
            onClick={() => this.props.nextButton(4, this.props.schedules, "exclusive")}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
