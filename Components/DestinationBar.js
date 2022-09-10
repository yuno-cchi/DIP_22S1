import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { color } from "../Config/Color";


export default function DestinationBar() {

    return (

        <TextInput
            style={styles.destinationBar}
            placeholder="Destination"
            keyboardType="default"
        />
    );
}

const styles = StyleSheet.create({
    destinationBar: {
        height: '6%',
        width: '60%',
        borderRadius: 90,
        backgroundColor: color.lightGray,
        borderColor: color.black,
        borderWidth: 2,
        padding: 15
    }
})