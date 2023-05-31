import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { NavLink } from "react-router-dom";

import { events } from "../../dummyData";

const Calendar = () => {
  return (
    <div className="container-fluid">
      {/* <!-- ============================================================== -->
        <!-- Start Page Content -->
        <!-- ============================================================== --> */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="">
              <div className="row">
                <div className="col-md-2">
                  <div className="card-body">
                    <h5 className="card-title m-t-10">Unscheduled Classes</h5>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div id="calendar-events" className="">
                          <div className="calendar-events" data-className="bg-info">
                            <i className="fa fa-circle text-info"></i> My Class One
                          </div>
                          <div className="calendar-events" data-className="bg-success">
                            <i className="fa fa-circle text-success"></i> My Class Two
                          </div>
                          <div className="calendar-events" data-className="bg-danger">
                            <i className="fa fa-circle text-danger"></i> My Class Three
                          </div>
                          <div className="calendar-events" data-className="bg-warning">
                            <i className="fa fa-circle text-warning"></i> My Class Four
                          </div>
                        </div>
                        {/* <!-- checkbox --> */}
                        <div className="checkbox m-t-20">
                          <input id="drop-remove" type="checkbox" />
                          <label for="drop-remove">Remove after drop</label>
                        </div>

                        <NavLink activeClassName="active" to="/createClass">
                          <button
                            href="/createClass"
                            data-toggle="modal"
                            data-target="#myModal"
                            className="btn btn-info text-white btn-block"
                          >
                            + Create New Class
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="card-body b-l calender-sidebar">
                    <FullCalendar
                      plugins={[dayGridPlugin, timeGridPlugin]}
                      initialView="dayGridMonth"
                      themeSystem="bootstrap"
                      headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                      }}
                      events={[events]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- BEGIN MODAL --> */}
      <div className="modal none-border" id="my-event">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>Add Event</strong>
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-white waves-effect"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success save-event waves-effect waves-light"
              >
                Create event
              </button>
              <button
                type="button"
                className="btn btn-danger delete-event waves-effect waves-light"
                data-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Add Category --> */}
      <div className="modal fade none-border" id="add-new-event">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>Add</strong> a category
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <label className="control-label">Category Name</label>
                    <input
                      className="form-control form-white"
                      placeholder="Enter name"
                      type="text"
                      name="category-name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Choose Category Color</label>
                    <select
                      className="form-control form-white"
                      data-placeholder="Choose a color..."
                      name="category-color"
                    >
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                      <option value="info">Info</option>
                      <option value="primary">Primary</option>
                      <option value="warning">Warning</option>
                      <option value="inverse">Inverse</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger waves-effect waves-light save-category"
                data-dismiss="modal"
              >
                Save
              </button>
              <a
                href="#/"
                type="button"
                className="btn btn-white waves-effect"
                data-dismiss="modal"
              >
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- END MODAL -->
        <!-- ============================================================== -->
        <!-- End PAge Content -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
       */}
    </div>
  );
};

export default Calendar;
