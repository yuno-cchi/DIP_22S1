import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../Config/Color';

const dummyRoute = [
    {
        key: 0,
        latitude: 1.3625511761253166,
        longitude: 103.70878307869019,
        markerColor: color.red
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

const setMarkerColor = (markerArray, key, color) => {
    for (let index = 0; index < markerArray.length; index++) {
        if (markerArray[index].key === key) {
            markerArray[index] = {
                key: key,
                latitude: markerArray[index].latitude,
                longitude: markerArray[index].longitude,
                markerColor: color
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
        <MapView
            style={{ ...StyleSheet.absoluteFill }}
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
                destination={desti}
            />
            {loadedRoute.map(({ key, latitude, longitude, markerColor }) => (
                <Marker
                    key={key}
                    coordinate={{ 'latitude': latitude, 'longitude': longitude }}
                    pinColor={markerColor}
                    onPress={() => {
                        console.log('Pressed', key)
                        const newMarkerArray = setMarkerColor(loadedRoute, key, color.green)

                        setMarker(newMarkerArray)
                        console.log(loadedRoute.length)
                        console.log(loadedRoute)

                        setDesti({ latitude, longitude })
                    }}
                />))}

        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
    }
})