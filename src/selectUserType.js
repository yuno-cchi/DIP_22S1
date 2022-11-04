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

    SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { color } from '../Config/Color.js';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function SelectUserType({ route, navigation }) {

    const [isLoading, setLoading] = useState(true);

    const userParams = {
        userID: route.params.userID,
        userType: route.params.userType,
        username: route.params.username
    };
    console.log("selectedUserType userparams: ", route.params)
    const selectUserType = (userType) => {
        if (userType === "rider") {
            userParams.userType = "rider"
            navigation.navigate("CalendarScreenTabNavigator_Rider", userParams);
        } else {
            userParams.userType = "driver"
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
            function () { setLoading(false) }
            , 200);

    });

    if (isLoading) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    height: "100%",
                    padding: 30,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >


                <ActivityIndicator size="large" color={color.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    fontStyle: {
        fontSize: 40,
        color: color.primary,
        fontStyle: 'italic',
        fontWeight: '500',
        fontFamily: 'Menlo'
    }
})

const styles = StyleSheet.create({

    container: {
        marginTop: "50%",
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
        fontWeight: '700',
        fontFamily: 'Menlo'
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

