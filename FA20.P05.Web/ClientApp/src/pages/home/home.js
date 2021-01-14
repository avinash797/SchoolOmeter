import React from "react";
import "./home.css";
import Chart from "../../components/graph/Chart";
import SchoolList from "../schoolList/activeSchoolList";


function Home() {

    return (
    <div className="home">
      <div className="home-chart">
        <Chart />
      </div>
      <SchoolList />
    </div>
  );
}

export default Home;
