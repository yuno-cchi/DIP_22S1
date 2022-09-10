import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { color } from "../Config/Color";
import Icon from "react-native-vector-icons/AntDesign";


export default function CircularButton({ name, size = 30, onPress, style }) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: color.white,
            height: size * 1.4,
            width: size * 1.4,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 90,
            borderWidth: 2
        }
    })
    return (

        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View>
                <Icon name={name} size={size}>

                </Icon>

            </View>

        </TouchableOpacity>
    );
}

