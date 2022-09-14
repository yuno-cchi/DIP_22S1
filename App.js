import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';


import { Dimensions } from 'react-native';
import { color } from './Config/Color';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RiderMapScreen from './Screen/RiderMapScreen';
import ListingDetailScreen from './Screen/ListingDetailScreen';
import DriverMapScreen from './Screen/DriverMapScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// [] array
// {} function, not rendered
// () JSX element, rendered

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator initialRouteName='ScreenA'>
    <Stack.Screen name="ScreenA" component={Tweets} />
    <Stack.Screen name="ScreenB" component={TweetDetail} />

  </Stack.Navigator>
)
const ScrrenA = ({ navigation }) => (
  < View style={{ backgroundColor: 'blue', flex: 1 }}>
    <Text >ScreenA</Text>
    <Button title="Change Screen" onPress={() => navigation.navigate("ScreenB")} />
  </View >
)

const ScreenB = ({ navigation }) => (
  <View style={{ backgroundColor: 'pink', flex: 1 }}>
    <Text>ScreenB</Text>
    <Button title="Change Screen" onPress={() => navigation.navigate("ScreenA")} />

  </View>
)

export default function App() {
  return (
    //Use FlatList for a bunch of cards
    <RiderMapScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

});
