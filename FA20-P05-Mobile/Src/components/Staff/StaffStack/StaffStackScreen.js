import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../../config/colors";
import StaffActivity from "../../Admin/StaffActivity";
import StaffScreen from "../../Admin/staffScreen";


const staffCreate = createStackNavigator();
const Staffs = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const StaffStackScreen = () => (
  <Tab.Navigator
    initialRouteName="Staff"
    activeColor={colors.purple}
    barStyle={{ backgroundColor: "#fff" }}
  >
    <Tab.Screen
      name="CreateStaff"
      component={staffCreateScreen}
      options={{
        tabBarLabel: "Add",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Staff List"
      component={StaffsScreen}
      options={{
        tabBarLabel: "List",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="view-list" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default StaffStackScreen;

const staffCreateScreen = ({ navigation }) => (
  <staffCreate.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.purple,
      },
      headerTintColor: "#fff",
      headerTintStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <staffCreate.Screen 
      name="Add staff"
      component={StaffActivity}
      options={{
        title: "Add staff",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={colors.purple}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </staffCreate.Navigator>
);
const StaffsScreen = ({ navigation }) => (
  <Staffs.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.purple,
      },
      headerTintColor: "#fff",
      headerTintStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Staffs.Screen
      name="Staff"
      component={StaffScreen}
      options={{
        title: "Staff List",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={colors.purple}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </Staffs.Navigator>
);
