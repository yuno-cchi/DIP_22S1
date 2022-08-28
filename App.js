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
      <StatusBar style="auto" />
      <Map />
      <View style={{
        backgroundColor: 'pink',
        color: 'blue',
        width: 100,
        height: 100,
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <Button title='Location' onPress={getUserCurrentLocation}
          style={{

          }}>

        </Button>
      </View>


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
