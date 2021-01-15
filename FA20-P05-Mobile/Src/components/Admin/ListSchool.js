import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import BASE_URL from "../../api/baseUrl";

function ListSchool() {
  const [school, setSchool] = useState([]);

  useEffect(() => {
    getSchoolData();
  }, []);

  const getSchoolData = async () => {
    return fetch(BASE_URL + "/api/schools", {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => setSchool(res))
      .catch((error) => alert( error));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>
          {"School: "}
          {item.name}
        </Text>
        <Text style={styles.text}>
          {"School Id: "}
          {item.id}
        </Text>
        <Text style={styles.text}>
          {"School Population: "}
          {item.schoolPopulation}
        </Text>
        <Text style={styles.text}>
          {"Address: "}
          {item.address.addressLine1}
          {", "}
          {item.address.addressLine2}
          {", "}
          {item.address.city}
          {","}
          {item.address.state}
          {","}
          {item.address.zip}
        </Text>
        <Text style={styles.text}>
          {"Status: "}
          {item.active.toString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={school}
        keyExtractor={(x, i) => i.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
export default ListSchool;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  name: {
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  text: {
    fontStyle: "italic",
  },
});
