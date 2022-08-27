import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ height: '70%' }}>
        <MapView
          style={styles.map}
          region={{
            latitude: 1.3521,
            longitude: 103.8198,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }}
        >
        </MapView>
      </View>


    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
