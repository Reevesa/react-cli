import { combineReducers } from 'redux';

const List = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LIST':
      return action.data;
    case 'DELETE_LIST':
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({ List });