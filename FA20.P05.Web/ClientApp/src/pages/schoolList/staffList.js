import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./schoolList.css";
import { Button } from "react-bootstrap";
import EditStaff from "../forms/editStaff";
import UserRole from "../forms/userRole";

function StaffList() {
  const [staff, setStaff] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("/api/staff");
    setStaff(response.data);
  };

  const removeData = (id) => {
    axios.delete(`/api/staff/${id}`).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    fetchData();
  }, [staff]);

  return (
    <div className="schoolList">
      <div className="actual-admin">
        <div className="admin-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>

                <th style={{ width: "25rem" }}>First Name</th>
                <th style={{ width: "25rem" }}>Last Name</th>
                <th style={{ width: "10rem" }}>StaffID</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {staff &&
                staff.map((object, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>{object.firstName}</td>
                      <td>{object.lastName}</td>
                      <td>{object.id}</td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "row" }}>
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
                              <EditStaff />
                            </Button>
                          </div>
                          <div className="buttons">
                            <Button style={{ width: "8rem" }}>
                              <UserRole />
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

export default StaffList;
