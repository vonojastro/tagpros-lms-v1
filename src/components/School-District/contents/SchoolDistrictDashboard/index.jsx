import React, { Fragment, useEffect, useState } from 'react';
import { api } from "../../../../api";
import SchoolDistrictTeacherMasterlist from "../SchoolDistrictTeacherMasterlist";
import SchoolDistrictShortlist from "../SchoolDistrictShortlist";
import ForInterviewMasterlist from '../SchoolDistrictForInterview';
import SchoolDistrictFinalList from '../SchoolDistrictFinalList';


export default function SchoolDistrictDashboard() {

  const[teacherCount, setTeacher] = useState(0);
  const[shortlistCount, setShortlist] = useState(0);
  const[forInterviewCount, setForInterview] = useState(0);
  const[acceptedTeachersCount, setAcceptedTeachers] = useState(0);
  const[rejectedTeachersCount, setRejectedTeachers] = useState(0);
   useEffect(() => {
      api.get("/school-leader/dashboard").then((response)=>{
          setTeacher(response.data.countTeacher);
          setShortlist(response.data.countShortlist);
          setForInterview(response.data.countForInterview);
          setAcceptedTeachers(response.data.countAcceptedTeachers);
          setRejectedTeachers(response.data.countRejectedTeachers);
      }).catch((error)=>{
          console.log(error);
      });
   
   
  }, []);

  return (
    <Fragment>
      <div className="container-fluid" style={{ pointerEvents: "none" }}>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h2> {teacherCount} </h2>
                    <h6>Total Active Teachers</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h2>{shortlistCount}</h2>
                    <h6>Total Shortlisted Teachers</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h2>{forInterviewCount}</h2>
                    <h6>Total For Interview Teachers</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h2>{acceptedTeachersCount}</h2>
                    <h6>Total For Accepted Teachers</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h2>{rejectedTeachersCount}</h2>
                    <h6>Total For Rejected Teachers</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SchoolDistrictTeacherMasterlist source="dashboard" />
        <SchoolDistrictShortlist source="dashboard"/>
        <ForInterviewMasterlist source="dashboard"/>
        <SchoolDistrictFinalList source="dashboard"/>
      </div>
    </Fragment>
  );
  };