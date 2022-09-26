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
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';
import Login from './src/login';
import { TouchableOpacity } from 'react-native';
import DriverMapScreen from './Screen/DriverMapScreen';
import ReccommendedRouteScreen from './Screen/ReccommendedRouteScreen';
import TopTab from './Components/TopTab';
import SearchBar from './Components/SearchBar';
import TopSearchBar from './Components/TopSearchBar';
import DriverPutRoute from './Screen/DriverPutRoute';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { color } from './Config/Color';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';

//navigator.geolocation = require('react-native-geolocation-service');

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(false);



  return (
    /*
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={styles.maps}
        ref={(map) => { TheMap = map; }}
        initialRegion={{
          latitude: 6.8523,
          longitude: 79.8895,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'black', height: 30, width: 100, bottom: 30, position: 'absolute' }}
        onPress={() => TheMap.animateToRegion({
          latitude: 1,
          longitude: 1
        }, 1000)}>
        <Text>Tap</Text>
      </TouchableOpacity>
    </SafeAreaView>
    */
    <DriverPutRoute />
    /*
     <View style={styles.container}>
 
 
       <View style={styles.textboxContainer}>
         <GooglePlacesAutocomplete
           styles={styles.googleTextBox}
           placeholder='Search'
           onPress={(data, details = null) => {
             // 'details' is provided when fetchDetails = true
             console.log(data, details);
 
           }}
 
           query={{
             key: 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88',
             language: 'en',
             components: 'country:sg'
           }}
           nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
           GooglePlacesSearchQuery={{
             // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
             rankby: 'distance',
           }}
           enablePoweredByContainer={false}
         />
 
       </View>
     </View>
         */
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

