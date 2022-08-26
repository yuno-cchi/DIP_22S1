import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import MapView from "react-native-maps";

import appPalette from "./dist/lib/appPalette";
//Dont bloody import Button from react-native-web

const Separator = () => (
  <View style={styles.separator} />
);

function App() {
  return (
    <View style={styles.container}>

      <View style={styles.mapContainer}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-evenly", alignItems: "flex-start" }}>
        <Button title="Click me " onPress={() => console.log("Pressed")} />
        <Button title="Click me 2" onPress={() => console.log("2")} />
      </View>
    </View>
  );
}

function getUserLocation() {
  console.log("Next is pressed")
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'north',
    flexDirection: 'column'
  },
  button: {
    width: '10%',
    height: '5%'
  },
  innerText: {
    color: 'white',
    fontSize: 80
  },
  mapContainer: {
    width: '100%',
    height: '75%',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;