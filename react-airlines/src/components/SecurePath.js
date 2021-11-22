import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function SecuredRoute(props) {
    const { isLoggedIn } = useSelector(state => state.auth);
    return (
        // eslint-disable-next-line react/prop-types
        <Route path={props.path} render={data => isLoggedIn ? (
            <props.component {...data}></props.component>) :
            (<Redirect to={{ pathname: '/loginRequired' }} ></Redirect>)}></Route>
    )
}