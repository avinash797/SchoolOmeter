import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import Button from "../components/Button";
import colors from "../config/colors";
import * as Animatable from "react-native-animatable";
const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.purple} barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.topButton}>
          <Button
            title={"Get Your QR "}
            style={styles.Qbutton}
            onPress={() => {
              navigation.navigate("QrGenerator");
            }}
          />
        </View>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay safe everyone</Text>
        <Text style={styles.text}>Sign in to account</Text>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title={"Login"}
              style={styles.Lbutton}
              onPress={() => {
                navigation.navigate("login");
              }}
            />
          </View>

          <View style={styles.button}>
            <Button
              title={"Check data"}
              style={styles.Lbutton}
              onPress={() => {
                navigation.navigate("History");
              }}
            />
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};
export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  topButton: {
    marginBottom: 60,
    marginLeft: 210,
    backgroundColor: colors.white,
  },
  Qbutton: {
    width: 120,
    height: 30,
    borderRadius: 70,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    paddingLeft: 6,
  },
  Lbutton: {
    width: 160,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 70,
    flexDirection: "row",
  },
  buttons: {
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
