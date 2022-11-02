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

import React from 'react';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import styles from '../assets/styles/styles.js'
import { color } from '../Config/Color.js';

export default function SelectUserType({ route, navigation }) {

    const userParams = route.params;
    const selectUserType = (userType) => {
        userParams.userType = userType
        if (userType === "rider") {
            navigation.navigate("RiderMapScreen", userParams);
        } else {
            navigation.navigate("DriverPutRoute", userParams);
        }

    }

    return (
        <View style={styles.container}>
            <View style={{ height: 90 }} />
            <Text style={localStyles.fontStyle}>Today I am</Text>

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
        fontSize: 30,

        color: color.primary
    }
})