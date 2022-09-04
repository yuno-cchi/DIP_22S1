import React from "react";

import { View, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import AppText from "../Components/AppText";
import { color } from "../Config/Color";
import Swipable from 'react-native-gesture-handler/Swipeable';

export default function ListItem(props) {
    const { title, subtitle, onPress, renderRightActions } = props;
    return (
        <Swipable renderRightActions={renderRightActions}>
            <TouchableHighlight onPress={onPress} underlayColor={color.lightGray}>
                <View style={styles.profileContainer}>
                    <Image source={require('../assets/mosh.jpg')} style={styles.profilePic} resizeMode='contain' />
                    <View style={styles.description}>
                        <AppText style={styles.titleDetail}>{title}</AppText>
                        <AppText style={styles.listingDetail}>{subtitle}</AppText>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipable>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        padding: 10
    },
    profilePic: {
        borderRadius: 90,
        width: 80,
        height: 80
    },
    titleDetail: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 20,
        marginTop: 8
    },
    listingDetail: {
        fontSize: 18,
        fontWeight: '100',
        color: color.medium,
        marginLeft: 20,
        marginTop: 5
    },
    description: {
        flexDirection: 'col'
    }
})