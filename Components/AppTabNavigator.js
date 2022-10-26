//import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyAccountScreen from "../Screen//MyAcountScreen.js";
import RiderMapScreen from "../Screen/RiderMapScreen";
import CheeHeanDomain from "../Screen/CheeHeanDomain.js";
import CalendarScreen from "../Screen/CalendarScreen.js";
import DriverPutRouteScreen from "../Screen/DriverPutRouteScreen.js";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  //<NavigationContainer>
  <Tab.Navigator
    initialRouteName="Calendar"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen name="Account" component={MyAccountScreen} />
    <Tab.Screen name="DriverMap" component={DriverPutRouteScreen} />
    {/* <Tab.Screen name="DriverMap" component={CheeHeanDomain} /> */}
    {/* <Tab.Screen name="DriverMap" component={DriverMapScreen} /> */}
    <Tab.Screen name="Calendar" component={CalendarScreen} />
  </Tab.Navigator>
  //</NavigationContainer>
);

export default TabNavigator;
