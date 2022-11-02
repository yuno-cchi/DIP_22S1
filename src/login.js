/*
    ~/src/login.js

    Login screen component

    Last updated 7/9 by Chee Hean

    Changelog:
    7/9 - link to database
    25/8 - added basic string validation to username field, implemented a loginEvent function, added iOS alert functionality, remvoved unneeded dependencies, minor refactoring- Cris 
    24/8 - Created component - Cris

*/

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';

import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    Platform,
    ActivityIndicator
} from "react-native";
import styles from '../assets/styles/styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IsValidString from './IsValidString.js';


export default function Login({ navigation }) {
    const [user, setUser] = useState("");;
    const [pass, setPass] = useState("");

    const [loading, setLoading] = useState();

    const userParams = {
        username: null,
        userType: null,
    };

    var userdata; //global var for getting user cred.
    async function callUsers(username, password) {

        console.log("input username:" + username);
        console.log("input password:" + password)

        const resp = await axios.get('http://secret-caverns-21869.herokuapp.com/user');
        userdata = resp.data;
        console.log(userdata);
        var message;

        //AUTHENTICATION STARTS HERE:
        //start matching username
        for (var x = 0; x < userdata.length; x++) {
            //if username matches
            if (username == userdata[x].username) {

                console.log("username matched!");

                //match password
                for (var i = 0; i < userdata.length; i++) {
                    //if password also matches
                    if (password == userdata[x].password) {
                        console.log("password matched!");

                        message = "Welcome Back!";
                        if (Platform.OS == 'android') {
                            ToastAndroid.show(message, ToastAndroid.LONG);
                        } else { // we're only making an iOS and Android app idt we need alerts for web or windows
                            alert(message);
                        }

                        userParams.username = username;

                        console.log(userdata[i]._id);

                        AsyncStorage.setItem("isLoggedIn", "true");
                        AsyncStorage.setItem("userId", userdata[i]._id);



                        //navigation.navigate("TypeSelect", userParams); //ACTUAL
                        navigation.navigate("SelectUserType", userParams); //FOR DEBUGGING
                        setLoading(false)


                        // sessionStorage.setItem("isLoggedIn", true); //setlogin state to true, set to false once logged out
                        // sessionStorage.setItem("usernameStorage", username); //store username in sessionStorage,

                        //var s = sessionStorage.getItem("isLoggedIn");
                        //console.log(s);
                        return;
                    }
                    else if (i == userdata.length - 1 && userdata[i].password != password) {

                        setLoading(false)

                        message = '(Password) Username invalid / User does not exist!'
                        if (Platform.OS == 'android') {
                            ToastAndroid.show(message, ToastAndroid.LONG);
                        } else { // we're only making an iOS and Android app idt we need alerts for web or windows
                            alert(message);
                        }
                        return;
                    }
                }
            }
            else if (x == userdata.length - 1 && userdata[x].username != username) {

                setLoading(false)

                message = 'Username invalid / User does not exist!'
                if (Platform.OS == 'android') {
                    ToastAndroid.show(message, ToastAndroid.LONG);
                } else { // we're only making an iOS and Android app idt we need alerts for web or windows
                    alert(message);
                }
                return;
            }
        }
    }

    const showToast = (message) => {
        if (Platform.OS == 'android') {
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
        if (!userToValidate) { // an empty string is falsy

            setLoading(false)

            errorToastMessage += "Empty or invalid username; ";
        }
        if (!passToValidate) { // an empty string is falsy

            setLoading(false)

            errorToastMessage += "Empty password;"
        }

        if (errorToastMessage) { // if the error message is NOT an empty string, there is an error, so we print it out

            setLoading(false)

            showToast(errorToastMessage);
        } else { // otherwise we attempt a log-in
            //showToast("WIP: Login Function; entered username: ("+ userToValidate + "); entered password: (" + passToValidate +"); "); //comment this out once we implement logins
            // comment this out once we implement logins, this is just a placeholder function

            //TODO: axios function to match it with API
            //axios.post('http//localhost:5000/users/add', userToValidate, passToValidate).then(res => console.log(res.data));

            callUsers(userToValidate, passToValidate);
        }
    }

    if (loading){
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    }
    else {
    return (
        <View style={styles.container}>
            <Image style={styles.logoView} source={require("../assets/img/logo.png")} />
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

            <TouchableOpacity style={styles.buttonNormal} onPress={(event) => {
                setLoading(true); 
                loginEvent(user, pass)
                }}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNormal}>
                <Text style={styles.buttonText} onPress={(event) => navigation.navigate("SignUpPage", userParams)}>New user?</Text>
            </TouchableOpacity>
        </View>
    );
    }
}

// const styles = StyleSheet.create({
//     container1: {
//       flex: 1,
//       justifyContent: "center"
//     },
//     horizontal1: {
//       flexDirection: "row",
//       justifyContent: "space-around",
//       padding: 10
//     }
//   });

