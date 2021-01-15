import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";

import BASE_URL from "../../api/baseUrl";

function AdminHome() {
  const [school, setSchool] = useState([]);
  const [active, setActive] = useState([]);
  const [staff, setStaff] = useState([]);
  const [temp, setTemp] = useState([]);

  const getSchoolData = async () => {
    fetch(BASE_URL + "/api/schools")
      .then((response) => {
        return response.json();
      })
      .then((res) => setSchool(res.length));
  };

  const getActiveData = () => {
    fetch(BASE_URL + "/api/schools/active")
      .then((response) => {
        return response.json();
      })
      .then((res) => setActive(res.length));
  };

  const getStaffData = async () => {
    fetch(BASE_URL + "/api/staff")
      .then((response) => {
        return response.json();
      })
      .then((res) => setStaff(res.length));
  };

  const getTempData = async () => {
    fetch(BASE_URL + "/api/temperature-records")
      .then((response) => {
        return response.json();
      })
      .then((res) => setTemp(res.length));
  };

  useEffect(() => {
    getSchoolData();
    getActiveData();
    getStaffData();
    getTempData();
  }, []);

  const sampledata = [
    {
      x: "Temp",
      y: temp,
    },
    {
      x: "Schools",
      y: school,
    },
    {
      x: "Staff",
      y: staff,
    },

    {
      x: "Active Schools",
      y: active,
    },
  ];

  return (
    <>
      <VictoryPie
        width={330}
        colorScale={["tomato", "gold", "cyan", "navy"]}
        data={sampledata}
      />
      <View style={styles.text}>
        <Text style={styles.subtext}>Total Number of School: {school}</Text>
        <Text style={styles.subtext}>
          Total Number of active School: {active}
        </Text>
        <Text style={styles.subtext}>Total Number of staff: {staff}</Text>
        <Text style={styles.subtext}>Total Temperature Recorded: {temp}</Text>
      </View>
    </>
  );
}
export default AdminHome;
const styles = StyleSheet.create({
  text: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 40,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  subtext: {
    marginTop: 10,
    fontWeight: "bold",
  },
});
