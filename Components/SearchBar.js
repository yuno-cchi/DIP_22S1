import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { color } from "../Config/Color";


export default function SearchBar() {

    return (

        <TextInput
            style={styles.searchBar}
            placeholder="Where to?..."
            keyboardType="default"
        />
    );
}

const styles = StyleSheet.create({
    searchBar: {
        height: '5%',
        width: '60%',
        borderRadius: 90,
        backgroundColor: color.lightGray,
        borderColor: color.black,
        borderWidth: 2,
        padding: 15
    }
})