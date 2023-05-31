import React from 'react'
import { Link } from "react-router-dom"

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.validateForm = this.validateForm.bind(this);
	}

	validateForm(event) {
		var form = event.target.form;
		var isValid = true;

		for (var element of form) {
			if (['text', 'password'].includes(element.type)) {
				if (element.value === '') {
					isValid = false;
					alert("Missing fields!");
					return;
				}
			}
		}

		if (isValid) {
			event.preventDefault(); // prevent input type submit in redirecting.
			this.props.submitRegistration();
		}
	}

	render() {
		return (
			<div className="col-lg-12 col-xl-6">
				<form className="form-horizontal form-material" id="loginform">
					<a href="#!" className="text-center db"><img src="./assets/images/logo-icon.png" alt="Home" /><br/><img src="./assets/images/logo-text.png" alt="Home" /></a>
					<h3 className="box-title m-t-40 m-b-0">What Are You Passionate About?</h3><small>Let us know what you are passionate about! Select up to 5 subjects, or search from our database below.</small>
					
					<div className="form-group m-t-40">
						<div className="col-xs-12">
							<input className="form-control" type="text" name="passion" required="required" placeholder="Search a subject or field here" />
						</div>
					</div>
					
					<div className="form-group text-center m-t-40">
						<div className="col-xs-12">
							<button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit" onClick={this.validateForm}>Next <i className="fa fa-arrow-right m-l-5"></i></button>
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
			</div>
		)
	}
}
export default Form;