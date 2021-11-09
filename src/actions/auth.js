import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from "./types";

//Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:1337/users/me');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
}

//Register User
export const register =
  ({ firstName, lastName, address, email, password, phone }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ firstName, lastName, address, email, password, phone });

    try {
      const res = await axios.post("http://localhost:1337/users", body, config);

      dispatch({
          type:REGISTER_SUCCESS,
          payload: res.data
      });

      dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        })
    }
  };

//Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //remember to change after rails is fixed
    const body = JSON.stringify({ identifier:email, password });

    try {
      const res = await axios.post("http://localhost:1337/auth/local", body, config);

      dispatch({
          type:LOGIN_SUCCESS,
          payload: res.data
      });

      dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        })
    }
  };

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({type: LOGOUT});
};