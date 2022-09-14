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
import {
  Text,
  View, 
  TouchableOpacity,
} from "react-native";
import styles from './assets/styles/styles.js';
import Login from './src/login.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewUser from './src/newUser.js';

const BeginStack = createNativeStackNavigator();

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Login style={{width:"100%"}}/>
      <TouchableOpacity style={styles.buttonNormal}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate("Account Creation")}>New user?</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreateAccountScreen({navigation}) {
  return (
    <View style={styles.container}>
      <NewUser style={{width:"100%"}}/>
    </View>
  );
}

export default function App() {
  
  return (
    <NavigationContainer style={styles}>
      <BeginStack.Navigator initialRouteName='Login'>
        <BeginStack.Screen name="Login" component={LoginScreen}/>
        <BeginStack.Screen name="Account Creation" component={CreateAccountScreen} />
      </BeginStack.Navigator>
    </NavigationContainer>
  );
}

