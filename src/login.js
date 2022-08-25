/*
    ~/src/login.js

    Login screen component

    Last updated 24/8 by Cris

    Changelog:
    24/8 - Created component - Cris

*/

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, 
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    Platform, 
} from "react-native";
import styles from '../assets/styles/styles.js'

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const showToast = (message) => {
        if(Platform.OS == 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else { // we're only making an iOS and Android app idt we need alerts for web or windows
            Alert.alert(message);
        }
    }

    const loginEvent = (enteredUser, enteredPass) => {
        // when login functionality is done this is the function that will submit the entered credentials
        // for now it only sends a message

        //showToast("WIP: \nEntered username: "+user+";\nEntered password: "+pass); //comment this out once we implement logins
        showToast("WIP: Login Function; entered username: ("+ user + "); entered password: (" +pass +");"); //comment this out once we implement logins
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

