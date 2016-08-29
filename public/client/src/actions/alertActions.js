import * as constants from '../constants/appConstants';

export default {
  setAlert: function(alert) {
    return {
      type: constants.ALERT_SET,
      payload: {
        alert: alert
      }
    };
  }
};
