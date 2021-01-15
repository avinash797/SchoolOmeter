import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function TextButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={(styles.container, style)} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
  },
});
export default TextButton;
