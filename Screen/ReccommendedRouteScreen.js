import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import AppText from "../Components/AppText";

import { color } from '../Config/Color';
import axios from 'axios';
import Card from "../Components/Card";
import AppButton from "../Components/AppButton";
import BottomTab from "../Components/BottomTab";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const dummyRoute = [
    {
        routeId: 0,
        routeName: 'Route1',
        routeDescription: 'Route1 so fun',
        start: { latitude: 1.33300621554807, longitude: 103.71818707395227 },
        destination: { latitude: 1.3259478205865913, longitude: 103.81212770732003 },
        passengerNumber: 4,
        stopPoint: [{ latitude: 1.3496884588957907, longitude: 103.98626434421578 }, { latitude: 1.4057132690528746, longitude: 103.85914023847647 }]

    },
    {
        routeId: 1,
        routeName: 'Route2',
        routeDescription: 'Route2 so fun',
        start: { latitude: 1.3259478205865913, longitude: 103.81212770732003 },
        destination: { latitude: 1.4057132690528746, longitude: 103.85914023847647 },
        passengerNumber: 4,
        stopPoint: [{ latitude: 1.3496884588957907, longitude: 103.98626434421578 }, { latitude: 1.4057132690528746, longitude: 103.85914023847647 }]
    },
    {
        routeId: 2,
        routeName: 'Route3',
        routeDescription: 'Route3 so fun',
        start: { latitude: 1.287764200204629, longitude: 103.84689407843125 },
        destination: { latitude: 1.3521, longitude: 103.8198 },
        passengerNumber: 4,
        stopPoint: [{ latitude: 1.3496884588957907, longitude: 103.98626434421578 }, { latitude: 1.4057132690528746, longitude: 103.85914023847647 }]
    },
    {
        routeId: 3,
        routeName: 'Route4',
        routeDescription: 'Route4 so fun',
        start: { latitude: 1.4057132690528746, longitude: 103.85914023847647 },
        destination: { latitude: 1.3521, longitude: 103.8198 },
        passengerNumber: 4,
        stopPoint: [{ latitude: 1.3496884588957907, longitude: 103.98626434421578 }, { latitude: 1.4057132690528746, longitude: 103.85914023847647 }]
    }
]

//getShorestRoute return an array of coordinates that are nearest the argument coordinates which, in turn, is the shorest route to pass through.

const getShortestRoute = (passengerNumber, coordinates) => {

    return (null);
}

export default function ReccommendedRouteScreen() {

    const [initialDummyRoute, setDummyroute] = useState(dummyRoute);
    const [isRefrehing, setRefreshing] = useState(false);

    const deleteThisCard = (deleteRoute) => {
        setDummyroute(initialDummyRoute.filter(route => route.routeId !== deleteRoute.routeId));
    }


    return (
        <View
            style={styles.container}>
            <FlatList
                data={initialDummyRoute}
                keyExtractor={item => item.routeId}
                renderItem={({ item }) => <Card title={item.routeName} subTitle={item.routeDescription} route={item} onPress={() => deleteThisCard(item)} />}
                refreshing={isRefrehing}
                onRefresh={() => setDummyroute(dummyRoute)}
            />
            <BottomTab>
                <AppButton title='Confirm' style={styles.confirmButton} />

            </BottomTab>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: '80%',
        height: windowHeight,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 20
    },
    topFreeSpace: {
        height: 50,
        width: '100%',
    },
    subtitle: {
        color: color.green,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20
    },
    confirmButton: {
        backgroundColor: 'gray'
    }

})