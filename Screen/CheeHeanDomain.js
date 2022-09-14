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