import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.innerText}>Hello!</Text>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        //specify our coordinates, ask for user location
        initialRegion={{
          latitude: 1.3483,
          longitude: 103.6831,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1f21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerText: {
    color: 'white',
    fontSize: 80
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});