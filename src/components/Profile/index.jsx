import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../api/account";
import EditProfile from "./EditProfile";
import MyClasses from "./MyClasses";
import MyProfile from "./MyProfile";
import PayoutAccount from "./PayoutAccount";
import MyDocuments from "./MyDocuments";
// import Reviews from "./Reviews";
import './index.css';
import { toast } from 'react-toastify';
import { updateAccountDetails } from "../../api/account";

import { s3Config } from "../../config";
import S3 from "aws-s3-pro";
import moment from 'moment-timezone';
import { Button, Modal } from "react-bootstrap";
import { api } from "api";
import { useWelcomeModal } from 'hooks/useWelcomeModal';
import dayjs from "dayjs";
import DefaultPic from "../../img/default-pic-blue1.png"

const s3Client = new S3(s3Config);

export default function Profile({ user }) {
  const uploaderRef = useRef();
  const { firstName, lastName, email, createdDatetime, contactNumber, photo, type } = useSelector((state) => state.auth.user);
  const [modal] = useWelcomeModal(type);
  const dispatch = useDispatch();

  const lastLogin = useSelector((state) =>
    state.auth.lastLogin ? state.auth.lastLogin : null
  );

  const [profilePhoto, setProfilePhoto] = useState(!!photo ? photo : DefaultPic);
  const [isPhotoAttached, setIsPhotoAttached] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileAttached, setFileAttached] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [authPassword, setPassword] = useState("");
  const [authResponse, setAuthResponse] = useState({loading: false});

  React.useEffect(() => {
    getUserProfile(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelUpload = () => {
    setIsPhotoAttached(false);
    setProfilePhoto(!!photo ? photo : DefaultPic);
  }

  const onAttachImage = async (event) => {
    try {
      //event.target.files[0].name = `${accountId}-${event.target.files[0].name}`;
      setFileAttached(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        setProfilePhoto(uploaded_image);
        setIsPhotoAttached(true);
      });

      reader.readAsDataURL(event.target.files[0]);
    } catch (error) {}
  }

  const onUpload = async () => {
    try {
      setUploadLoading(true);

      const uploadResponse = await s3Client.uploadFile(fileAttached);
      if (uploadResponse.status === 204) {
        await updateAccountDetails(dispatch, {photo: uploadResponse.location}, (status) => {   
          if(status){
            toast.success("Profile Photo has been successfully uploaded!");
            setIsPhotoAttached(false);
            // if (lastLogin === null && (type === "learner" || type === "family") && (aboutMe !== "" && aboutMe !== null && aboutMe !== undefined) && (contactNumber !== "" && contactNumber !== null && contactNumber !== undefined)) {
            //   if(type === "learner"){
            //     dispatch(setLastLogin(true));
            //   }

              // navigate("/dashboard", { replace: true });
            // }
            setProfilePhoto(uploadResponse.location);
          }else{
            toast.error("Failed uploading profile photo. Please try again.");
          }
        });
      }
    } catch (error) {
      toast.error("Failed uploading profile photo. Please try again.");
    } finally {
      setUploadLoading(false);
    }
  }

  const verifyPassword = async() => {
    setAuthResponse({loading: true});
    await api.post('/account/verify-password', { password: authPassword }).then((response) => {
      if(response.data.status === 'success'){
        setAuthResponse({
          ...response.data,
          loading:false
        });
        setModalShow(false);
        document.getElementById('payout-link').click();
      }else{
        setAuthResponse({loading: false, status: 'error'});
      }
    }).catch(err => {
      setAuthResponse({loading: false, status: 'error'});
    });
    
  }

  const openPayoutAccount = (source, event) => {
    setAuthResponse({});
    // switch(source){
    //   case 'payout': 
    //     if(authResponse.status !== 'success'){
    //       setModalShow(true);
    //       event.preventDefault();
    //       event.stopPropagation();
    //     }
    //     break;
    //   default: setAuthResponse({});
    // }
  }

  const shouldShowWelcomeMessage = useSelector(
    state =>
      !state?.learners?.data?.length &&
      state?.auth?.lastLogin &&
      dayjs(new Date()).diff(state.auth.lastLogin, 'seconds') < 30 // not 30 seconds has passed since closing modal
  );

  return (
    <div>
      {modal}
      {shouldShowWelcomeMessage && (type === "learner" || type === "family") && <div className="alert alert-warning text-center text m-t-20">
          <span className="font-weight-bold">
            Welcome {firstName} {lastName}! 
          </span><br />
          <span>For us to know more about you, please complete your profile below including adding your profile picture.</span>
      </div>}
      <div className="row">
        {/* Column */}
        <div className="col-lg-4 col-xlg-3 col-md-5">
          <div className="card">
            <div className="card-body el-element-overlay">
              <center className="m-t-30">
                {/* {JSON.stringify(user)} */}
                {" "}
                <div style={{marginLeft: '40px'}}>
                  <img
                    src={profilePhoto}
                    className="img-circle"
                    style={{maxHeight: '150px', maxWidth: '150px', objectFit: 'cover'}}
                    width={150}
                    height={150}
                    alt="user"
                  />
                    <button className="btn btn-link upload-icon" onClick={() => uploaderRef.current.click()}>
                      <i className="fas fa-camera"></i>
                    </button>
                    <input
                      name="upload"
                      ref={uploaderRef}
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      style={{ display: "none" }}
                      onChange={onAttachImage}
                    />
                </div>
                <div style={{marginTop: '10px', display: !!isPhotoAttached ? 'block': 'none'}}>
                  <button className="btn btn-link" onClick={cancelUpload}>Cancel</button>
                  <button className="btn btn-info" onClick={onUpload} disabled={uploadLoading}>
                    <span style={{ display: uploadLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                    Upload
                  </button>
                </div>
                <h4 className="card-title m-t-10">{firstName + " " + lastName}</h4>
              </center>
            </div>
            <div>
              <hr />{" "}
            </div>
            <div className="card-body">
              <small className="text-muted">Member Since </small>
              <h6>{moment.utc(createdDatetime, 'YYYY/MM/DD - hh:mm A').tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Manila').format('YYYY/MM/DD - hh:mm A')}</h6>
              <small className="text-muted">Email Address </small>
              <h6>{email}</h6>
              <small className="text-muted p-t-30 db">Phone</small>
              <h6>{contactNumber}</h6>
              {/* <small className="text-muted p-t-20 db">Social Profile</small>
              <br />
              <button className="btn btn-circle btn-secondary">
                <i className="fa fa-facebook" />
              </button>
              <button className="btn btn-circle btn-secondary">
                <i className="fa fa-twitter" />
              </button>
              <button className="btn btn-circle btn-secondary">
                <i className="fa fa-youtube" />
              </button> */}
            </div>
          </div>
        </div>
      
        {/* Column */}
        {/* Column */}
        <div className="col-lg-8 col-xlg-9 col-md-7">
          <div className="card">
            {/* Nav tabs */}
            <ul className="nav nav-tabs profile-tab" role="tablist">
              { user !== 'admin' && type !== 'school_leader' &&
              <li className="nav-item">
                {" "}
                <a className={`nav-link ${(type === 'teacher' || (['family', 'learner'].indexOf(type) > -1 && lastLogin !== null)) && 'active'}`} data-toggle="tab" href="#classes" role="tab" onClick={(e) => openPayoutAccount('classes', e)}>
                  My Classes
                </a>{" "}
              </li> }
              <li className="nav-item">
                {" "}
                <a className={`nav-link ${(user === 'admin' || type === "school_leader") && 'active'}`} data-toggle="tab" href="#profile" role="tab" onClick={(e) => openPayoutAccount('profile', e)}>
                  About Me
                </a>{" "}
              </li>
              {/* { user !== 'admin' && 
              <li className="nav-item">
                {" "}
                <a className="nav-link" data-toggle="tab" href="#reviews" role="tab" onClick={(e) => openPayoutAccount('reviews', e)}>
                  Reviews
                </a>{" "}
              </li> } */}
              <li className="nav-item">
                {" "}
                <a className={`nav-link ${(user !== 'admin' && (lastLogin === null && (type === "learner" || type === "family" ))) && 'active'}`} data-toggle="tab" href="#settings" role="tab" onClick={(e) => openPayoutAccount('settings', e)}>
                  My Profile
                </a>{" "}
              </li>
              { type === 'teacher' && <li className="nav-item">
                {" "}
                <a className="nav-link" data-toggle="tab" id="payout-link" href="#payout" role="tab" onClick={(e) => openPayoutAccount('payout', e)}>
                  Payout Account 
                    {/* <i className={`fas ${authResponse.status !== 'success' ? 'fa-lock' : 'fa-lock-open'} ml-2 btn-link`}></i> */}
                    {/* <i className="fas fa-lock-open ml-2"></i> */}
                </a>{" "}
              </li>}
              { type === 'teacher' && <li className="nav-item">
                {" "}
                <a className="nav-link" data-toggle="tab" href="#documents" role="tab" onClick={(e) => openPayoutAccount('documents', e)}>
                  My Documents
                </a>{" "}
              </li>}
            </ul>
            {/* Tab panes */}
            <div className="tab-content">
              {/*first tab*/}
              { user !== 'admin' && 
              <div className={`tab-pane ${(type === 'teacher' || (['family', 'learner'].indexOf(type) > -1 && lastLogin !== null)) && 'active'}`} id="classes" role="tabpanel">
                <MyClasses />
              </div> }
              {/*My Profile tab*/}
              <div className={`tab-pane ${user === 'admin' && 'active'}`} id="profile" role="tabpanel">
                <MyProfile />
              </div>
              {/*Reviews tab*/}
              {/* { user !== 'admin' && 
              <div className="tab-pane" id="reviews" role="tabpanel">
                <Reviews />
              </div> } */}
              <div className={`tab-pane ${(user !== 'admin' && (lastLogin === null && (type === "learner" || type === "family"))) && 'active'}`} id="settings" role="tabpanel">
                <EditProfile />
              </div>
              {type === 'teacher' && <div className="tab-pane" id="payout" role="tabpanel">
                <PayoutAccount />
              </div>}
              {type === 'teacher' && <div className="tab-pane" id="documents" role="tabpanel">
                <MyDocuments />
              </div>}
              
            </div>
          </div>
          {/* Column */}
        </div>
        {/* Column */}
      </div>
      <Modal size="m" show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Enter Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Enter your password to view or make changes on your Payout Account.
          </p>
          {authResponse.status === 'error' && <div className="alert alert-danger text-center text">
              <span>Failed validating your credentials. Please try again.</span>
          </div>}
          <div className="input-group">
            <input type="password" class="form-control" placeholder="Password" name="authPassword" aria-label="Password" aria-describedby="basic-addon2" 
              onChange={(e) => setPassword(e.target.value)}/>
            {/* <div class="input-group-append">
              <button class="btn btn-link" type="button">
                <i className="far fa-eye-slash"></i>
              </button>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="link" type="button" onClick={() => setModalShow(false)}>
              Cancel
            </Button>
            <Button variant="info" type="submit" onClick={verifyPassword} disabled={authResponse.loading === true || !authPassword}>
              <span style={{ display: authResponse.loading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
              Proceed
            </Button>
        </Modal.Footer>
      </Modal>
      {/* Column */}
    </div>
  );
}
