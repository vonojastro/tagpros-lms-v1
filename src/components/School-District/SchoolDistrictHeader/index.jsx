import { useSelector } from "react-redux";
import LogoutButton from "components/LogoutButton";
import DefaultPic from "../../../img/default-pic-blue1.png"

export default function SchoolDistrictHeader() {

  const { firstName, lastName, email, photo } = useSelector((state) => state.auth.user ? state.auth.user : {});

  return (
    <header className="topbar"
    style={{ position: "fixed", top: "0px", width: "inherit" }}>

      <nav className="navbar top-navbar navbar-expand-md navbar-light" style={{background: "#455a64"}}>
        
        <div className="navbar-header">
          
          <a href="/" className="navbar-brand">
            <b>
              <img
                src="./assets/images/logo-icon.png"
                alt="homepage"
                className="dark-logo"
              />
              <img
                src="./assets/images/logo-light-icon.png"
                alt="homepage"
                className="light-logo"
              />
            </b>
            <span>
              <img
                src="./assets/images/logo-text.png"
                alt="homepage"
                className="dark-logo"
              />

              <img
                src="./assets/images/logo-light-text.png"
                className="light-logo"
                alt="homepage"
              />
            </span>{" "}
          </a>
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto mt-md-0">
            <li className="nav-item">
              {" "}
              <a
                className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark"
                href="#!"
              >
                <i className="mdi mdi-menu"></i>
              </a>{" "}
            </li>
            <li className="nav-item m-l-10">
              {" "}
              {/* <a
                className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"
                href="#!"
              >
                <i className="ti-menu"></i>
              </a>{" "} */}
            </li>
          </ul>
          <ul className="navbar-nav my-lg-0">
            <li className="nav-item hidden-sm-down search-box" style={{display: 'none'}}>
              {" "}
              <a
                className="nav-link hidden-sm-down text-muted waves-effect waves-dark"
                href="#!"
              >
                <i className="ti-search"></i>
              </a>
              <form className="app-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search & enter"
                />{" "}
                <a href="#!" className="srh-btn">
                  <i className="ti-close"></i>
                </a>{" "}
              </form>
            </li>
            <li className="nav-item dropdown" style={{display: 'none'}}>
              <a
                className="nav-link dropdown-toggle text-muted text-muted waves-effect waves-dark"
                href="/"
                data-toggle="dropdown"
                // aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="mdi mdi-message"></i>
                <div className="notify">
                  {" "}
                  <span className="heartbit"></span>{" "}
                  <span className="point"></span>{" "}
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right mailbox animated scale-up">
                <ul>
                  <li>
                    <div className="drop-title">Notifications</div>
                  </li>
                  <li>
                    <div className="message-center">
                      <a href="/">
                        <div className="btn btn-danger btn-circle">
                          <i className="fa fa-link"></i>
                        </div>
                        <div className="mail-contnet">
                          <h5>Launch Admin</h5>{" "}
                          <span className="mail-desc">
                            Just see the my new admin!
                          </span>{" "}
                          <span className="time">9:30 AM</span>{" "}
                        </div>
                      </a>
                      <a href="/">
                        <div className="btn btn-success btn-circle">
                          <i className="ti-calendar"></i>
                        </div>
                        <div className="mail-contnet">
                          <h5>Event today</h5>{" "}
                          <span className="mail-desc">
                            Just a reminder that you have event
                          </span>{" "}
                          <span className="time">9:10 AM</span>{" "}
                        </div>
                      </a>
                      <a href="/">
                        <div className="btn btn-info btn-circle">
                          <i className="ti-settings"></i>
                        </div>
                        <div className="mail-contnet">
                          <h5>Settings</h5>{" "}
                          <span className="mail-desc">
                            You can customize this template as you want
                          </span>{" "}
                          <span className="time">9:08 AM</span>{" "}
                        </div>
                      </a>
                      <a href="/">
                        <div className="btn btn-primary btn-circle">
                          <i className="ti-user"></i>
                        </div>
                        <div className="mail-contnet">
                          <h5>Pavan kumar</h5>{" "}
                          <span className="mail-desc">
                            Just see the my admin!
                          </span>{" "}
                          <span className="time">9:02 AM</span>{" "}
                        </div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <a
                      className="nav-link text-center"
                      href="#!"
                    >
                      {" "}
                      <strong>Check all notifications</strong>{" "}
                      <i className="fa fa-angle-right"></i>{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item dropdown mega-dropdown" style={{display: 'none'}}>
              {" "}
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                href="#!"
                data-toggle="dropdown"
                // aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-view-grid"></i>
              </a>
              <div className="dropdown-menu animated">
                <ul className="mega-dropdown-menu row">
                  <li className="col-lg-3 col-xlg-2 m-b-30">
                    <h4 className="m-b-20">CAROUSEL</h4>
                    <div
                      id="carouselExampleControls"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                          <div className="container">
                            {" "}
                            <img
                              className="d-block img-fluid"
                              src="./assets/images/big/img1.jpg"
                              alt="First slide"
                            />
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="container">
                            <img
                              className="d-block img-fluid"
                              src="./assets/images/big/img2.jpg"
                              alt="Second slide"
                            />
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="container">
                            <img
                              className="d-block img-fluid"
                              src="./assets/images/big/img3.jpg"
                              alt="Third slide"
                            />
                          </div>
                        </div>
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#carouselExampleControls"
                        role="button"
                        data-slide="prev"
                      >
                        {" "}
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>{" "}
                        <span className="sr-only">Previous</span>{" "}
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carouselExampleControls"
                        role="button"
                        data-slide="next"
                      >
                        {" "}
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>{" "}
                        <span className="sr-only">Next</span>{" "}
                      </a>
                    </div>
                  </li>
                  <li className="col-lg-3 m-b-30">
                    <h4 className="m-b-20">ACCORDION</h4>
                    <div
                      id="accordion"
                      className="nav-accordion"
                      role="tablist"
                      aria-multiselectable="true"
                    >
                      <div className="card">
                        <div className="card-header" role="tab" id="headingOne">
                          <h5 className="mb-0">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Collapsible Group Item #1
                            </a>
                          </h5>{" "}
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          role="tabpanel"
                          aria-labelledby="headingOne"
                        >
                          <div className="card-body">
                            {" "}
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high.{" "}
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" role="tab" id="headingTwo">
                          <h5 className="mb-0">
                            <a
                              className="collapsed"
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Collapsible Group Item #2
                            </a>
                          </h5>{" "}
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo"
                        >
                          <div className="card-body">
                            {" "}
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid.{" "}
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingThree"
                        >
                          <h5 className="mb-0">
                            <a
                              className="collapsed"
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              Collapsible Group Item #3
                            </a>
                          </h5>{" "}
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingThree"
                        >
                          <div className="card-body">
                            {" "}
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid.{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="col-lg-3  m-b-30">
                    <h4 className="m-b-20">CONTACT US</h4>
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputname1"
                          placeholder="Enter Name"
                        />{" "}
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                        />{" "}
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="exampleTextarea"
                          rows="3"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-info">
                        Submit
                      </button>
                    </form>
                  </li>
                  <li className="col-lg-3 col-xlg-4 m-b-30">
                    <h4 className="m-b-20">List style</h4>
                    <ul className="list-style-none">
                      <li>
                        <a href="#!">
                          <i className="fa fa-check text-success"></i> You can
                          give link
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-check text-success"></i> Give link
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-check text-success"></i> Another
                          Give link
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-check text-success"></i> Forth
                          link
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-check text-success"></i> Another
                          fifth link
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                href="/"
                data-toggle="dropdown"
                // aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={!!photo ? photo : DefaultPic}
                  alt="user"
                  height={30}
                  className="profile-pic"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-right scale-up">
                <ul className="dropdown-user">
                  <li>
                    <div className="dw-user-box">
                      <div className="u-img">
                        <img 
                          src={!!photo ? photo : DefaultPic} 
                          height={70}
                          alt="user" />
                      </div>
                      <div className="u-text">
                        <h4>{firstName + " " + lastName}</h4>
                        <p className="text-muted text-wrap">{email}</p>
                        <a
                          href="/school-leader/profile"
                          className="btn btn-rounded btn-danger btn-sm"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </li>
                  <li role="separator" className="divider" style={{display: 'none'}}></li>
                  <li style={{display: 'none'}}>
                    <a href="/">
                      <i className="ti-email"></i> My Notifications
                    </a>
                  </li>
                  <li style={{display: 'none'}}>
                    <a href="/admin/profile">
                      <i className="ti-settings"></i> Account Settings
                    </a>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                      <LogoutButton />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
