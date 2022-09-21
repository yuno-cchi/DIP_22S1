import { React, useState } from "react";
import { View, StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";

import Screen from '../Components/Screen';
import SearchBar from "../Components/SearchBar";
import Icon from '../Components/Icon';
import AppButton from "../Components/AppButton";
import CircularButton from "../Components/CircularButton";
import { color } from '../Config/Color';
import BottomTab from "../Components/BottomTab";

//Implment point of interest search function
// userLocation = Geolocation.getCurrentPosition
let markerKey = 0;
export default function RiderMapScreen() {

    const [coordinate, updateMarker] = useState([]);


    //A function to get lastest markerKey from DB

    const putMarker = (props) => {
        console.log(coordinate)

        markerArray = [...coordinate];
        markerArray.push({
            key: markerKey,
            latitude: props.coordinate.latitude,
            longitude: props.coordinate.longitude
        });

        //markerArray.push(<Marker key={markerKey} coordinate={{ 'latitude': props.nativeEvent.lat, 'longitude': props.nativeEvent.long }} />);
        console.log(markerArray);
        console.log(markerKey);
        markerKey += 1;
        updateMarker(markerArray);

    }

    return (
        <View style={styles.container}>
            <MapView
                style={{ ...StyleSheet.absoluteFill }}
                showsUserLocation={true}
                showsPointsOfInterest={true}
                showsMyLocationButton={true}
                onPress={(e) => putMarker(e.nativeEvent)}
            >

                {coordinate.map(({ key, latitude, longitude }) => <Marker key={key} coordinate={{ 'latitude': latitude, 'longitude': longitude }} />)}

            </MapView>
            <CircularButton name='user' onPress={() => { console.log('user pressed') }} style={styles.dashButton} />
            <SearchBar style={styles.searchBar} />
            <BottomTab>
                <AppButton
                    style={styles.sendButton}
                    thisColor={color.danger}
                    title="Send"
                    onPress={() => {
                        const startCoor = coordinate[0];
                        const destCoor = coordinate[1];
                        const key = 99;
                        //Add these key, destCoor, startCoor into the DB
                        updateMarker([])
                    }} />
            </BottomTab>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill
    },
    map: {

    },
    searchBar: {
        position: 'absolute',
        marginTop: 60,
        right: 20
    },
    dashButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        left: 30,
        marginTop: 60
    },
    tab: {
        position: 'absolute',
        backgroundColor: color.lightGray,
        width: '100%',
        height: 200,
        bottom: 0
    },
    sendButton: {
        position: 'absolute',
        bottom: 40,
        width: 200,
        right: 20
    }
})