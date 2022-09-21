import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';


import { Dimensions } from 'react-native';
import { color } from './Config/Color';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RiderMapScreen from './Screen/RiderMapScreen';
import ListingDetailScreen from './Screen/ListingDetailScreen';
import DriverMapScreen from './Screen/DriverMapScreen';
import CheeHeanDomain from './Screen/CheeHeanDomain';
import AppButton from './Components/AppButton';
import MyAccountScreen from './Screen/MyAcountScreen';
import CalendarScreen from './Screen/CalendarScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// [] array
// {} function, not rendered
// () JSX element, rendered

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="RiderMap"
    screenOptions={{
      headerShown: false
    }}
  >
    <Tab.Screen name="Account" component={MyAccountScreen} />
    <Tab.Screen name="RiderMap" component={RiderMapScreen} />
    <Tab.Screen name="DriverMap" component={CheeHeanDomain} />
    {/* <Tab.Screen name="DriverMap" component={DriverMapScreen} /> */}
    <Tab.Screen name="Calendar" component={CalendarScreen} />
  </Tab.Navigator>
)

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName='ScreenA'
    screenOptions={{
      headerBackButtonMenuEnabled: false,
      headerShown: false
    }}>
    <Stack.Screen name="ScreenA" component={ScrrenA} />
    <Stack.Screen name="ScreenB" component={ScreenB} />

  </Stack.Navigator>
)
const ScrrenA = ({ navigation }) => (
  < View style={{ backgroundColor: 'blue', flex: 1 }}>
    <CheeHeanDomain />
    <AppButton
      title="Rider Screen>>"
      onPress={() => navigation.navigate("ScreenB")}
      style={styles.switchScreen} />
  </View >
)

const ScreenB = ({ navigation }) => (
  <View style={{ backgroundColor: 'pink', flex: 1 }}>
    <RiderMapScreen />
    <AppButton
      title="<<Driver Screen"
      onPress={() => navigation.navigate("ScreenA")}
      style={styles.switchScreen} />
  </View>
)

export default function App() {
  return (
    //Use FlatList for a bunch of cards
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    //<CheeHeanDomain />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchScreen: {
    position: 'absolute',
    bottom: 120
  }

});
