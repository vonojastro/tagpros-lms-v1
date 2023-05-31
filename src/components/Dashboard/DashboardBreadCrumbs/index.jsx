import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from 'react-icons/hi';
import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    color: #44aae3;
    font-weight: 500;
    cursor: pointer;
  }
`;

const Back = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  color: #44aae3;
  font-weight: 500;

  &:focus {
    outline: none !important;
  }
`;

export default function DashboardBreadCrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [back, setBack] = useState(false);
  let pathname = location.pathname;
  const { firstName, lastName, salutation, nickname } = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (
      pathname.includes('/teacher-policies/teacher-social-media-policy') ||
      pathname.includes('/teacher-policies/class-content') ||
      pathname.includes('/teacher-policies/learner-safety-and-privacy-for-teacher') ||
      pathname.includes('/teacher-policies/learner-safety-and-privacy-for-parents')
    ) {
      setBack(true);
    }
  }, [pathname]);

  if(pathname.includes("/class/enroll")){
    pathname = "/class/enroll";
  }

  if(pathname.includes("/class/view")){
    pathname = "/class/enroll";
  }

  const headerContent = {
    "/": {
      title: `Welcome, ${!!salutation ? salutation : ''} ${!!nickname ? nickname : `${firstName} ${lastName}`}!`,
      customLastLevelTitle: 'My Dashboard'
    },
    "/application": {
      title: 'Apply as a Teacher',
      children: [
        {title: 'My Application', href: '/application'}
      ],
      customLastLevelTitle: 'Before We Begin...'
    },
    "/application/step-1": {
      title: 'Apply as a Teacher',
      children: [
        {title: 'My Application', href: '/application'}
      ],
      customLastLevelTitle: 'About Tagpros'
    },
    "/application/step-2": {
      title: 'Apply as a Teacher',
      children: [
        {title: 'My Application', href: '/application'}
      ],
      customLastLevelTitle: 'Personal Details'
    },
    "/application/step-3": {
      title: 'Apply as a Teacher',
      children: [
        {title: 'My Application', href: '/application'}
      ],
      customLastLevelTitle: 'About your classes'
    },
    "/application/step-4": {
      title: 'Apply as a Teacher',
      children: [
        {title: 'My Application', href: '/application'}
      ],
      customLastLevelTitle: 'Sample Classes'
    },
    "/application/step-5": {
      title: 'Apply as a Teacher',
      children: [
        {title: 'My Application', href: '/application'}
      ],
      customLastLevelTitle: 'Policies'
    },
    "/application-status": {
      title: 'Teacher Application Summary',
      children: [
        {title: 'My Application', href: '/application'}
      ]
    },
    "/classes": {
      title: 'My Classes',
      children: [
        {title: 'Tools', href: '/classes'}
      ]
    },
    "/createClass": {
      title: 'Create A New Class',
      children: [
        {title: 'Tools', href: '/classes'}
      ]
    },
    "/editClass": {
      title: 'Edit Class',
      children: [
        {title: 'Tools', href: '/classes'}
      ],
      hasBackButton: true
    },
    "/students": {
      title: 'My Students',
      children: [
        {title: 'Tools', href: '/classes'}
      ],
      hasBackButton: true
    },
    "/profile": { title: 'My Profile' },
    "/class/enroll": { title: 'Enroll' },
    "/class/view": { title: 'View Class' },
    "/cart": { title: 'My Shopping Cart' },
    "/inbox": { title: 'My Messages' },
    "/notifications": { title: 'Notifications' },
    "/feature": { title: 'Featured Videos' },
    "/history": { title: 'Enrollment History' },
    "/admin/teacher-masterlist": { title: 'Teacher Masterlist' },
    "/admin/class-masterlist": { title: 'Class Masterlist' },
    "/admin/announcements": { title: 'Announcements' },
    "/admin/manage-emails": { title: 'Manage Emails' },
    "/admin/manage-accounts": { title: 'Account List' },
    "/admin/manage-adminAccounts": { title: 'Administrator Accounts' },
    "/admin/payment-history": { title: 'Payment History' },
    "/admin/discounts": { title: 'Discounts' },
    "/admin/pricing": { title: 'Pricing' },
    "/admin/school-leaders": { title: 'School Leaders' },
    "/admin/mailing": { title: 'Email Notification' },
    "/school-leader/teacher-masterlist": { title: 'Teacher Masterlist' },
    "/school-leader/shortlist": { title: 'Shortlisted Teachers' },
    "/school-leader/for-interview": { title: 'For Interview Teachers' },
    "/school-leader/teacher-final-list": { title: 'Accepted & Rejected Teachers' },
    "/admin/surveillance": { title: 'Surveillance' },
    "/admin/config": { title: 'Configurations' },
  }

  // const headerContent = {
  //   "/": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Welcome, {!!salutation && salutation} {!!nickname ? nickname : `${firstName} ${lastName}`}!</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item active d-flex align-items-center">My Dashboard</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/application": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Apply as a Teacher</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/application">My Application</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">Before We Begin...</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/application/step-1": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Apply as a Teacher</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/application">My Application</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">About Tagpros</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/application/step-2": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Apply as a Teacher</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/application">My Application</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">Personal Details</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),

  //   "/application/step-3": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Apply as a Teacher</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/application">My Application</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">About your classes</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/application/step-4": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Apply as a Teacher</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/application">My Application</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">Sample classes</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/application/step-5": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Apply as a Teacher</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/application">My Application</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">Review Policies</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/application-status": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Teacher Application Summary</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/application">My Application</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">Teacher Application Summary</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/classes": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">My Classes</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">My Classes</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/createClass": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center row align-items-center">
  //         <button className="btn btn-secondary mr-2" onClick={() => navigate(-1)}>
  //           <i className="fas fa-arrow-left"></i>
  //         </button>
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/createClass/step-2": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/createClass/step-3": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/createClass/step-4": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/editClass": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center row align-items-center">
  //         <button className="btn btn-secondary mr-2" onClick={() => navigate(-1)}>
  //           <i className="fas fa-arrow-left"></i>
  //         </button>
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/editClass/step-2": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/editClass/step-3": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/editClass/step-4": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">{location.state?.classDetails !== undefined ? 'Edit Class':'Create A New Class'}</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button
  //           className="
  //         right-side-toggle
  //         waves-effect waves-light
  //         btn-inverse btn btn-circle btn-sm
  //         pull-right
  //         m-l-10
  //       "
  //         >
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/students": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">My Students</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">My Students</li>
  //         </ol>
  //       </div>
  //       {/* <div className="">
  //         <button className="right-side-toggle waves-effect waves-light btn-inverse btn btn-circle btn-sm pull-right m-l-10">
  //           <i className="ti-settings text-white"></i>
  //         </button>
  //       </div> */}
  //     </Fragment>
  //   ),
  //   "/calendar": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Calendar</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center"><a href="/classes">Tools</a></li>
  //           <li className="breadcrumb-item active d-flex align-items-center">Calendar</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/profile": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">My Profile</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center">My Profile</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/class/enroll": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Enroll</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <Link to='/' >
  //               Home
  //             </Link>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center">Enroll</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/class/view": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">View</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //             <Link to='/' >
  //               Home
  //             </Link>
  //           <li className="breadcrumb-item d-flex align-items-center">View</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/cart": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">My Shopping Cart</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center">Shopping Cart</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/inbox": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">My Messages</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center">Messages</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  //   "/notifications": (
  //     <Fragment>
  //       <div className="col-md-5 align-self-center">
  //         <h3 className="text-themecolor">Notifications</h3>
  //       </div>
  //       <div className="col-md-7 align-self-center">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">Home</a>
  //           </li>
  //           <li className="breadcrumb-item d-flex align-items-center">Notifications</li>
  //         </ol>
  //       </div>
  //     </Fragment>
  //   ),
  // };

  return (
    <div className="row page-titles" style={{ marginTop: 60 }}>
      {headerContent[pathname] && <div className="col-md-5 align-self-center row align-items-center">
        {headerContent[pathname].hasBackButton && <button className="btn btn-secondary mr-2" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>}
        <h3 className="text-themecolor ml-2">{headerContent[pathname].title}</h3>
      </div>}
      {headerContent[pathname] && <div className="col-md-7 align-self-center">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          {headerContent[pathname].children && headerContent[pathname].children.map((item) => (
            item.href ? 
              (<li className="breadcrumb-item d-flex align-items-center"><a href={item.href}>{item.title}</a></li>) 
              : (<li className="breadcrumb-item d-flex align-items-center">{item.title}</li>)
          ))}
          <li className="breadcrumb-item active d-flex align-items-center">{headerContent[pathname].customLastLevelTitle ? headerContent[pathname].customLastLevelTitle : headerContent[pathname].title}</li>
        </ol>
      </div>}
      {back && (
        <Button onClick={() => navigate(-1)}>
          <HiArrowNarrowLeft size='1.5rem' />
          <Back>Back</Back>
        </Button>
      )}
    </div>
  );
}
