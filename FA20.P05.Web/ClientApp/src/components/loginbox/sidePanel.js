import React, { useState, useEffect } from "react";
import SlidingPanel from "react-sliding-side-panel";
import { Form, Button } from "react-bootstrap";
import AuthService from "../../api/authService";
import { useHistory } from "react-router-dom";
import "./login.css";

const LoginDropdown = () => {
  const [openPanel, setOpenPanel] = useState(false);
  let history = useHistory();

  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [status, setStatus] = useState();

  const submitData = (event) => {
    event.preventDefault();
    setOpenPanel(false);
    AuthService.login(Username, Password).then(
      (data) => {
        localStorage.setItem("LoggedInUser", JSON.stringify(data));
        if (data.data.role === "Admin") {
          window.location.reload(false);
          // history.push("/admin");
          
        } else if (data.data.role === "Principal") {
          history.push("/principal");
          checkStatus();
        } else {
          history.push("/staff");
          checkStatus();
        }
      },
      (error) => {
        alert("Incorrect Username / Password!")
      }
    );
  };

  const handleLogout = () => {
    history.push("/");
    localStorage.removeItem("LoggedInUser");
    window.location.reload(false);
    setStatus(false);
    
    
  };

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
    <div>
      <div>
        {status === true ? (
          <Button variant="danger" onClick={() => handleLogout()}>
            Logout
          </Button>
        ) : (
          <Button variant="success" onClick={() => setOpenPanel(true)}>
            Login
           </Button>
        )}
      </div>
      <SlidingPanel
        panelClassName="loginPanel"
        type={"right"}
        isOpen={openPanel}
        size={20}
        backdropClicked={() => setOpenPanel(false)}
        noBackdrop={false}
      >
        <div className="loginScreen">
          <h2>Login</h2>
          <Form.Group className="loginForm">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                secureTextEntry={true}
              />
            </Form.Group>
            <Button variant="success" type="submit" onClick={submitData}>
              Submit
            </Button>
          </Form.Group>
        </div>
      </SlidingPanel>
    </div>
  );
};

export default LoginDropdown;
