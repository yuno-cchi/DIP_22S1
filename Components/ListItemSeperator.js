import React from "react";

import { StyleSheet, View } from "react-native";
import { color } from "../Config/Color";

export default function ListItemSeperator() {
    return (
        <View style={styles.seprator}>

        </View>
    );
}

const styles = StyleSheet.create({

    seprator: {
        width: '100%',
        height: 10,
        backgroundColor: color.lightGray,
    }
})