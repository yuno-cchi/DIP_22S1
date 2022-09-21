import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Icon({ name, size = 30, backgroundColor = '#000', iconColor = '#fff' }) {
    const styles = StyleSheet.create({
        icon: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: backgroundColor,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    return (
        <View style={styles.icon}>
            <MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
        </View>
    );
}

