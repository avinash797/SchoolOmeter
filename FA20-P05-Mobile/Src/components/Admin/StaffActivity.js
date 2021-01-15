import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Alert
} from "react-native";
import Button from "../Button";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../../config/colors";
import BASE_URL from "../../api/baseUrl";

function StaffActivity({navigation}) {
  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [schoolId,setSchoolId]=useState('');

  const submitData=()=>{
    fetch(BASE_URL+"/api/staff", {
  method: 'post',
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
},
body: JSON.stringify({
  firstname:firstname,
  lastname:lastname,
  schoolId:schoolId,
  })
}).then((res)=>{
  if(res.ok){
    Alert.alert('Success','Staff Created Sucessfully');
    setFirstname('');
    setLastname('');
    setSchoolId('');
    navigation.navigate("home");

  }else{
    Alert.alert('Error!!','Failed to create staff');
  }
})
}
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text_section}>{"Firstname"}</Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="firstname"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setFirstname(text)}
          />
        </View>
        <Text style={[styles.text_section, { marginTop: 35 }]}>
          {"Lastname"}
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="lastname"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setLastname(text)}
          />
        </View>
        <Text style={[styles.text_section, { marginTop: 35 }]}>
          {"School Id"}
        </Text>
        <View style={styles.action}>
          <FontAwesome name="building" color={colors.text} size={20} />
          <TextInput
            placeholder="Enter School Id"
            style={styles.textInput}
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={(text) => setSchoolId(text)}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Submit"
            style={styles.submitButton}
            onPress={() => submitData()}
          />
        </View>
      </View>
    </View>
  );
}
export default StaffActivity;
const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 30,
    flex: 1,
    backgroundColor:'#f5f5f5',
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
