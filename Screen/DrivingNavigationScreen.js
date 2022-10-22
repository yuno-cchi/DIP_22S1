import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Overlay } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import AppButton from '../Components/AppButton';

const GOOGLE_API_KEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const ANIMATE_SPEED = 1000;
const ANIMATE_ZOOM = 1;
const INITIAL_POINT = null;
const STROKE_WIDTH = 5;
const STROKE_COLOR = 'blue';
const DATE_MODE = "datetime";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function getLiveLocation() {
    console.log("getting location")
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    let location = await Location.getCurrentPositionAsync();
    let heading = await Location.getHeadingAsync();

    const userCoordinate = { latitude: location.coords.latitude, longitude: location.coords.longitude };
    console.log("User coordinates:", userCoordinate);
    console.log("User heading: ", heading)

}


export default function DrivingNavigationScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <MapView
                ref={thisObj => mapView = thisObj}
                style={{ ...StyleSheet.absoluteFill }}
                showsBuildings={true}
                showsTraffic={true}
                showsUserLocation={true}
                showsPointsOfInterest={true}
                showsCompass={true}
                userLocationPriority={'high'}
                userLocationAnnotationTitle="hey"
            >
                <Overlay />
                <MapViewDirections

                    apikey={GOOGLE_API_KEY}
                    mode='DRIVING'
                />
                <AppButton
                    onPress={() => { getLiveLocation() }}
                />

            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})