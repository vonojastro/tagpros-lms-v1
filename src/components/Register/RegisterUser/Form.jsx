import React from "react";
import { Link } from "react-router-dom";
import schema from "../../../validators/registration";

import TermsCondition from "./TermsCondition";
import Input from "./Input";
import LearnerTypes from "./LearnerTypes";

class Form extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isTextFieldsComplete: false,
			isPasswordMatch: false,
			isChecked: false,
			validationFields: {
				firstName: { validationType: "" },
				lastName: { validationType: "" },
				email: { validationType: "" },
				password: { validationType: "" },
				confirmPassword: { validationType: "" }
			}
		}
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.confirmPassword = this.confirmPassword.bind(this);
		this.onBlurValidate = this.onBlurValidate.bind(this);
		this.isFormValid = this.isFormValid.bind(this);
	}

	confirmPassword(event) {
		const value = event.target.value;
		
		if (this.props.password === value) {
			this.setState({ isPasswordMatch: !this.state.isPasswordMatch })
		}
	}

	handleCheckbox(event) {
		this.setState({ isChecked: event.target.checked });
	}

	validateAndContinue(event) {
		event.preventDefault(); // prevent input type submit in redirecting.

		// this.props.nextFillUpForm(2); // Next Register Step
		this.props.submitRegistration();
	}

	setValidationFieldKeywords(name, validationType = "") {
		this.setState({
			validationFields: { ...this.state.validationFields, 
				[name] : { validationType: validationType }
			}
		});
	}

	//* Yup Validation
	async onBlurValidate(event) {
		var { name, value } = event.target;
		try {
			if (name === "confirmPassword") {
				var password = this.props.password;
				value = { value, password }
			}

			await schema.validateAt(name ,{[name] : value});
			this.setValidationFieldKeywords(name, "valid")

		} catch(error) { //* yup error: { ValidationError, errors }
			var validationType = error.errors.toString();

			this.setValidationFieldKeywords(name, validationType)
		}
	}

	isFormValid() {
		var validationFields = this.state.validationFields;

		for (const field in validationFields) {
			var isFieldValid = validationFields[field].validationType === "valid";
			var emptyField = validationFields[field].validationType === "";

			if (!isFieldValid || emptyField) {
				return true;
			}
		}

		if (!this.state.isChecked) {
			return true;
		}

		return false;
	}

	render() {
		return (
			<form className="form-horizontal floating-labels" id="loginform">
				<Link to="/" className="text-center db">
					<img src="./assets/images/logo-icon.png" alt="Home" /><br/><img src="./assets/images/logo-text.png" alt="Home" /></Link>

				<div className="text-center">
						<h3 className="box-title m-t-40 m-b-0">Create a Tagpros Account</h3>
						<small>Hello Tagpros Learner! Kindly fill up the form below to begin your Tagpros Education journey.</small>
				</div>

				<div class="register form-group m-t-40">
					<div class="row">
						<Input name="firstName" placeholder={"First Name"} customStyle={{layout: "col-md-6"}} type={"text"} hasIcon={false}
							handleChange={this.props.handleChange} validationFields={this.state.validationFields} 
							onBlurValidate={this.onBlurValidate} />
						<Input name="lastName" placeholder={"Last Name"} customStyle={{layout: "col-md-6"}} type={"text"} hasIcon={false}
							handleChange={this.props.handleChange} validationFields={this.state.validationFields}
							onBlurValidate={this.onBlurValidate} />								
					</div>
				</div>
				<Input name="email" placeholder={"Email"} type={"text"}  hasIcon={false}
								handleChange={this.props.handleChange} validationFields={this.state.validationFields}
								onBlurValidate={this.onBlurValidate} />			
				<Input name="password" placeholder={"Password"} type={"password"}  hasIcon={false}
								handleChange={this.props.handleChange} validationFields={this.state.validationFields} 
								onBlurValidate={this.onBlurValidate} />	
				<Input name="confirmPassword" placeholder={"Confirm Password"} type={"password"}  hasIcon={false} 
								handleChange={this.props.handleChange} validationFields={this.state.validationFields}
								onBlurValidate={this.onBlurValidate} />	

				{/** Teacher/Learner Switch */}
				<div className="w-100 p-b-20">I am signing up as a:</div>
				<LearnerTypes handleChange={this.props.handleChange} />

				<TermsCondition handleCheckbox={this.handleCheckbox}/>

				{/** Next Button */}
				<div className="form-group text-center m-t-20">
					<div className="col-xs-12">
						<button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit" onClick={(e) => this.validateAndContinue(e)} disabled={this.isFormValid()}>Register <i className="fa fa-arrow-right m-l-5"></i></button>
					</div>
				</div>

				{/** Sign-In Link */}
				<div className="form-group m-b-0">
					<div className="col-sm-12 text-center">
							<p className="text-center">Already have an account?<br />
								<Link to="/login" className="text-info m-l-5" ><b>Sign In</b></Link>
							</p>
					</div>
				</div>
			</form>
		)
	}
}

export default Form;