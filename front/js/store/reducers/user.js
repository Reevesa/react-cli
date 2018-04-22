
import { combineReducers } from 'redux';

const loginStatus = (state = { loading: false }, action) => {
  switch (action.type) {
    case 'USER_LOGIN_STATUS':
      return action.data;
    default:
      return state;
  }
};

const changePass = (state = false, action) => {
  switch (action.type) {
    case 'USER_CHANGE_PASSWORD':
      return action.data;
    default:
      return state;
  }
};
  
export default combineReducers({ loginStatus, changePass });