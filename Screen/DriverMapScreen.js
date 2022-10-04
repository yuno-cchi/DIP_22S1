/* 
By: Manussawin Sahassapon
Last Update: 14/9/2022

The Screen renders all coordinate objects from the database as <Marker/> JSX elements



*/


import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../Config/Color';
import AppButton from '../Components/AppButton';
import BottomTab from '../Components/BottomTab';

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

let key = 3;

const startCoordinateExist = false;

const cheeHeanData = [];

const setMarkerColor = (markerArray, key, color1, color2) => {
    for (let index = 0; index < markerArray.length; index++) {
        if (markerArray[index].key === key) {
            markerArray[index] = {
                key: key,
                latitude: markerArray[index].latitude,
                longitude: markerArray[index].longitude,
                markerColor: markerArray[index].markerColor === color1 ? color2 : color1
            }
            console.log("Set ", markerArray[index], " to ", markerArray[index].markerColor)
        }

    }

    return markerArray;
}

const GOOGLE_MAPS_APIKEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const dummyDesti = { latitude: 1.3295337383405326, longitude: 103.86303846371023 };
let driverMarkerCounter = 0;

export default function DriverMapScreen() {
    const [routeVisible, setRouteVisible] = useState(false);
    const [desti, setDesti] = useState();
    const [loadedRoute, setMarker] = useState(dummyRoute);
    const [buttonColor, setButtonColor] = useState(color.primary);
    const [startCoordinate, setStartCoordinate] = useState();
    const [destinationCoordinate, setDestinationCoordinate] = useState();
    const [waypoints, setWaypoints] = useState([]);
    const [startEndMarkers, setStartEndMarkers] = useState([]);
    //use onMarkerSelect inside the MapView

    return (
        <View style={styles.container}>
            <MapView
                style={styles.container}
                showsUserLocation={true}
                showsPointsOfInterest={true}
                onLongPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate
                    if (driverMarkerCounter % 2 === 0) {
                        setStartCoordinate({
                            key: 3,
                            latitude: latitude,
                            longitude: longitude,
                            markerColor: color.danger
                        })
                        setStartEndMarkers([<Marker
                            key={3}
                            coordinate={{ 'latitude': latitude, 'longitude': longitude }}
                            pinColor={color.danger}
                        />])

                        driverMarkerCounter++;
                    } else if (driverMarkerCounter % 2 === 1) {
                        setDestinationCoordinate({
                            key: 4,
                            latitude: latitude,
                            longitude: longitude,
                            markerColor: color.danger
                        })
                        driverMarkerCounter++;
                        setStartEndMarkers([...startEndMarkers, <Marker
                            key={4}
                            coordinate={{ 'latitude': latitude, 'longitude': longitude }}
                            pinColor={color.black}
                        />])
                    }

                    console.log(latitude, longitude)
                }}
            >
                <MapViewDirections
                    origin={startCoordinate}
                    apikey={GOOGLE_MAPS_APIKEY}
                    optimizeWaypoints={true}
                    strokeWidth={12}
                    strokeColor={color.red}
                    waypoints={waypoints}
                    destination={routeVisible ? destinationCoordinate : null}
                />
                {startEndMarkers}
                {loadedRoute.map(({ key, latitude, longitude, markerColor }) => (

                    <Marker
                        key={key}
                        coordinate={{ 'latitude': latitude, 'longitude': longitude }}
                        pinColor={markerColor}
                        onPress={() => {
                            console.log('Pressed', key)
                            setMarker(setMarkerColor(loadedRoute, key, color.red, color.green))
                            if (markerColor === color.red) {

                                setWaypoints([...waypoints, { 'latitude': latitude, 'longitude': longitude }])

                            } else if (markerColor === color.green) {
                                setWaypoints([waypoints.pop()])
                            }
                            console.log(loadedRoute.length)
                            console.log(loadedRoute)

                            setDesti({ latitude, longitude })
                        }}
                        onMarkerSelect={(e) => {
                            console.log("Marker: ", key, " is selected")
                        }}
                    />))}


            </MapView>
            <BottomTab>
                <AppButton style={styles.showRoute} thisColor={buttonColor} title="Route" onPress={() => {
                    setRouteVisible(!routeVisible)
                    setButtonColor(buttonColor === color.primary ? color.secondary : color.primary)
                }} />
                <Marker draggable />
            </BottomTab>


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
    },
    tab: {
        position: 'absolute',
        backgroundColor: color.lightGray,
        width: '100%',
        height: 200,
        bottom: 0
    }
})