import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AppButton from '../Components/AppButton';
import { color } from '../Config/Color';
import BottomTab from '../Components/BottomTab';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const storeInDatabase = async (
    startLocation,
    endLocation,
    date = null,
    userID = null,
    description = ""
) => {
    console.log("adding to database");

    console.log("Start: ");
    console.log(startLocation);

    console.log("Destination: ");
    console.log(endLocation);

    console.log("Date: ");
    console.log(date);

    console.log("Route description: ", description)

    //userID has to be retrieved from the login
    let centroid = {
        latitude: (startLocation.latitude + endLocation.latitude) / 2.0,
        longitude: (startLocation.longitude + endLocation.longitude) / 2.0,
    };

    console.log("userID: ");
    // if (userID === null) {
    //     userID = "user" + Math.floor(Math.random() * 100);
    // }

    userID = await AsyncStorage.getItem("userId");

    console.log(userID);

    axios({
        method: "post",
        url: "http://secret-caverns-21869.herokuapp.com/ride/add",
        headers: {},
        data: {
            routename: userID,
            start: startLocation,
            destination: endLocation,
            centroid: centroid,
            date: date,
            selected: false,
            userID: null,
            routeDescription: description

        },
    }).then(
        (response) => {
            console.log(response);

        },
        (error) => {
            console.log(error);
        }
    );
};


const GOOGLE_API_KEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const ANIMATE_SPEED = 1000;
const ANIMATE_ZOOM = 1;
const INITIAL_POINT = null;
const STROKE_WIDTH = 5;
const STROKE_COLOR = 'blue';
const DATE_MODE = "datetime";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getWaypoints = (routeParams) => {
    let tempWaypoints = []
    for (let i = 0; i < routeParams.length; i++) {
        tempWaypoints.push({
            latitude: routeParams[i].start.latitude,
            longitude: routeParams[i].start.longitude
        })
        tempWaypoints.push({
            latitude: routeParams[i].destination.latitude,
            longitude: routeParams[i].destination.longitude
        })
    }
    return tempWaypoints
}


export default function FinalDriverRouteScreen({ navigation, route }) {

    const dataObj = route.params
    let distance = 0;
    let duration = 0;

    return (
        <View style={styles.container}>
            <MapView
                ref={(mapView) => { mapViewRef = mapView; }}
                style={styles.mapStyle}
                showsPointsOfInterest={true}
                showsUserLocation={true}
            >
                <MapViewDirections
                    origin={route.params.startLocation}
                    destination={route.params.endLocation}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={STROKE_WIDTH}
                    strokeColor={STROKE_COLOR}
                    waypoints={getWaypoints(route.params.waypoints)}
                    optimizeWaypoints={true}
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)
                        distance = result.distance;
                        duration = result.duration;
                    }}
                />
                {route.params.startLocation &&
                    <Marker
                        title="Start"
                        description=''
                        coordinate={route.params.startLocation}

                    />}
                {route.params.endLocation &&
                    <Marker
                        title="End"
                        description=''
                        coordinate={route.params.endLocation}

                    />}

                {route.params.waypoints.map(marker => (
                    <>
                        <Marker
                            coordinate={marker.start}
                            title={marker.title}

                            pinColor={color.secondary}
                        />
                        <Marker
                            coordinate={marker.destination}
                            title={marker.title}

                            pinColor={color.secondary}
                        />
                    </>

                ))}


            </MapView>

            <BottomTab style={styles.bottomTab}>
                <AppButton
                    title={'Confirm'}
                    onPress={() => {
                        let description = "Distance: " + distance + "km" + " Time: " + duration + "min"
                        console.log("Console log: ", route.params.startLocation,
                            route.params.endLocation,
                            route.params.selectedDate,
                            route.params.userId,
                            description)

                        // storeInDatabase(route.params.startLocation,
                        //     route.params.endLocation,
                        //     route.params.date,
                        //     route.params.userID,
                        //     description)

                    }} />
            </BottomTab>






        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        height: windowHeight,
        windowWidth: windowWidth
    },
    mapStyle: {
        ...StyleSheet.absoluteFill
    },
    bottomTab: {
        alignItems: "center",
        height: windowHeight * 0.25
    }
})