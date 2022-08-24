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
} from "react-native";
import styles from '../assets/styles/styles.js'

export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

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
        </View>
    )
}

