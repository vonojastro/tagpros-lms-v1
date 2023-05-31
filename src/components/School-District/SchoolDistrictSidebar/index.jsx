import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, fetchUser } from "redux/actions/auth";
import { Modal, Button } from "react-bootstrap";
import './index.css';
import { api } from "../../../api";
import DefaultPic from "../../../img/default-pic-blue1.png"

export default function SchoolDistrictSidebar() {
  const dispatch = useDispatch();
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
  const [schoolLeader, setSchoolLeader] = useState({});


  React.useEffect(() => {
    fetchData();
    if (!firstName) dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { firstName, lastName, photo } = useSelector((state) => state.auth.user ? state.auth.user : {});

  const accountTitle = 'School Leader';

  const sidebarList = [
    {
      name: "Dashboard",
      to: "/school-leader",
      icon: "fa fa-list"
    },
    {
      name: "Teacher Masterlist",
      to: "/school-leader/teacher-masterlist",
      icon: "fa fa-address-card"
    },
    {
      name: "Shortlisted Teachers",
      to: "/school-leader/shortlist",
      icon: "fa fa-clipboard-list"
    },
    {
      name: "For Interview Teachers",
      to: "/school-leader/for-interview",
      icon: "fa fa-clipboard-list"
    },
    {
      name: "Teacher Final List",
      to: "/school-leader/teachers-final-list",
      icon: "fa fa-clipboard-list"
    }
  ];

  const fetchData = async () => {
    await api.get("/school-leader/getSchoolLeader").then((response)=>{
      setSchoolLeader(response.data);
  }).catch((error)=>{
      console.log(error);
  });
}


  return (
    <aside className="left-sidebar">
      <div className="scroll-sidebar h-full">
        <div className="user-profile" style={{ background: "url() no-repeat" }}>
          <div className="profile-img">
            <img src={!!photo ? photo : DefaultPic} alt="user" />{" "}
          </div>
          <div className="profile-text">
            <h3 style={{fontSize: 20, color: "GrayText"}}>{schoolLeader.schoolName}</h3>
            <a href="/profile" className="link u-dropdown" role="button">
              {(firstName || "") + " " + (lastName || "")}
            </a>
            <p>
              <small>{accountTitle}</small>
            </p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {/* <ul id="sidebarnav"> */}
          <ul id="sidebarnav-sdl">
            <div className="dropdown-divider"></div>
            <li className="nav-small-cap">Admin</li>
            {
              sidebarList.map((item, key) =>
                <li key={key}>
                  <NavLink activeClassName="active" exact="true" to={item.to} end aria-expanded="false">
                    <i className={item.icon}></i>
                    <span className="hide-menu">{item.name}</span>
                  </NavLink>
                </li>
              )
            }
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <a href="#!" className="link" data-toggle="tooltip" title="Settings" style={{visibility: 'hidden'}}>
          <i className="ti-settings"></i>
        </a>
        <a
          href="/admin-login"
          onClick={(event) => {event.preventDefault(); setShowLogoutConfirmModal(true);}}
          className="link"
          data-toggle="tooltip"
          title="Logout"
        >
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </div>
      <Modal
          size="m"
          show={showLogoutConfirmModal}
          backdrop="static"
          keyboard={false}
          onHide={() => {setShowLogoutConfirmModal(false); }}
        >
      <Modal.Header>
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to leave?
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={() => dispatch(logOut())}>
              Yes
            </Button>
            <Button variant="secondary" onClick={() => setShowLogoutConfirmModal(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
    </aside>
  );
}
