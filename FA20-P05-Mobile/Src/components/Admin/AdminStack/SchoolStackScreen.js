import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";

import colors from "../../../config/colors";
import SchoolActivity from "../SchoolActivity";
import ListSchool from "../ListSchool";

const AddSchool = createStackNavigator();
const Setting = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const SchoolStackScreen = () => (
  <Tab.Navigator
    initialRouteName="School"
    activeColor={colors.purple}
    barStyle={{ backgroundColor: "#fff" }}
  >
    <Tab.Screen
      name="Add School"
      component={AddSchoolScreen}
      options={{
        tabBarLabel: "Add",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus" color={color} size={26} />
        ),
      }}
    />
    
    <Tab.Screen
      name="List"
      component={SettingScreen}
      options={{
        tabBarLabel: "List",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="view-list" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default SchoolStackScreen;

const AddSchoolScreen = ({ navigation }) => (
  <AddSchool.Navigator
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
    <AddSchool.Screen
      name="Add School"
      component={SchoolActivity}
      options={{
        title: "Add School",
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
  </AddSchool.Navigator>
);
const SettingScreen = ({ navigation }) => (
  <Setting.Navigator
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
    <Setting.Screen
      name="Setting"
      component={ListSchool}
      options={{
        title: "School List",
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
  </Setting.Navigator>
);
