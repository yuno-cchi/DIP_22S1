import React from "react";

import { View, StyleSheet } from 'react-native';
import { color } from "../Config/Color";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function ListItemDeleteAction({ onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.deleteAction}>
                <MaterialCommunityIcons name='trash-can' color='white' size={35}></MaterialCommunityIcons>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    deleteAction: {
        backgroundColor: color.danger,
        width: 100,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }

})