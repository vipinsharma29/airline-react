import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import userService from "../../services/user.service";
import ServiceUpdate from './PassengerServiceUpdate';
import SeatChange from './PassengersSeatChange';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'



var passId;
var seatData;
var seatArray = new Array(0);
var fullSeatData = new Array(0);
var fullServiceData = new Array(0);

export default function AdminPage() {

    let history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [selectFilter, setSelectFilter] = useState('');
    const [selectedFlightNo, setSelectedFlightNo] = useState('');

    const [flightDetailsArray, setFlightDetailsArray] = useState([]);
    const [passengersDetailsArray, setAllPassengersDetails] = useState([]);
    const [filterPassengerDetails, setFilterPassengerDetails] = useState([]);

    const [notAssignedInSeat, setNotAssignedInSeat] = useState({});
    const [selectedFlightServices, setSelectedFlightServices] = useState({});

    const [serviceUpdate, setServiceUpdate] = useState(false);
    const [flightSelected, setFlightSelected] = useState(false);
    const [flightRowAlert, setFlightRowAlert] = useState(true);
    const [closePassTab, setClosePassTab] = useState(true);
    const [updateSeat, setUpdateSeat] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3002/flights").then(res => res.json()).then(json => {
            setFlightDetailsArray(json);
        });

        getPassengers();

        fetch("http://localhost:3002/checkInSeat").then(res => res.json()).then(seatJson => {
            fullSeatData = seatJson;
        });

        fetch("http://localhost:3002/services").then(res => res.json()).then(serviceJson => {
            fullServiceData = serviceJson;
        });

    }, []);

    const getPassengers = () => {
        fetch("http://localhost:3002/passengers").then(res => res.json()).then(json => {
            setAllPassengersDetails(json);
        });
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
        if (event.target.value === 0) {
            history.push({ pathname: '/detail-seat-map', state: { fullSeatData, selectedFlightNo } });
        }
        else if (event.target.value === 1) {
            history.push({ pathname: '/speacial-meals-seat-map', state: { passengersDetailsArray, selectedFlightNo } })
        }
        else if (event.target.value === 2) {
            history.push({ pathname: '/check-in-out-window', state: { passengersDetailsArray, selectedFlightNo } })
        }
    };

    const flightRowSelected = (e) => {
        setFlightSelected(true);
        setUpdateSeat(false);
        setServiceUpdate(false);
        setSelectedFlightNo(e.toString());
        setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === e.toString()));

        getPassengers();
    }

    const handleFilterSelectChange = (event) => {
        setSelectFilter(event.target.value);
        if (event.target.value === 'wheelChair') {
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo).filter(row => row.wheelchairRequired));
        } else if (event.target.value === 'checkedIn') {
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo).filter(row => row.checkedIn));
        } else if (event.target.value === 'infants') {
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo).filter(row => row.infants));
        } else if (event.target.value === 'reset') {
            setSelectFilter('');
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo));
        }
    };

    const handleSeatChange = (id) => {
        passId = id;
        seatArray = [];
        setFlightSelected(false);
        fullSeatData.forEach(fSeat => {
            if (fSeat.id.toString() === passengersDetailsArray[id - 1].fid) {
                setNotAssignedArray(fSeat);
            }
        });
        setUpdateSeat(true);
    }

    function setNotAssignedArray(sData) {
        sData.seatDetail.forEach(seat => {
            if (seat.assigned === false && seat.checkedIn === false) {
                seatArray.push(seat.seatNo);
            }
        });
        setNotAssignedInSeat(seatArray);
    }

    const saveNewSeatData = (seatNo) => {
        fullSeatData.forEach(fSeat => {
            if (fSeat.id.toString() === passengersDetailsArray[passId - 1].fid) {
                fSeat.seatDetail.forEach(seat => {
                    if (seat.seatNo === seatNo) {
                        seat.assigned = true;
                        seatData = fSeat;
                    }
                    if (seat.seatNo === passengersDetailsArray[passId - 1].seatNo) {
                        seat.assigned = false;
                        seat.checkedIn = false;
                        seatData = fSeat;
                    }
                });
            }
        });
        var updatedPassengerObj = passengersDetailsArray[passId - 1];
        updatedPassengerObj.seatNo = seatNo;
        userService.updateCheckInSeatDetails(seatData, seatData.id);
        userService.updatePassengersDetails(updatedPassengerObj, updatedPassengerObj.id);
        setFlightSelected(false);
        setUpdateSeat(false);
    }

    const cancleUpdateChanges = () => {
        setFlightSelected(true);
        setUpdateSeat(false);
        setServiceUpdate(false);
    }

    const handleServiceUpdate = (id) => {
        passId = id;
        fullServiceData.forEach(service => {
            if (service.id.toString() === passengersDetailsArray[id - 1].fid) {
                setSelectedFlightServices(service);
            }
        });
        setFlightSelected(false);
        setServiceUpdate(true);
        setUpdateSeat(false);
    }

    const saveServiceUpdate = (serviceData) => {
        if (serviceData.selectAnchillaryService !== '' || serviceData.selectAnchillaryService !== 'null') {
            passengersDetailsArray[passId - 1].ancillaryServices = serviceData.selectAnchillaryService;
        }
        if (serviceData.selectShopingService !== '' || serviceData.selectAnchillaryService !== 'null') {
            passengersDetailsArray[passId - 1].inflightShop = serviceData.selectShopingService;
        }
        if (serviceData.selectMealsService !== '' || serviceData.selectAnchillaryService !== 'null') {
            passengersDetailsArray[passId - 1].specialMeal = serviceData.selectMealsService;
        }
        userService.updatePassengersDetails(passengersDetailsArray[passId - 1], passengersDetailsArray[passId - 1].id);
        setFlightSelected(false);
        setUpdateSeat(false);
        setServiceUpdate(false);
    }

    return (
        <div className="text-center">
            {flightRowAlert ?
                <Alert severity="info" onClose={() => { setFlightRowAlert(false) }}>
                    To See The Passengers Details for particular Flight<strong> Click On The Flight Row!</strong>
                </Alert> : <div></div>}
            {closePassTab ?
                <Alert severity="info" onClose={() => { setClosePassTab(false) }}>
                    To Close Passengers Tab Click On<strong> Close Button</strong>
                </Alert> : <div></div>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Flight ID</TableCell>
                            <TableCell align="center">Schedule Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Source</TableCell>
                            <TableCell align="center">Destination</TableCell>
                            <TableCell align="center">
                                <Button variant="text" onClick={() => setFlightSelected(false)}>Close</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flightDetailsArray.map(row => (
                            <TableRow key={row.id} onClick={() => flightRowSelected(row.id)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.scheduleDate}</TableCell>
                                <TableCell align="center">{row.time}</TableCell>
                                <TableCell align="center">{row.source}</TableCell>
                                <TableCell align="center">{row.destination}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        id="basic-button"
                                        variant="outlined"
                                        aria-controls="basic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        value={row.id}
                                        onClick={handleMenuClick}
                                    >
                                        Options
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}>
                                        <MenuItem value={'0'} onClick={handleMenuClose}>Detailed Seat Map</MenuItem>
                                        <MenuItem value={'1'} onClick={handleMenuClose}>Special Meals Seat Map</MenuItem>
                                        <MenuItem value={'2'} onClick={handleMenuClose}>Check In/Out Window</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            {flightSelected ? (
                <div className="justify-content-between">
                    <Grid container spacing={1}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <FormGroup variant="filled" >
                                <InputLabel>Filter Who Have on CheckedIn, Require WheelChair, And Have Infants With Them</InputLabel>
                                <Select
                                    value={selectFilter}
                                    label="Filter"
                                    onChange={handleFilterSelectChange}
                                >
                                    <MenuItem value={'checkedIn'}>Has CheckedIn</MenuItem>
                                    <MenuItem value={'wheelChair'}>Required WheelChair</MenuItem>
                                    <MenuItem value={'infants'}>Have Infants With Them</MenuItem>
                                    <MenuItem value={'reset'}>Reset</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">PassPort</TableCell>
                                    <TableCell align="center">Dob</TableCell>
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Seat No</TableCell>
                                    <TableCell align="center">Ancillary</TableCell>
                                    <TableCell align="center">Meals</TableCell>
                                    <TableCell align="center">Item&apos;s</TableCell>
                                    <TableCell align="center">Change/Assign Seat</TableCell>
                                    <TableCell align="center">Update Services</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterPassengerDetails.map(row => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.passport !== null ? row.passport : ''}</TableCell>
                                        <TableCell align="center">{row.dob !== null ? row.dob : 'Empty'}</TableCell>
                                        <TableCell align="center">{row.address !== null ? row.address : 'Empty'}</TableCell>
                                        <TableCell align="center">{row.seatNo !== null ? row.seatNo : 'Not Assigned'}</TableCell>
                                        <TableCell align="center">{row.ancillaryServices !== 'null' ? row.ancillaryServices : ''}</TableCell>
                                        <TableCell align="center">{row.specialMeal !== 'null' ? row.specialMeal : ''}</TableCell>
                                        <TableCell align="center">{row.inflightShop !== 'null' ? row.inflightShop : ''}</TableCell>
                                        <TableCell align="center">
                                            <Fab color="primary" size="small" aria-label="edit" onClick={() => handleSeatChange(row.id)}>
                                                <Edit />
                                            </Fab>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Fab size="small" aria-label="edit" onClick={() => handleServiceUpdate(row.id)}>
                                                <Edit />
                                            </Fab>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                null)}
            {updateSeat ? <SeatChange props={{ notAssignedInSeat, saveNewSeatData, cancleSeatChange: cancleUpdateChanges }} /> : <div></div>}
            {serviceUpdate ? <ServiceUpdate props={{ passengersDetailsArray, passId, selectedFlightServices, cancleUpdateChanges, saveServiceUpdate }} /> : <div></div>}
        </div>
    );
}