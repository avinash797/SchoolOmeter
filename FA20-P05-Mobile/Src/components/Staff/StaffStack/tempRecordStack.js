import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import colors from '../../../config/colors';
import TemperatureRecord from '../temperatureRecord';

const HomeStack = createStackNavigator();

const TempRecordStack = ({ navigation }) => (
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
        name="Temperature"
        component={TemperatureRecord}
        options={{
          title: "Add temperature",
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
  export default TempRecordStack;