import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./forms.css";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import NoButtoncard from "../../components/card/NoButtonCard";

function NewStaff() {
  const [firstname, setFirstname] = useState({});
  const [lastname, setLastname] = useState({});
  const [schoolId, setSchoolId] = useState({});
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function onclick(event) {
    event.preventDefault();
    Axios.post("/api/staff", {
      firstname: firstname,
      lastname: lastname,
      schoolId: schoolId,
    }).then((data) => {
      alert("Staff Created" + data.data);
    }, (error) => {
        alert(error);
    });
    handleClose();
  }

  return (
    <div className="formPage">
      <div onClick={handleShow}>
        <NoButtoncard title="Add New Staff" />
      </div>
      <div className="formBox">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  <h4>FirstName</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John"
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <h4>LastName</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Doe"
                  onChange={(event) => setLastname(event.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <h4>School Id</h4>
                </Form.Label>
                <Form.Control
                  placeholder="1, 2, 3"
                  onChange={(event) => setSchoolId(event.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={onclick}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default NewStaff;