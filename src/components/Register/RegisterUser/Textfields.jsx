import React from 'react'
import { errorMessage } from "../../../validators/errorMessages";

export default class Textfields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFieldClicked: false
		}
	}

	validationFieldColor(params) {
		var validationType = this.props.validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) return "has-danger has-error"
			else return "has-success" /**Enable valid field color */
		} 
		else return "" 
	}

	validationMessage(params) {
		var validationType = this.props.validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) return "invalid-feedback";
			else return "valid-feedback";
		}

		else return ""
	}

	validationInputIcon(params) {
		var validationType = this.props.validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) return "is-invalid";
			else return "valid-feedback";
		}

		else return ""
	}

	onClickChangeFC(event) {
		// this.setState({ isFieldClicked: !this.state.isFieldClicked })
	}

	errorMessage(params) {
		var validationType = this.props.validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) return errorMessage[validationType];
		}

		else return ""
	}

	render() {
		return (
			<>
				{/**********************************************************************************Reference */}
				{/**ERROR */}
				{/* <div className="form-group has-danger has-error has-feedback">
					<div className="col-xs-12">
						<input type="text" className="form-control form-control-danger is-invalid" required="required" placeholder="Test" />
						<span className="bar"></span>
						<div className="invalid-feedback">Invalid State</div>
					</div>
				</div> */}
				{/**SUCCESS */}
				{/* <div className="form-group has-success has-feedback">
					<div className="col-xs-12">
						<input type="text" className="form-control is-valid" required="required" placeholder="Test" />
						<span className="bar"></span>
						<div className="valid-feedback">Valid State</div>
					</div>
				</div> */}
				{/**WARNING */}
				{/* <div className="form-group has-warning has-feedback">
					<div className="col-xs-12">
						<input type="text" className="form-control form-control-warning" required="required" placeholder="Test" />
						<span className="bar"></span>
					</div>
				</div> */}
				{/**DEFAULT */}
				{/* <div className="form-group has-feedback">
					<div className="col-xs-12">
						<input type="text" className="form-control" required="required" placeholder="Test" />
						<span className="bar"></span>
					</div>
				</div> */}
				<div className={`form-group m-t-40 ${this.validationFieldColor("firstName")} has-feedback`}>
					<div className="col-xs-12">
						<input className={`form-control ${this.validationInputIcon("firstName")}`} type="text" required="required" placeholder="First Name" name="firstName" autoComplete={"off"} onBlur={this.props.onBlurValidate} onChange={this.props.handleChange} />
						<span className="bar"></span>
						<div className={this.validationMessage("firstName")}>{this.errorMessage("firstName")}</div>
					</div>
				</div>
				<div className={`form-group ${this.validationFieldColor("lastName")} has-feedback`}>
					<div className="col-xs-12">
						<input className={`form-control ${this.validationInputIcon("lastName")}`} type="text" required="required" placeholder="Last Name" name="lastName" autoComplete={"off"} onBlur={this.props.onBlurValidate} onChange={this.props.handleChange} />
						<span className="bar"></span>
						<div className={this.validationMessage("lastName")}>{this.errorMessage("lastName")}</div>
					</div>
				</div>
				<div className={`form-group ${this.validationFieldColor("email")} has-feedback`}>
					<div className="col-xs-12">
						<input className={`form-control ${this.validationInputIcon("email")}`} type="text" required="required" placeholder="Email" name="email" autoComplete={"off"} onBlur={this.props.onBlurValidate} onChange={this.props.handleChange} />
						<span className="bar"></span>
						<div className={this.validationMessage("email")}>{this.errorMessage("email")}</div>
					</div>
				</div>				
				<div className={`form-group ${this.validationFieldColor("password")} has-feedback`}>
					<div className="col-xs-12">
						<input className={`form-control ${this.validationInputIcon("password")}`} type="password" required="required" placeholder="Password" name="password" autoComplete={"off"} onBlur={this.props.onBlurValidate} onChange={this.props.handleChange} />
						<span className="bar"></span>
						<div className={this.validationMessage("password")}>{this.errorMessage("password")}</div>
					</div>
				</div>
				<div className={`form-group ${this.validationFieldColor("confirmPassword")} has-feedback`}>
					<div className="col-xs-12">
						<input className={`form-control ${this.validationInputIcon("confirmPassword")}`} type="password" required="required" placeholder="Confirm Password" name="confirmPassword" autoComplete={"off"} onBlur={this.props.onBlurValidate} onChange={this.props.confirmPassword} />
						<span className="bar"></span>
						<div className={this.validationMessage("confirmPassword")}>{this.errorMessage("confirmPassword")}</div>
					</div>
				</div>
				{/**********************************************************************************DEFAULTS */}
		 		{/*<div className="form-group m-t-40">
					<div className="col-xs-12">
						<input className="form-control" type="text" required="required" placeholder="First Name" name="firstName" onChange={this.props.onChangeValidation} />
					</div>
				</div>
				<div className="form-group ">
					<div className="col-xs-12">
							<input className="form-control" type="text" required="required" placeholder="Last Name" name="lastName" onChange={this.props.handleChange} />
					</div>
				</div>
				<div className="form-group ">
					<div className="col-xs-12">
							<input className="form-control" type="text" required="required" placeholder="Email" name="email" onChange={this.props.handleChange} />
					</div>
				</div>
				<div className="form-group ">
					<div className="col-xs-12">
							<input className="form-control" type="password" required="required" placeholder="Password" name="password" onChange={this.props.handleChange} />
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12">
							<input className="form-control" type="password" required="required" placeholder="Confirm Password" name="confirmPassword" onChange={this.props.confirmPassword} />
					</div>
				</div>*/}
			</>
		)
	}
}