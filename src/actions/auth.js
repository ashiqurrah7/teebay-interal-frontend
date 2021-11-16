import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import oauth from "axios-oauth-client";
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
        try {
          const res = await axios.get('http://localhost:3000/user/me');
          console.log("user ===>", res.data)
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
}

//Register User
export const registerUser =
  (formData) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("http://localhost:3000/users", formData, config);

      dispatch({
          type:REGISTER_SUCCESS,
          payload: res
      });
      dispatch(login(formData));
      dispatch(loadUser());
    } catch (err) {
        console.log(err)

        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
        // }

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
    // const body = JSON.stringify({ identifier:email, password });

    try {
      const getOwnerCredentials = oauth.client(axios.create(), {
        url: 'http://localhost:3000/oauth/token',
        grant_type: 'password',
        client_id: 'NU9QdzLndUBkvzhiRYKtNiNVcZBW06Gf0ZMNWdS8Rm8',
        client_secret: 'JaJ6c4oeaCFujBrP8t7D1wtWIQggt-Yc3bzWXbD1TuI',
        email: email,
        password: password,
        scope: 'read write'
      });
      // const res = await axios.post("http://localhost:1337/auth/local", body, config);
      const res = await getOwnerCredentials();
      dispatch({
          type:LOGIN_SUCCESS,
          payload: res
      });

      dispatch(loadUser());
    } catch (err) {
        const errors = err;

        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
        // }

        dispatch({
            type: LOGIN_FAIL,
        })
    }
  };

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({type: LOGOUT});
};