import React from "react";

import { View, StyleSheet, Image, Text } from "react-native";

import { color } from '../Config/Color';

import AppText from '../Components/AppText';

export default function Card({ title, subTitle, image = require('../assets/jacket.jpg') }) {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: color.white,
        width: '95%',
        height: 300,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '75%',
    },
    title: {
        fontWeight: '200',
        marginTop: 5
    },
    subTitle: {
        color: color.green,
        fontWeight: '150',
        marginTop: 2
    }
})