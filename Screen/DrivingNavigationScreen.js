import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
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
    let heading1 = await Location.getHeadingAsync();

    const userCoordinate = { latitude: location.coords.latitude, longitude: location.coords.longitude };
    console.log("User coordinates:", userCoordinate);
    console.log("User heading: ", heading1)
    let CameraObj = {
        center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        },
        pitch: 0,
        altitude: null,
        heading: heading1,
        zoom: 1
    }
    return CameraObj
}

let Camera = {
    center: {
        latitude: null,
        longitude: null,
    },
    pitch: null,
    heading: null,

    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
    altitude: null,

    // Only when using Google Maps.
    zoom: null
}


export default function DrivingNavigationScreen({ navigation, route }) {
    let userLocation
    let dataObj = route.params
    useEffect(() => {
        userLocation = getLiveLocation();

    }, []);
    return (
        <View style={styles.container}>
            <MapView
                provider={null}

                ref={thisObj => mapView = thisObj}
                style={{ ...StyleSheet.absoluteFill }}
                showsBuildings={true}
                showsTraffic={true}
                showsUserLocation={true}
                showsPointsOfInterest={true}
                showsCompass={true}
                userLocationPriority={'low'}
                followsUserLocation={true}


            >


                <AppButton
                    onPress={() => {
                        console.log("Getting camera")
                        console.log(mapView.getCamera())
                        //mapView.animateCamera(userLocation, { duration: 100 })
                    }}
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