/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_LEARNERS_SORT_BASIS } from "../../../../utils/constants/index";
import Avatar from "../../../common/Avatar/index";
import { getS3Url } from "utils/teacherApplication";
import LearnerContentLoader from "../../../LearnerContentLoader";
import _ from "lodash";
import LearnerInfoModal from "../../../LearnerInfoModal/index";
import "./index.css";
import { fetchLearnerSchedules } from "redux/actions/learnersSchedules";
import { useNavigate } from "react-router-dom";

const NoClassesAddedView = ({ learner }) => (
  <div className="tab-content br-n pb-3">
    <div id="navtabs-3" className="tab-pane active">
      <div className="tab-content br-n pn">
        <div className="px-3 mt-4 row">
          <div className="col-xs-12 offset-md-2 col-md-8 text-center">
            <img
              alt="tarsier"
              src="../assets/images/tarsier-v2a.png"
              style={{ width: "180px", height: "180px" }}
            />
            <h3>Looks like you haven't added any classes for {learner.nickname} yet.</h3>
            {/* <button
              type="button"
              className="btn btn-megna"
              data-dismiss="modal"
              // style={{ pointerEvents: "none" }}
            >
              <i className="fa fa-plus" /> Add Classes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);
function parseDaytime(time) {
  let [hours, minutes] = time
    .substr(0, time.length - 2)
    .split(":")
    .map(Number);
  if (time.includes("pm") && hours !== 12) hours += 12;
  return 1000 /*ms*/ * 60 /*s*/ * (hours * 60 + minutes);
}
const LearnerSchedules = ({ learner }) => {
  const learnersSchedules = useSelector((state) => state.learnersSchedules.data);
  const [sortMode, setSortMode] = useState("date"); // date, subject, teacher

  const handleChangeSortMode = (e) => setSortMode(e.currentTarget.value);

  const getSortedSchedules = () =>
    _.sortBy(
      learnersSchedules[learner.id],
      sortMode === "date"
        ? [
            ({ startDate, startTime }) => {
              // https://stackoverflow.com/questions/48581349/how-to-set-time-with-am-pm-in-javascript-date-object
              const d = new Date(
                +new Date(startDate) + parseDaytime(_.toLower(_.trim(startTime)))
              );
              return d.getTime();
            },
          ]
        : sortMode === "subject"
        ? ["title"]
        : sortMode === "teacher"
        ? ["fullName"]
        : [""]
    );

  const isLoaded =
    learnersSchedules[learner.id] && learnersSchedules[learner.id].length >= 0;
  
  const navigate = useNavigate()

  const handleClickEnrolledClass = (classId) => navigate(`class/view/${classId}`);

  if (isLoaded && learnersSchedules[learner.id].length === 0)
    return <NoClassesAddedView learner={learner} />;
  return isLoaded ? (
    <div id="navtabs-1" className="tab-pane active">
      <div className="mt-4 row">
        <div className="col-6 col-lg-8">
          <h4>
            <i className="fa fa-book mr-2" />
            My Classes
          </h4>
        </div>
        <div className="col-6 col-lg-4 text-right">
          <ul
            className="nav justify-content-end customtab2"
            style={{ display: "inline-flex !important" }}
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#navtabs-inner-1a"
                role="tab"
                aria-selected="true"
              >
                <i className="fa fa-th" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#navtabs-inner-1b"
                role="tab"
                aria-selected="false"
              >
                <i className="fa fa-list" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content" id="schedViewTab">
        {/* GRID VIEW */}
        <div id="navtabs-inner-1a" className="tab-pane active">
          <ScrollContainer
            className="mt-4 row"
            style={{ width: "100%", maxHeight: 400 }}
            hideScrollbars={false}
          >
            {getSortedSchedules().map(
              ({ title, startDate, startTime, fullName, thumbnailImage, classId, jitsiLink, availableDates }) => (
                <div className="col-12 col-md-3" onClick={()=>handleClickEnrolledClass(classId)}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      style={{ width: "100%", height: "7vw", objectFit: "cover" }}
                      src={thumbnailImage}
                      alt="Card"
                    />
                    <div className="card-body p-3">
                      <div className="card-text pb-5">
                        <h4>{title}</h4>
                        <small>by {fullName}</small>
                        <br />
                        <small>
                          {startDate ? moment(new Date(startDate)).format("MMM. D, YYYY") : moment(availableDates[0]).format("MMM. D, YYYY")} at{" "}
                          {startTime}
                        </small>
                        <small>
                        <br />
                        <a href={jitsiLink}>
                                  <img height={30}
                                    src="/assets/images/jitsi-icon.png"
                                    alt="..."
                                  />
                                </a>
                        </small>
                        {/* <div
                        style={{ position: "absolute", right: "0.75em", bottom: "0.5em" }}
                      >
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-original-title="Confirm"
                          aria-describedby="tooltip480078"
                        >
                          <i className="fa fa-check m-r-10 text-megna" />
                        </a>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-original-title="Cancel"
                          aria-describedby="tooltip54382"
                        >
                          <i className="fa fa-close text-danger" />
                        </a>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </ScrollContainer>
        </div>
        {/* LIST VIEW */}
        <div id="navtabs-inner-1b" className="tab-pane">
          <div className="table-responsive mt-1">
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Teacher</th>
                  <th>Date</th>
                  <th>Class Link</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {getSortedSchedules().map(({ fullName, title, startDate, startTime, jitsiLink, availableDates }) => (
                  <tr>
                    <td>
                      <a href="javascript:void(0)">{title}</a>
                    </td>
                    <td>{fullName}</td>
                    <td>
                      <span className="text-muted ">
                        <i className="fa fa-clock-o mr-2" />
                        {startDate ? moment(new Date(startDate)).format("MMM. D, YYYY") : moment(availableDates[0]).format("MMM. D, YYYY")} at{" "}
                        {startTime}
                      </span>{" "}
                    </td>
                    <td>
                    <a href={jitsiLink}>
                                  <img height={30}
                                    src="/assets/images/jitsi-icon.png"
                                    alt="..."
                                  />
                                </a>
                    </td>
                    <td>
                      <div className="label label-table label-success">Confirmed</div>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row" hidden="true">
        <div className="col-6 col-lg-8">
          {/* <button
            type="button"
            className="btn btn-megna btn-outline-megna text-megna mr-2"
            data-dismiss="modal"
          >
            <i className="fa fa-plus" />{" "}
            <span className="hidden-md-down">Add Classes</span>
          </button> */}
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            <i className="fa fa-calendar" />{" "}
            <span className="hidden-md-down">View Calendar</span>
          </button>
        </div>
        <div className="col-6 col-lg-4 text-right">
          <select className="custom-select mr-2" onChange={handleChangeSortMode}>
            <option value="date" selected>
              Arrange by Time &amp; Date
            </option>
            <option value="subject">By Subject</option>
            <option value="teacher">By Teacher</option>
          </select>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        minHeight: 507,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="spinner-border " role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default function MyLearnersSchedules() {
  const learners = useSelector((state) => state.learners);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const dispatch = useDispatch();
  const handleClickLearner = (learner) => {
    setSelectedLearner(learner);
    dispatch(fetchLearnerSchedules({ id: learner.id }));
  };

  return (
    <div className="card card-default learner-ui">
      <div className="card-header">
        {/* <div className="card-actions">
          <a className data-action="collapse">
            <i className="ti-minus" />
          </a>
          <a className="btn-minimize" data-action="expand">
            <i className="mdi mdi-arrow-expand" />
          </a>
          <a className="btn-close" data-action="close">
            <i className="ti-close" />
          </a>
        </div> */}
        <h4 className="card-title m-b-0">
          My Learners' Schedules{" "}
          {learners.success && !learners.data.length && "- No Learners Added"}
        </h4>
      </div>
      <div className="card-body collapse show py-2">
        <div className="row">
          <div className="col-xs-12 col-md-9">
            <ul className="nav customtab2 learners__list__container">
              {!learners.loading &&
                learners.success &&
                _.sortBy(learners.data, SHOW_LEARNERS_SORT_BASIS).map((learner) => (
                  <li
                    onClick={() => handleClickLearner(learner)}
                    className={``}
                    key={learner.nickname}
                    style={{ cursor: "pointer" }}
                  >
                    <a className="nav-link" data-toggle="tab">
                      <Avatar
                        left={
                          <img
                            src={getS3Url(learner.photo)}
                            alt={learner.nickname}
                            class="profile-pic mr-2"
                            height={30}
                            width={30}
                            style={{ objectFit: "cover", objectPosition: "center" }}
                          />
                        }
                        right={<span>{learner.nickname}</span>}
                        key={learner.nickname}
                      />
                    </a>
                  </li>
                ))}
              {learners.loading &&
                new Array(learners.data.length ? learners.data.length : 1)
                  .slice(0, 1000)
                  .fill({})
                  .map(() => (
                    <li className="nav-item mr-2">
                      <a className="nav-link" data-toggle="tab">
                        <LearnerContentLoader />
                      </a>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="col-xs-12 col-md-3 text-right text-sm-left text-md-right">
            <LearnerInfoModal
              trigger={
                <button
                  type="button"
                  className="btn btn-megna btn-outline-megna text-megna"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="fa fa-plus" /> Add Learner
                </button>
              }
              mode="add"
            />
          </div>
        </div>
        <div className="dropdown-divider" />
        {/* {selectedLearner && <} */}
        {selectedLearner && <LearnerSchedules learner={selectedLearner} />}
      </div>
    </div>
  );
}
