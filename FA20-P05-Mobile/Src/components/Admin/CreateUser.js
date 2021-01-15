import React,{useState} from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import colors from "../../config/colors";
import Button from "../Button";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BASE_URL from "../../api/baseUrl";

export default function CreateUser({navigation}) {
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});
    const [role, setRole] = useState({});
    const [staffId, setStaffId] = useState({});

    const submitData=()=>{
      fetch(BASE_URL+"/api/users", {
    method: 'post',
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username:username,
    password:password,
    role:role,
    staffId:parseInt(staffId),
    })
  }).then((res)=>{
    if(res.ok){
      Alert.alert('Success','User Created Sucessfully');
     
      setUsername({});
      setPassword({});
      setRole({});
      setStaffId({});
      navigation.navigate("home");
    }else{
      Alert.alert('Error!!',' Failed to create user');
    }
  })
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={colors.purple} barStyle="light-content" />
      <View style={styles.header}/>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.white,
          },
        ]}
      >
        <View style={styles.footer}>
          <Text style={styles.text_footer}>{"Username"}</Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => setUsername(text)}
            />
          </View>
          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            {"Password"}
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => setPassword(text)}
            />
          </View>
          <Text style={[styles.text_footer, { marginTop: 35 }]}>{"Role"}</Text>
          <View style={styles.action}>
            <FontAwesome name="user-plus" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter role"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => setRole(text)}
            />
          </View>
          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            {"StaffId"}
          </Text>
          <View style={styles.action}>
            <FontAwesome name="id-badge" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Staff Id"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => setStaffId(text)}
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
      </Animatable.View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  footer: {
    flex: 3,
    paddingTop:20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
    paddingHorizontal: 20,
    paddingVertical: 150,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
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
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
