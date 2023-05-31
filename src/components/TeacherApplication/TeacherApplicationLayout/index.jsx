import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import { getTeacherApplication } from "api/teacher";

// import { getCheckBoxState, isFormSegementAccomplished } from "../../../utils/teacherApplication";
// import {
//   GROUP_0_FIELD_NAMES,
//   GROUP_1_FIELD_NAMES,
//   GROUP_2_FIELD_NAMES,
//   GROUP_3_FIELD_NAMES,
//   GROUP_4_FIELD_NAMES,
// } from "../fields";

const Item = ({ to, label, isAccomplished, isPreviousAccomplished }) => {
  const currPath = useLocation().pathname;

  const navigate = useNavigate();

  let classes = "list-group-item";
  if (currPath === to) classes = `${classes} active`;

  return (
    <div
      onClick={() => (isPreviousAccomplished ? navigate(to, { replace: true }) : null)}
      className={classes}
      style={{ cursor: isPreviousAccomplished ? "pointer" : "not-allowed" }}
    >
      {label}
      <div
        style={{
          height: 10,
          width: 10,
          background: isAccomplished ? "#A2CD3D" : "#F59C1E",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: 13,
          borderRadius: "50%",
          opacity: isPreviousAccomplished ? 1 : 0.2,
        }}
      />
    </div>
  );
};
Item.propTypes = { to: PropTypes.string, label: PropTypes.string };

function TeacherApplicationLayout() {
  // const data = useSelector((state) => state.teacherApp.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const application = useSelector((state) => state.teacher ? state.teacher.getIn(['applications', 'application']) : {});

  React.useEffect(() => {
    getTeacherApplication(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      label: "Before we Begin",
      route: "",
      isPreviousAccomplished: true,
      isAccomplished: application.applicationStatus,
    },
    {
      label: "About Tagpros",
      route: "/step-1",
      isPreviousAccomplished: application.applicationStatus,
      isAccomplished: application.watchedVideo,
    },
    {
      label: "Personal Details",
      route: "/step-2",
      isPreviousAccomplished: application.watchedVideo,
      isAccomplished: application.professionalTitle,
    },
    {
      label: "About Your Classes",
      route: "/step-3",
      isPreviousAccomplished: application.professionalTitle,
      isAccomplished: application.classTopics && application.classDescription,
    },
    {
      label: "Sample Classes",
      route: "/step-4",
      isPreviousAccomplished: application.classTopics && application.classDescription ,
      isAccomplished: true,
    },
    {
      label: "Review Policies",
      route: "/step-5",
      isPreviousAccomplished: application.classSampleVid,
      isAccomplished: application.agreeTerms,
    },
  ];

  const teacherApp = useSelector((state) => {
    return state.teacherApp.data;
  });

  React.useEffect(() => {
    if(teacherApp.applicationStatus === "ASTAT008") navigate("/", { replace: true });
  });

  if (parseInt(teacherApp.applicationStatus) === "ASTAT001")
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        <div className="card p-10 px-4" style={{ width: 400 }}>
          <span className="font-20 text-center">
            <span className="font-weight-bold" style={{ color: "#F5931F" }}>
              PENDING
            </span>
          </span>
          <hr />

          <p>Thank you for your interest in working with Tagpros!</p>
          <p>We ask for your patience as we carefully evaluate your application.</p>
        </div>
      </div>
    );
  return (
    <div className="row">
      <div className="col-md-2 p-20">
        <h4 className="card-title">Steps for Application</h4>
        <ul className="list-group list-group-flush">
          {items.map(({ label, route, isAccomplished, isPreviousAccomplished }) => (
            <Item
              to={"/application" + route}
              label={label}
              isAccomplished={isAccomplished}
              key={route}
              route={route}
              isPreviousAccomplished={isPreviousAccomplished}
            />
          ))}
        </ul>
      </div>

      <div className="col-md-10 p-20">
        <div className="card p-20">
          <div className="card-body ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherApplicationLayout;
