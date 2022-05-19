import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Scanner from "../screens/Scanner";
import Sessions from "../screens/Sessions";

import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: true }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
