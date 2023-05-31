import React from 'react'

class TermsCondition extends React.Component {
	render() {
		return (
			<div className="form-group">
				<div className="col-md-12 m-t-20">
					<div className="checkbox checkbox-primary p-t-0 font-14">
							<input id="checkbox-signup" type="checkbox" onClick={this.props.handleCheckbox}/>
							<label htmlFor="checkbox-signup"> <small>I agree to all the <a href="/">Terms & Conditions</a></small></label>
					</div>
				</div>
			</div>
		)
	}
}
export default TermsCondition;