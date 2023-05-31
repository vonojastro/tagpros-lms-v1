import React from 'react'

class Switch extends React.Component {
	render() {
		return (
			<div className="btn-group btn-group-toggle w-100" data-toggle="buttons">
				<label className="btn btn-secondary active shadow-none">
					<input type="radio" name="type" value="learner" id="option1" autoComplete="off" defaultChecked onClick={this.props.handleChange}/> Learner
				</label>
				<label className="btn btn-secondary shadow-none">
					<input type="radio" name="type" value="teacher" id="option2" autoComplete="off" onClick={this.props.handleChange}/> Teacher
				</label>
			</div>
		)
	}
}
export default Switch;