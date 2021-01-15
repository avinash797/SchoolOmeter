import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BASE_URL from "../../api/baseUrl";
import colors from "../../config/colors";
import Button from "../Button";

export default function temperatureRecord({ navigation, route }) {
  const [data, setData] = useState([]);
  const [studentId, setStudentId] = useState({});
  const [id, setId] = useState([]);
  const [schooldata, setSchoolData] = useState([]);
  const [schoolId, setSchoolId] = useState([]);

  const [temperatureKelvin, setTemperatureKelvin] = useState([]);

  //Post Temperature records
  const submitForm = async () => {
    fetch(BASE_URL + "/api/temperature-records", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId:studentId,
        schoolId: parseInt(schoolId),
        temperatureKelvin:  parseInt(temperatureKelvin),
      }),
    }).then((res) => {
      if (res.ok) {
        Alert.alert("temperature recorded Sucessfully");
        setStudentId([]);
        setSchoolId([]);
        setTemperatureKelvin([]);
        navigation.navigate("TempRecordStack");
      } else {

         Alert.alert('Error!!','Failed to record temperature');
      }
    });
  };

  //To get staff info
  const getUserInfo = async () => {
    var schoolId = await AsyncStorage.getItem("LoggedInUser");
    let parsed = JSON.parse(schoolId);
    let userId = parsed.staffId;
    setId(JSON.parse(schoolId));

    fetch(BASE_URL + "/api/staff/" + userId, {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => setData(res))
      .catch((error) => alert(error));
  };

  //To get user School Info
  const getSchoolInfo = async () => {
    fetch(BASE_URL + "/api/schools", {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => setSchoolData(res))
      .catch((error) => alert(error));
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>
          {"School: "} {item.name}
         {' ('} {item.id} {') '}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getUserInfo();
    getSchoolInfo();
    getCurrentDate();
    if (route.params?.code) {
      setStudentId(route.params?.code);
    }
  }, [route.params?.code]);

  return (
    <ScrollView style={styles.section}>
      <View style={styles.section_1}>
        <Text style={styles.text}>
          Fullname : {data.firstName} {data.lastName}
        </Text>
        <Text style={styles.text}>StaffId : {id.staffId}</Text>

        <FlatList
          data={schooldata}
          keyExtractor={(x, i) => i.toString()}
          renderItem={_renderItem}
        />

        <Text style={styles.text}>Date : {getCurrentDate()}</Text>
      </View>

      <View style={styles.section_2}>
        <Text style={styles.text1}>UserId : </Text>
        <View style={styles.action}>
          <TextInput secureTextEntry={false} keyboardType="number-pad" style={styles.Input} value={studentId} />

          <FontAwesome
            name="camera"
            color={colors.text}
            size={20}
            onPress={() => {
              navigation.navigate("QrScanner");
            }}
          />
        </View>
        <Text style={styles.text1}>SchoolId : </Text>
        <View style={styles.action}>
          <TextInput
          
            placeholder="SchoolId"
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setSchoolId(text)}
          />
        </View>
        <Text style={styles.text1}>Temperature : </Text>
        <View style={styles.action}>
          <FontAwesome name="thermometer" color={colors.text} size={20} />

          <TextInput
            placeholder="temperature in kelvin"
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setTemperatureKelvin(text)}
          />
        </View>
      </View>
      <Button
        title="Submit"
        style={styles.loginButton}
        onPress={() => submitForm()}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  section: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    alignContent: "center",
    width: "100%",
    paddingLeft: 10,
    paddingTop: 60,
  },
  section_1: {
    backgroundColor: colors.white,
    paddingTop: 20,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 20,
  },

  section_2: {
    backgroundColor: colors.white,
    paddingTop: 20,
    marginBottom: 20,
    overflow: "hidden",
    borderRadius: 10,
  },

  text: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    fontWeight: "bold",
    height: 20,
    borderColor: "gray",
    width: "100%",
    opacity: 0.5,
    margin: 10,
  },
  text1: {
    marginLeft: 10,
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
  textInput: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    height: 20,
    borderColor: "gray",
    width: "80%",
    opacity: 0.5,
    margin: 10,
  },
  Input: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    height: 20,
    borderColor: "gray",
    borderRadius: 10,
    width: "80%",
    margin: 10,
  },
  item: {
    marginTop: 10,
  },
  loginButton: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
