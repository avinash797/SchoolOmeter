import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, FlatList,SafeAreaView } from "react-native";
import Constants from 'expo-constants';
import BASE_URL from "../../api/baseUrl";

 function Users() {
 
  return (
    <SafeAreaView style={styles.container}>
      
     <Text> List of username and staff id that are create by admin will be displayed here</Text>
    </SafeAreaView>
  );
}
export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
