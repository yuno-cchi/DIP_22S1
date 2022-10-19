import React from 'react';

import {
    Text,
    View,
} from 'react-native';
import styles from '../assets/styles/styles';

export default function DebugView({ route, navigation }) {
    const userParams = route.params;
    return (
        <View style={styles.container}>
            <Text>Debug View</Text>
            <Text>User: {JSON.stringify(userParams.username)}</Text>
            <Text>User Type: {JSON.stringify(userParams.userType)}</Text>
        </View>
    );
}