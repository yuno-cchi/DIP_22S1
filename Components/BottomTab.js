import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../Config/Color'

export default function BottomTab({ children }) {
    return (
        <View style={styles.tab}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    tab: {
        position: 'absolute',
        backgroundColor: color.lightGray,
        width: '100%',
        height: 150,
        bottom: 0
    }
})