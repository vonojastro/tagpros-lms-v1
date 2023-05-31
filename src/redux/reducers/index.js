import { combineReducers } from 'redux';
import auth from '../reducers/auth.js';
import admin from '../reducers/admin';
import teacherApp from '../reducers/teacherApp';
import learnerInfo from '../reducers/learnerInfo';
import registration from '../reducers/registration';
import uiElements from '../reducers/ui-elements';
import teacher from '../reducers/teacher';
import learners from '../reducers/learners';
import classes from '../reducers/classes';
import learnersSchedules from '../reducers/learnersSchedules';
import account from '../reducers/account';
import emailTemplate from '../reducers/email-template';
import payment from '../reducers/payment';
import cart from '../reducers/cart';
import discount from '../reducers/discount';
import messages from '../reducers/messages';
import announcement from '../reducers/announcement';
import mailView from '../reducers/mailView';
import webinar from '../reducers/webinar';
import pricing from '../reducers/pricing';
import notification from '../reducers/notification';
import schoolLeader from '../reducers/schoolLeader';
import meetings from '../reducers/meetings';

export default combineReducers({
  auth,
  admin,
  account,
  registration,
  teacherApp,
  uiElements,
  teacher,
  classes,
  learnerInfo,
  learners,
  learnersSchedules,
  emailTemplate,
  payment,
  cart,
  discount,
  messages,
  announcement,
  mailView,
  webinar,
  pricing,
  notification,
  schoolLeader,
  meetings
});
