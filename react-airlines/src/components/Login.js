import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from '@material-ui/core/Button';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Alert from '@material-ui/lab/Alert';
import PersonIcon from '@material-ui/icons/Person';
import Fab from '@material-ui/core/Fab';

import { clearMessage } from "../actions/message";
import { loginAdmin, loginStaff } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [userLoginType, setUserType] = useState(true);

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleAdminLogin = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(loginAdmin(inputs.username, inputs.password))
        .then(() => {
          props.history.push('/adminPage');
        });
    }
  };

  // const handleSocialLogin = user => {
  //   console.log(user)
  // }

  // const handleSocialLoginFailure = (err) => {
  //   console.error(err);
  // };

  const handleStaffLogin = (e) => {
    e.preventDefault();

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(loginStaff(inputs.username, inputs.password))
        .then(() => {
          dispatch(clearMessage());
          props.history.push('/staffPage');
        });
    }
  };

  return (
    <div
      className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
      <Fab color="primary" size="large" aria-label="edit">
        <PersonIcon />
      </Fab>
      <br /><br />

      <div className="justify-content-between">
        <Button variant="contained" onClick={() => setUserType(true)}>Admin Login</Button>
        <span className="navbar-brand mb-0 h1"></span>
        <Button variant="contained" onClick={() => setUserType(false)}>Staff Login</Button>
      </div>

      <div className="submit-form text-center">
        {userLoginType ? (
          <Form onSubmit={handleAdminLogin} ref={form}>
            <br />
            <p>Admin Login</p>
            {message && (
              <Alert severity="error">
                InValid Credentials
                <p>{message}</p>
              </Alert>
            )}
            <br />
            <div className="form-group">
              <Input
                type="text"
                className="form-control"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                validations={[required]}
                placeholder='UserName'
              />
            </div>

            <div className="form-group">
              <Input
                type="password"
                className="form-control"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                validations={[required]}
                placeholder='Password'
              />
            </div>

            <div className="form-group">
              <Button type="submit" variant="contained" color="primary">
                <span>Login</span>
              </Button>
            </div>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        ) : (
          <Form onSubmit={handleStaffLogin} ref={form}>
            <br />
            <p>Staff Login</p>
            {message && (
              <Alert severity="error">
                InValid Credentials
                <p>{message}</p>
              </Alert>
            )}
            <br />
            <div className="form-group">
              <Input
                type="text"
                className="form-control"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                validations={[required]}
                placeholder='UserName'
              />
            </div>

            <div className="form-group">
              <Input
                type="password"
                className="form-control"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                validations={[required]}
                placeholder='Password'
              />
            </div>

            <div className="form-group">
              <Button type="submit" variant="contained" color="primary">
                <span>Login</span>
              </Button>
            </div>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>)}
      </div>
    </div>
  )
}