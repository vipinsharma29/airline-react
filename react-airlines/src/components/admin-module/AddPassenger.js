import React, { useRef, useEffect, useState } from "react";

import userService from "../../services/user.service";

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

export default function AddPassenger({ props }) {

    const form = useRef();
    const checkBtn = useRef();

    const [passenger, setPassengers] = useState({
        id: null,
        name: '',
        checkedIn: false,
        wheelchairRequired: false,
        infants: false,
        ancillaryServices: '',
        seatNo: '',
        specialMeal: '',
        inflightShop: '',
        passport: '',
        address: '',
        dob: '',
        fid: ''
    });

    useEffect(() => {
        setPassengers(values => ({ ...values, fid: props.selectedFlightNo }));
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPassengers(values => ({ ...values, [name]: value }));
    }

    // const handleCheckBoxChange = (event) => {
    //     setPassengers(values => ({ ...values, [event.target.name]: event.target.checked }));
    // }

    const handleAdminLogin = (e) => {
        e.preventDefault();
    }

    const saveDetails = () => {
        userService.addPassengersDetails(passenger);
        setTimeout(() => {
            props.saveNewPassengersData();
        }, 300);
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
                            onChange={handleChange}
                            value={passenger.name}
                            validations={[required]}
                            placeholder='UserName'
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            type="text"
                            className="form-control"
                            name="passport"
                            value={passenger.passport}
                            id="passport"
                            onChange={handleChange}
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
                            onChange={handleChange}
                            value={passenger.address}
                            validations={[required]}
                            placeholder='Address'
                        />
                    </div>

                    {/* <div className="form-group">
                        <label>WheelchairRequired</label>
                        <Input
                            type="checkbox"
                            className="form-control"
                            name="wheelchairRequired"
                            value={passenger.wheelchairRequired}
                            onChange={handleCheckBoxChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Infants</label>
                        <Input
                            type="checkbox"
                            className="form-control"
                            name="infants"
                            value={passenger.infants}
                            onChange={handleCheckBoxChange}
                        />
                    </div> */}

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