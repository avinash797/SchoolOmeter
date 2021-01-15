import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import SchoolList from '../SchoolList';
import colors from '../../../config/colors';

const HomeStack = createStackNavigator();

const SchoolListStack = ({ navigation }) => (
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
        name="School"
        component={SchoolList}
        options={{
          title: "List of Schools",
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
  export default SchoolListStack;