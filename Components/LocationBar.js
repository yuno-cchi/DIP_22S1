import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { color } from "../Config/Color";


export default function LocationBar() {

    return (

        <TextInput
            style={styles.locationBar}
            placeholder="Location"
            keyboardType="default"
        />
    );
}

const styles = StyleSheet.create({
    locationBar: {
        height: '6%',
        width: '60%',
        borderRadius: 90,
        backgroundColor: color.lightGray,
        borderColor: color.black,
        borderWidth: 2,
        padding: 15
    }
})