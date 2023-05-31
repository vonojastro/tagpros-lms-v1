import React from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import StudentsTable from "../common/StudentsTable";

const LeaernerList = () => {
  return (
    <div className="main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        {/* <!-- ============================================================== -->
            <!-- Bread crumb and right sidebar toggle -->
            <!-- ============================================================== --> */}
        <div className="row page-titles" style={{marginTop: "60px"}}>
          <div className="col-md-5 align-self-center">
            <h3 className="text-themecolor">My Students</h3>
          </div>
          <div className="col-md-7 align-self-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="javascript:void(0)">Home</a>
              </li>
              <li className="breadcrumb-item">Tools</li>
              <li className="breadcrumb-item active">My Students</li>
            </ol>
          </div>
          <div className="">
            <button className="right-side-toggle waves-effect waves-light btn-inverse btn btn-circle btn-sm pull-right m-l-10">
              <i className="ti-settings text-white"></i>
            </button>
          </div>
        </div>
        {/* <!-- ============================================================== -->
            <!-- End Bread crumb and right sidebar toggle -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== --> */}
        <div className="container-fluid">
          {/* <!-- ============================================================== -->
                <!-- Start Page Content -->
                <!-- ============================================================== --> */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* <!-- .left-right-aside-column--> */}
                <div className="contact-page-aside">
                  {/* <!-- .left-aside-column--> */}
                  <div className="left-aside bg-light-part">
                    <ul className="list-style-none">
                      <li className="box-label">
                        <a href="javascript:void(0)">
                          All Students <span>123</span>
                        </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <a href="javascript:void(0)">
                          Grade School <span>103</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          Junior High <span>19</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          Senior High <span>623</span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          All High School <span>53</span>
                        </a>
                      </li>
                      <li className="divider"></li>
                      <li className="box-label m-t-20">
                        {/* <a
                          href="javascript:void(0)"
                          data-toggle="modal"
                          data-target="#myModal"
                          className="btn btn-info text-white"
                        >
                          + Add New Student
                        </a> */}
                      </li>
                      <div
                        id="myModal"
                        className="modal fade in"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="myModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title" id="myModalLabel">
                                Add Lable
                              </h4>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                              >
                                ×
                              </button>
                            </div>
                            <div className="modal-body">
                              <from className="form-horizontal">
                                <div className="form-group">
                                  <label className="col-md-12">
                                    Name of Label
                                  </label>
                                  <div className="col-md-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="type name"
                                    />{" "}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label className="col-md-12">
                                    Select Number of people
                                  </label>
                                  <div className="col-md-12">
                                    <select className="form-control">
                                      <option>All Students</option>
                                      <option>10</option>
                                      <option>20</option>
                                      <option>30</option>
                                      <option>40</option>
                                      <option>Custome</option>
                                    </select>
                                  </div>
                                </div>
                              </from>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-info waves-effect"
                                data-dismiss="modal"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-default waves-effect"
                                data-dismiss="modal"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                          {/* <!-- /.modal-content --> */}
                        </div>
                        {/* <!-- /.modal-dialog --> */}
                      </div>
                    </ul>
                  </div>
                  {/* <!-- /.left-aside-column--> */}
                  <div className="right-aside ">
                    <div className="right-page-header">
                      <div className="d-flex">
                        <div className="align-self-center">
                          <h4 className="card-title m-t-10">Student List </h4>
                        </div>
                        <div className="ml-auto">
                          <i className="mdi mdi-magnify font-14"></i>
                          <input
                            type="text"
                            id="demo-input-search2"
                            placeholder="Search Students"
                            className="form-control"
                            style={{ width: "90%" }}
                          />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table
                        id="demo-foo-addrow"
                        className="table m-t-30 table-hover no-wrap contact-list"
                        data-page-size="10"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Grade Level</th>
                            <th>Age</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <StudentsTable />
                        <tfoot>
                          <tr>
                            <td colspan="2"></td>
                            <div
                              id="add-contact"
                              className="modal fade in"
                              tabindex="-1"
                              role="dialog"
                              aria-labelledby="myModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4
                                      className="modal-title"
                                      id="myModalLabel"
                                    >
                                      Add New Contact
                                    </h4>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-hidden="true"
                                    >
                                      ×
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <from className="form-horizontal form-material">
                                      <div className="form-group">
                                        <div className="col-md-12 m-b-20">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Type name"
                                          />{" "}
                                        </div>
                                        <div className="col-md-12 m-b-20">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                          />{" "}
                                        </div>
                                        <div className="col-md-12 m-b-20">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Phone"
                                          />{" "}
                                        </div>
                                        <div className="col-md-12 m-b-20">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Designation"
                                          />{" "}
                                        </div>
                                        <div className="col-md-12 m-b-20">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Age"
                                          />{" "}
                                        </div>
                                        <div className="col-md-12 m-b-20">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Date of joining"
                                          />{" "}
                                        </div>
                                        <div className="col-md-12 m-b-20">
                                          <div className="fileupload btn btn-danger btn-rounded waves-effect waves-light">
                                            <span>
                                              <i className="ion-upload m-r-5"></i>
                                              Upload Contact Image
                                            </span>
                                            <input
                                              type="file"
                                              className="upload"
                                            />{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </from>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-info waves-effect"
                                      data-dismiss="modal"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-default waves-effect"
                                      data-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                                {/* <!-- /.modal-content --> */}
                              </div>
                              {/* <!-- /.modal-dialog --> */}
                            </div>
                            <td colspan="7">
                              <div className="text-right">
                                <ul className="pagination"> </ul>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    {/* <!-- .left-aside-column--> */}
                  </div>
                  {/* <!-- /.left-right-aside-column--> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- ============================================================== -->
                <!-- End PAge Content -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- Right sidebar -->
                <!-- ============================================================== -->
                <!-- .right-sidebar --> */}
          <div className="right-sidebar">
            <div className="slimscrollright">
              <div className="rpanel-title">
                {" "}
                Service Panel{" "}
                <span>
                  <i className="ti-close right-side-toggle"></i>
                </span>{" "}
              </div>
              <div className="r-panel-body">
                <ul id="themecolors" className="m-t-20">
                  <li>
                    <b>With Light sidebar</b>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="default"
                      className="default-theme"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="green"
                      className="green-theme"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="red"
                      className="red-theme"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="blue"
                      className="blue-theme working"
                    >
                      4
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="purple"
                      className="purple-theme"
                    >
                      5
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="megna"
                      className="megna-theme"
                    >
                      6
                    </a>
                  </li>
                  <li className="d-block m-t-30">
                    <b>With Dark sidebar</b>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="default-dark"
                      className="default-dark-theme"
                    >
                      7
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="green-dark"
                      className="green-dark-theme"
                    >
                      8
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="red-dark"
                      className="red-dark-theme"
                    >
                      9
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="blue-dark"
                      className="blue-dark-theme"
                    >
                      10
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="purple-dark"
                      className="purple-dark-theme"
                    >
                      11
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-theme="megna-dark"
                      className="megna-dark-theme "
                    >
                      12
                    </a>
                  </li>
                </ul>
                <ul className="m-t-20 chatonline">
                  <li>
                    <b>Chat option</b>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/1.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        Varun Dhavan{" "}
                        <small className="text-success">online</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/2.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        Genelia Deshmukh{" "}
                        <small className="text-warning">Away</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/3.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        Ritesh Deshmukh{" "}
                        <small className="text-danger">Busy</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/4.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        Arijit Sinh{" "}
                        <small className="text-muted">Offline</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/5.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        Govinda Star{" "}
                        <small className="text-success">online</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/6.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        John Abraham
                        <small className="text-success">online</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/7.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        Hritik Roshan
                        <small className="text-success">online</small>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        src="./assets/images/users/8.jpg"
                        alt="user-img"
                        className="img-circle"
                      />{" "}
                      <span>
                        Pwandeep rajan{" "}
                        <small className="text-success">online</small>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- ============================================================== -->
                <!-- End Right sidebar -->
                <!-- ============================================================== --> */}
        </div>
        {/* <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== --> */}
        <Footer />
        {/* <!-- ============================================================== -->
            <!-- End footer -->
            <!-- ============================================================== --> */}
      </div>
    </div>
  );
};

export default LeaernerList;
