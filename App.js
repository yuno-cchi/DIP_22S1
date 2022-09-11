import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';


import { Dimensions } from 'react-native';
import { color } from './Config/Color';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// [] array
// {} function, not rendered
// () JSX element, rendered

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator initialRouteName='TweetDetail'>
    <Stack.Screen name="Tweets" component={Tweets} />
    <Stack.Screen name="TweetDetail" component={TweetDetail} />

  </Stack.Navigator>
)
const Tweets = ({ navigation }) => (
  < View style={{ backgroundColor: 'blue', flex: 1 }}>
    <Text >Tweets</Text>
    <Button title="Change Screen" onPress={() => navigation.navigate("TweetDetail")} />
  </View >
)

const TweetDetail = ({ navigation }) => (
  <View style={{ backgroundColor: 'pink', flex: 1 }}>
    <Text>TweetDetail</Text>
    <Button title="Change Screen" onPress={() => navigation.navigate("Tweets")} />

  </View>
)

export default function App() {
  return (
    //Use FlatList for a bunch of cards
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
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
