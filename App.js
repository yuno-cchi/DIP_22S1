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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DriverPutRouteScreen_Android from './Screen/DriverPutRouteScreen_Android';
import DriverPutRouteScreen from './Screen/DriverPutRouteScreen';
import selectUserType from './src/selectUserType';
import RiderMapScreen from './Screen/RiderMapScreen';
//navigator.geolocation = require('react-native-geolocation-service');

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(false);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SelectUserType" component={selectUserType} />
        <Stack.Screen name="RiderMapScreen" component={RiderMapScreen} />
        <Stack.Screen name="DriverRoute" component={Platform.OS === 'ios' ? DriverPutRouteScreen : DriverPutRouteScreen_Android} />
        <Stack.Screen name="ReccommendedRouteScreen" component={ReccommendedRouteScreen} />
      </Stack.Navigator>
    </NavigationContainer>


    // <View style={{flex: 1, backgroundColor: 'red'}}>
    //   <DatePicker
    //     date={date}
    //     //mode={DATE_MODE}
    //     //mode="datetime"
    //     onDateChange={setDate}
    //     // onDateChange={(event, selectedDate) => {
    //     //     setSelectedDate(selectedDate);
    //     //     console.log(selectedDate);
    //     //     const d = new Date(selectedDate);

    //     //     var hora = d.getUTCHours()+8;
    //     //     if (hora >= 24){
    //     //         hora = hora - 24
    //     //     }

    //     //     console.log('Hour: ', hora, ' ', 'Minute: ', d.getUTCMinutes(), 'Sec: ', d.getUTCSeconds());
    //     //     //Need to offset by -4 hours, this is UTC time
    //     // }}
    //     // minimumDate={new Date()}
    //     // accentColor={color.red}
    //     // textColor={color.medium}
    //     // display="default"
    //     // style={{
    //     //     width: 200,
    //     //     transform: [{ scale: 1.5, }],
    //     // }}
    // />
    // </View>
    /*
    <View style={styles.container}>
      <Login style={{ width: "100%" }} />
      <TouchableOpacity style={styles.buttonNormal}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate("Account Creation")}>New user?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonNormal}>
        <Text style={styles.buttonText} onPress={() => showToast("test")}>Debug Stack crosser</Text>
      </TouchableOpacity>
    </View>
    */
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


// export default function App() {

//   return (
//     <NavigationContainer style={styles}>
//       <BeginStack.Navigator initialRouteName='Login'>
//         <BeginStack.Screen name="Login" component={LoginScreen} />
//         <BeginStack.Screen name="Account Creation" component={CreateAccountScreen} />
//       </BeginStack.Navigator>
//     </NavigationContainer>
//   );


// }
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

