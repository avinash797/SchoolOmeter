import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerContent } from "./Src/components/Admin/DrawerContent";
import { StaffDrawerContent } from "./Src/components/Staff/StaffDrawerContent";

import LoginScreen from "./Src/Screens/loginScreen";
import SplashScreen from "./Src/Screens/SplashScreen";
import History from "./Src/components/Student/History";
import TemperatureRecord from "./Src/components/Staff/temperatureRecord";

import QrGenerator from "./Src/QR/QrGenerator";
import QrScanner from "./Src/QR/QrScanner";

import SchoolListStack from "./Src/components/Staff/StaffStack/schoolListStack";
import StaffListStack from "./Src/components/Staff/StaffStack/staffListStack";
import TempRecordStack from "./Src/components/Staff/StaffStack/tempRecordStack";
import SchoolStackScreen from "./Src/components/Admin/AdminStack/SchoolStackScreen";
import StaffStackScreen from "./Src/components/Staff/StaffStack/StaffStackScreen";
import CreateStackScreen from "./Src/components/Admin/AdminStack/CreateStackScreen";
import AdminStackScreen from "./Src/components/Admin/AdminStack/AdminStack";




const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();


function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="home" component={AdminStackScreen} />
      <Drawer.Screen name="SchoolStackScreen" component={SchoolStackScreen} />
      <Drawer.Screen name="StaffStackScreen" component={StaffStackScreen} />
      <Drawer.Screen name="CreateStackScreen" component={CreateStackScreen} />
      <Drawer.Screen name="TemperatureRecord" component={TemperatureRecord} />
    </Drawer.Navigator>
  );
}

function StaffDrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <StaffDrawerContent {...props} />}
    >
      <Drawer.Screen name="TempRecordStack" component={TempRecordStack} />
      <Drawer.Screen name="SchoolListStack" component={SchoolListStack} />
      <Drawer.Screen name="StaffListStack" component={StaffListStack} />
      
      <Drawer.Screen name="QrScanner" component={QrScanner} />
    </Drawer.Navigator>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="splash" component={SplashScreen} />
        <RootStack.Screen name="login" component={LoginScreen} />

        <RootStack.Screen name="Rstaff" component={StaffDrawerRoutes} />
        <RootStack.Screen name="Radmin" component={DrawerRoutes} />

        <RootStack.Screen name="History" component={History} />
        <RootStack.Screen name="QrGenerator" component={QrGenerator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
export default App;
