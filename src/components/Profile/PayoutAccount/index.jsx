import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import schema from '../../../validators/registration';
// import { errorMessage } from '../../../validators/errorMessages';
// import { getProcessors } from "api/payment";
import './index.css';
import { getTeacherPayoutAccount, saveTeacherPayoutAccount } from "api/teacher";

export default function PayoutAccount() {
  const dispatch = useDispatch();
  const initialValidation = {
    phone: { validationType: "" },
    email: { validationType: "" },
    firstName: { validationType: "" },
    lastName: { validationType: "" }
  }

  // const processors = useSelector((state) =>
  //   state.payment ? state.payment.getIn(["data", "processors"]) : {}
  // );

  const { accountName, accountNumber } = useSelector((state) =>
    state.teacher ? state.teacher.getIn(["payoutAccount"]) : {}
  );

  const [editFlag, setEditFlag] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [validationFields, setValidationFields] = useState(initialValidation);

  React.useEffect(() => {
    // getProcessors(dispatch);
    getTeacherPayoutAccount(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBlur = async(event) => {
		var { name, value } = event.target;
		try {
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
			if(validationType !== "valid") return "invalid-feedback";
			else return "valid-feedback";
		}

		else return ""
	}

  const validationFieldColor = (params) => {
		var validationType = validationFields[params].validationType;

		if(validationType) {
			if(validationType !== "valid") return "has-danger has-error"
			else return "has-success" /**Enable valid field color */
		} 
		else return "" 
	}

  const validationInputIcon = (params) => {
		var validationType = validationFields[params].validationType;

		if(validationType) {
			if(validationType !== "valid")  return "is-invalid";
		}

		else return ""
	}

  const getErrorMessage = (params, placeholder) => {
		var validationType = validationFields[params].validationType;

		if(validationType) {
			// if(validationType in errorMessage) { 
			// 	if (["too_short", "too_long", "special_char"].includes(validationType)) {
			// 		return placeholder + errorMessage[validationType] 
			// 	}
			// 	return errorMessage[validationType] 
			// };

      return validationType;
		}

		else return "";
	}

  const onCancelEdit = () => {
    let validations = {};

    validations = { ...validationFields, 
        phone: { validationType: "" },
        email: { validationType: "" },
        firstName: { validationType: "" },
        lastName: { validationType: "" }
    }
    setEditFlag(false);
    setSubmitLoading(false);
    setValidationFields(validations);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    
    const payout = {
      accountName: event.target.elements.firstName.value,
      accountType: event.target.elements.lastName.value,
      accountNumber: event.target.elements.email.value
    }

    await saveTeacherPayoutAccount(dispatch, payout, (status) => {
      setSubmitLoading(false);
      if(status){
        setEditFlag(false);
        getTeacherPayoutAccount(dispatch)
        toast.success("Payout Details has been successfully updated!");
      }else{
        toast.error("Failed updating payout details. Please try again.");
      }
    });
  }

  const formHasErrors = () => {
    let errors = 0
    
    for (var key in validationFields) {
      const item = validationFields[key];
      if (!!item.validationType && item.validationType !== 'valid') {
        errors++;
      }
    }

    if(errors > 0) return true;
    else return false;
  }

  return (
    <div className="card-body">
      <div style={{padding: '10px 20px'}}>
        <div style={{borderBottom: '3px #8080805c solid'}} className="row justify-content-between">
          <h5 style={{paddingTop: '10px'}}>PAYOUT DETAILS</h5>
          <button className="btn btn-link" style={{display: !!editFlag ? 'none' : 'block'}} onClick={() => setEditFlag(true)}>
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
      <br />
      <form className="form-horizontal floating-labels" onSubmit={handleSubmit}>
        <div className="form-group">
          <span className="col-md-12 lbl">Account Name</span>
          <div className={`col-md-12 ${validationFieldColor("firstName")} has-feedback`}>
            <input className={`form-control ${validationInputIcon("firstName")}`} type="text"
                      name="firstName" defaultValue={accountName}
                      onBlur={onBlur} disabled = {!editFlag}/>

            <span className="bar"></span>

            <div className={validationMessage("firstName")}> 
              {getErrorMessage("firstName", "Account Name")} 
            </div>
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-12 lbl">Account Type</span>
          <div className={`col-md-12 ${validationFieldColor("lastName")} has-feedback`}>
            <select class="custom-select" name="lastName" disabled = {!editFlag}>
                {/* <option selected={accountType === null || accountType === undefined}>Choose...</option> */}
                <option value={"PYPL"} selected>Paypal</option>
                {/* {
                    processors && (Object.keys(processors)).map(type => (
                        <optgroup label={`~.~.~.~${type.toUpperCase()}~.~.~.~`}>
                            {processors[type].map(item => (
                                <option value={item.procId} selected={accountType === item.procId}>{item.acronym}</option>
                            ))}
                        </optgroup>
                    ))
                } */}
            </select>

            <span className="bar"></span>

            <div className={validationMessage("firstName")}> 
              {getErrorMessage("firstName", "Account Type")} 
            </div>
          </div>
        </div>
        <div className="form-group">
          <span className="col-md-12 lbl">Account Email</span>
          <div className={`col-md-12 ${validationFieldColor("email")} has-feedback`}>
            <input className={`form-control ${validationInputIcon("email")}`} type="text"
                      name="email" defaultValue={accountNumber}
                      onBlur={onBlur} disabled = {!editFlag}/>

            <span className="bar"></span>

            <div className={validationMessage("email")}> 
              {getErrorMessage("email", "Account Number")} 
            </div>
          </div>
          {/* <div className={`col-md-12 ${validationFieldColor("phone")} has-feedback`}>
            <input className={`form-control ${validationInputIcon("phone")}`} type="text"
                      name="phone" defaultValue={accountNumber}
                      onBlur={onBlur} disabled = {!editFlag}/>

            <span className="bar"></span>

            <div className={validationMessage("phone")}> 
              {getErrorMessage("phone", "Account Number")} 
            </div>
          </div> */}
        </div>
        <div>
          <p className="m-0" style={{fontSize: "12px"}}>Don't have a paypal account yet? Create one  <a href="https://www.paypal.com/ph/webapps/mpp/account-selection" target="_blank" rel="noreferrer" style={{fontSize: "11px"}}><u>here</u></a></p>
        </div>
        <div style={{display: !!editFlag ? 'block': 'none', marginRight: '20px'}}>
          <div className="form-group row justify-content-end">
              <button className="btn btn-link" style={{marginRight:'20px'}} type="reset" onClick={() => onCancelEdit()}>Cancel</button>
              <button className="btn btn-info" type="submit" disabled={submitLoading || formHasErrors()}>
                <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                Update
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}
