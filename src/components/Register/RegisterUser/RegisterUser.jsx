import React from "react";

import Form from "./Form";
class RegisterUser extends React.Component {
	render() {
		if (this.props.currentStep !== 1) {
      return null;
		}

		return (
			<>
				<div className="col-sm-12">
					<Form nextFillUpForm={this.props.nextFillUpForm} handleChange={this.props.handleChange}
								password={this.props.password} submitRegistration={this.props.submitRegistration}/>
				</div>

				{/** SideHeroImg */}
				{/* <div className="d-none d-xl-block col-xl-6" style={{ backgroundImage: "url(./assets/images/login01.png)", backgroundSize: "cover", overflow: "hidden" }}></div> */}
			</>
		)
	}
}
export default RegisterUser;