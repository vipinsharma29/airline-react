import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid'


export default function SeatChange({ props }) {

    const [selectCheckInFilter, setSelectCheckInFilter] = useState('');

    const handleSelectChange = (event) => {
        setSelectCheckInFilter(event.target.value);
    }

    const saveSeat = () => {
        props.saveNewSeatData(selectCheckInFilter);
        setSelectCheckInFilter('');
    }

    const cancelChange = () => {
        props.cancleSeatChange()
    }

    return (
        <div className="row">
            <Grid container spacing={1}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <FormGroup variant="filled" >
                        <InputLabel>Select-SeatNo</InputLabel>
                        <Select
                            value={selectCheckInFilter}
                            label="Select-SeatNo"
                            onChange={handleSelectChange}>
                            {props.notAssignedInSeat.map(value => (
                                <MenuItem key={Math.random()} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                        <br />
                        <div className="form-group">
                            <Button type="submit" variant="contained" color="primary" onClick={saveSeat}>
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