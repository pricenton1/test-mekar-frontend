import React from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import logo from '../assets/logo.png'
import {Link, withRouter} from "react-router-dom";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const HeaderComponent = (props) => {

    return (
        <Navbar className="bg-light shadow-sm p-2">
            <Container>
                <Navbar.Brand className="mr-5">
                    <img
                        src={logo}
                        width="60"
                        height="60"
                        alt=""
                        className="d-inline-block p-2"
                    />
                    ADMIN
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/home" className={props.history.location.pathname === '/home' ? "navigation-text-active" : "navigation-text"}>HOME</Link>
                    <Link to="/user" className={props.history.location.pathname === '/user' ? "navigation-text-active" : "navigation-text"}>USER</Link>
                </Nav>
                <Nav className="justify-content-end">
                    <label className="navigation-text" onClick={props.logout}>LOGOUT</label>
                    <FontAwesomeIcon className="m-auto" icon={faSignOutAlt} />
                </Nav>
            </Container>
        </Navbar>
    );
};

export default withRouter(HeaderComponent);