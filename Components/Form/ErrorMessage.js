import React from "react";

import { StyleSheet, View } from "react-native";
import { color } from "../../Config/Color";

import AppText from "../AppText";

export default function ErrorMessage({ error }) {
    if (!error) return null;
    return (
        <View>
            {error ? <AppText style={styles.error}>{error}</AppText> : null}
        </View>

    );
}

const styles = StyleSheet.create({
    error: {
        color: color.red
    }
})