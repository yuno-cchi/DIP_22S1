import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { color } from '../Config/Color';
import Icon from "./Icon";


export default function AppButton({ title, onPress, style, iconName }) {
    return (
        <TouchableOpacity style={[[styles.button, style]]} onPress={onPress}>
            {iconName && <Icon name={iconName} />}
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: color.primary,
        borderRadius: 25,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10
    },
    title: {
        color: color.white,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignSelf: 'center'
    }
})

