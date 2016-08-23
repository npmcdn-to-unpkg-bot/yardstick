import * as constants from '../reducers/constants';

export default {
  blockDates: (date) => {
    return {
      type: constants.BLOCK_DATE,
      payload: date
    }
  },

  selectDate: (date) => {
    return {
      type: constants.SELECT_DATE,
      payload: date
    }
  },

  reserve: (data) => {
    return {
      type: constants.RESERVE,
      payload: data
    }
  },

  confirmRes: (res) => {
    return {
      type: constants.CONFIRM_RES,
      payload: res
    }
  }
}
