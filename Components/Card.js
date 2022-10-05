import React from "react";

import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from "react-native";

import { color } from '../Config/Color';

import AppText from '../Components/AppText';

import MapView from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";

import { MaterialCommunityIcons } from '@expo/vector-icons';


const GOOGLE_MAPS_APIKEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Card({ title, subTitle, onPress, route = {
    routeId: 0,
    start: { latitude: 1.33300621554807, longitude: 103.71818707395227 },
    destination: { latitude: 1.3259478205865913, longitude: 103.81212770732003 },
    passengerNumber: 4,
    stopPoint: [{ latitude: 1.3496884588957907, longitude: 103.98626434421578 }, { latitude: 1.4057132690528746, longitude: 103.85914023847647 }]
}
    , style
}) {



    return (
        <View style={[styles.card, style]}>

            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    latitude: (route.start.latitude + route.destination.latitude) / 2,
                    longitude: (route.start.longitude + route.destination.longitude) / 2,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                zoomEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}>
                <MapViewDirections
                    origin={route.start}
                    destination={route.destination}
                    strokeWidth={3}
                    apikey={GOOGLE_MAPS_APIKEY}
                    optimizeWaypoints={true}
                    strokeColor="red"
                >

                </MapViewDirections>
            </MapView>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
            <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
                <View>
                    <MaterialCommunityIcons name={'close'} size={30} color={color.white} />
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: color.lightGray,
        width: windowWidth * 0.96,
        height: windowHeight * 0.3,
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '75%',
    },
    title: {
        fontWeight: "200",
        marginTop: 5,
        marginLeft: 5
    },
    subTitle: {
        color: color.green,
        fontWeight: "150",
        marginTop: 2,
        marginLeft: 5
    },
    mapStyle: {
        height: '70%',
        width: '100%',
    },
    deleteButton: {
        height: 30,
        width: 30,
        position: 'absolute',
        right: 10,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})