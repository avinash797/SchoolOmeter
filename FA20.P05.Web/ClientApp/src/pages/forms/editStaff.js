import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./forms.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";


function EditStaff() {

  const [id, setId] = useState({});
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const submitData = (event) => {
    event.preventDefault();
    axios.put("/api/staff/" + id, {
      firstName: firstName,
      lastName: lastName,
    });
    handleClose();
    window.location.reload(false);
  };

  return (
    <div className="formPage">
      <div onClick={handleShow}>
        <>Edit</>
      </div>
      <div className="formBox">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Staff Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>StaffId</Form.Label>
                <Form.Control
                  placeholder="1,2,3,..."
                  onChange={(event) => setId(event.target.value)}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder="John"
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder="Doe"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              
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

export default EditStaff;