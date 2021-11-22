import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import "./css/FlightMap.css";

import Button from '@material-ui/core/Button';
import CheckBox from '@material-ui/icons/CloudCircle'



export default function DetailedSeatMap(props) {

    let history = useHistory();

    const seats = useRef(props.location.state.fullSeatData.filter(obj => {
        if (obj.id.toString() === props.location.state.selectedFlightNo) {
            return obj;
        }
    }));

    useEffect(() => {
        seats.current[0].seatDetail.forEach(obj => {
            if (obj.assigned === false) {
                document.getElementById(obj.seatNo + 'L').style.background = 'black';
            }
            if (obj.assigned === true) {
                document.getElementById(obj.seatNo + 'L').style.background = 'red';
            }
            if (obj.checkedIn === true && obj.wheelchairRequired === true && obj.infants === true) {
                document.getElementById(obj.seatNo + 'L').style.background = 'darkolivegreen';
            }
            if (obj.checkedIn === true && obj.wheelchairRequired === false && obj.infants === true) {
                document.getElementById(obj.seatNo + 'L').style.background = 'lightgreen';
            }
            if (obj.checkedIn === true && obj.wheelchairRequired === false && obj.infants === false) {
                document.getElementById(obj.seatNo + 'L').style.background = 'rgb(245, 42, 245)';
            }
            if (obj.checkedIn === true && obj.wheelchairRequired === true && obj.infants === false) {
                document.getElementById(obj.seatNo + 'L').style.background = 'rgb(247, 131, 85)';
            }
            if (obj.checkedIn === false && obj.wheelchairRequired === true && obj.infants === true) {
                document.getElementById(obj.seatNo + 'L').style.background = 'lightpink';
            }
            if (obj.checkedIn === false && obj.wheelchairRequired === true && obj.infants === false) {
                document.getElementById(obj.seatNo + 'L').style.background = 'lightblue';
            }
            if (obj.checkedIn === false && obj.wheelchairRequired === false && obj.infants === true) {
                document.getElementById(obj.seatNo + 'L').style.background = 'lightyellow';
            }
        });
    }, []);

    const seatNotAssigned = { color: "black" };
    const seatAssigned = { color: "red" };
    const checkIn = { color: "rgb(245, 42, 245)" };
    const cWI = { color: "darkolivegreen" };
    const cI = { color: "lightgreen" };
    const rCI = { color: "lightpink" };
    const rNC = { color: "lightblue" };
    const oI = { color: "lightyellow" };
    const cW = { color: "rgb(247, 131, 85)" };

    const back = () => {
        history.push('/staffPage');
    }

    return (
        <div>
            <Button variant='contained' onClick={back}>Back</Button><br /><br />
            <div className="d-flex justify-content-center">
                <CheckBox style={seatNotAssigned} />
                <h6>Seat Not Assigned</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CheckBox style={seatAssigned} />
                <h6>Seat Assigned</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CheckBox style={checkIn} />
                <h6>Checked-In</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CheckBox style={cWI} />
                <h6>Checked-In, Required WheelChair, Carrying Infants</h6>
            </div>

            <div className="d-flex justify-content-center">
                <CheckBox style={cI} />
                &nbsp;
                <h6>Checked-In, Carrying Infants</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CheckBox style={rCI} />
                &nbsp;
                <h6>Required WheelChair, Carrying Infants, Not Checked-In</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CheckBox style={rNC} />
                &nbsp;
                <h6>Required WheelChair, Not Checked-In</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div className="d-flex justify-content-center">
                <CheckBox style={oI} />
                &nbsp;
                <h6>Carrying Infants, Not Checked-In</h6>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CheckBox style={cW} />
                &nbsp;
                <h6>Checked-In, Required WheelChair</h6>
            </div>
            <div className="plane">
                <div className="cockpit">
                </div>
                <ol className="cabin fuselage">
                    <li className="row--1">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="1A" disabled />
                                <label id="1AL" htmlFor="1A">1A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1B" disabled />
                                <label id="1BL" htmlFor="1B">1B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1C" disabled />
                                <label id="1CL" htmlFor="1C">1C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1D" disabled />
                                <label id="1DL" htmlFor="1D">1D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1E" disabled />
                                <label id="1EL" htmlFor="1E">1E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="1F" disabled />
                                <label id="1FL" htmlFor="1F">1F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--2">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="2A" disabled />
                                <label id="2AL" htmlFor="2A">2A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2B" disabled />
                                <label id="2BL" htmlFor="2B">2B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2C" disabled />
                                <label id="2CL" htmlFor="2C">2C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2D" disabled />
                                <label id="2DL" htmlFor="2D">2D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2E" disabled />
                                <label id="2EL" htmlFor="2E">2E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="2F" disabled />
                                <label htmlFor="2F" id="2FL">2F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--3">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="3A" disabled />
                                <label htmlFor="3A" id="3AL">3A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3B" disabled />
                                <label htmlFor="3B" id="3BL">3B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3C" disabled />
                                <label htmlFor="3C" id="3CL">3C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3D" disabled />
                                <label htmlFor="3D" id="3DL">3D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3E" disabled />
                                <label htmlFor="3E" id="3EL">3E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="3F" disabled />
                                <label htmlFor="3F" id="3FL">3F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--4">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="4A" disabled />
                                <label htmlFor="4A" id="4AL">4A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4B" disabled />
                                <label htmlFor="4B" id="4BL">4B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4C" disabled />
                                <label htmlFor="4C" id="4CL">4C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4D" disabled />
                                <label htmlFor="4D" id="4DL">4D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4E" disabled />
                                <label htmlFor="4E" id="4EL">4E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="4F" disabled />
                                <label htmlFor="4F" id="4FL">4F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--5">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="5A" disabled />
                                <label htmlFor="5A" id="5AL">5A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5B" disabled />
                                <label htmlFor="5B" id="5BL">5B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5C" disabled />
                                <label htmlFor="5C" id="5CL">5C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5D" disabled />
                                <label htmlFor="5D" id="5DL">5D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5E" disabled />
                                <label htmlFor="5E" id="5EL">5E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="5F" disabled />
                                <label htmlFor="5F" id="5FL">5F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--6">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="6A" disabled />
                                <label htmlFor="6A" id="6AL">6A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6B" disabled />
                                <label htmlFor="6B" id="6BL">6B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6C" disabled />
                                <label htmlFor="6C" id="6CL">6C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6D" disabled />
                                <label htmlFor="6D" id="6DL">6D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6E" disabled />
                                <label htmlFor="6E" id="6EL">6E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="6F" disabled />
                                <label htmlFor="6F" id="6FL">6F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--7">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="7A" disabled />
                                <label htmlFor="7A" id="7AL">7A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7B" disabled />
                                <label htmlFor="7B" id="7BL">7B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7C" disabled />
                                <label htmlFor="7C" id="7CL">7C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7D" disabled />
                                <label htmlFor="7D" id="7DL">7D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7E" disabled />
                                <label htmlFor="7E" id="7EL">7E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="7F" disabled />
                                <label htmlFor="7F" id="7FL">7F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--8">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="8A" disabled />
                                <label htmlFor="8A" id="8AL">8A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8B" disabled />
                                <label htmlFor="8B" id="8BL">8B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8C" disabled />
                                <label htmlFor="8C" id="8CL">8C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8D" disabled />
                                <label htmlFor="8D" id="8DL">8D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8E" disabled />
                                <label htmlFor="8E" id="8EL">8E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="8F" disabled />
                                <label htmlFor="8F" id="8FL">8F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--9">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="9A" disabled />
                                <label htmlFor="9A" id="9AL">9A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9B" disabled />
                                <label htmlFor="9B" id="9BL">9B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9C" disabled />
                                <label htmlFor="9C" id="9CL">9C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9D" disabled />
                                <label htmlFor="9D" id="9DL">9D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9E" disabled />
                                <label htmlFor="9E" id="9EL">9E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="9F" disabled />
                                <label htmlFor="9F" id="9FL">9F</label>
                            </li>
                        </ol>
                    </li>
                    <li className="row--10">
                        <ol className="seats" type="A">
                            <li className="seat">
                                <input type="checkbox" id="10A" disabled />
                                <label htmlFor="10A" id="10AL">10A</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10B" disabled />
                                <label htmlFor="10B" id="10BL">10B</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10C" disabled />
                                <label htmlFor="10C" id="10CL">10C</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10D" disabled />
                                <label htmlFor="10D" id="10DL">10D</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10E" disabled />
                                <label htmlFor="10E" id="10EL">10E</label>
                            </li>
                            <li className="seat">
                                <input type="checkbox" id="10F" disabled />
                                <label htmlFor="10F" id="10FL">10F</label>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        </div>
    );
}