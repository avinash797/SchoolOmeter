import React from "react";
import "./admin.css";
import NewStaff from "../forms/newStaff";
import NewSchool from "../forms/newSchool";
import NoButtoncard from "../../components/card/NoButtonCard";
import AdminChart from "../../components/graph/adminChart";

function Admin() {
  return (
    <div className="admin">
      <div className="actual-admin">
        
        <div className="buttons-admin">
          <NewStaff />
         
          <NewSchool />
        
        <NoButtoncard 
          link="/adminSchoolList"
          title="View All Schools"
        />
        <NoButtoncard 
          link="/staffList"
          title="View All Staffs"
        />
        </div>
        <div className="graph-admin">
          <AdminChart />
        
        </div>

      </div>
    </div>
  );
}

export default Admin;