import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AppButton from '../Components/AppButton';
import { color } from '../Config/Color';
import BottomTab from '../Components/BottomTab';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import axios from "axios";

const storeInDrive = async (start, end, date, startN, endN, selectedRoute) => {
    console.log("adding to drives table")

    console.log("Start: ")
    console.log(start)

    console.log("Destination: ")
    console.log(end)

    console.log("Date: ")
    console.log(date)

    console.log("waypoints: ");
    console.log(selectedRoute);

    console.log("userID: ")
    // if (userID === null) {
    //     userID = "user" + Math.floor(Math.random() * 100);
    // }
    userID = await AsyncStorage.getItem("userId");
    console.log(userID)

    console.log("centroid: ")
    centroid = { latitude: (start.latitude + end.latitude) / 2.0, longitude: (start.longitude + end.longitude) / 2.0, };
    console.log(centroid);


    //define an array for storing all the selectedRoute ids
    let selectedRideIDs = []

    //getting id of route and updating selected to true
    console.log("list all ids: ");
    for (let x = 0; x < selectedRoute.length; x++) {
        //TODO: update 'ride' table w DriverID: drives's _id and selected: true
        console.log(selectedRoute[x].routeId);

        selectedRideIDs.push(selectedRoute[x].routeId);

    }

    console.log(selectedRideIDs);


    //TODO: use axios to post into database
    axios({
        method: 'post',
        url: 'http://secret-caverns-21869.herokuapp.com/drive/add',
        headers: {},
        data: {
            routeUserID: userID, //routeUserID
            startName: startN,
            start: start,
            destinationName: endN,
            destination: end,
            centroid: centroid,
            date: date,
            selected: false,
            routeIdPair: selectedRideIDs
        }
    }).then((response) => {
        console.log(response);
        console.log(response.data);

        console.log(response.data._id);

        updateRideTable(selectedRoute, selectedRideIDs, response.data._id, userID)

        // navigateToRecc() //navigate to FinalDriverRouteScreen


    }, (error) => {
        console.log(error);
    })
}


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

async function schedulePushNotification(timeLeft) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Don't forget your ride",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: timeLeft - (86400 / 2) },
    });
}

const timeToNotify = (selectedDate) => {
    console.log(selectedDate)
    let timeThen = new Date(selectedDate)
    let timeNow = new Date()
    let dateDiff = timeThen - timeNow
    dateDiff = dateDiff / 1000
    dateDiff = Math.round(dateDiff)
    return dateDiff
    //Notify 2 hours before the ride
}


export default function FinalDriverRouteScreen({ navigation, route }) {

    let distance = 0;
    let duration = 0;
    const routeDestination = route.params.endLocation;
    const routeWaypoints = route.params.waypoints;
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
                    waypoints={getWaypoints(routeWaypoints)}
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
                        coordinate={route.params.startLocation}
                        pinColor={color.primary}

                    ><Text style={{ fontSize: 20, fontWeight: '900', color: color.primary, textShadowRadius: 5, shadowColor: color.primary, shadowOpacity: 0.5 }}>{"Start"}</Text></Marker>
                }
                {route.params.endLocation &&
                    <Marker
                        coordinate={route.params.endLocation}
                        pinColor={color.primary}
                    ><Text style={{ fontSize: 20, fontWeight: '900', color: color.primary, textShadowRadius: 5, shadowColor: color.primary, shadowOpacity: 0.5 }}>{"End"}</Text></Marker>
                }

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
                        schedulePushNotification(timeToNotify(route.params.selectedDate))
                        storeInDrive(
                            start = route.params.startLocation,
                            end = route.params.endLocation,
                            userID = route.params.userId,
                            date = route.params.selectedDate,
                            selectedRoute = getWaypoints(routeWaypoints)
                        )
                        navigation.navigate('CalendarScreenTabNavigator_Driver')
                        // routeUserID: userID, //routeUserID
                        // startName: startN,
                        // start: start,
                        // destinationName: endN,
                        // destination: end,
                        // centroid: centroid,
                        // date: date,
                        // selected: false,
                        // routeIdPair: selectedRideIDs

                    }} />

            </BottomTab>






        </View >
    );
}

const confirmDriverAlert = () =>
    Alert.alert(
        "All Set!",
        "You have successfully confirmed your NyMe Ride! We will be notifying your riders.",
        [
            {
                text: "Ok",
                onPress: () => {
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

                },
                style: "default",
            },
        ],
        {
            cancelable: false,
        })


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