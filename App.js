/* ~/App.js
 *
 * The main application launchpad.
 *
 *
 * Last updated 24/8 by Cris.
 *
 * Changelog:
 * 24/8 - added functional(?) log-in screen - Cris
 * 17/8 - file created
 */
import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import Login from "./src/login";

import { TouchableOpacity } from "react-native";
import TopTab from "./Components/TopTab";
import SearchBar from "./Components/SearchBar";
import TopSearchBar from "./Components/TopSearchBar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { color } from "./Config/Color";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DriverPutRouteScreen_Android from "./Screen/DriverPutRouteScreen_Android";
import DriverPutRouteScreen from "./Screen/DriverPutRouteScreen";
import selectUserType from "./src/selectUserType";
import RiderMapScreen from "./Screen/RiderMapScreen";
import RiderMapScreen_android from "./Screen/RiderMapScreen_android";
import TabNavigator from "./Components/AppTabNavigator";
import ReccommendedRouteScreen_getroute from "./Screen/ReccommendedRouteScreen_getroute";
import ReccommendedRouteScreen from "./Screen/ReccommendedRouteScreen";
import FinalDriverRouteScreen from "./Screen/FinalDriverRouteScreen";
import DrivingNavigationScreen from "./Screen/DrivingNavigationScreen";
import CalendarScreenTabNavigator from "./Screen/CalendarScreen";
import CalendarScreen from "./Screen/CalendarScreen";
import NewUser from "./src/newUser";
//import TabNavigator from "./Components/AppTabNavigator";
import SelectUserType from "./src/selectUserType";
import CalendarScreenTabNavigator_Driver from "./Screen/CalendarScreen_Driver";
import CalendarScreenTabNavigator_Rider from "./Screen/CalendarScreen_Rider";
import PushNotification from "./Screen/PushNotification";
import DayPlan_test from "./Screen/DayPlan_test";
import * as Notifications from 'expo-notifications';
//navigator.geolocation = require('react-native-geolocation-service');

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("datetime");
  const [show, setShow] = useState(true);

  const [initialPage, setInitialPage] = useState("Login");
  const [permission, setNotiPermission] = useState();

  const [token, setToken] = useState();

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkLoginState();
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    try {
      setNotiPermission(await Notifications.getPermissionsAsync())
      if (!permission) return;
      setToken((await Notifications.getExpoPushTokenAsync()).data);

      console.log(token)
    } catch (error) {
      console.log(error)
    }
  }

  //to redirect users to login / create screen if not logged in for first time, else proceed to calendar page
  async function checkLoginState() {
    console.log("wait");


    AsyncStorage.removeItem("isLoggedIn");
    AsyncStorage.removeItem("userId");

    const loginState = await AsyncStorage.getItem("isLoggedIn");
    const idUser = await AsyncStorage.getItem("userId");
    console.log(loginState);

    //FOR DEBUG: remove the AsyncStorage variables
    // AsyncStorage.removeItem("isLoggedIn");
    // AsyncStorage.removeItem("userId");

    if (loginState == "true") {
      console.log("User is logged in: " + idUser);
      setInitialPage("RiderMapScreen"); //TODO: RiderMapScreen needs an android version as well, use driverputroute if debugging reccroutescreen onwards
      console.log(initialPage);
      setShow(false);
    } else {
      setInitialPage("Login");
      console.log("user is not logged in");
      setShow(false);
    }
  }

  if (show) {
    //setRouteVisible(false);
    console.log("Attention");
    console.log(initialPage);
    return (
      <View>
        <Text>Loading, please wait</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUpPage" component={NewUser} />
        <Stack.Screen name="SelectUserType" component={selectUserType} />
        <Stack.Screen
          name="RiderMapScreen"
          component={
            Platform.OS === "ios" ? RiderMapScreen : RiderMapScreen_android
          }
        />
        <Stack.Screen
          name="DriverPutRoute"
          component={
            Platform.OS === "ios"
              ? DriverPutRouteScreen
              : DriverPutRouteScreen_Android
          }
        />
        <Stack.Screen
          name="ReccommendedRouteScreen"
          component={ReccommendedRouteScreen}
        />
        <Stack.Screen
          name="FinalDriverRouteScreen"
          component={FinalDriverRouteScreen}
        />
        <Stack.Screen
          name="TypeSelect"
          component={selectUserType}
        />
        <Stack.Screen
          name="DrivingNavigationScreen"
          component={DrivingNavigationScreen}
        />
        <Stack.Screen
          name="PushNotification"
          component={PushNotification}
        />
        <Stack.Screen
          name="CalendarScreenTabNavigator_Driver"
          component={CalendarScreenTabNavigator_Driver}
        />
        <Stack.Screen
          name="CalendarScreenTabNavigator_Rider"
          component={CalendarScreenTabNavigator_Rider}
        />
        <Stack.Screen
          name="DayPlan_test"
          component={DayPlan_test}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CreateAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <NewUser style={{ width: "100%" }} />
    </View>
  );
}

function SelectUserTypeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SelectUserType style={{ width: "100%" }} />
    </View>

    //TODO: Add this to the stack
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    flex: 1,
  },
  searchBar: {
    height: 20,
    width: 300,
    borderRadius: 10,
  },
  googleTextBox: {
    container: {
      width: 300,
      marginTop: 100,
    },
  },
  textboxContainer: {
    width: "100%",
    height: 400,
    backgroundColor: color.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  maps: {
    ...StyleSheet.absoluteFillObject,
  },
});
