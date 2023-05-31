/* eslint-disable jsx-a11y/anchor-is-valid */
import { deleteCartItem, getShoppingCart } from "api/cart";
import { getNotifications, readNotifications, getSelectedNotification } from "api/notification";
import {
  getAPIKey,
  getCluster
} from "api/messages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './index.css';
import Pusher from 'pusher-js';
import { useOutsideClickRef, useToggle } from 'rooks';
import LogoutButton from "components/LogoutButton";
import DefaultPic from "../../../img/default-pic-blue1.png"

export default function DashboardHeader({userType}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [errorLoading, setErrorLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { firstName, lastName, email, photo, type } = useSelector((state) => state.auth.user);
  const cartArray = useSelector((state) => state.cart ? state.cart.getIn(['data', 'cart']) : []);
  const notifications = useSelector((state) => state.notification ? state.notification.getIn(['data', 'notifications']) : []);
  const [selectedNotification, setSelectedNotification] = useState({});

  const [showProfile, toggleShowProfile] = useToggle(false);
  const [showNotifs, toggleShowNotifs] = useToggle(false);
  const [showCart, toggleShowCart] = useToggle(false);
  const [profileRef] = useOutsideClickRef(toggleShowProfile, showProfile);
  const [notifsRef] = useOutsideClickRef(toggleShowNotifs, showNotifs);
  const [cartRef] = useOutsideClickRef(toggleShowCart, showCart);

  const removeFromCart = (e, index) => {
    e.stopPropagation();
    const cart = [...cartArray];

    deleteCartItem(dispatch, { cartId: cart[index].cartId }, (status) => {
      if (status) {
        toast.success('Item has been removed from cart.');
        loadData();
      } else {
        setLoading(false);
        toast.error('Failed removing item from cart. Please try again later.');
      }
    });
  }

  useEffect(() => {
    if(userType !== 'admin'){
      loadData();
      const pusher = new Pusher(getAPIKey(), {
        cluster: getCluster(),
        encrypted: true
      });
      const channel = pusher.subscribe('Notifications');
      channel.bind(`channel-all-users`, (data) => {

        getNotifications(dispatch, (status, data) => {
          console.log(status);
        });

      });

      return () => {
        pusher.unsubscribe('Notifications');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () => {
    setErrorLoading(false);
    getShoppingCart(dispatch, (status) => {
      if (!status) {
        setErrorLoading(true);
      }
      setLoading(false);
    });

    getNotifications(dispatch, (status, data) => {
      console.log(status);
      // if (!status) {
      //   setErrorTable(true);
      // }
    });
  }

  const readNotif = () => {
    readNotifications(dispatch, (status, data) => {
      getNotifications(dispatch, (status, data) => {
        console.log(status);
      });
    });
  }

  const clickNotif = (id) =>{
    const args = {notificationId: id};
    getSelectedNotification (dispatch, args, (status, data)=>{
            if(!status){
                // toast error
                toast.error("Oh no! Something went wrong. Please try again.");
            }
            else
            {
              setSelectedNotification(data);
              console.log(data);
            }
        });
}

const onClose = () => {
    document.getElementById("modal-close").click()

    setSelectedNotification({})
}

  return (
    <>
    <header
      className="topbar"
      style={{ position: "fixed", top: "0px", width: "inherit" }}
    >
      <nav className="navbar top-navbar navbar-expand-md navbar-light" style={{background: userType === 'admin' ? "#455a64" : ""}}>
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
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
                className="dark-logo hide-mobile"
                style={{ width: '60%' }}
              />

              <img
                src="./assets/images/logo-light-text.png"
                className="light-logo"
                alt="homepage"
                style={{ width: '60%' }}
              />
            </span>
            {/* <span>{" "}<small>v{process.env.REACT_APP_VERSION}</small></span> */}
            <span className="hide-mobile">{" "}<small>v5.7</small></span>
          </a>
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto mt-md-0">
            <li className="nav-item">
              {" "}
              <a
                className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark"
                href="#/"
              >
                <i className="mdi mdi-menu" style={{ display: 'none' }}></i>
              </a>{" "}
            </li>
            <li className="nav-item m-l-10">
              {" "}
              <a
                className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"
                href="#/"
              >
                <i className="ti-menu" style={{ display: 'none' }}></i>
              </a>{" "}
            </li>
          </ul>
          <ul className="navbar-nav my-lg-0">
            <li className="nav-item hidden-sm-down search-box">
              {" "}
              <a
                className="nav-link hidden-sm-down text-muted waves-effect waves-dark"
                href="#/"
              >
                <i className="ti-search" style={{ display: 'none' }}></i>
              </a>
              <form className="app-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search & enter"
                />{" "}
                <a href="#/" className="srh-btn">
                  <i className="ti-close"></i>
                </a>{" "}
              </form>
            </li>
            {userType !== 'admin' && <li
              className={`nav-item dropdown ${showNotifs && 'show'}`}
              onClick={() => {
                readNotif();
                toggleShowNotifs();
              }}
              ref={notifsRef}
            >
              <a
                className='nav-link dropdown-toggle text-muted waves-effect waves-dark pl-4 pr-4'
                aria-expanded={showNotifs}
              >
                <i class='fa fa-bell' />
                {notifications && notifications.new && notifications.new.filter(item=> item.userTypes.includes(type.toUpperCase())).length > 0 && (
                  <span class='position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger'>
                    {notifications.new.filter(item=> item.userTypes.includes(type.toUpperCase())).length}
                  </span>
                )}
              </a>
              <div className='dropdown-menu dropdown-menu-right mailbox animated scale-up'>
                <ul>
                  <li>
                    <div className='drop-title'>Notifications</div>
                  </li>
                  {notifications && (notifications.new || notifications.prev) && (notifications.new.filter(item=> item.userTypes.includes(type.toUpperCase()))?.length || notifications.prev.filter(item=> item.userTypes.includes(type.toUpperCase()))?.length) ? (
                    <li>
                      <div className="message-center">
                        {notifications && notifications.new && notifications.new.filter(item=> item.userTypes.includes(type.toUpperCase())).map((item) => (
                          <div data-target="#notificationModal" data-toggle="modal" onClick={()=>clickNotif(item.notificationId)} style={{ backgroundColor: '#eef5f9' }}>
                            <div className="btn btn-danger btn-circle">
                              <i className="fa fa-link"></i>
                            </div>
                              <div className='mail-contnet pl-2'>
                                <h5>{item.title}</h5>{' '}
                                <span className='mail-desc'>
                                  <b>{item.content}</b>
                                </span>{' '}
                                <span className='time'>{item.startDate}</span>{' '}
                            </div>
                          </div>
                        ))}
                        {notifications && notifications.prev && notifications.prev.filter(item=> item.userTypes.includes(type.toUpperCase())).map((item) => (
                           <div data-target="#notificationModal" data-toggle="modal" onClick={()=>clickNotif(item.notificationId)} style={{ backgroundColor: '#eef5f9' }}>
                            <div className="btn btn-danger btn-circle">
                              <i className="fa fa-link"></i>
                            </div>
                              <div className='mail-contnet pl-2'>
                                <h5>{item.title}</h5>{' '}
                                <span className='mail-desc'>{item.content}</span>{' '}
                                <span className='time'>{item.startDate}</span>{' '}
                            </div>
                          </div>
                        ))}
                      </div>
                    </li>
                  ) : (
                    <li>
                      <div className='mail-contnet p-3'>No notifications.</div>
                    </li>
                  )}
                  <li>
                    <a className='nav-link text-center' href='/notifications'>
                      {' '}
                      <strong>Check all notifications</strong>{' '}
                      <i className='fa fa-angle-right' />{' '}
                    </a>
                  </li>
                </ul>
              </div>
            </li>}
            {/* <li className="nav-item dropdown mega-dropdown">
              {" "}
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                href="#/"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="mdi mdi-view-grid" style={{ display: 'none' }}></i>
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high.{" "}
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid.{" "}
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" role="tab" id="headingThree">
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
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid.{" "}
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
                        <a href="#/">
                          <i className="fa fa-check text-success"></i> You can give link
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="fa fa-check text-success"></i> Give link
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="fa fa-check text-success"></i> Another Give link
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="fa fa-check text-success"></i> Forth link
                        </a>
                      </li>
                      <li>
                        <a href="#/">
                          <i className="fa fa-check text-success"></i> Another fifth link
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li> */}
            {['learner', 'family'].indexOf(type) > -1 && pathname !== '/cart' && (
              <li
                className={`nav-item dropdown ${showCart && 'show'}`}
                onClick={toggleShowCart}
                ref={cartRef}
              >
              <a
                  className='nav-link dropdown-toggle text-muted waves-effect waves-dark'
                  aria-expanded={showCart}
              >
                  {' '}
                  <i className='fas fa-shopping-cart' />
                  {cartArray.length > 0 && (
                    <div className='notify'>
                      {' '}
                      <span className='heartbit' /> <span className='point' />{' '}
                    </div>
                  )}
              </a>
                <div
                  className='dropdown-menu dropdown-menu-right mailbox animated scale-up'
                  style={{ width: '400px' }}
                >
                <ul>
                  <li>
                      <div className='drop-title'>My Cart</div>
                  </li>
                  <li>
                      <div
                        className='text-center data-loading'
                        style={{ display: loading ? 'block' : 'none' }}
                      >
                        <div className='spinner-border text-primary' role='status'>
                          <span className='sr-only'>Loading...</span>
                      </div>
                        <div className='loading-text'>Loading Shopping Cart ...</div>
                    </div>
                      <div
                        className='text-center'
                        style={{ display: !!errorLoading ? 'block' : 'none' }}
                      >
                        <div className='no-data error' style={{ fontSize: '14px' }}>
                        There was an error loading the data.
                      </div>
                    </div>
                      <div className='message-center' style={{ height: 'auto' }}>
                        {cartArray.length === 0 && !loading ? (
                          <div className='mail-contnet'>
                            <span className='mail-desc'>
                              <i>Your cart is empty</i>
                            </span>
                          </div>
                        ) : (
                          cartArray.map(
                            (item, index) =>
                              index < 5 && (
                                <div className='d-flex align-items-center'>
                                  <div
                                    className='btn btn-circle'
                                    style={{
                                      backgroundImage: `url(${
                                        item.thumbnailImage
                              ? item.thumbnailImage
                                          : '../assets/images/image-placeholder.jpg'
                                      })`,
                                      backgroundSize: 'contain',
                                      marginRight: '10px',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'center'
                          }}
                                    role='button'
                                    onClick={() =>
                                      navigate(`/class/enroll/${item.classId}`)
                                    }
                                  />
                                  <div
                                    className='mail-contnet'
                                    style={{ display: 'inline-flex', width: '85%' }}
                                    role='button'
                                    onClick={() =>
                                      navigate(`/class/enroll/${item.classId}`)
                                    }
                                  >
                            <div style={{ width: '90%' }}>
                                      <h5>{item.title}</h5>{' '}
                                      <span className='mail-desc'>
                                        By {item.teacherName}
                                      </span>{' '}
                                      <span className='mail-desc'>
                                        {item.currency} {item.price} (
                                        {item.enrollees !== 'null'
                                          ? JSON.parse(item.enrollees).length
                                          : 1}
                                        x)
                                      </span>{' '}
                            </div>
                            <div>
                                      <button
                                        className='btn btn-link'
                                        style={{ color: 'red' }}
                                        onClick={e => removeFromCart(e, index)}
                                      >
                                        <i className='fas fa-trash' />
                              </button>
                            </div>
                          </div>
                        </div>
                              )
                          )
                        )}
                    </div>
                  </li>
                  <li>
                      <div
                        className={`d-flex ${
                          cartArray.length > 5
                            ? 'justify-content-between'
                            : 'justify-content-center'
                        } align-items-center`}
                      >
                        {cartArray.length > 5 && (
                          <small style={{ marginLeft: '10px' }}>
                            {cartArray.length - 5} more Item/s in Cart
                          </small>
                        )}
                        <a className='nav-link text-center' href='/cart'>
                          {' '}
                          <strong>View My Cart</strong>{' '}
                          <i className='fa fa-angle-right' />{' '}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              </li>
            )}
            <li
              className={`nav-item dropdown ${showProfile && 'show'}`}
              onClick={toggleShowProfile}
              ref={profileRef}
            >
              <a
                className='nav-link dropdown-toggle text-muted waves-effect waves-dark'
                aria-expanded={showProfile}
              >
                <img
                  src={!!photo ? photo : DefaultPic}
                  alt='user'
                  height={30}
                  style={{ objectFit: 'cover' }}
                  className='profile-pic'
                />
              </a>
              <div className='dropdown-menu dropdown-menu-right scale-up'>
                <ul className='dropdown-user'>
                  <li>
                    <div className='dw-user-box'>
                      <div className='u-img'>
                        <img
                          src={!!photo ? photo : DefaultPic}
                          height={70}
                          alt='user'
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className='u-text'>
                        <h4>{firstName + ' ' + lastName}</h4>
                        <p className='text-muted text-wrap'>{email}</p>
                        <a href='/profile' className='btn btn-rounded btn-danger btn-sm'>
                          View Profile
                        </a>
                      </div>
                    </div>
                  </li>
                  <li role='separator' className='divider' style={{ display: 'none' }} />
                  <li style={{ display: 'none' }}>
                    <a href='/'>
                      <i className='ti-email' /> My Notifications
                    </a>
                  </li>
                  <li style={{ display: 'none' }}>
                    <a href='/profile/settings'>
                      <i className='ti-settings' /> Account Settings
                    </a>
                  </li>
                  <li role='separator' className='divider' />
                  <li>
                          <LogoutButton/>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>

<div className="modal" id="notificationModal" aria-labelledby="exampleModalLabel" aria-hidden="true" onContextMenu={(e)=> e.preventDefault()}>
<div className="modal-dialog modal-lg">
    <div className="modal-content">
        <div className="modal-header" style={{backgroundColor: "#2266ae"}}>
            <h5 className="modal-title" id="exampleModalLabel" style={{color: "white"}}><b>Notification</b></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onClose()} >
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div className="modal-body" style= {{backgroundColor: "whitesmoke"}}>
            <div className="row" >
                <div className="col-12">
                  <div className="card mb-4 d-flex justify-content-center align-items-center">
                    <h2><b>{selectedNotification.title}</b></h2>
                  </div>
                </div>
            </div>
            <div className="row" >
              <div className="col-12 mb-5">
                  <h4>
                    {selectedNotification.content}
                  </h4>
                </div>
        </div>
        <div className="modal-footer">
            <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal" >Okay</button>
        </div>
        </div>
    </div>
</div>
</div>
</>
  );
}
