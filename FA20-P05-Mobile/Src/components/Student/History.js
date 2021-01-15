import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView,Platform } from "react-native";
import Button from "../Button";
import BASE_URL from "../../api/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

function History({ navigation }) {
  const [studentId, setStudentId] = useState([]);
  const [student, setStudent] = useState([]);

  const submitData = async () => {
    var number = await AsyncStorage.getItem("id");
    setStudent(number);

    fetch(BASE_URL + "/api/temperature-records/"+number)
      .then((response) => {
        return response.json();
      })
      .then((res) => setStudentId(res))
      .catch((err) => alert(err));
  };
  
  useEffect(() => {
    submitData();
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{"Latest recorded Data : "} </Text>
      <Text style={styles.text1}>Student-Id : </Text>
      <View style={styles.action}>
        <TextInput style={styles.Input} secureTextEntry={true} value={student} />
      </View>
      <View style={styles.button}>
        <View style={styles.subButton}>
          <Button
            title="Back"
            style={styles.Tbutton}
            onPress={() => {
              navigation.navigate("splash");
            }}
          />
        </View>
      </View>
      <Text style={styles.text1}>History : </Text>
      <View style={styles.history}>
      <Text style={styles.text1} >
          {"Last Recorded : "}
          {studentId.measuredUtc}
        </Text>
        <Text style={styles.text1}>
          {"SchoolId : "}
          {studentId.schoolId}
        </Text>
        <Text style={styles.text1}>
          {"Temperature (In Kelvin): "}
          {studentId.temperatureKelvin}
        </Text>
      </View>
    </SafeAreaView>
  );
}
export default History;
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  text: {
    paddingLeft: 10,
    marginBottom: 40,
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
  },
  text1: {
    marginLeft: 12,
    fontWeight: "bold",
    paddingTop: 5,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  Input: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    height: 20,
    borderColor: "gray",
    borderRadius: 10,
    width: "80%",
    margin: 10,
  },
  history:{
    marginTop:30,
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
  },
  subButton: {
    paddingLeft: 15,
  },
  Tbutton: {
    width: 100,
    height: 30,
    borderRadius: 10,
  },
});
