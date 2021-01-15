import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import colors from "../config/colors";

function QrScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    handleBarCodeScanned();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    alert(`Qr code has been scanned!`);
    navigation.navigate("Temperature", { code: data });
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <Text style={styles.description}>Scan your QR code</Text>
        <Text
          onPress={() => navigation.navigate("TempRecordStack")}
          style={styles.cancel}
        >
          Back
        </Text>
      </BarCodeScanner>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
}
export default QrScanner;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  description: {
    fontSize: width * 0.09,
    fontWeight: "bold",
    marginTop: "30%",
    textAlign: "center",
    width: "70%",
    color: colors.purple,
  },
  cancel: {
    backgroundColor: colors.dark,
    fontSize: width * 0.05,
    fontWeight: "bold",
    padding: 4,
    textAlign: "center",
    width: "30%",
    opacity: 0.6,
    color: colors.purple,
  },
});
