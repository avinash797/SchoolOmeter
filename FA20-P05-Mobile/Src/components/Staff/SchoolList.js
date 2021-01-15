import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import BASE_URL from "../../api/baseUrl";

function SchoolList() {
  const [school, setSchool] = useState([]);

  useEffect(() => {
    getSchoolData();
  });

  const getSchoolData = () => {
    fetch(BASE_URL + "/api/schools/active")
      .then((response) => {
        return response.json();
      })
      .then((res) => setSchool(res))
      .catch((err) => alert( err));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>
          {"School: "}
          {item.name}
        </Text>
        <Text style={styles.address}>
          {"School Population: "}
          {item.schoolPopulation}
        </Text>
        <Text style={styles.address}>
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
export default SchoolList;

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
  address: {
    fontStyle: "italic",
  },
});
