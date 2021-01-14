import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Chart.css";

function Chart() {
  const [temp98, setTemp98] = useState(0);
  const [temp99, setTemp99] = useState(0);
  const [temp100, setTemp100] = useState(0);
  const [temp101, setTemp101] = useState(0);
  const [temp102, setTemp102] = useState(0);
  const [above, setAbove] = useState(0);
  const [below, setBelow] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  const userTemp = async () => {
    await Axios.get("/api/temperature-records")
      .then((res) => {
        let length = res.data.length;
        setTotalLength(totalLength + length);
        let i;

        for (i = 0; i < length; i++) {
          let value = res.data[i].temperatureKelvin;
          if (value === 98) {
            setTemp98((temp98) => temp98 + 1);
            setBelow((below) => below + 1);
          } else if (value === 99) {
            setTemp99((temp99) => temp99 + 1);
            setBelow((below) => below + 1);
          } else if (value === 100) {
            setTemp100((temp100) => temp100 + 1);
            setAbove((above) => above + 1);
          } else if (value === 101) {
            setTemp101((temp101) => temp101 + 1);
            setAbove((above) => above + 1);
          } else if (value === 102) {
            setTemp102((temp102) => temp102 + 1);
            setAbove((above) => above + 1);
          } else if (value > 99) {
            setAbove((above) => above + 1);
          } else {
            setBelow((below) => below + 1);
          }
        }
      })
      .catch((error) => alert(error));
  };

  const data = {
    chartData: {
      labels: ["98°F", "99°F", "100°F", "101°F", "102°F"],
      datasets: [
        {
          label: "Number of Students",
          data: [temp98, temp99, temp100, temp101, temp102, 0],
          backgroundColor: [
            "#85FFB0",
            "#A4E9AE",
            "#C2D4AC",
            "#E1BEAA",
            "#FFA8A8",
          ],
        },
      ],
    },
  };

  useEffect(() => {
    userTemp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <h6 style={{ textAlign: "left" }}>
          Total Students Recorded: {totalLength}
        </h6>
        <h6 style={{ textAlign: "left" }}>
          Number of Student(s) with COVID-19: {above}*
        </h6>
        <h6 style={{ textAlign: "left" }}>
          Number of Safe Students: {below}*
        </h6>
      </div>
      <div className="graph">
        <Bar
          data={data.chartData}
          height={275}
          width={175}
          options={{
            title: {
              display: true,
              text: "Number of Students per Temperature",
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

export default Chart;
