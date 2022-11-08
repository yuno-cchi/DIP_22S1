import React, { Children } from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../Config/Color";

export default function HeaderTab({ children, style }) {
    return <View style={[styles.tab, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    tab: {
        position: "absolute",
        backgroundColor: color.lightGray,
        width: "100%",
        height: 180,
        top: 0,
    },
});
