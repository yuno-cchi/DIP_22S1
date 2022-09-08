import React from "react";
import { Button, Alert} from "react-native";


export default function FindDriverButton() {

    return (

        <Button
            title="Find Driver"
            onPress={
                () => {Alert.alert('Finding Driver Now'); console.log('Find Driver');} }
        />
    );
}