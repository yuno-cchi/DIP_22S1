import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar, View } from "react-native";

export default function Screen({ children }) {
    return (
        <SafeAreaView style={styles.screen}>
            {children}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        width: '100%',
        height: '100%'
    }
})