import React from "react";

import RegisterUser from "./RegisterUser/RegisterUser";
import RegisterPassion from "./RegisterPassion/RegisterPassion";

 class Register extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			currentStep: 1,
			name: "",
			email: "",
			password: "",
			acc_type: "learner"
		}
		this.handleChange = this.handleChange.bind(this);
		this.nextFillUpForm = this.nextFillUpForm.bind(this);

	}
	
	handleChange(event) {
		const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
	};

	nextFillUpForm(val) {
		this.setState({ currentStep: val })
	};

	render() {
		return (
			<section id="wrapper" className="login-register login-sidebar" style={{ backgroundImage: "url(./assets/images/loginbg01.png)" }}>
				<div className="login-box login-box-left card">
					<div className="card-body">
							<div className="row w-100 h-100" style={{ margin: "0 auto" }}>
								<RegisterUser currentStep={this.state.currentStep} password={this.state.password}
															nextFillUpForm={this.nextFillUpForm} handleChange={this.handleChange}/>

								<RegisterPassion currentStep={this.state.currentStep} nextFillUpForm={this.nextFillUpForm} />
							</div>
					</div>
				</div>
			</section>
		)
	};
}

export default Register;