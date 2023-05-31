import { connect } from "react-redux";
import TeacherMasterlist from "../component";
import { getAllTeachers, submitTeacherReview } from "../../../../../api/teacher";
import { getEmailTemplates } from "api/email-template";

const mapStateToProps = (state) => {
	const teachers = state.teacher.getIn(['applications', 'teacher']);
	const loading = state.uiElements.getIn(['loadingScreen']);
	const emailTemplates = state.emailTemplate.getIn(['data', 'templates']);
	const userType = state.auth.accountType;
	
	const data = {
		teachers,
		emailTemplates
	}
	
	return {
		userType,
		loading,
		data,
	}
};

const mapDispatchToProps = (dispatch) => {
  return {
	getAllTeachers: (callback) => getAllTeachers(dispatch, (status) => {
		callback(status);
	}),
	submitTeacherReview: (args, callback) => submitTeacherReview(dispatch, args, (status) => {
		callback(status);
	}),
	getEmailTemplates: (callback) => getEmailTemplates(dispatch, (status) => {
		callback(status);
	}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherMasterlist);