import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList,SafeAreaView } from "react-native";
import Constants from 'expo-constants';
import BASE_URL from '../../api/baseUrl';

 function StaffList(props) {

    const [staff, setStaff] = useState([]);

    useEffect(() => {
        getStaffData();
    },[]);
  
    const getStaffData = async() => {
      fetch(BASE_URL + "/api/staff")
      .then((response) => {
        return response.json();
      })
      .then((res) => setStaff(res))
      .catch((err) => alert(err));
  };
  
    const _renderItem = ({ item, index }) => {
      return (
        <View style={styles.item}>
          <Text>{"Staff Id: "}{item.id}</Text>
      <Text>{'FullName: '}{item.firstName} {item.lastName}</Text>
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={staff}
          keyExtractor={(x, i) => i.toString()}
          renderItem={_renderItem}
        />
      </SafeAreaView>
    );
}
export default StaffList;
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f5f5f5',
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
  },
  });
  