import axios from 'axios';
import {
  RESET,
  LOADING_FALSE,
  LOADING,
  SET_AUTHTOKEN,
  SET_GUEST,
  MESSAGE,
  LOGIN_MESSAGE,
  RECOVER_PASSWORD,
  CHANGE_MESSAGE,
  LOG_OUT,
  SET_AUTH
} from './authTypes';



//const BASE_URL = 'http://127.0.0.1:8000/'
let BASE_URL = process.env.BASE_URL

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://167.99.175.200/'
} else {
  BASE_URL = 'http://127.0.0.1:8000/'
}

export const LogOut = () => {
  return {
    type: LOG_OUT
  }
}

export const reset = () => {
  return {
    type: RESET
  }
}

export const updateChangeMessage = (message) => {
  console.log(message);
  return {
    type: CHANGE_MESSAGE,
    payload: message
  }
}

export const updateMessage = (message) => {
  console.log(message);
  return {
    type: MESSAGE,
    payload: message
  }
}

export const createGuest = (dispatch) => {
    console.log('create guest 2222')
    axios.defaults.withCredentials = false;
    const url = `${BASE_URL}api/users/create-guest/`;
    axios.post(url).then((response) => {
      dispatch({ 
        type: SET_AUTH, 
        payload: response.data.token,
        guest: true
       });
    }).catch((error) => {
      console.log(error);
    });
}

export const getInitialState = () => {
  return (dispatch) => {
    console.log('here')
    createGuest(dispatch);
  }
}


export const deleteUser = (thePassword, theNewEmail, token) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/users/delete-user/`;
    axios.post(url, {
      password: thePassword,
      newEmail: theNewEmail
    }).then(() => {
      dispatch({ type: CHANGE_MESSAGE, payload: 'email changed' })
    }).catch((error) => {
      if (error.response.status === 401) {
        createGuest(dispatch);
      }
      dispatch({ type: CHANGE_MESSAGE, payload: 'your email or password were incorrect' });

    })
  }
}

export const sendChangeEmail = (thePassword, theNewEmail, token) => {
  return (dispatch) => {

    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/users/change-data/`;
    axios.post(url, {
      password: thePassword,
      newEmail: theNewEmail
    }).then(() => {
      dispatch({ type: CHANGE_MESSAGE, payload: 'email changed' })
    }).catch((error) => {
      if (error.response.status === 401) {
        createGuest(dispatch);
      }
      dispatch({ type: CHANGE_MESSAGE, payload: 'your email or password were incorrect' })
    })
  }
}

export const sendChangePassword = (currentPassword, theNewPassword, token) => {
  return (dispatch) => {
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/users/change-password/`;
    axios.post(url, {
      password: currentPassword,
      newPassword: theNewPassword
    }).then((response) => {
      console.log(response.data);
      dispatch({ type: CHANGE_MESSAGE, payload: 'password changed' })
    }).catch((error) => {
      if (error.response.status === 401) {
        createGuest(dispatch);
      }
      dispatch({ type: CHANGE_MESSAGE, payload: 'bad password' })
    })
  }
}


export const recoverPassword = (theemail, token) => {
  return (dispatch) => {
    console.log(theemail)
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/users/recover-password/`;
    axios.post(url, {
      email: theemail
    }).then((response) => {
      console.log(response.data);
      dispatch({ type: RECOVER_PASSWORD, payload: 'email sent' })
    }).catch((error) => {
      if (error.response.status === 401) {
        createGuest(dispatch);
      }
      dispatch({ type: RECOVER_PASSWORD, payload: 'we did not find that email please message the admins' })
    })
  }
}


export const loginUser = (theemail, thepassword, token) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/users/login/`;
    axios.post(url, {
      email: theemail,
      password: thepassword
    }).then((response) => {
      dispatch({ type: SET_AUTHTOKEN, payload: response.data.token });
      dispatch({ type: SET_GUEST, payload: false });
      dispatch({ type: LOGIN_MESSAGE, payload: 'you are now logged in' })
    }).catch((error) => {
      if (error.response.status === 401) {
        createGuest(dispatch);
      }
      dispatch({ type: LOGIN_MESSAGE, payload: 'there was a problem with your email or password' })
    })
  }
}

export const sendCreateAccount = (theemail, thepassword, token) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/users/create-user/`;
    axios.post(url, {
      email: theemail,
      password: thepassword
    }).then((response) => {
      dispatch({ type: SET_AUTH, payload: response.data.token, guest: false });
      dispatch({ type: MESSAGE, payload: 'success! email sent' })
    }).catch((error) => {
      if (error.response.status === 401) {
        createGuest();
      }
      console.log(error);
    })
  }
}

export const deleteGuest = (token) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/users/delete-guest/`;
    axios.delete(url).then(() => {
      dispatch({ type: LogOut })
    }).catch((error) => {
      if (error.response.status === 401) {
        createGuest();
      }
      dispatch({ type: LogOut })
    })
  }
}
