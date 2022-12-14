import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../Config/Color';
import AppButton from '../Components/AppButton';
import { Logs } from 'expo'
import axios from 'axios';

Logs.enableExpoCliLogging();

//TODO: insert data and userid for its args

var cheeHeanData = [];
const loadedRoute = [];

async function test() {

    // console.log("loading");


    // //const resp = axios.get('http://secret-caverns-21869.herokuapp.com/ride');

    // var dataSon = [];

    //  axios.get('http://secret-caverns-21869.herokuapp.com/ride').then(response => response.data).then(data => {
    //     dataSon = await data;
    //     //console.log(data);

    //     return dataSon;
    // });

    // ridedata = resp.data;
    // console.log(ridedata);

    // console.log(ridedata[0]._id);

    // //TODO: do a for loop to compare userid and data 
    // console.log(ridedata[0].start);

    // //TODO: replace '0' with the id
    // const start = ridedata[0].start;
    // const destination = ridedata[0].destination;

    // const waypoints = ridedata[0].stopPoint;

    // var xArray = []

    // console.log(waypoints);

    // console.log("start point lat: " + start.latitude);
    // console.log("start point long: " + start.longitude);

    // for(var x = 0; x < waypoints.latitude.length; x++){
    //     console.log("\n");
    //     console.log(x + ": " + waypoints.longitude[x]);
    //     console.log(x + ": " + waypoints.latitude[x]);


    //     loadedRoute.push({key: x, userID: ridedata[0]._id, latitude: parseFloat(waypoints.latitude[x]), longitude: parseFloat(waypoints.longitude[x]), markerColor: color.red, travelDate: "2022-09-14"})

    // }

    // console.log("\n");
    // console.log("end point lat: " + destination.latitude);
    // console.log("end point long: " + destination.longitude);

    // return await xArray;
}

// function getCoordinates(test){
//     ridedata = test;
//     console.log(ridedata);

//     console.log(ridedata[0]._id);

//     //TODO: do a for loop to compare userid and data 
//     console.log(ridedata[0].start);

//     //TODO: replace '0' with the id
//     const start = ridedata[0].start;
//     const destination = ridedata[0].destination;

//     const waypoints = ridedata[0].stopPoint;

//     var xArray = []

//     console.log(waypoints);

//     console.log("start point lat: " + start.latitude);
//     console.log("start point long: " + start.longitude);

//     for(var x = 0; x < waypoints.latitude.length; x++){
//         console.log("\n");
//         console.log(x + ": " + waypoints.longitude[x]);
//         console.log(x + ": " + waypoints.latitude[x]);


//         loadedRoute.push({key: x, userID: ridedata[0]._id, latitude: parseFloat(waypoints.latitude[x]), longitude: parseFloat(waypoints.longitude[x]), markerColor: color.red, travelDate: "2022-09-14"})

//     }

//     console.log("\n");
//     console.log("end point lat: " + destination.latitude);
//     console.log("end point long: " + destination.longitude);

//     return xArray;
// }

cheeHeanData = [];

const dummyRoute = [
    {
        key: 0,
        userID: 1234,
        latitude: 1.3625511761253166,
        longitude: 103.70878307869019,
        markerColor: color.red,
        travelDate: "2022-09-14"
    },
    {
        key: 1,
        latitude: 1.3475529645879185,
        longitude: 103.79014471730054,
        markerColor: color.red
    },
    {
        key: 2,
        latitude: 1.3295337383405326,
        longitude: 103.86303846371023,
        markerColor: color.red
    }
]

const setMarkerColor = (markerArray, key, color1, color2) => {
    for (let index = 0; index < markerArray.length; index++) {
        if (markerArray[index].key === key) {
            markerArray[index] = {
                key: key,
                latitude: markerArray[index].latitude,
                longitude: markerArray[index].longitude,
                markerColor: markerArray[index].markerColor === color1 ? color2 : color1
            }
        }

    }

    return markerArray;
}

const GOOGLE_MAPS_APIKEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const dummyDesti = { latitude: 1.3295337383405326, longitude: 103.86303846371023 }


export default function CheeHeanDomain() {
    const [routeVisible, setRouteVisible] = useState(null);
    const [desti, setDesti] = useState();


    //set page loading state to true (meaning the map will not be showing as its loading)
    const [loading, setLoading] = useState(true)

    //set the route variable setMarker to null first, will use to retrieve the driver destination coords
    const [loadedRoute, setMarker] = useState(null);

    useEffect(() => {
        //call API retrieve function to retrieve the coordinates
        getCoordinates();

    }, []);

    async function getCoordinates() {
        axios.get('http://secret-caverns-21869.herokuapp.com/ride').then(response => response.data).then(data => {
            dataSon = data;
            console.log(data);

            console.log(dataSon[1]._id);

            //TODO: do a for loop to compare userid and data 
            console.log(dataSon[1].start);

            //TODO: replace '0' with the id
            const start = dataSon[1].start;
            const destination = dataSon[1].destination;

            const waypoints = dataSon[1].stopPoint;

            var xArray = []

            console.log(waypoints);

            console.log("start point lat: " + start.latitude);
            console.log("start point long: " + start.longitude);

            for (var x = 0; x < waypoints.latitude.length; x++) {
                console.log("\n");
                console.log(x + ": " + waypoints.longitude[x]);
                console.log(x + ": " + waypoints.latitude[x]);

                //pushing retrieved destination coordinates and mapping them out into an array called xArray
                xArray.push({ key: x, userID: dataSon[1]._id, latitude: parseFloat(waypoints.latitude[x]), longitude: parseFloat(waypoints.longitude[x]), markerColor: color.red, travelDate: "2022-09-14" })

            }

            //for debug: printing the retrieved destinations onto the log
            console.log("\n printing xArray:");
            console.log(xArray);

            //setting retrieved coordinates from the db to the map
            setMarker(xArray)

            console.log("work pls");

            //set loading state to false and display the map along w its data
            setLoading(false)

            setRouteVisible(false);

        }).catch(err => console.log(err));
    }
    console.log("destination visible: " + routeVisible);


    if (loading) {
        //setRouteVisible(false);
        console.log(routeVisible);
        return (<View style={styles.container && <Text>Loading, Please Wait...</Text>}></View>)
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.container}
                showsUserLocation={true}
                showsPointsOfInterest={true}
                showsMyLocationButton={true}
            >
                <MapViewDirections
                    origin={{ latitude: 1.3625511761253166, longitude: 103.70878307869019 }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    optimizeWaypoints={true}
                    strokeWidth={12}
                    strokeColor={color.red}
                    destination={routeVisible ? desti : null}
                />
                {routeVisible ? loadedRoute.map(({ key, latitude, longitude, markerColor }) => (
                    <Marker
                        key={key}
                        coordinate={{ 'latitude': latitude, 'longitude': longitude }}
                        pinColor={markerColor}
                        onPress={() => {
                            console.log('Pressed', key)
                            const newMarkerArray = setMarkerColor(loadedRoute, key, color.red, color.green)

                            setMarker(newMarkerArray)
                            console.log(loadedRoute.length)
                            console.log(loadedRoute)

                            setDesti({ latitude, longitude })
                        }}
                    />)) : null}

            </MapView>
            <AppButton style={styles.showRoute} title="Route" onPress={() => setRouteVisible(!routeVisible)} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill
    },
    showRoute: {
        position: 'absolute',
        bottom: 40,
        width: 200,
        right: 20
    }
})