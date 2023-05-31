import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAccountDetails, getUserProfile, changePassword } from "../../../api/account";
import { toast } from 'react-toastify';
import schema from '../../../validators/registration';
import { errorMessage } from '../../../validators/errorMessages';
import { Autocomplete } from "components/common/Form/Inputs";
import './index.css';
import { LEARNER_GRADE_LEVELS } from "utils/constants";
import moment from 'moment';
// import { setLastLogin } from "redux/actions/auth";
import { useNavigate } from "react-router";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValidation = {
    firstName: { validationType: "" },
    lastName: { validationType: "" },
    gender: { validationType: "" },
    birthday: { validationType: "" },
    gradeLevel: { validationType: "" },
    salutation: { validationType: "" },
    nickname: { validationType: "" },
    phone: { validationType: "" },
    email: { validationType: "" },
    password: { validationType: "" },
    oldPassword: { validationType: "" },
    confirmPassword: { validationType: "" }
  }

  const maxBday = (moment(new Date()).subtract(4, 'years')).format('YYYY-MM-DD');

  const { firstName, lastName, email, contactNumber, aboutMe, photo, type, salutation, nickname, gender, birthday, gradeLevel } = useSelector((state) => state.auth.user);
  const lastLogin = useSelector((state) =>
    state.auth.lastLogin ? state.auth.lastLogin : null
  );

  const [editPersonalFlag, setEditPersonalFlag] = useState(false);
  const [editPasswordFlag, setEditPasswordFlag] = useState(false);
  const [password, setPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [validationFields, setValidationFields] = useState(initialValidation);
  const [changePass, setChangePass] = useState(false);

  React.useEffect(() => {
    getUserProfile(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBlur = async(event) => {
		var { name, value } = event.target;
		try {
      if(name === "password"){
        setPassword(value);
      }
      
			if (name === "confirmPassword") {
				value = { value, password }
			}

			await schema.validateAt(name ,{[name] : value});
			setValidationFieldKeywords(name, "valid")

		} catch(error) { //* yup error: { ValidationError, errors }
			var validationType = error.errors ? error.errors.toString() : "";

			setValidationFieldKeywords(name, validationType)
		}
	}

  const setValidationFieldKeywords = (name, validationType = "") => {
			const validation = { ...validationFields, 
				[name] : { validationType: validationType }
			};

      setValidationFields(validation);
	}

  const validationMessage = (params) => {
		var validationType = validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) return "invalid-feedback";
			else return "valid-feedback";
		}

		else return ""
	}

  const validationFieldColor = (params) => {
		var validationType = validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) return "has-danger has-error"
			else return "has-success" /**Enable valid field color */
		} 
		else return "" 
	}

  const validationInputIcon = (params) => {
		var validationType = validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) return "is-invalid";
		}

		else return ""
	}

  const getErrorMessage = (params, placeholder) => {
		var validationType = validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) { 
				if (["too_short", "too_long", "too_long_2", "special_char"].includes(validationType)) {
					return placeholder + errorMessage[validationType] 
				}
				return errorMessage[validationType] ? errorMessage[validationType] : validationType
			};
		}

		else return "";
	}

  const onCancelEdit = (form) => {
    let validations = {};
    if(form === "personal"){
      validations = { ...validationFields, 
				firstName: { validationType: "" },
        lastName: { validationType: "" },
        phone: { validationType: "" },
        email: { validationType: "" }, 
        gender: { validationType: "" }, 
        birthday: { validationType: "" }, 
        gradeLevel: { validationType: "" }, 
      }
      setEditPersonalFlag(false);
    }else{
      validations = { ...validationFields, 
				password: { validationType: "" },
        oldPassword: { validationType: "" },
        confirmPassword: { validationType: "" }
      }
      setEditPasswordFlag(false);
    }

    setValidationFields(validations);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    
    const user = {
      salutation: event.target.elements.salutation?.value,
      nickname: event.target.elements.nickname?.value,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      contactNumber: event.target.elements.phone.value,
      aboutMe: event.target.elements.aboutMe.value,
      gender: event.target.elements.gender.value,
      birthday: event.target.elements.birthday.value,
      gradeLevel: type === "learner" ? event.target.elements.gradeLevel.value : null,
    }

    await updateAccountDetails(dispatch, user, (status) => {
      setSubmitLoading(false);
      if(status){
        setEditPersonalFlag(false);
        getUserProfile(dispatch);
        toast.success("Account Details has been successfully updated!");
        if (lastLogin === null && (type === "learner" || type === "family") && (photo !== null && photo !== "" && photo !== undefined)) {
          if(type === "learner"){
            // dispatch(setLastLogin(true));
          }

          navigate("/", { replace: true });
        }
      }else{
        toast.error("Failed updating account details. Please try again.");
      }
    });
  }

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setChangePass(true);

    const password = {
      oldPassword: event.target.elements.oldPassword.value,
      newPassword: event.target.elements.password.value,
      source: 'change_pass'
    }
    
    await changePassword(password, (status) => {
      setChangePass(false);
      if(status){
        setEditPasswordFlag(false);
        toast.success("Password has been changed successfully!");
      }else{
        toast.error("Change password failed. Please make sure your current password is correct.");
      }
    })
  }

  const salutations = ['Mr.','Sir','Ms.','Mrs.','Ma\'am', 'Professor', 'Teacher'];

  return (
    <div className="card-body">
      <div style={{padding: '10px 20px'}}>
        <div style={{borderBottom: '3px #8080805c solid'}} className="row justify-content-between">
          <h5 style={{paddingTop: '10px'}}>PERSONAL DETAILS</h5>
          <button className="btn btn-link" style={{display: !!editPersonalFlag ? 'none' : 'block'}} onClick={() => setEditPersonalFlag(true)}>
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <br />
      <form className="form-horizontal floating-labels" onSubmit={handleSubmit}>
      {type === 'teacher' && <div>
        <span className="col-md-12 lbl">How would you like to be addressed?</span>
        <div className="form-group row">
            <div className="col">
              <small className="col-md-12">Salutation</small>
              <div className={`col-md-12 ${validationFieldColor("salutation")} has-feedback`}>
                <Autocomplete name="salutation" className={`form-control ${validationInputIcon("salutation")}`} 
                  suggestions={salutations} defaultValue={salutation} disabled = {!editPersonalFlag} onBlur={onBlur}/>
                
                <span className="bar"></span>

                <div className={validationMessage("salutation")}> 
                  {getErrorMessage("salutation", "Salutation")} 
                </div>
              </div>
            </div>
            <div className="col-9">
              <small className="col-md-12 lbl">Nickname</small>
              <div className={`col-md-12 ${validationFieldColor("nickname")} has-feedback`}>
                <input className={`form-control ${validationInputIcon("nickname")}`} type="text"
                      name="nickname" defaultValue={nickname} disabled = {!editPersonalFlag} onBlur={onBlur}/>

                <span className="bar"></span>

                <div className={validationMessage("nickname")}> 
                  {getErrorMessage("nickname", "Nickname")} 
                </div>
              </div>
            </div>
          </div>
        </div>}
        <div style={{display: !!editPersonalFlag ? 'block' : 'none'}}>
          <div className="form-group row">
            <div className="col">
              <span className="col-md-12 lbl">First Name</span>
              <div className={`col-md-12 ${validationFieldColor("firstName")} has-feedback`}>
                <input className={`form-control ${validationInputIcon("firstName")}`} type="text"
                      name="firstName" defaultValue={firstName}
                      onBlur={onBlur}/>

                <span className="bar"></span>

                <div className={validationMessage("firstName")}> 
                  {getErrorMessage("firstName", "First Name")} 
                </div>
              </div>
            </div>
            <div className="col">
              <span className="col-md-12 lbl">Last Name</span>
              <div className={`col-md-12 ${validationFieldColor("lastName")} has-feedback`}>
                <input className={`form-control ${validationInputIcon("lastName")}`} type="text"
                      name="lastName" defaultValue={lastName}
                      onBlur={onBlur}/>

                <span className="bar"></span>

                <div className={validationMessage("lastName")}> 
                  {getErrorMessage("lastName", "Last Name")} 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group" style={{display: !!editPersonalFlag ? 'none' : 'block'}}>
          <span className="col-md-12 lbl">Full Name</span>
          <div className="col-md-12">
            <input
              type="text"
              value={firstName + " " + lastName}
              className="form-control form-control-line"
              disabled = {!editPersonalFlag}
            />
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-12 lbl">Sex</span>
          <div className={`col-md-12 ${validationFieldColor("gender")} has-feedback`}>
            <select class="custom-select" name="gender" defaultValue={gender} disabled = {!editPersonalFlag}>
                <option value={null} selected disabled></option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
            </select>

            <span className="bar"></span>

            <div className={validationMessage("gender")}> 
              {getErrorMessage("gender", "Sex")} 
            </div>
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-12 lbl">Date of Birth</span>
          <div className={`col-md-12 ${validationFieldColor("birthday")} has-feedback`}>
            <input
                type="date"
                defaultValue={birthday ? moment(new Date(birthday)).format('YYYY-MM-DD'): null}
                className="form-control form-control-line"
                name="birthday"
                max={maxBday}
                onKeyDown={(e) => e.preventDefault()}
                disabled = {!editPersonalFlag}
              />

            <span className="bar"></span>

            <div className={validationMessage("birthday")}> 
              {getErrorMessage("birthday", "Birthday")} 
            </div>
          </div>
        </div>
        {type === "learner" && <div className="form-group">
          <span className="col-md-12 lbl">Grade Level</span>
          <div className={`col-md-12 ${validationFieldColor("gradeLevel")} has-feedback`}>
            <select class="custom-select" name="gradeLevel" defaultValue={gradeLevel} disabled = {!editPersonalFlag}>
                <option value={null} selected disabled></option>
                {LEARNER_GRADE_LEVELS.map((item) => <option value={item.value}>{item.label}</option>)}
            </select>

            <span className="bar"></span>

            <div className={validationMessage("gradeLevel")}> 
              {getErrorMessage("gradeLevel", "Grade Level")} 
            </div>
          </div>
        </div>}
        <div className="form-group">
          <span htmlFor="example-email" className="col-md-12 lbl">
            Email
          </span>
          <div className={`col-md-12 ${validationFieldColor("email")} has-feedback`}>
            <input
              type="email"
              defaultValue={email}
              className="form-control form-control-line"
              name="email"
              id="example-email"
              disabled = {true}
            />
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-12 lbl">Phone No <small style={{color: 'red'}}>*</small></span>
          <div className={`col-md-12 ${validationFieldColor("phone")} has-feedback`}>
            <input className={`form-control ${validationInputIcon("phone")}`} type="text"
                      name="phone" defaultValue={contactNumber}
                      onBlur={onBlur} disabled = {!editPersonalFlag}/>

            <span className="bar"></span>

            <div className={validationMessage("phone")}> 
              {getErrorMessage("phone", "Phone No.")} 
            </div>
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-12 lbl">About Me <small style={{color: 'red'}}>*</small></span>
          <div className="col-md-12 has-feedback">
            <textarea
              rows={5}
              className="form-control form-control-line"
              name="aboutMe"
              defaultValue={aboutMe}
              disabled = {!editPersonalFlag}
            />

            <span className="bar"></span>
          </div>
        </div>
        {/* <div className="form-group">
          <label className="col-sm-12">Select Country</label>
          <div className="col-sm-12">
            <select className="form-control form-control-line">
              <option>Philippines</option>
              <option>India</option>
              <option>Usa</option>
              <option>Canada</option>
              <option>Thailand</option>
            </select>
          </div>
        </div> */}
        <div style={{display: !!editPersonalFlag ? 'block': 'none', marginRight: '20px'}}>
          <div className="form-group row justify-content-end">
              <button className="btn btn-link" style={{marginRight:'20px'}} type="reset" onClick={() => onCancelEdit('personal')}>Cancel</button>
              <button className="btn btn-info" type="submit" disabled={submitLoading}>
                <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                Update Profile
              </button>
          </div>
        </div>
      </form>

      
      <form className="form-horizontal floating-labels" onSubmit={handleChangePassword}>
        <div style={{padding: '10px 20px'}}>
          <div style={{borderBottom: '3px #8080805c solid'}} className="row justify-content-between">
            <h5 style={{paddingTop: '10px'}}>CHANGE PASSWORD</h5>
            <button className="btn btn-link" style={{display: !!editPasswordFlag ? 'none' : 'block'}} type="reset" onClick={() => setEditPasswordFlag(true)}>
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <br />
        <div className="form-group">
          <span className="col-md-12 lbl">Current Password</span>
          <div className={`col-md-12 ${validationFieldColor("oldPassword")} has-feedback`}>
            <input className={`form-control ${validationInputIcon("oldPassword")}`} type="password"
                      name="oldPassword" onBlur={onBlur} defaultValue={!editPasswordFlag ? "password" : ""} disabled={!editPasswordFlag}/>

            <span className="bar"></span>

            <div className={validationMessage("oldPassword")}> 
              {getErrorMessage("oldPassword", "Current Password")} 
            </div>
          </div>
        </div>
        <div className="form-group" style={{display: !!editPasswordFlag ? 'block': 'none'}}>
          <span className="col-md-12 lbl">New Password</span>
          <div className={`col-md-12 ${validationFieldColor("password")} has-feedback`}>
            <input className={`form-control ${validationInputIcon("password")}`} type="password"
                      name="password" onBlur={onBlur}/>

            <span className="bar"></span>

            <div className={validationMessage("password")}> 
              {getErrorMessage("password", "New Password")} 
            </div>
          </div>
        </div>
        <div className="form-group" style={{display: !!editPasswordFlag ? 'block': 'none'}}>
          <span className="col-md-12 lbl">Confirm New Password</span>
          <div className={`col-md-12 ${validationFieldColor("confirmPassword")} has-feedback`}>
            <input className={`form-control ${validationInputIcon("confirmPassword")}`} type="password"
                      name="confirmPassword" onBlur={onBlur}/>

            <span className="bar"></span>

            <div className={validationMessage("confirmPassword")}> 
              {getErrorMessage("confirmPassword", "Confirm Password")} 
            </div>
          </div>
        </div>
        <div style={{display: !!editPasswordFlag ? 'block': 'none', marginRight: '20px'}}>
          <div className="form-group row float-right">
              <button className="btn btn-link" style={{marginRight:'20px'}} type="reset" onClick={() => onCancelEdit('password')}>Cancel</button>
              <button className="btn btn-info" type="submit" disabled={changePass}>
                <span style={{ display: changePass ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                Change Password
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}
