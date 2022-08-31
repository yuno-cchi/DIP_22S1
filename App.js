import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import MapView from 'react-native-maps';
import Map from './src/mapBlock';

function getUserCurrentLocation() {
  let currentLocation
  console.log(currentLocation)
}

export default function App() {
  return (
    <View style={styles.container}>
      <Map />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }

});
