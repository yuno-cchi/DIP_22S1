/*
    ~/src/showToast.js

    function that takes a string and displays it toast message on iOS or Android

*/

import React from 'react';

import {
    Platform,
    Alert,
    ToastAndroid,
} from 'react-native';

export default function showToast(message) {
    if (Platform.OS == 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        Alert.alert(message);
    }
}