import React from "react";
import { Text, StyleSheet, Platform } from 'react-native';
import * as Font from 'expo-font';

export default function AppText({ children, style }) {
    return (
        <Text style={[styles.text, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: Platform.OS === 'ios' ? {
        fontSize: 22,
        fontFamily: 'Avenir'
    } : {
        fontSize: 22,
        fontFamily: 'Roboto'
    }
})