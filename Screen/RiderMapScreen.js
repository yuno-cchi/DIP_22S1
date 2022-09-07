import React from "react";
import { View, StyleSheet } from "react-native";

import MapView from "react-native-maps";

import Screen from '../Components/Screen';
import SearchBar from "../Components/SearchBar";



// userLocation = Geolocation.getCurrentPosition

export default function RiderMapScreen() {
    return (
        <Screen>
            <MapView
                style={{ ...StyleSheet.absoluteFill }}
                showsUserLocation={true}
            >


            </MapView>
            <SearchBar />
        </Screen >
    );
}

const styles = StyleSheet.create({
    map: {

    }
})