import axios from "axios";

const API_URL = "http://localhost:3002/";

const loginAdmin = () => {
  return axios
    .get(API_URL + "admin/")
    .then((response) => {

      return response.data;
      // if (response.data.accessToken) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }

    });
};

const loginStaff = (username) => {
  return axios
    .get(API_URL + "staff/" + username)
    .then((response) => {
      return response.data;
    });
};

export default {
  loginStaff,
  loginAdmin
};
