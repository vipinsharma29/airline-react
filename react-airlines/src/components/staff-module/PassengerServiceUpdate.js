import React, { useState } from 'react';

import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'



var seatService;

export default function ServiceUpdate({ props }) {

    const [selectService, setSelectService] = useState({
        selectAnchillaryService: '',
        selectMealsService: '',
        selectShopingService: ''
    });

    const handleServiceSelectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSelectService(values => ({ ...values, [name]: value }))
    }


    const saveServices = () => {
        seatService = selectService;
        if (seatService.selectAnchillaryService === '') {
            seatService.selectAnchillaryService = props.passengersDetailsArray[props.passId - 1].ancillaryServices
        } if (seatService.selectMealsService === '') {
            seatService.selectMealsService = props.passengersDetailsArray[props.passId - 1].specialMeal
        } if (seatService.selectShopingService === '') {
            seatService.selectShopingService = props.passengersDetailsArray[props.passId - 1].inflightShop
        }
        props.saveServiceUpdate(selectService);
    }

    const cancelChange = () => {
        props.cancleUpdateChanges();
    }

    return (
        <div>
            <h5>To <strong>Add/Change Service</strong> Select from drop Down And Click Save.</h5>
            <h5>To <strong>Remove/Delete Service</strong> Select None/Remove in Options.</h5>
            <br />
            <h5>Current Value</h5>
            <Grid container spacing={1}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                            <TableHead>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell align="center">Ancillary Services</TableCell>
                                    <TableCell align="center">{props.passengersDetailsArray[props.passId - 1].ancillaryServices !== 'null' ? props.passengersDetailsArray[props.passId - 1].ancillaryServices : "Empty"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Special Meal</TableCell>
                                    <TableCell align="center">{props.passengersDetailsArray[props.passId - 1].specialMeal !== 'null' ? props.passengersDetailsArray[props.passId - 1].specialMeal : "Empty"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Inflight Shop</TableCell>
                                    <TableCell align="center">{props.passengersDetailsArray[props.passId - 1].inflightShop !== 'null' ? props.passengersDetailsArray[props.passId - 1].inflightShop : 'Empty'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>



                    <FormGroup variant="filled" >
                        <InputLabel>Anchillary-Service</InputLabel>
                        <Select
                            value={selectService.selectAnchillaryService}
                            label="Anchillary-Service"
                            name="selectAnchillaryService"
                            onChange={handleServiceSelectChange}
                        >
                            <MenuItem key={Math.random} value={'null'}>None/Remove</MenuItem>
                            {props.selectedFlightServices.ancillaryServices.map(value => (
                                <MenuItem key={value.tableData.id} value={value.name}>{value.name}</MenuItem>
                            ))}
                        </Select>

                        <InputLabel>Meals-Service</InputLabel>
                        <Select
                            value={selectService.selectMealsService}
                            label="Meals-Service"
                            name="selectMealsService"
                            onChange={handleServiceSelectChange}
                        >
                            <MenuItem key={Math.random} value={'null'}>None/Remove</MenuItem>
                            {props.selectedFlightServices.specialMeal.map(value => (
                                <MenuItem key={value.tableData.id} value={value.name}>{value.name}</MenuItem>
                            ))}
                        </Select>

                        <InputLabel>InFlight-Shop-Service</InputLabel>
                        <Select
                            value={selectService.selectShopingService}
                            label="InFlight-Shop-Service"
                            name="selectShopingService"
                            onChange={handleServiceSelectChange}
                        >
                            <MenuItem key={Math.random} value={'null'}>None/Remove</MenuItem>
                            {props.selectedFlightServices.inflightShop.map(value => (
                                <MenuItem key={value.tableData.id} value={value.name}>{value.name}</MenuItem>
                            ))}
                        </Select>
                        <br />
                        <div className="form-group">
                            <Button type="submit" variant="contained" color="primary" onClick={saveServices}>
                                <span>Save</span>
                            </Button>&nbsp;&nbsp;&nbsp;
                            <Button type="submit" variant="contained" color="primary" onClick={cancelChange}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </FormGroup>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>

        </div>);
}