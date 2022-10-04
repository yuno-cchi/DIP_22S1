import React from "react";

import { View, TextInput, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color } from "../Config/Color";
import defaultStyle from '../Config/Styles';

export default function AppTextInput({ icon, placeholder = 'Hey', ...otherProps }) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} style={styles.icon} />}
            <TextInput style={defaultStyle.textInput} {...otherProps} placeholder={placeholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
        minHeight: 50,
        alignItems: 'center',
        marginTop: 10
    },
    icon: {
        marginLeft: 10,
        color: color.mediumGray
    }
})