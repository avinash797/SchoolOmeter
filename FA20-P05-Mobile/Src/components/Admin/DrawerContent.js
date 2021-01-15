import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Title, Caption, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";
import colors from "../../config/colors";

export function DrawerContent(props) {
  const [userValue, setUserValue] = useState({});

  const getDataFromStorage = async () => {
    let user = await AsyncStorage.getItem("LoggedInUser");
    setUserValue(JSON.parse(user));
  };

  const logOut = async () => {
    AsyncStorage.removeItem("LoggedInUser");
    props.navigation.navigate("splash");
  };

  useEffect(() => {
    let isMounted = true
    if (isMounted){
    getDataFromStorage();
  }
  return () => { isMounted = false };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={styles.head}>
                <Title style={styles.title}>
                  Username : {userValue.username}
                </Title>
                <Caption style={styles.caption}>
                  Role : {userValue.role}
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="label-outline" color={color} size={size} />
              )}
              label="School Activity"
              onPress={() => {
                props.navigation.navigate("SchoolStackScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="label-outline" color={color} size={size} />
              )}
              label="Staff Activity"
              onPress={() => {
                props.navigation.navigate("StaffStackScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-plus" color={color} size={size} />
              )}
              label="Create User"
              onPress={() => {
                props.navigation.navigate("CreateStackScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Sign Out"
              onPress={() => {
                logOut();
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  head: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "column",
    backgroundColor: colors.lightgray,
    width: "96%",
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginTop: 30,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
