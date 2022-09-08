/* ~/src/newUser.js

    screen for creating new users, to be added to database

    last updated 31/8 by Cris

    31/8 - component created - Cris

*/

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import styles from '../assets/styles/styles.js'
import IsValidString from './IsValidString';

export default function NewUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [isValidUsername, toggleIsValidUsername] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

    const [isValidPassword, toggleIsValidPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [arePasswordsMatched, togglePasswordsMatched] = useState(false);
    const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState("");

    const generateUsernameError = (enteredUser) => {

        var usernameError = "";
        
        // string length check failed
        if (!(/^.{5,25}$/.test(enteredUser))) {
            usernameError += "Username must have 5-25 characters\n";
        }

        // alphanumeric or fullstop check failed
        if (!(/^[\.a-zA-Z0-9]+$/.test(enteredUser))){
            usernameError += "Username must only contain A-Z, 0-9 or fullstops\n";
        }

        // whitespace in username
        if (/^.*\s.*$/.test(enteredUser)) {
            usernameError += "Username must not contain spaces or tabs\n";
        }

        //fullstop termination check failed
        if (/^.*\.$/.test(enteredUser)) {
            usernameError += "Username cannot end with a fullstop\n";
        }

        //fullstop start check failed
        if (/^\..*$/.test(enteredUser)) {
            usernameError += "Username cannot start with a fullstop\n";
        }

        //consecutive fullstops
        if (/\b.*\.\..*/.test(enteredUser)) {
            usernameError += "Username cannot have consecutive fullstops\n";
        }
        setUsernameErrorMessage(usernameError);
    }

    const onChangeUser = (enteredUser) => {
        setUsername(enteredUser);
        toggleIsValidUsername(IsValidString(username));
        generateUsernameError(enteredUser);
        validateInputs(username, password, passwordConfirm);
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
    }

    const onChangeConfirmPass = (enteredConfirm) => {
        setPasswordConfirm(enteredConfirm);
        togglePasswordsMatched((enteredConfirm == password));


        if (!(arePasswordsMatched)) {
            var passwordConfirmError = ""

            if (!(enteredConfirm == password)) {
                passwordConfirmError += "Entered Passwords do not match"
            }
        } else {
            passwordConfirmError = ""
        }

            setPasswordConfirmErrorMessage(passwordConfirmError);
    }


    const validateInputs = (username, password, passwordConfirm) => {
        var valid = false;



        if (isValidUsername && isValidPassword && (password === passwordConfirm)) {
            //do something here
        }

        return valid;
    }

    return (
        <View style={styles.container}>
            <Text>Set Username:</Text>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.TextInput}
                    placeholder="username"
                    placeholderTextColor="#fef2f0"
                    onChangeText={(username) => (onChangeUser(username))}
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
            <Text>{password}</Text>
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
            <Text>{passwordConfirm}</Text>
            <View style={styles.buttonNormal}>
                    <Text style={styles.buttonText}>Create Account</Text>
            </View>
        </View>
    );
}

