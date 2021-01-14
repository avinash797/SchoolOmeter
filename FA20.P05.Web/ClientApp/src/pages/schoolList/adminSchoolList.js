import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./schoolList.css";
import { Button } from "react-bootstrap";
import EditSchool from "../forms/editSchool";

function AdminSchoolList() {
  const [school, setSchool] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("/api/schools");
    setSchool(response.data);
  };

  const removeData = (id) => {
    axios.delete(`/api/schools/${id}`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, [school]);

  return (
    <div className="schoolList">
      <div className="actual-admin">
        <div className="admin-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                
                <th>School Name</th>
                <th>Active</th>
                <th>School Population</th>
                <th>Address</th>
                <th style={{ width: "8rem" }}>SchoolID</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {school &&
                school.map((object, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{object.name}</td>
                      <td>{object.active.toString()}</td>
                      <td>{object.schoolPopulation}</td>
                      <td>
                        {object.address.addressLine1 +
                          ", " +
                          object.address.addressLine2 +
                          ", " +
                          object.address.city +
                          ", " +
                          object.address.state +
                          " " +
                          object.address.zip}
                      </td>
                      <td>{object.id}</td>
                      <td>
                      <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
                          <div className="buttons">
                            <Button
                            variant="danger"
                              style={{ width: "8rem" }}
                              onClick={() => removeData(object.id)}
                            >
                              Delete
                            </Button>
                          </div>
                          <div className="buttons">
                            <Button style={{ width: "8rem" }}>
                              <EditSchool />
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminSchoolList;
