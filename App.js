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
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView } from 'react-native';
import Login from './src/login';
import { TouchableOpacity } from 'react-native';
import DriverMapScreen from './Screen/DriverMapScreen';
import ReccommendedRouteScreen from './Screen/ReccommendedRouteScreen';

export default function App() {
  return (
    <View>
      <ReccommendedRouteScreen />

    </View>
    /*
    <View style={styles.container}>
      <Login style={{ width: "100%" }} />
      <TouchableOpacity style={styles.buttonNormal}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate("Account Creation")}>New user?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonNormal}>
        <Text style={styles.buttonText} onPress={() => showToast("test")}>Debug Stack crosser</Text>
      </TouchableOpacity>
    </View>
    */
  );
}

function CreateAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <NewUser style={{ width: "100%" }} />
    </View>
  );
}

function SelectUserTypeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SelectUserType style={{ width: "100%" }} />
    </View>

    //TODO: Add this to the stack
  )
}


// export default function App() {

//   return (
//     <NavigationContainer style={styles}>
//       <BeginStack.Navigator initialRouteName='Login'>
//         <BeginStack.Screen name="Login" component={LoginScreen} />
//         <BeginStack.Screen name="Account Creation" component={CreateAccountScreen} />
//       </BeginStack.Navigator>
//     </NavigationContainer>
//   );


// }
const styles = StyleSheet.create({
  container: {

  }
})

