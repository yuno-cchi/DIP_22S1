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
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Platform } from 'react-native';
import Login from './src/login';
import { TouchableOpacity } from 'react-native';
import DriverMapScreen from './Screen/DriverMapScreen';
import DriverPutRouteAndroid from './Screen/DriverPutRouteScreen_Android';
import ReccommendedRouteScreen from './Screen/ReccommendedRouteScreen';
import TopTab from './Components/TopTab';
import SearchBar from './Components/SearchBar';
import TopSearchBar from './Components/TopSearchBar';
import DriverPutRoute from './Screen/DriverPutRouteScreen';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { color } from './Config/Color';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DriverPutRouteScreen_Android from './Screen/DriverPutRouteScreen_Android';
import DriverPutRouteScreen from './Screen/DriverPutRouteScreen';
import selectUserType from './src/selectUserType';
import RiderMapScreen from './Screen/RiderMapScreen';
import TestRouteFinding from './Screen/TestRouteFinding';
//navigator.geolocation = require('react-native-geolocation-service');

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(true);

  const [initialPage, setInitialPage] = useState("Login");

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkLoginState();
  }, []);

  //to redirect users to login / create screen if not logged in for first time, else proceed to calendar page
  const checkLoginState = async () => {
    console.log("wait");

    const loginState = await AsyncStorage.getItem("isLoggedIn");
    const idUser = await AsyncStorage.getItem("userId");

    if (loginState == "true") {
      console.log("User is logged in: " + idUser)
      setInitialPage("RiderMapScreen")
    }
    else {
      console.log("user is not logged in")
    }

    setShow(false);
  }


  if (show) {
    //setRouteVisible(false);
    console.log("attenzione");
    return <View><Text>Loading, please wait</Text></View>
  }

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={"ReccommendedRouteScreen"} screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SelectUserType" component={selectUserType} />
        <Stack.Screen name="RiderMapScreen" component={RiderMapScreen} />
        <Stack.Screen name="DriverPutRoute" component={Platform.OS === 'ios' ? DriverPutRouteScreen : DriverPutRouteScreen_Android} />
        <Stack.Screen name="ReccommendedRouteScreen" component={ReccommendedRouteScreen} />
        <Stack.Screen name="TestScreen" component={TestRouteFinding} />
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
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1
  },
  searchBar: {
    height: 20,
    width: 300,
    borderRadius: 10,
  },
  googleTextBox: {
    container: {
      width: 300,
      marginTop: 100
    },
  },
  textboxContainer: {
    width: '100%',
    height: 400,
    backgroundColor: color.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  maps: {
    ...StyleSheet.absoluteFillObject
  }

})

