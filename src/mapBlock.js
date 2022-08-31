import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';


const origin = { latitude: 1.3521, longitude: 103.8198 };
const destination = { latitude: 1.3496884588957907, longitude: 103.98626434421578 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
let cord1 = { latitude: 1.33300621554807, longitude: 103.71818707395227 };
let cord2 = { latitude: 1.3259478205865913, longitude: 103.81212770732003 };
let cord3 = { latitude: 1.3496884588957907, longitude: 103.98626434421578 };
let cord4 = { latitude: 1.4057132690528746, longitude: 103.85914023847647 };
let cord5 = { latitude: 1.287764200204629, longitude: 103.84689407843125 };
let cord6 = { latitude: 1.355289727384512, longitude: 103.68631408763119 };
let wp1 = [cord1, cord2]
let wp2 = [cord5, cord4]

const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === 'granted') {
        const permission = await askPermission();
        return permission;
    }
    return true;
};

const askPermission = async () => {
    const permission = await Location.getForegroundPermissionsAsync();
    return permission.status === 'granted';
};

async function getUserCurrentLocation() {
    let currentLocation = await Location.getCurrentPositionAsync();
    console.log(currentLocation);
    return currentLocation;

}

function pinMarker(props) {
    console.log(props.nativeEvent);

}


export default class Map extends React.Component {
    render() {
        return (
            <View style={styles.map}>
                <MapView
                    style={{ ...StyleSheet.absoluteFillObject }}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    region={{
                        latitude: 1.3521,
                        longitude: 103.8198,
                        latitudeDelta: 0.3,
                        longitudeDelta: 0.3,
                    }}
                    animateToRegion
                    onPress={e => pinMarker(e)}
                >
                    <Marker
                        description="marker1"
                        coordinate={cord1}
                    />
                    <Marker
                        description="marker2"
                        coordinate={cord2}
                    />
                    <Marker
                        description="marker3"
                        coordinate={cord3}
                    />
                    <Marker
                        description="marker4"
                        coordinate={cord4}
                    />
                    <Marker
                        description="marker5"
                        coordinate={cord5}
                    />
                    <Marker
                        description="marker6"
                        coordinate={cord6}
                    />
                    <MapViewDirections
                        origin={cord3}
                        destination={cord6}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="red"
                        waypoints={wp2}
                        optimizeWaypoints='true'
                    />
                </MapView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    map: {
        height: '80%',
        width: '100%'
    },
});