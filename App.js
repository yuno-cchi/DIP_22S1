import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';

import MapView from 'react-native-maps';
import Map from './src/mapBlock';
import AppExample from './src/AppExample';
import Card from './Components/Card';
import { Dimensions } from 'react-native';
import ListingDetailScreen from './Screen/ListingDetailScreen';
import { color } from './Config/Color';
//import SearchBar from './Components/SearchBar';
import LocationBar from './Components/LocationBar';
import DestinationBar from './Components/DestinationBar';
import FindDriverButton from './Components/FindDriverButton';
import BackButton from './Components/BackButton';
import RiderMapScreen from './Screen/RiderMapScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




export default function App() {
  return (
    //Use FlatList for a bunch of cards
    <View style={styles.container}>
      <BackButton />
      <LocationBar />
      <DestinationBar />
      <FindDriverButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30
  }

});
