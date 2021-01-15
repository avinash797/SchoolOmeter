import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import colors from '../../../config/colors';
import StaffList from '../StaffList';

const HomeStack = createStackNavigator();

const StaffListStack = ({ navigation }) => (
    <HomeStack.Navigator
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
      <HomeStack.Screen
        name="List of Staff"
        component={StaffList}
        options={{
          title: "List of Staff",
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
    </HomeStack.Navigator>
  );
  export default StaffListStack;