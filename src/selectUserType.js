/*
 *  ~/src/selectUserType.js
 *
 *  Select User Type Component
 *  After signing up, the user must pick whether they are a rider, or a driver.
 *  This is the screen that will let them do that.
 *  
 *  Last updated 21/9 - Cris
 * 
 *  Changelog:
 *  21/9 - Component Created - Cris
 *
 */

import React, { useEffect, useState } from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import styles from '../assets/styles/styles.js'
import { color } from '../Config/Color.js';

export default function SelectUserType({ route, navigation }) {

    const [loading, setLoading] = useState(true);

    const userParams = route.params;
    const selectUserType = (userType) => {
        if (userType === "rider") {
            navigation.navigate("CalendarScreenTabNavigator_Rider", userParams);
        } else {
            navigation.navigate("CalendarScreenTabNavigator_Driver", userParams);
        }

    }

    const registerForPushNotifications = async () => {
        try {
            setNotiPermission(await Notifications.getPermissionsAsync())
            if (!permission) return;
            setToken((await Notifications.getExpoPushTokenAsync()).data);

            console.log(token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setInterval(
            function(){ setLoading(false) }
            , 200);

    });

    if (loading){
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ height: 90 }} />
            <Text style={localStyles.fontStyle}>Today I am:</Text>

            <View style={{ height: 35 }} />

            <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.iconButtonBig} onPress={(event) => selectUserType("rider")}>
                    <Image style={styles.buttonIcon} source={require("../assets/img/rider.png")} />
                    <Text style={styles.iconButtonText}>Riding</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButtonBig} onPress={(event) => selectUserType("driver")}>
                    <Image style={styles.buttonIcon} source={require("../assets/img/driver.png")} />
                    <Text style={styles.iconButtonText}>Driving</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    fontStyle: {
        fontSize: 20,
        color: color.primary,
        fontStyle: 'italic',
    }
})