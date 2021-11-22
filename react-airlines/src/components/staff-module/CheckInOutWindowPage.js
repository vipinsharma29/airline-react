import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import userService from '../../services/user.service';

import './css/CheckInOutWindow.css';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/icons/CloudCircle';


var seatDataObj;
var passengersDataObj;
var passengersArray = new Set();
var seatArray = new Set();

export default function CheckInOutWindowPage(props) {

    let history = useHistory();

    const flightNo = useRef(props.location.state.selectedFlightNo);

    useEffect(() => {
        fetch("http://localhost:3002/checkInSeat/" + flightNo.current).then(res => res.json()).then(json => {
            seatDataObj = json;
            json.seatDetail.forEach(seat => {
                if (seat.assigned === true) {
                    document.getElementById(seat.seatNo + 'L').style.background = 'lightblue';
                }
                if (seat.assigned === true && seat.checkedIn === true) {
                    document.getElementById(seat.seatNo + 'L').style.background = '#bada55';
                }
                if (seat.assigned === false) {
                    document.getElementById(seat.seatNo + 'L').disabled = true;
                }
            });
        });

        fetch("http://localhost:3002/passengers").then(res => res.json()).then(json => {
            passengersDataObj = json;
        });
    }, []);

    const ex = (event) => {
        seatDataObj.seatDetail.forEach(seat => {
            if (seat.seatNo === event.target.htmlFor && seat.assigned != false) {
                if (seat.checkedIn === false) {
                    seat.checkedIn = true;
                    document.getElementById(seat.seatNo + 'L').style.background = '#bada55';
                    seatArray.add(seat.seatNo);
                } else {
                    seat.checkedIn = false;
                    document.getElementById(seat.seatNo + 'L').style.background = 'lightblue';
                    seatArray.add(seat.seatNo);
                }
            }
        });
    }

    const nAssigned = { color: 'rgb(128, 127, 127)' };
    const checkIn = { color: '#bada55' };
    const assigned = { color: 'lightblue' };

    const back = () => {
        history.push('/staffPage');
    }

    const saveData = () => {
        passengersDataObj.forEach(passenger => {
            if (passenger.fid === flightNo.current) {
                seatArray.forEach(seat => {
                    if (seat === passenger.seatNo) {
                        seatDataObj.seatDetail.forEach(data => {
                            if (data.seatNo === seat) {
                                passenger.checkedIn = data.checkedIn;
                                passengersArray.add(passenger.id);
                            }
                        });
                    }
                });
            }
        });

        passengersDataObj.forEach(passenger => {
            passengersArray.forEach(id => {
                if (passenger.id === id) {
                    userService.updatePassengersDetails(passenger, id).then(() => setTimeout());
                }
            });
        });

        userService.updateCheckInSeatDetails(seatDataObj, seatDataObj.id).then(() => {
            back();
        });
    }

    const setTimeout = (() => { }, 1000);

    return (
        <div>
            <Button variant='contained' onClick={back}>Back</Button><br /><br />
            <div className="d-flex justify-content-center">
                <Box style={nAssigned} />
                <h6>Seats Not Assigned</h6> &nbsp;&nbsp;&nbsp;
                <Box style={checkIn} />
                <h6>Checked-In</h6> &nbsp;&nbsp;&nbsp;
                <Box style={assigned} />
                <h6>Not Checked-In</h6>
            </div>
            <div className="d-flex justify-content-center">
                <Button variant='contained' onClick={saveData}>Save</Button>&nbsp;&nbsp;&nbsp;
                <Button variant='contained' onClick={back}>Cancel</Button>
            </div>
            <div className="plane">
                <div className="cockpit">
                </div>
                <ol className="cabin fuselage">
                    <li className="row--1">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="1A" disabled />
                                <label id="1AL" onClick={ex} htmlFor="1A">1A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1B" disabled />
                                <label id="1BL" onClick={ex} htmlFor="1B">1B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1C" disabled />
                                <label id="1CL" onClick={ex} htmlFor="1C">1C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1D" disabled />
                                <label id="1DL" onClick={ex} htmlFor="1D">1D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1E" disabled />
                                <label id="1EL" onClick={ex} htmlFor="1E">1E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1F" disabled />
                                <label id="1FL" onClick={ex} htmlFor="1F">1F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--2">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="2A" disabled />
                                <label id="2AL" onClick={ex} htmlFor="2A">2A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2B" disabled />
                                <label id="2BL" onClick={ex} htmlFor="2B">2B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2C" disabled />
                                <label id="2CL" onClick={ex} htmlFor="2C">2C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2D" disabled />
                                <label id="2DL" onClick={ex} htmlFor="2D">2D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2E" disabled />
                                <label id="2EL" onClick={ex} htmlFor="2E">2E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2F" disabled />
                                <label onClick={ex} htmlFor="2F" id="2FL">2F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--3">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="3A" disabled />
                                <label onClick={ex} htmlFor="3A" id="3AL">3A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3B" disabled />
                                <label onClick={ex} htmlFor="3B" id="3BL">3B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3C" disabled />
                                <label onClick={ex} htmlFor="3C" id="3CL">3C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3D" disabled />
                                <label onClick={ex} htmlFor="3D" id="3DL">3D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3E" disabled />
                                <label onClick={ex} htmlFor="3E" id="3EL">3E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3F" disabled />
                                <label onClick={ex} htmlFor="3F" id="3FL">3F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--4">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="4A" disabled />
                                <label onClick={ex} htmlFor="4A" id="4AL">4A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4B" disabled />
                                <label onClick={ex} htmlFor="4B" id="4BL">4B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4C" disabled />
                                <label onClick={ex} htmlFor="4C" id="4CL">4C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4D" disabled />
                                <label onClick={ex} htmlFor="4D" id="4DL">4D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4E" disabled />
                                <label onClick={ex} htmlFor="4E" id="4EL">4E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4F" disabled />
                                <label onClick={ex} htmlFor="4F" id="4FL">4F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--5">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="5A" disabled />
                                <label onClick={ex} htmlFor="5A" id="5AL">5A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5B" disabled />
                                <label onClick={ex} htmlFor="5B" id="5BL">5B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5C" disabled />
                                <label onClick={ex} htmlFor="5C" id="5CL">5C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5D" disabled />
                                <label onClick={ex} htmlFor="5D" id="5DL">5D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5E" disabled />
                                <label onClick={ex} htmlFor="5E" id="5EL">5E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5F" disabled />
                                <label onClick={ex} htmlFor="5F" id="5FL">5F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--6">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="6A" disabled />
                                <label onClick={ex} htmlFor="6A" id="6AL">6A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6B" disabled />
                                <label onClick={ex} htmlFor="6B" id="6BL">6B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6C" disabled />
                                <label onClick={ex} htmlFor="6C" id="6CL">6C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6D" disabled />
                                <label onClick={ex} htmlFor="6D" id="6DL">6D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6E" disabled />
                                <label onClick={ex} htmlFor="6E" id="6EL">6E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6F" disabled />
                                <label onClick={ex} htmlFor="6F" id="6FL">6F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--7">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="7A" disabled />
                                <label onClick={ex} htmlFor="7A" id="7AL">7A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7B" disabled />
                                <label onClick={ex} htmlFor="7B" id="7BL">7B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7C" disabled />
                                <label onClick={ex} htmlFor="7C" id="7CL">7C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7D" disabled />
                                <label onClick={ex} htmlFor="7D" id="7DL">7D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7E" disabled />
                                <label onClick={ex} htmlFor="7E" id="7EL">7E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7F" disabled />
                                <label onClick={ex} htmlFor="7F" id="7FL">7F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--8">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="8A" disabled />
                                <label onClick={ex} htmlFor="8A" id="8AL">8A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8B" disabled />
                                <label onClick={ex} htmlFor="8B" id="8BL">8B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8C" disabled />
                                <label onClick={ex} htmlFor="8C" id="8CL">8C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8D" disabled />
                                <label onClick={ex} htmlFor="8D" id="8DL">8D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8E" disabled />
                                <label onClick={ex} htmlFor="8E" id="8EL">8E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8F" disabled />
                                <label onClick={ex} htmlFor="8F" id="8FL">8F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--9">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="9A" disabled />
                                <label onClick={ex} htmlFor="9A" id="9AL">9A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9B" disabled />
                                <label onClick={ex} htmlFor="9B" id="9BL">9B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9C" disabled />
                                <label onClick={ex} htmlFor="9C" id="9CL">9C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9D" disabled />
                                <label onClick={ex} htmlFor="9D" id="9DL">9D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9E" disabled />
                                <label onClick={ex} htmlFor="9E" id="9EL">9E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9F" disabled />
                                <label onClick={ex} htmlFor="9F" id="9FL">9F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--10">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="10A" disabled />
                                <label onClick={ex} htmlFor="10A" id="10AL">10A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10B" disabled />
                                <label onClick={ex} htmlFor="10B" id="10BL">10B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10C" disabled />
                                <label onClick={ex} htmlFor="10C" id="10CL">10C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10D" disabled />
                                <label onClick={ex} htmlFor="10D" id="10DL">10D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10E" disabled />
                                <label onClick={ex} htmlFor="10E" id="10EL">10E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10F" disabled />
                                <label onClick={ex} htmlFor="10F" id="10FL">10F</label>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        </div>);
}