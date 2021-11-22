import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link, NavLink } from "react-router-dom";

// css files
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// common component
import Login from "./components/Login";
import Home from "./components/Home";
import SecuredRoute from "./components/SecurePath";

// staff component
import StaffPage from "./components/staff-module/StaffPage";
import DetailedSeatMap from "./components/staff-module/DetailMap";
import SpecialMealSeatMap from "./components/staff-module/SepecialMealSeatMap";
import CheckInOutWindowPage from "./components/staff-module/CheckInOutWindowPage";

// admin component
import AdminPage from "./components/admin-module/AdminPage";
import AnchillaryPage from "./components/admin-module/AnchillaryServices";
import ShoppingItems from "./components/admin-module/ShoppingItems";
import ManageMeals from "./components/admin-module/ManageMeals";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import EventBus from "./common/EventBus";

const App = () => {

  const { isLoggedIn } = useSelector(state => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <NavLink className="navbar-brand" to="/" exact>
            React-AirLine
          </NavLink>

          {isLoggedIn ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/" className="navbar-brand" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="navbar-brand">
                  Login
                </Link>
              </li>

            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <SecuredRoute path="/staffPage" component={StaffPage}></SecuredRoute>
            <SecuredRoute path="/detail-seat-map" component={DetailedSeatMap}></SecuredRoute>
            <SecuredRoute path="/speacial-meals-seat-map" component={SpecialMealSeatMap}></SecuredRoute>
            <SecuredRoute path="/check-in-out-window" component={CheckInOutWindowPage}></SecuredRoute>
            <SecuredRoute path="/adminPage" component={AdminPage}></SecuredRoute>
            <SecuredRoute path="/admin/anchillary/:flightno" component={AnchillaryPage}></SecuredRoute>
            <SecuredRoute path="/admin/shopping-items/:flightno" component={ShoppingItems}></SecuredRoute>
            <SecuredRoute path="/admin/meals/:flightno" component={ManageMeals}></SecuredRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
