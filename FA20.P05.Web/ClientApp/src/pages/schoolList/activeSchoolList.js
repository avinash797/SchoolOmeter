import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function SchoolList(props) {
  const [school, setSchool] = useState(null);

  const getSchoolData = async () => {
    fetch("/api/schools/active")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setSchool(res);
      });
  };
  useEffect(() => {
    getSchoolData();
  }, [school]);

  return (
    <div className="table">

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>School Name</th>
            <th>Active</th>
            <th>School Population</th>
            <th>Address</th>
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
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default SchoolList;
