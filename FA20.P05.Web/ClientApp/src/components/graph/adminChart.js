import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Chart.css";

function AdminChart() {
  const [above, setAbove] = useState(0);
  const [below, setBelow] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [schoolLength, setSchoolLength] = useState(0);
  const [activeSchoolLength, setActiveSchoolLength] = useState(0);
  const [staffLength, setStaffLength] = useState(0);

  const userTemp = async () => {
    await Axios.get("/api/temperature-records")
      .then((res) => {
        let length = res.data.length;
        setTotalLength(totalLength + length);
        let i;

        for (i = 0; i < length; i++) {
          let value = res.data[i].temperatureKelvin;
          if (value <= 99) {
            setBelow((below) => below + 1);
          } else {
            setAbove((above) => above + 1);
          }
        }
      })
      .catch((error) => alert(error));
  };

  const getSchoolData = async () => {
    fetch("/api/schools")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setSchoolLength(res.length);
      });
  };

  const getActiveSchoolData = async () => {
    fetch("/api/schools/active")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setActiveSchoolLength(res.length);
      });
  };

  const getStaffData = async () => {
    fetch("/api/staff")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setStaffLength(res.length);
      });
  };

  const data = {
    chartData: {
      labels: ["Students with COVID-19", "Students without COVID-19", "Total Schools", "Active Schools", "Total Staff"],
      datasets: [
        {
          label: "Value",
          data: [above, below, schoolLength, activeSchoolLength, staffLength, 0],
          backgroundColor: [
            "#FF8686",
            "#E6779E",
            "#CD68B6",
            "#B459CE",
            "#9B4AE6",
          ],
        },
      ],
    },
  };

  useEffect(() => {
    userTemp();
    getSchoolData();
    getActiveSchoolData();
    getStaffData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      
      <div className="graph">
        <Bar
          data={data.chartData}
          height={275}
          width={175}
          options={{
            title: {
              display: true,
              text: "System Overview",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "bottom",
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div style={{ textAlign: "left" }}>
        *Students with temperature above or equal to 100 are considered to have
        COVID-19, and those below 100 are considered safe.
      </div>
    </div>
  );
}

export default AdminChart;
