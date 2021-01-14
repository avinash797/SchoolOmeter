import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import LoginDropdown from "./components/loginbox/sidePanel";
import "./navbar.css";
import { Navbar, Nav } from "react-bootstrap";

function Navigation() {
  const [status, setStatus] = useState();
  const checkStatus = () => {
    var user = localStorage.getItem("LoggedInUser");
    if (user === null) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <Navbar className="navbar" expand="lg" sticky="top">
      <Link to="/">
        <Navbar.Brand id='logo'>School-O-meter</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <div>
            {status === true ? (
              <Nav.Link href="/admin" id='admin'>Admin DashBoard</Nav.Link>
            ) : (
              <Link to=""></Link>
            )}
          </div>
        </Nav>
        <Nav>
          <LoginDropdown />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;