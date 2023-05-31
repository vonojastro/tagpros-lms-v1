import React, { Fragment, useEffect, useState } from 'react';
import { api } from "../../../../api";
import TeacherMasterList from '../TeacherMasterlist';
import ClassMasterList from '../ClassMasterlist';

export default function AdminDashboard() {
  const [statistics, setDashboard] = useState({});
  //const [teachers, setTeacherList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const stat = (await api.get("/admin/dashboard"));
      setDashboard(stat.data);
      // const teach = (await api.get("/teacher/all"));
      // setTeacherList(teach.data);
    }
    fetchData();
  }, []);


  return (
    <Fragment>
      <div className="container-fluid" style={{ pointerEvents: "none" }}>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                {/* <!-- Row --> */}
                <div className="row">
                  <div className="col-8">
                    <h2> {statistics["TEACHER"]|| 0} </h2>
                    <h6>Total Active Teachers</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                {/* <!-- Row --> */}
                <div className="row">
                  <div className="col-8">
                    <h2> { statistics["FAMILY"] || 0 } </h2>
                    <h6>Total Active Parents</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                {/* <!-- Row --> */}
                <div className="row">
                  <div className="col-8">
                    <h2> { statistics["LEARNER"] || 0 } </h2>
                    <h6>Total Active Learners</h6>
                  </div>
                  <div className="col-4 align-self-center text-right  p-l-0">
                    <div id="sparklinedash3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                {/* <!-- Row --> */}
                <div className="row">
                  <div className="col-8">
                    <h2> {statistics["ENROLLMENT"] || 0} </h2>
                    <h6>Total Class Enrollments</h6>
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
        <TeacherMasterList source="dashboard"/>
        <ClassMasterList source="dashboard"/>
      </div>
    </Fragment>
  );
};

