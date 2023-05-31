import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function SchoolDistrictContentHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const { firstName, lastName } = useSelector((state) => state.auth.user ? state.auth.user : {});
  const headerContent = {
    "/school-leader": (
      <Fragment>
        <div className="col-md-5 align-self-center">
          <h3 className="text-themecolor">Welcome, {(firstName || "") + " " + (lastName || "")}!</h3>
        </div>
        <div className="col-md-7 align-self-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!">Home</a>
            </li>
            <li className="breadcrumb-item active d-flex align-items-center">My Dashboard</li>
          </ol>
        </div>
      </Fragment>
    ),
    "/school-leader/teacher-masterlist": (
      <Fragment>
        <div className="col-md-5 align-self-center">
          <h3 className="text-themecolor">Teacher Masterlist</h3>
        </div>
        <div className="col-md-7 align-self-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!">Home</a>
            </li>
            <li className="breadcrumb-item active d-flex align-items-center">Teacher Masterlist</li>
          </ol>
        </div>
      </Fragment>
    ),
    "/school-leader/for-interview": (
      <Fragment>
        <div className="col-md-5 align-self-center">
          <h3 className="text-themecolor">For Interview</h3>
        </div>
        <div className="col-md-7 align-self-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!">Home</a>
            </li>
            <li className="breadcrumb-item active d-flex align-items-center">For Interview</li>
          </ol>
        </div>
      </Fragment>
    ),
    "/school-leader/shortlist": (
      <Fragment>
        <div className="col-md-5 align-self-center">
          <h3 className="text-themecolor">Shortlist</h3>
        </div>
        <div className="col-md-7 align-self-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!">Home</a>
            </li>
            <li className="breadcrumb-item active d-flex align-items-center">Shortlist</li>
          </ol>
        </div>
      </Fragment>
    ),
    "/school-leader/teachers-final-list": (
      <Fragment>
        <div className="col-md-5 align-self-center">
          <h3 className="text-themecolor">Teacher Final List</h3>
        </div>
        <div className="col-md-7 align-self-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!">Home</a>
            </li>
            <li className="breadcrumb-item active d-flex align-items-center">Teacher Final List</li>
          </ol>
        </div>
      </Fragment>
    ),
  };

  return <div className="row page-titles" style={{marginTop: '60px'}}>{headerContent[pathname]}</div>;
}
