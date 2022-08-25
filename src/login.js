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
} from "react-native";
import styles from '../assets/styles/styles.js'

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
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

                <TouchableOpacity style={styles.buttonNormal} onPress={(event) => showToast("WIP - LogIn: entered user: " + user + "; entered pass: " + pass)}>
                        <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
        </View>

    )
}

