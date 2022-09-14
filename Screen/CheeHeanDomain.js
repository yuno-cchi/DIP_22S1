import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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

async function callRideDetails(){

    console.log("loading");


    const resp = await axios.get('http://secret-caverns-21869.herokuapp.com/ride');
    ridedata = resp.data;
    console.log(ridedata);

    console.log(ridedata[0]._id);

    //TODO: do a for loop to compare userid and data 
    console.log(ridedata[0].start);

    //TODO: replace '0' with the id
    const start = ridedata[0].start;
    const destination = ridedata[0].destination;

    const waypoints = ridedata[0].stopPoint;

    var xArray = []

    console.log(waypoints);

    console.log("start point lat: " + start.latitude);
    console.log("start point long: " + start.longitude);

    for(var x = 0; x < waypoints.latitude.length; x++){
        console.log("\n");
        console.log(x + ": " + waypoints.longitude[x]);
        console.log(x + ": " + waypoints.latitude[x]);

        
        xArray.push({key: x, userID: ridedata[0]._id, latitude: parseFloat(waypoints.latitude[x]), longitude: parseFloat(waypoints.longitude[x]), markerColor: color.red, travelDate: "2022-09-14"})

    }

    console.log("\n");
    console.log("end point lat: " + destination.latitude);
    console.log("end point long: " + destination.longitude);

    return await xArray;
}

cheeHeanData = callRideDetails();

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
    const [routeVisible, setRouteVisible] = useState(false);
    const [desti, setDesti] = useState();
    (async () => {
        console.log("hi");
        await callRideDetails();
        console.log(await cheeHeanData);
        const [loadedRoute, setMarker] = useState(cheeHeanData);
    })()
    // console.log("hu");
    // console.log(cheeHeanData);
    // const [loadedRoute, setMarker] = useState(cheeHeanData);


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
                {loadedRoute.map(({ key, latitude, longitude, markerColor }) => (
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
                    />))}

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