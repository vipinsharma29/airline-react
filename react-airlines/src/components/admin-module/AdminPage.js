import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import userService from "../../services/user.service";
import UpdatePassengerDetails from "./UpdatePassengersDetails";

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
import Grid from '@material-ui/core/Grid'
import AddPassenger from "./AddPassenger";



var passId;

export default function AdminPage() {

    let history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [flightDetails, setFlightDetails] = useState([]);
    const [passengersDetailsArray, setAllPassengersDetails] = useState([]);
    const [filterPassengerDetails, setFilterPassengerDetails] = useState([]);

    const [passengerDetails, setPassengerDetails] = useState({});

    const [selectFilter, setSelectFilter] = useState('');
    const [selectedFlightNo, setSelectedFlightNo] = useState('');

    const [flightSelected, setFlightSelected] = useState(false);
    const [flightRowAlert, setFlightRowAlert] = useState(true);
    const [closePassTab, setClosePassTab] = useState(true);
    const [updatePassengerDetails, setUpdatePassengerDetails] = useState(false);
    const [addPassengers, setAddPassengers] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3002/flights").then(res => res.json()).then(json => {
            setFlightDetails(json);
        });

        fetch("http://localhost:3002/passengers").then(res => res.json()).then(json => {
            setAllPassengersDetails(json);
        });

    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
        if (event.target.value === 0) {
            history.push('/admin/anchillary/' + selectedFlightNo);
        }
        else if (event.target.value === 1) {
            history.push('/admin/shopping-items/' + selectedFlightNo);
        }
        else if (event.target.value === 2) {
            history.push('/admin/meals/' + selectedFlightNo);
        }
    };

    const handleUpdatePassenger = (id) => {
        passId = id.currentTarget.value;
        setPassengerDetails(passengersDetailsArray[id.currentTarget.value - 1]);
        setUpdatePassengerDetails(true);
        setFlightSelected(false);
        setAddPassengers(false);
    }

    const flightRowSelected = (e) => {
        setTimeout(() => {
            setFlightSelected(true);
            setAddPassengers(false);
            setSelectedFlightNo(e.toString());
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === e.toString()));
        }, 300);
    }

    const handleFilterSelectChange = (event) => {
        setSelectFilter(event.target.value);
        if (event.target.value === 'passport') {
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo).filter(row => row.passport === ''));
        } else if (event.target.value === 'address') {
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo).filter(row => row.address === ''));
        } else if (event.target.value === 'dob') {
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo).filter(row => row.dob === null));
        } else if (event.target.value === 'reset') {
            setSelectFilter('');
            setFilterPassengerDetails(passengersDetailsArray.filter(row => row.fid === selectedFlightNo));
        }
    };

    const savePassengersData = (name, passport, address) => {

        passengersDetailsArray[passId - 1].name = name;
        passengersDetailsArray[passId - 1].passport = passport;
        passengersDetailsArray[passId - 1].address = address;

        userService.updatePassengersDetails(passengersDetailsArray[passId - 1], passengersDetailsArray[passId - 1].id);

        setFlightSelected(true);
        setUpdatePassengerDetails(false);
    }

    const saveNewPassengersData = () => {
        setTimeout(() => {
            fetch("http://localhost:3002/passengers").then(res => res.json()).then(json => {
                setAllPassengersDetails(json);
                setAddPassengers(false);
                setFlightSelected(false);
                setUpdatePassengerDetails(false);
            });
        }, 300);
    }

    const canclePassengersData = () => {
        setFlightSelected(false);
        setUpdatePassengerDetails(false);
        setAddPassengers(false);
    }

    return (
        <div className=" text-center">
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
                        {flightDetails.map(row => (
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
                                        }}
                                    >
                                        <MenuItem value={'0'} onClick={handleMenuClose}>Manage Anchillary Service</MenuItem>
                                        <MenuItem value={'1'} onClick={handleMenuClose}>Manage Shopping Items</MenuItem>
                                        <MenuItem value={'2'} onClick={handleMenuClose}>Manage Special Meals</MenuItem>
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
                                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectFilter}
                                    label="Filter"
                                    onChange={handleFilterSelectChange}
                                >
                                    <MenuItem value={'passport'}>PassPort</MenuItem>
                                    <MenuItem value={'address'}>Address</MenuItem>
                                    <MenuItem value={'dob'}>DOB</MenuItem>
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
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Seat No</TableCell>
                                    <TableCell align="center">Dob</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterPassengerDetails.map(row => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.passport}</TableCell>
                                        <TableCell align="center">{row.address !== "" ? row.address : 'Empty'}</TableCell>
                                        <TableCell align="center">{row.seatNo !== null ? row.seatNo : 'Empty'}</TableCell>
                                        <TableCell align="center">{row.dob !== null ? row.dob : 'Not Assigned'}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                value={row.id}
                                                onClick={handleUpdatePassenger}>
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                    <Button
                        variant="outlined"
                        onClick={() => setAddPassengers(true)}
                    >
                        Add Passenger
                    </Button>
                </div>
            ) : (
                null)}
            {updatePassengerDetails ? <UpdatePassengerDetails props={{ canclePassengersData, passengerDetails, passId, savePassengersData }} /> : <div></div>}
            {addPassengers ? <AddPassenger props={{ canclePassengersData, saveNewPassengersData, selectedFlightNo }} /> : <div></div>}
            <br /><br />
        </div>
    );
}