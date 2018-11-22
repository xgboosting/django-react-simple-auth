import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import messageReducer from './messageReducer';


export default combineReducers({
  auth: AuthReducer,
  message: messageReducer,
});
