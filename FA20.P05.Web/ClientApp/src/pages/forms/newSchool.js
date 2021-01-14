import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./forms.css";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import NoButtoncard from "../../components/card/NoButtonCard";

function NewSchool() {

  const [name, setName] = useState({});
  const [active, setActive] = useState(true);
  const [status, setStatus] = useState();

  const [schoolPopulation, setPopulation] = useState({});
  const [addressLine1, setAddress1] = useState({});
  const [addressLine2, setAddress2] = useState({});
  const [city, setCity] = useState({});
  const [state, setState] = useState({});
  const [zip, setZip] = useState({});

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);



  const submitData = (event) => {
    event.preventDefault();
    if(status === true){
      setActive(true);
    }
    else {
      setActive(false);
    }
    Axios.post("/api/schools", {
      name: name,
      active: active,
      schoolPopulation: parseInt(schoolPopulation),
      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        zip: zip,
      },
    });
    handleClose();
  };

  return (
    <div className="formPage">
      <div onClick={handleShow}>
        <NoButtoncard title="Add New School" />
      </div>
      <div className="formBox">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new School</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>School's Name</Form.Label>
                  <Form.Control
                    placeholder="XYZ Public School"
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Is Active</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option>False</option>
                    <option>True</option>
                    
                    
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Population</Form.Label>
                  <Form.Control
                    placeholder="1111"
                    onChange={(event) => setPopulation(event.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  onChange={(event) => setAddress1(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  onChange={(event) => setAddress2(event.target.value)}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    onChange={(event) => setCity(event.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    onChange={(event) => setState(event.target.value)}
                  >
                    <option>Choose...</option>
                    <option>LA</option>

                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    onChange={(event) => setZip(event.target.value)}
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

export default NewSchool;
