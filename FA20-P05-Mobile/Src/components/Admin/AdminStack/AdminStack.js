import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";


import AdminHome from '../adminHome';
import colors from '../../../config/colors';

const AdminStack = createStackNavigator();

const AdminStackScreen = ({ navigation }) => (
    <AdminStack.Navigator
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
      <AdminStack.Screen
        name="Home"
        component={AdminHome}
        options={{
          title: "Dashboard",
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
    </AdminStack.Navigator>
  );
  export default AdminStackScreen;