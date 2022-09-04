import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { color } from '../Config/Color';


export default function AppButton({ title, onPress, thisColor = 'primary' }) {
    return (
        <TouchableOpacity style={[style.button, { backgroundColor: color[thisColor] }]} onPress={onPress}>
            <Text style={style.title}>
                {title}
            </Text>
        </TouchableOpacity>

    );
}

const style = StyleSheet.create({
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

