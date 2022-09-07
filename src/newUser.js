/* ~/src/newUser.js

    screen for creating new users, to be added to database

    last updated 31/8 by Cris

    31/8 - component created - Cris

*/

import React, { useState } from 'react';
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

    return (
        <View>
            <Text>placeholder while we work on this page</Text>
        </View>
    );
}