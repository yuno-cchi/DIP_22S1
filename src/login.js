/*
    ~/src/login.js

    Login screen component

    Last updated 25/8 by Cris

    Changelog:
    25/8 - added basic string validation to username field, implemented a loginEvent function, added iOS alert functionality, remvoved unneeded dependencies, minor refactoring- Cris 
    24/8 - Created component - Cris

*/

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
import styles from '../assets/styles/styles.js';
import IsValidString from './IsValidString.js';

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const showToast = (message) => {
        if(Platform.OS == 'android') {
            ToastAndroid.show(message, ToastAndroid.LONG);
        } else { // we're only making an iOS and Android app idt we need alerts for web or windows
            Alert.alert(message);
        }
    }

    let loginEvent = (enteredUser, enteredPass) => {
        // when login functionality is done this is the function that will submit the entered credentials
        // for now it only sends a message

        if (IsValidString(enteredUser)) { // if username is invalid leave enteredUser empty
            var userToValidate = enteredUser;
        }

        var passToValidate = enteredPass;

        var errorToastMessage = ""
        if(!userToValidate) { // an empty string is falsy
            errorToastMessage += "Empty or invalid username; ";
        }
        if(!passToValidate) { // an empty string is falsy
            errorToastMessage += "Empty password;"
        }
 
        if(errorToastMessage) { // if the error message is NOT an empty string, there is an error, so we print it out
            showToast(errorToastMessage);
        } else { // otherwise we attempt a log-in
            showToast("WIP: Login Function; entered username: ("+ userToValidate + "); entered password: (" + passToValidate +"); "); //comment this out once we implement logins
            // comment this out once we implement logins, this is just a placeholder function
        }
    }

    return (
        // login stuff goes HERE
        <View style={styles.container}>

            <Image style={styles.logoView} source={require("../assets/img/placeholder.png")}/>
            <StatusBar style="auto" />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="username"
                    placeholderTextColor="#fef2f0"
                    onChangeText={(user) => setUser(user)} 
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="password"
                    placeholderTextColor="#fef2f0"
                    secureTextEntry={true}
                    onChangeText={(pass) => setPass(pass)}
                />
            </View>

            <TouchableOpacity>
                <Text style={styles.textLinks} onPress={(event) => showToast("we're probably not gonna implement this any time soon hehe >:)")}>Forgot Password?</Text> 
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.textLinks} onPress={(event) => showToast("Work in Progress! - Account Creation")}>New user?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonNormal} onPress={(event) => loginEvent(user,pass)}>
                    <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

        </View>

    )
}

