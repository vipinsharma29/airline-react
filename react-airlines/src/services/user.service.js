import axios from "axios";

const API_URL = "http://localhost:3002/";

const updateServicesDetails = (obj, fid) => {
    return axios.put(API_URL + "services/" + fid, obj);
};

const updatePassengersDetails = (obj, pid) => {
    return axios.put(API_URL + "passengers/" + pid, obj);
};

const addPassengersDetails = (obj) => {
    return axios.post(API_URL + "passengers", obj);
};

const updateCheckInSeatDetails = (obj, id) => {
    return axios.put(API_URL + "checkInSeat/" + id, obj);
};

export default {
    updateServicesDetails,
    updatePassengersDetails,
    updateCheckInSeatDetails,
    addPassengersDetails
};