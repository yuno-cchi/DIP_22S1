/* ~/App.js
 *
 * The main application launchpad.
 * 
 * 
 * Last updated 24/8 by Cris.
 * 
 * Changelog:
 * 24/8 - added functional(?) log-in screen - Cris
 * 17/8 - file created
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View, 
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Platform, 
} from "react-native";
import styles from './assets/styles/styles.js';
import Login from './src/login.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewUser from './src/newUser.js';

const Stack = createNativeStackNavigator();

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Login />
      <TouchableOpacity>
        <Text style={styles.textLinks} onPress={() => navigation.navigate("NewUser")}>New user?</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreateAccountScreen({navigation}) {
  return (
    <NewUser />
  );
}

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="NewUser" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}