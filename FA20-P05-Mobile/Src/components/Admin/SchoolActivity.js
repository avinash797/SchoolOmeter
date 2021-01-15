import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { Switch } from "react-native-paper";
import Button from "../Button";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../../config/colors";
import BASE_URL from "../../api/baseUrl";

function SchoolActivity({ navigation }) {
  
  const [name, setName] = useState({});
  const [active, setActive] = useState(false);
  const [schoolPopulation, setSchoolPopulation] = useState({});
  const [addressLine1, setAddressLine1] = useState({});
  const [addressLine2, setAddressLine2] = useState({});
  const [city, setCity] = useState({});
  const [state, setState] = useState({});
  const [zip, setZip] = useState({});

  const submitData = () => {
    fetch(BASE_URL + "/api/schools", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        active: active,
        schoolPopulation: parseInt(schoolPopulation),
        address: {
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          state: state,
          zip: zip,
        },
      }),
    }).then((res) => {
      if (res.ok) {
        Alert.alert('Sucessfully added School')
        setName({});
        setActive(false);
        setSchoolPopulation({});
        setAddressLine1({});
        setAddressLine2({});
        setCity({});
        setState({});
        setZip({});
        navigation.navigate("home");
      } else {
        alert("Error!! Failed to create School");
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={styles.section}>
        <Text style={styles.text_section}>{"Name "}</Text>

        <View style={styles.action}>
          <FontAwesome name="building" color={colors.text} size={20} />
          <TextInput
            placeholder="Name of school"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setName(text)}
          />
        </View>

        <Text style={[styles.text_section, { marginTop: 10 }]}>
          {"Status:"}
        </Text>
        <View style={styles.action}>
          <Switch value={active} onValueChange={setActive} />
        </View>

        <Text style={[styles.text_section, { marginTop: 10 }]}>
          {"School Population"}
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="School population"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setSchoolPopulation(text)}
            
          />
        </View>
        <Text
          style={[
            styles.text_section,
            { marginTop: 10 },
            { fontWeight: "bold" },
          ]}
        >
          {"Address"}
        </Text>
        <Text style={[styles.text_section, { marginTop: 5 }]}>
          {"Address Line1"}
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Address Line1"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setAddressLine1(text)}
          />
        </View>
        <Text style={[styles.text_section, { marginTop: 25 }]}>
          {"Address Line2"}
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Address Line2"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setAddressLine2(text)}
          />
        </View>
        <Text style={[styles.text_section, { marginTop: 25 }]}>{"City"}</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="City"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setCity(text)}
          />
        </View>
        <Text style={[styles.text_section, { marginTop: 25 }]}>{"State"}</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="LA,TX,MI"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setState(text)}
          />
        </View>
        <Text style={[styles.text_section, { marginTop: 25 }]}>{"Zip"}</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="five digit zip code"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(text) => setZip(text)}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Submit"
            style={styles.submitButton}
            onPress={() => submitData()}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
}
export default SchoolActivity;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  section: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom:250,
  }, 
  text_section: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  picker: {
    justifyContent: "center",
    marginLeft: 100,
    marginBottom: 20,
    paddingBottom: 150,
    height: 150,
    width: 100,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },

  button: {
    alignItems: "center",
    marginTop: 30,
  },
  submitButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
