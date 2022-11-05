import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import AppButton from '../Components/AppButton';
import { color } from '../Config/Color';
import BottomTab from '../Components/BottomTab';

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

    return { latitude: location.coords.latitude, longitude: location.coords.longitude }
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
    let dataObj = route.params
    const [myLocation, setMyLocation] = useState();
    const [myHeading, setMyHeading] = useState();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    // const routeDestination = route.params.endLocation;
    // const routeWaypoints = route.params.waypoints;
    const animateToLocation = (coordinates) => {
        mapViewRef.animateToRegion(coordinates, ANIMATE_SPEED);
    };

    useEffect(() => {
        console.log(route.params)
        getLiveLocation()
        setQuickLocation()

        // const interval = setInterval(() => {
        //     setQuickLocation()
        //     mapView.setCamera({
        //         center: myLocation,
        //         pitch: 40,
        //         heading: myHeading,
        //         altitude: 1000
        //     })
        // }, 2000);
        // return () => {
        //     clearInterval(interval);
        // };

    }, [])

    async function getLiveLocation() {
        console.log("getting location");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync();
        setLocation(location);


        const userCoordinate = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        console.log("User coordinates:", userCoordinate);
    }

    const setQuickLocation = async () => {
        let location = await Location.getLastKnownPositionAsync()
        let heading = await Location.getHeadingAsync()

        //console.log("Heading: ", heading.trueHeading, " Location: ", location.coords.latitude, location.coords.longitude)
        setMyHeading(heading.trueHeading)
        setMyLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude })
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={null}
                showsUserLocation={true}
                ref={thisObj => mapViewRef = thisObj}
                style={{ ...StyleSheet.absoluteFill }}
                showsBuildings={true}
                showsTraffic={true}
                rotateEnabled={true}
                showsPointsOfInterest={true}
                showsCompass={true}
                userLocationPriority={'high'}

                onMapLoaded={() => {
                    animateToLocation(route.params.centroid)
                }}
            //followsUserLocation={true}
            // onUserLocationChange={() => {
            //     setQuickLocation()
            //     mapView.setCamera({
            //         center: myLocation,
            //         pitch: 40,
            //         heading: myHeading,
            //         altitude: 1000
            //     })
            // }}
            // onMapReady={() => {
            //     mapView.setCamera({
            //         center: myLocation,
            //         pitch: 40,
            //         heading: myHeading,
            //         altitude: 1000
            //     })
            // }}


            >
                {/* {myLocation && <Marker
                    coordinate={myLocation}
                    //image={require("../assets/img/navigation_arrow.png")}
                    flat={true}

                />} */}
                <MapViewDirections
                    origin={route.params.start}
                    destination={route.params.destination}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={10}
                    strokeColor={color.danger}
                    mode={'DRIVING'}
                    resetOnChange={true}

                />

                <BottomTab style={{ height: 100 }}>
                    <View>
                        <AppButton
                            title={"Location"}
                            style={styles.button}
                            onPress={() => {
                                // animateToLocation(route.params.centroid)
                                navigation.pop()
                            }}
                        />
                    </View>



                </BottomTab>
            </MapView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})