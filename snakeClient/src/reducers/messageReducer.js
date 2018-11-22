import {
  LOADING_FALSE,
  LOADING,
  MESSAGE,
  LOGIN_MESSAGE,
  RECOVER_PASSWORD,
  CHANGE_MESSAGE
} from '../actions/authTypes';

let initialState = { message: '', loading: true, loginMessage: '', recoverMessage: '', changeMessage: '' }

export default ( state = initialState, action) => {
  switch (action.type) {
    case MESSAGE:
      return {...state, message: action.payload }
    case LOADING:
      return {...state, loading: true }
    case LOADING_FALSE:
      return {...state, loading: false }
    case LOGIN_MESSAGE:
      return {...state, loginMessage: action.payload }
    case RECOVER_PASSWORD:
       return {...state, recoverMessage: action.payload }
    case CHANGE_MESSAGE:
       return {...state, changeMessage: action.payload }
    default:
      return state
  }
}