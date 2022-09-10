<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView,
} from "react-native";
=======
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
import SearchBar from './Components/SearchBar';
import RiderMapScreen from './Screen/RiderMapScreen';
import CircularButton from './Components/CircularButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
>>>>>>> 6889c39003d36efa61907253e8869ab95445d2f8

import ContactFooter from "./Components/ContactFooter";

<<<<<<< HEAD
import MapView from "react-native-maps";
import Map from "./src/mapBlock";
import AppExample from "./src/AppExample";
import Card from "./Components/Card";
import { Dimensions } from "react-native";
//import ListingDetailScreen from './Screen/ListingDetailScreen';
import { color } from "./Config/Color";
import SearchBar from "./Components/SearchBar";
import RiderMapScreen from "./Screen/RiderMapScreen";
import MySlider from "./Components/MySlider";
import MyModal from "./Components/MyModal.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

=======
>>>>>>> 6889c39003d36efa61907253e8869ab95445d2f8
export default function App() {
  return (
    //Use FlatList for a bunch of cards
    <View style={styles.container}>
<<<<<<< HEAD
      {/* <SearchBar /> */}
      {/* <MySlider /> */}
      {/* <MyModal /> */}
      <ContactFooter />
=======
      <RiderMapScreen />
>>>>>>> 6889c39003d36efa61907253e8869ab95445d2f8
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
<<<<<<< HEAD
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
=======
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

>>>>>>> 6889c39003d36efa61907253e8869ab95445d2f8
});
