import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Home from "../screens/Home";
import Scanner from "../screens/Scanner";
import Sessions from "../screens/Sessions";

import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScannerTab"
        component={Scanner}
        // options={({ route }) => ({
        //   title: route.params?.title,
        // })}
      />
      <Stack.Screen name="Sessions" component={Sessions} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#AD40AF" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: "#AD40AF",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          //tabBarBadge: 9,
          tabBarBadgeStyle: { backgroundColor: "yellow" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Sessions"
        component={Sessions}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);

  if (routeName == "GameDetails") {
    return "none";
  }
  return "flex";
};

export default TabNavigator;
