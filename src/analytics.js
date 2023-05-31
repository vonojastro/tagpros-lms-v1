import ReactGA from "react-ga"
 
const TRACKING_ID = process.env.REACT_APP_GOOGLE_TRACKING_ID;
 
function init() {
  // Enable debug mode on the local development environment
  const isDev = !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === "Development"
  ReactGA.initialize(TRACKING_ID, { debug: isDev })
}
 
function sendEvent(payload) {
  ReactGA.event(payload)
}
 
function sendPageview(path) {
  ReactGA.set({ page: path })
  ReactGA.pageview(path)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  init,
  sendEvent,
  sendPageview,
}