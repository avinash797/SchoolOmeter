import React, {useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";

import Button from "../components/Button";
import colors from "../config/colors";

import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import AuthService from "../api/auth-service";
import AsyncStorage from "@react-native-community/async-storage";

const loginScreen = ({ navigation }) => {
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();


  const [data, setData] = useState({
    Username: "",
    Password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const submitData = async () => {
    AuthService.login(Username, Password).then(
      async(data) => {
        await AsyncStorage.setItem("LoggedInUser", JSON.stringify(data));
        if (data.role == "Admin") {
          navigation.navigate("Radmin");
        } else {
          navigation.navigate("Rstaff");
        }
      },
      (error) => {
        Alert.alert(error);
      }
    );
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.purple} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>{"Welcome"} </Text>
      </View>
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
              onChangeText={(text) => setUsername(text)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />

            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                {" Username must be 4 characters long."}
              </Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            {"Password"}
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                {"Password must be 8 characters long."}
              </Text>
            </Animatable.View>
          )}

          <View style={styles.button}>
            <Button
              title="Login"
              style={styles.loginButton}
              onPress={() => submitData()}
            />

            <Button
              title="Back"
              style={styles.Tbutton}
              onPress={() => {
                navigation.navigate("splash");
              }}
            />
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};


export default loginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
  loginButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Tbutton: {
    marginTop: 5,
    padding: 13,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
