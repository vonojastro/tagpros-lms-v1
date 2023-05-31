import { getTeacherApplication } from "api/teacher";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APPLICATION_STATUS } from "utils/constants";
import moment from 'moment-timezone';

export default function TeacherApplicationStatus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const application = useSelector((state) => state.teacher ? state.teacher.getIn(['applications', 'application']) : {});

  React.useEffect(() => {
    getTeacherApplication(dispatch)
    if (application && application.applicationStatus === "ASTAT008") navigate("/", { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValue = (value) => {
    let stat = Object.keys(APPLICATION_STATUS).find(key => APPLICATION_STATUS[key] === value);

    switch (stat) {
      case 'APPROVEDHR': stat = 'PENDING'; break;
      case 'APPROVEDEDUC': stat = 'APPROVED'; break;
      default:
    }

    return stat;
  }

  const getDate = (value) => {
    return moment.utc(value, 'YYYY/MM/DD - hh:mm A').tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Manila').format('YYYY/MM/DD - hh:mm A');
  }

  const getBadge = (key) => {
    switch (key) {
      case APPLICATION_STATUS.DRAFT:
        return "badge-info"
      case APPLICATION_STATUS.PENDING:
      case APPLICATION_STATUS.APPROVEDHR:
        return "badge-primary"
      case APPLICATION_STATUS.APPROVEDEDUC:
        return "badge-success"
      case APPLICATION_STATUS.REJECTED:
        return "badge-danger"
      case APPLICATION_STATUS.RETURNED:
      case APPLICATION_STATUS.DELETE:
        return "badge-warning"
      case APPLICATION_STATUS.CANCELLED:
        return "badge-secondary"
      default:
        return "badge-primary"
    }
  }

  return (
    <div>
      {application && application.applicationStatus ?
        <div className="row">
          <div className="col-md-2 p-20">
            <h4 className="card-title">Application Summary</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Application No. {application ? application.id : ""}</li>
              <li className="list-group-item">
                Date Created
                <br />
                <small>{application ? getDate(application.createdDatetime) : ""}</small>
              </li>
              <li className="list-group-item">
                Date of Submission
                <br />
                <small>{application ? getDate(application.updatedDatetime) : ""}</small>
              </li>
              <li className="list-group-item">
                Status
                <br />
                <div class={"badge " + getBadge(application ? application.applicationStatus : "")}>{getValue(application ? application.applicationStatus : "")}</div>
              </li>
              <li className="list-group-item">
                Final Result
                <br />
                <div class={"badge " + getBadge(application ? application.applicationStatus : "")}>{getValue(application ? application.applicationStatus : "")}</div>
              </li>
              <li className="list-group-item">
                Last Updated<br />
                <small>
                  <small>{application ? getDate(application.updatedDatetime) : ""}</small>
                </small>
              </li>
            </ul>
          </div>

          <div className="col-md-10 p-20">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  Your Application Was Received On: {application ? getDate(application.createdDatetime) : ""}
                </h4>
                {/* <h6 className="card-subtitle"></h6> */}
                <div id="accordion1" role="tablist" aria-multiselectable="true">
                  <div className="card m-b-0">
                    <div className="card-header" role="tab" id="headingOne1">
                      <h5 className="mb-0">
                        <a
                          className="link"
                          data-toggle="collapse"
                          data-parent="#accordion1"
                          href="#collapseOne1"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Personal Details
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseOne1"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="headingOne1"
                    >
                      <div className="card-body">
                        {application ? application.teacherAchievement : ""}
                      </div>
                    </div>
                  </div>
                  <div className="card m-b-0">
                    <div className="card-header" role="tab" id="headingTwo2">
                      <h5 className="mb-0">
                        <a
                          className="link"
                          data-toggle="collapse"
                          data-parent="#accordion1"
                          href="#collapseTwo2"
                          aria-expanded="true"
                          aria-controls="collapseTwo2"
                        >
                          About Your Classes
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo2"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="headingTwo2"
                    >
                      <div className="card-body">
                        {application ? application.classDescription : ""}
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingThree3">
                      <h5 className="mb-0">
                        <a
                          className="collapsed link"
                          data-toggle="collapse"
                          data-parent="#accordion1"
                          href="#collapseThree3"
                          aria-expanded="false"
                          aria-controls="collapseThree3"
                        >
                          Sample Classes
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseThree3"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree3"
                    >
                      <div className="card-body">
                        {application ? application.classTopics : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="col-12 text-center">
          <img
            src="/assets/images/tarsier-v2a.png"
            style={{ width: "180px", height: "180px" }}
            alt="mascot"
          />
          <h3>Uh oh!Looks like you haven't applied as a teacher yet.</h3>
            <a href="/application" className="btn btn-info">
              Apply as a Teacher
            </a>
        </div>
      }
    </div>
  );
}
