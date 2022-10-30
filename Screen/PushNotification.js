import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import AppButton from '../Components/AppButton';

export default function PushNotification() {

    const [token, setToken] = useState();
    const [permission, setNotiPermission] = useState();

    useEffect(() => {
        registerForPushNotifications()
    }, [])

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Don't forget your ride",
                body: 'Here is the notification body',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
        });
    }

    const registerForPushNotifications = async () => {
        try {
            setNotiPermission(await Notifications.getPermissionsAsync())
            if (!permission) return;
            setToken((await Notifications.getExpoPushTokenAsync()).data);

            console.log(token)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <View>

            <AppButton
                title={"Log"}
                onPress={() => {
                    console.log(token, permission)
                }}
            />

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
    }
})