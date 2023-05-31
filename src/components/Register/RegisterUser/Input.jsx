import React from "react";

import { errorMessage } from "../../../validators/errorMessages";
/**
 * Show Input for text/password fields.
 * 
 * @param {string} name 
 * @param {string} placeholder 
 * @param {string} type 
 * @param {object} validationFields object
 * @param {function} handleChange 
 * @param {function} onBlurValidate */
export default class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowPassword: false
		}

		this.onClickShowHidePassword = this.onClickShowHidePassword.bind(this);
		this.passwordShowHide = this.passwordShowHide.bind(this);
		this.handleInputType = this.handleInputType.bind(this);
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

	errorMessage(params) {
		var validationType = this.props.validationFields[params].validationType;

		if(validationType) {
			if(validationType in errorMessage) { 
				if (["too_short", "too_long", "special_char"].includes(validationType)) {
					return this.props.placeholder + errorMessage[validationType] 
				}
				return errorMessage[validationType] 
			};
		}

		else return "";
	}

	hasStyle() {
		var customStyle = this.props.customStyle;
		
		if (customStyle !== undefined && !!Object.keys(customStyle).length) {
			for (const style in customStyle) {
				return customStyle[style];
			}
		}

		return "";
	}

	onClickShowHidePassword() {
		this.setState({isShowPassword: !this.state.isShowPassword})
	}

	passwordShowHide() {
		if(this.props.name === "password" || this.props.name === "confirmPassword") {
			if(!this.state.isShowPassword) {
				return (
					<span className="register input-icon" onClick={this.onClickShowHidePassword}>
						<i className="far fa-eye-slash"></i>
					</span>
				)
			} else {
				return (
					<span className="register input-icon" onClick={this.onClickShowHidePassword}>
						<i className="far fa-eye"></i>
					</span>
				)
			}
		}
	}

	handleInputType() {
		if(this.props.name === "password" || this.props.name === "confirmPassword") {
			if(!this.state.isShowPassword) {
				return "password"
			} else {
				return "text"
			}
		}
		
		return this.props.type;
	}

	render() {
		return (
			<div className={`col-xs-12 ${this.hasStyle()}`}>
				<div className={`form-group ${this.validationFieldColor(this.props.name)} has-feedback`}>
					<input className={`form-control ${this.validationInputIcon(this.props.name)}`} type={this.handleInputType()} 
								placeholder={this.props.placeholder} name={this.props.name} autoComplete={"new-password"} 
								onBlur={this.props.onBlurValidate} onChange={(e) => this.props.handleChange(e)} />
					{this.passwordShowHide()}
					<span className="bar"></span>

					<div className={this.validationMessage(this.props.name)}> 
						{this.errorMessage(this.props.name)} 
					</div>
				</div>
			</div>
		)
	}
}
