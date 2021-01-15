import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import CreateUser from "../CreateUser";
import colors from "../../../config/colors";


const userCreate = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const CreateStackScreen = () => (
  <Tab.Navigator
    initialRouteName="CreateUser"
    activeColor={colors.purple}
    barStyle={{ backgroundColor: "#fff" }}
  >
    <Tab.Screen
      name="©Envoc SchoolOmeter"
      component={userCreateScreen}
    />
  </Tab.Navigator>
);
export default CreateStackScreen;

const userCreateScreen = ({ navigation }) => (
  <userCreate.Navigator
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
    <userCreate.Screen
      name="Createuser"
      component={CreateUser}
      options={{
        title: "Create User",
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
  </userCreate.Navigator>
);
