import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import AppText from "../Components/AppText";

import { color } from '../Config/Color';

import ListItem from "../Components/ListItem";

export default function ListingDetailScreen() {
    return (

        <View style={styles.container}>
            <Image source={require('../assets/jacket.jpg')} style={styles.image} resizeMode='contain'></Image>
            <AppText style={styles.title}>Hey</AppText>
            <AppText style={styles.subtitle}>There</AppText>
            <ListItem title='Hey' subtitle='Hello' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%'
    },
    image: {
        width: '100%',
        height: '40%'
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 20
    },
    subtitle: {
        color: color.green,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20
    }

})