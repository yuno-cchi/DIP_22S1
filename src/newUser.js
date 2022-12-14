/* ~/src/newUser.js

    screen for creating new users, to be added to database

    last updated 31/8 by Chee Hean

    18/9 - Linked sign up page to the backend, can finally add users to db - CH
    13/9 - Input validation finally done - Cris
    31/8 - component created - Cris

*/

import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import IsValidString from './IsValidString';
import showToast from './showToast.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logs } from 'expo';
import { color } from '../Config/Color';
import { FontAwesome5 } from '@expo/vector-icons';

Logs.enableExpoCliLogging();

export default function NewUser({ route, navigation }) {

    const userParams = route.params;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [isValidUsername, toggleIsValidUsername] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

    const [isValidPassword, toggleIsValidPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [arePasswordsMatched, togglePasswordsMatched] = useState(false);
    const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [isValidEmail, toggleIsValidEmail] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const [readyToSubmit, setReadyToSubmt] = useState(false);

    const generateUsernameError = (enteredUser) => {

        var usernameError = "";
        toggleIsValidUsername(true);

        // string length check failed
        if (!(/^.{5,25}$/.test(enteredUser))) {
            usernameError += "Username must have 5-25 characters\n";
            toggleIsValidUsername(false);
        }

        // alphanumeric or fullstop check failed
        if (!(/^[\.a-zA-Z0-9]+$/.test(enteredUser))) {
            usernameError += "Username must only contain A-Z, 0-9 or fullstops\n";
            toggleIsValidUsername(false);
        }

        // whitespace in username
        if (/^.*\s.*$/.test(enteredUser)) {
            usernameError += "Username must not contain spaces or tabs\n";
            toggleIsValidUsername(false);
        }

        //fullstop termination check failed
        if (/^.*\.$/.test(enteredUser)) {
            usernameError += "Username cannot end with a fullstop\n";
            toggleIsValidUsername(false);
        }

        //fullstop start check failed
        if (/^\..*$/.test(enteredUser)) {
            usernameError += "Username cannot start with a fullstop\n";
            toggleIsValidUsername(false);
        }

        //consecutive fullstops
        if (/\b.*\.\..*/.test(enteredUser)) {
            usernameError += "Username cannot have consecutive fullstops\n";
            toggleIsValidUsername(false);
        }
        setUsernameErrorMessage(usernameError);
    }

    const onChangeUser = (enteredUser) => {
        setUsername(enteredUser);
        toggleIsValidUsername(IsValidString(username));
        generateUsernameError(enteredUser);
    }

    const generatePasswordError = (enteredPass) => {
        var passwordError = ""
        if (!(/^.{6,25}$/.test(enteredPass))) {
            passwordError += "\nPasswords must be 6-25 characters long";
        }

        if (!(/^[a-zA-Z0-9\.!?#@$%^&*()\-\+=,<>]+$/.test(enteredPass))) {
            passwordError += "\nEntered password contains an illegal character"
        }

        setPasswordErrorMessage(passwordError);
    }

    const onChangePass = (enteredPass) => {
        setPassword(enteredPass);
        //usernames must have 6-25 characters and no spaces
        //some special characters are allowed
        toggleIsValidPassword(/^[a-zA-Z0-9\.!?#@$%^&*()\-\+=,<>]{6,25}$/.test(enteredPass));
        generatePasswordError(enteredPass);
        if (enteredPass != passwordConfirm) {
            generateConfirmPassError(enteredPass);
        } else {
            setPasswordConfirmErrorMessage("");
        }
    }

    const generateConfirmPassError = (enteredConfirm) => {

        var passwordConfirmError = ""

        if (!(enteredConfirm == password)) {
            passwordConfirmError += "Entered Passwords do not match"
        }
        setPasswordConfirmErrorMessage(passwordConfirmError);
    }

    const onChangeConfirmPass = (enteredConfirm) => {
        setPasswordConfirm(enteredConfirm);
        togglePasswordsMatched(enteredConfirm == password);
        generateConfirmPassError(enteredConfirm);
    }

    const generateEmailError = (enteredEmail) => {
        var emailError = "";
        var emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

        if (!(emailRegex.test(enteredEmail))) {
            emailError += "Not a valid email address";
        } else {
            emailError = "";
        }

        setEmailErrorMessage(emailError);

    }

    const onChangeEmail = (enteredEmail) => {
        var emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        setEmail(enteredEmail);
        toggleIsValidEmail(emailRegex.test(enteredEmail));
        generateEmailError(enteredEmail);
    }


    const sendIt = () => {
        var toastmessage = "";
        if (isValidPassword && isValidUsername && arePasswordsMatched && isValidEmail) {
            setUsernameErrorMessage("");
            setPasswordErrorMessage("");
            setPasswordConfirmErrorMessage("");
            setEmailErrorMessage("");
            addUserToDb(username, password, email);
            userParams.username = username;
            navigation.navigate("TypeSelect", userParams);
        } else {
            onChangeUser(username);
            onChangePass(password);
            onChangeConfirmPass(passwordConfirm);
            onChangeEmail(email);

            //debug
            if (!(isValidEmail)) {
                toastmessage += "Email error. "
            }

            if (!(isValidUsername)) {
                toastmessage += "Username error. "
            }
            if (!(isValidPassword)) {
                toastmessage += "Password error. "
            }

            if (!(arePasswordsMatched)) {
                toastmessage += "Entered passwords do not match."
            }
            showToast(toastmessage);
            toastmessage = "";
        }
    }


    async function addUserToDb(username, password, email) {
        console.log("load");
        axios({
            method: 'post',
            url: 'http://secret-caverns-21869.herokuapp.com/user/add',
            headers: {},
            data: {
                username: username,
                password: password,
                email: email,

            }
        }).then((response) => {
            console.log(response);

            //TODO: add user to asyncstorage

            //TODO: log user into the app
            navigation.navigate("TypeSelect", userParams);


        }, (error) => {
            console.log(error);
        });;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 40 }}>
                <TouchableOpacity
                    style={{
                        top: 20,
                        left: 10,
                        width: 40,
                        height: 40,
                        backgroundColor: color.primary,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        navigation.pop()
                    }}>
                    <FontAwesome5 name={"backward"} size={24} color={'white'} />

                </TouchableOpacity>
            </View>
            <Text>Enter e-mail Address</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="email"
                    placeholderTextColor="#fef2f0"
                    onChangeText={(email) => (onChangeEmail(email))}
                    autoCorrect={false}
                />
            </View>
            <Text style={styles.errorText}>{emailErrorMessage}</Text>
            <Text>Set Username:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="username"
                    placeholderTextColor="#fef2f0"
                    onChangeText={(username) => (onChangeUser(username))}
                    autoCorrect={false}
                />
            </View>
            <Text style={styles.errorText}>{usernameErrorMessage}</Text>
            <Text>Set Password:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="password"
                    placeholderTextColor="#fef2f0"
                    onChangeText={(password) => (onChangePass(password))}
                    secureTextEntry={true}
                />
            </View>
            <Text style={styles.errorText}>{passwordErrorMessage}</Text>
            <Text>Confirm Password:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="re-enter password"
                    placeholderTextColor="#fef2f0"
                    onChangeText={(confirmPassword) => (onChangeConfirmPass(confirmPassword))}
                    secureTextEntry={true}
                />
            </View>
            <Text style={styles.errorText}>{passwordConfirmErrorMessage}</Text>
            <TouchableOpacity style={styles.buttonNormal} onPress={(event) => sendIt()}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}





const styles = StyleSheet.create({

    container: {
        marginTop: "20%",
        //backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    inputView: {
        marginTop: 10,
        backgroundColor: "#ffcccc",
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },

    logoView: {
        width: 400,
        height: 200,
        marginBottom: 10,
    },

    textLinks: {
        fontSize: 15,
        marginBottom: 5,
        alignContent: "center",
        justifyContent: "center",
    },

    buttonNormal: {
        backgroundColor: "#e76850",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconButtonBig: {
        //backgroundColor: "#e76850", //debug
        width: 150,
        height: 180,
        marginLeft: 20,
        marginRight: 20,
    },

    iconButtonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
    },

    buttonIcon: {
        height: 100,
        width: 100,
        marginTop: 10,
        marginLeft: 25,
    },

    buttonDisabled: {
        backgroundColor: "#e76850",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },

    buttonText: {
        marginTop: 30,
        height: 50,
        color: "#f5f5f5",
        alignContent: "center",
        justifyContent: "center",
    },

    errorText: {
        color: "#ff0000",
        fontStyle: 'italic',
    }
})
