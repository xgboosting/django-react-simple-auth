import {
  SET_AUTHTOKEN,
  SET_GUEST,
  LOG_OUT,
  SET_AUTH,
} from '../actions/authTypes';

let initialState = { token: '', guest: true, membership: 'none' }

export default ( state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {...state, token: '', guest: true}
    case SET_AUTHTOKEN:
      return {...state, token: action.payload}
    case SET_GUEST:
      return {...state, guest: action.payload}
    case SET_AUTH:
      return {...state, token: action.payload, guest: action.guest }
    default:
      return state
  }
} 