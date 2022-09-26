import React from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../Config/Color';

export default function TopTab({ style, children }) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.smallContainer} >
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 220,
        padding: 0,
        backgroundColor: color.lightGray,

    },
    smallContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 0,
        marginRight: 0,
    }
})