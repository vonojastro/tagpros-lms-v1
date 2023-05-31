import React from 'react'
import Form from './Form';
import SideImages from './SideImages';

class RegisterPassion extends React.Component {
	render() {
		if (this.props.currentStep !== 2) {
      return null;
		}

		return (
			<>
				<Form submitRegistration={this.props.submitRegistration} />
				<SideImages />
			</>
		)
	}
}
export default RegisterPassion;