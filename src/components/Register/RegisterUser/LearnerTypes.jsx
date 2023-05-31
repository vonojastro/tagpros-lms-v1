import React from 'react'

export class LearnerTypes extends React.Component {
	render() {
		return (
			<>
				<div className="btn-group btn-group-toggle w-100 d-none d-md-block" data-toggle="buttons">
					<label className="btn btn-secondary active shadow-none m-0" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type" value="family" id="option1" autocomplete="off" checked onClick={this.props.handleChange}/> 
							<img src="./assets/images/reg01.png" style={{width: "120px", marginBottom: "10px"}} alt="Family Account" /><br />
							<b>Family Account</b><br />
							<small className="text-center">Recommended for parents and guardians!</small>
					</label>
					<label className="btn btn-secondary shadow-none m-0" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type"  value="learner" id="option2" autocomplete="off" onClick={this.props.handleChange}/>
							<img src="./assets/images/reg02.png" style={{width: "120px", marginBottom: "10px"}} alt="Solo Learner" /><br />
							<b>Solo Learner</b><br />
							<small className="text-center">For users who want control over their education</small>
					</label>
					<label className="btn btn-secondary shadow-none m-0" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type"  value="teacher" id="option2" autocomplete="off" onClick={this.props.handleChange}/>
							<img src="./assets/images/reg03.png" style={{width: "120px", marginBottom: "10px"}} alt="Teacher"/><br />
							<b>Teacher</b><br />
							<small className="text-center">Become a Tagpros Teacher!</small>
					</label>
					<label className="btn btn-secondary shadow-none m-0" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type"  value="leader" id="option2" autocomplete="off" onClick={this.props.handleChange}/>
							<img src="./assets/images/reg04.jpg" style={{width: "120px", height:"120px", objectFit:"cover", marginBottom: "10px"}} alt="Teacher"/><br />
							<b>School Leader</b><br />
							<small className="text-center">Join and Observe our Teachers!</small>
					</label>
				</div>
				{/**MOBILE LAYOUT */}
				<div className="btn-group btn-group-toggle w-100 d-block d-md-none" data-toggle="buttons">
					<label className="btn btn-secondary active shadow-none w-100" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type" value="family" id="option1" autocomplete="off" checked onClick={this.props.handleChange}/> 
							<img src="./assets/images/reg01.png" style={{width: "120px", marginBottom: "10px"}} alt="Family Account" /><br />
							<b>Family Account</b><br />
							<small className="text-center">Recommended for parents and guardians!</small>
					</label>
					<label className="btn btn-secondary shadow-none w-100 my-2" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type"  value="learner" id="option2" autocomplete="off" onClick={this.props.handleChange}/>
						<img src="./assets/images/reg02.png" style={{width: "120px", marginBottom: "10px"}} alt="Solo Learner" /><br />
							<b>Solo Learner</b><br />
							<small className="text-center">For users who want control over their education</small>
					</label>
					<label className="btn btn-secondary shadow-none w-100" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type"  value="teacher" id="option2" autocomplete="off" onClick={this.props.handleChange}/>
						<img src="./assets/images/reg03.png" style={{width: "120px", marginBottom: "10px"}} alt="Teacher"/><br />
							<b>Teacher</b><br />
							<small className="text-center">Become a Tagpros Teacher!</small>
					</label>
					<label className="btn btn-secondary shadow-none w-100" style={{width: "25%", borderRadius: "4px"}}>
						<input type="radio" name="type"  value="leader" id="option2" autocomplete="off" onClick={this.props.handleChange}/>
						<img src="./assets/images/reg04.jpg" style={{width: "120px", height:"120px", objectFit:"cover", marginBottom: "10px"}} alt="Teacher"/><br />
						<b>School Leader</b><br />
							<small className="text-center">Join and Observe our Teachers!</small>
					</label>
				</div>
			</>
		)
	}
}

export default LearnerTypes
