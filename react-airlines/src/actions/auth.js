import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import AuthService from "../services/auth.service";

export const loginAdmin = (username, password) => (dispatch) => {
  return AuthService.loginAdmin().then(
    (response) => {
      if (response.id === username && response.password === password) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response },
        });
        return Promise.resolve();
      } else {

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: 'UserName or Password Invalid Please Fill Correct Data',
        });

        return Promise.reject();
      }

    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const loginStaff = (username, password) => (dispatch) => {
  return AuthService.loginStaff(username).then(
    (response) => {
      if (response.id === username && response.password === password) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response },
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: 'UserName or Password Invalid Please Fill Correct Data',
        });

        return Promise.reject();
      }

    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {

  dispatch({
    type: LOGOUT,
  });
};


// export const register = (username, email, password) => (dispatch) => {
//   return AuthService.register(username, email, password).then(
//     (response) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: response.data.message,
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: REGISTER_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };