import React from "react";
import { StyleSheet, Text } from "react-native";

export function Heading({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    paddingBottom: 40,
    fontSize: 32,
  },
});
