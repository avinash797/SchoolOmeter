import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./forms.css";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function UserRole() {
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [role, setRole] = useState({});
  const [staffId, setStaffId] = useState({});
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const submitData = (event) => {
    event.preventDefault();
    Axios.post("/api/users", {
      username: username,
      password: password,
      role: role,
      staffId: parseInt(staffId),
    }).then(
      (data) => {
        alert("Role Assigned");
        console.log(data.data);
      },
      (error) => {
        alert(error);
      }
    );
    handleClose();
  };

  return (
    <div className="formPage">
      <div onClick={handleShow}>Assign Role</div>
      <div className="formBox">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assign User Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  <h4>Username</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John123"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <h4>Password</h4>
                </Form.Label>
                <Form.Control
                  placeholder="@asdf1234"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGridState">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option>Choose...</option>
                  <option>Staff</option>
                  <option>Principal</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <h4>Staff Id</h4>
                </Form.Label>
                <Form.Control
                  placeholder="1, 2, 3,..."
                  onChange={(event) => setStaffId(event.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={submitData}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UserRole;
