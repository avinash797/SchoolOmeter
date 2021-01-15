import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../config/colors";

export function Input({ style, ...props }) {
  return (
    <TextInput
      {...props}
      style={(styles.input, style)}
      placeholderTextColor={"darkgray"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.gray,
    width: "100%",
    padding: 20,
    borderRadius: 8,
    color: "red",
  },
});
