import ls from 'local-storage';

const getRememberedEmail = () => {
  const val = ls.get('tagpros-education-user-email');
  return !val || val === 'undefined' ? '' : val;
};
const setRegistrationId = registrationId =>
  ls.set('tagpros-education-registration-id', registrationId);
const getRegistrationId = () => ls.get('tagpros-education-registration-id');

const getHasEverLoggedIn = () => {
  const val = ls.get('tagpros-education-has-ever-logged-in');
  if (!val || val === 'undefined') return null;
  return val;
};
const setHasEverLoggedIn = () => {
  ls.set('tagpros-education-has-ever-logged-in', true);
};

export {
  getRememberedEmail,
  setRegistrationId,
  getRegistrationId,
  getHasEverLoggedIn,
  setHasEverLoggedIn
};
