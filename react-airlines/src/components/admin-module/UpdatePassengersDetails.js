import React, { useRef } from "react";

import Button from "@material-ui/core/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Grid from '@material-ui/core/Grid';


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default function UpdatePassengerDetails({ props }) {

    const form = useRef();
    const checkBtn = useRef();

    const handleAdminLogin = (e) => {
        e.preventDefault();
    }

    const saveDetails = () => {
        props.savePassengersData(document.getElementById('name').value, document.getElementById('passport').value, document.getElementById('address').value);
    }

    const cancelUpdate = () => {
        props.canclePassengersData();
    }

    return (<div>
        <Grid container spacing={1}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <h3>Update Passengers Detail Form</h3>
                <br />
                <Form onSubmit={handleAdminLogin} ref={form}>
                    <div className="form-group">
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={props.passengerDetails.name}
                            validations={[required]}
                            placeholder='UserName'
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            type="text"
                            className="form-control"
                            name="passport"
                            value={props.passengerDetails.passport}
                            id="passport"
                            validations={[required]}
                            placeholder='Passport'
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            value={props.passengerDetails.address}
                            validations={[required]}
                            placeholder='Address'
                        />
                    </div>

                    <div className="form-group">
                        <Button type="submit" variant="contained" color="primary" onClick={() => saveDetails()}>
                            <span>Save</span>
                        </Button> &nbsp;&nbsp;
                        <Button type="submit" variant="contained" color="inherit" onClick={cancelUpdate}>
                            <span>Cancel</span>
                        </Button>
                    </div>

                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    </div>);
}