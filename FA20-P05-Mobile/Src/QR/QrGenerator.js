import React from "react";
import { StyleSheet, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Button from "../components/Button";
import AsyncStorage from "@react-native-community/async-storage";

function QrGenerator({ navigation }) {
  let base64Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..";

 var uuid = require('uuid-random');
 let  code =uuid();
AsyncStorage.setItem("id", code);
  
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.text}>{"Your Qr Code to Scan"}</Text>
      <Text style={styles.text}>{" One-Time generated Qr"}</Text>
      <QRCode
        value={code}
        logo={{ uri: base64Logo }}
        logoSize={50}
        logoBackgroundColor="transparent"
      />

      <Button
        title="Back"
        style={styles.Tbutton}
        onPress={() => {
          navigation.navigate("splash");
        }}
      />
    </View>
  );
}
export default QrGenerator;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    paddingTop: 200,
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    padding: 20,
  },
  Tbutton: {
    marginTop: 30,
    marginBottom: 8,
    padding: 13,
    borderRadius: 10,
    width: "60%",
  },
});
