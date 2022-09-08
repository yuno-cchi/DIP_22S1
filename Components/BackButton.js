import React, { useEffect } from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';
import { Icon } from '@rneui/themed';

export default function BackButton() {

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);


    return (

        <Icon
            raised
            name='arrowleft'
            type='antdesign'
            onPress={() => {console.log('Go Back'); backAction()}} 
        />
    );
    
}