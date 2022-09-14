import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../Config/Color';
import AppButton from '../Components/AppButton';

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

const key = 3;

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
        }

    }

    return markerArray;
}

const GOOGLE_MAPS_APIKEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const dummyDesti = { latitude: 1.3295337383405326, longitude: 103.86303846371023 }

export default function DriverMapScreen() {
    const [routeVisible, setRouteVisible] = useState(false);
    const [desti, setDesti] = useState();
    const [loadedRoute, setMarker] = useState(dummyRoute);
    const [buttonColor, setButtonColor] = useState(color.primary);
    const [startCoordinate, setStartCoordinate] = useState();
    const [destinationCoordinate, setDestinationCoordinate] = useState();
    const [startEndCoordinate, setStartEndCoordinate] = useState();
    //use onMarkerSelect inside the MapView

    return (
        <View style={styles.container}>
            <MapView
                style={styles.container}
                showsUserLocation={true}
                showsPointsOfInterest={true}
                onLongPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate
                    setStartCoordinate({
                        key: key,
                        latitude: latitude,
                        longitude: longitude,
                        markerColor: color.danger
                    })
                    console.log(latitude, longitude)
                }}
            >
                <MapViewDirections
                    origin={startCoordinate}
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
            <View style={styles.tab}>
                <AppButton style={styles.showRoute} thisColor={buttonColor} title="Route" onPress={() => {
                    setRouteVisible(!routeVisible)
                    setButtonColor(buttonColor === color.primary ? color.secondary : color.primary)
                }} />
                <Marker draggable />
            </View>

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