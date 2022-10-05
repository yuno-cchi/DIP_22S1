import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList, Dimensions, Alert } from 'react-native';
// import AppText from "../Components/AppText";

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


    },
    {
        routeId: 1,
        routeName: 'Route2',
        routeDescription: 'Route2 so fun',
        start: { latitude: 1.3259478205865913, longitude: 103.81212770732003 },
        destination: { latitude: 1.4057132690528746, longitude: 103.85914023847647 },
        centroid: { latitude: 1.3658, longitude: 103.8356 }
    },
    {
        routeId: 2,
        routeName: 'Route3',
        routeDescription: 'Route3 so fun',
        start: { latitude: 1.287764200204629, longitude: 103.84689407843125 },
        destination: { latitude: 1.3521, longitude: 103.8198 },
        centroid: { latitude: 1.31995, longitude: 103.833345 }
    },
    {
        routeId: 3,
        routeName: 'Route4',
        routeDescription: 'Route4 so fun',
        start: { latitude: 1.4057132690528746, longitude: 103.85914023847647 },
        destination: { latitude: 1.3521, longitude: 103.8198 },
        centroid: { latitude: 1.378905, longitude: 103.83947 }
    }
]

//getShorestRoute return an array of coordinates that are nearest the argument coordinates which, in turn, is the shorest route to pass through.

const getShortestRoute = (passengerNumber, coordinates) => {

    return (null);
}

export default function ReccommendedRouteScreen({ navigation, route }) {

    const [initialDummyRoute, setDummyroute] = useState(dummyRoute);
    const [isRefrehing, setRefreshing] = useState(false);

    const { startLocation, endLocation, selectedDate } = route.params;

    const deleteThisCard = (deleteRoute) => {
        setDummyroute(initialDummyRoute.filter(route => route.routeId !== deleteRoute.routeId));
    }

    const selectThisCard = (selectedCard, cardRef) => {

    }

    const getNearestRoutes = (numberOfRoute, centroid) => {

        let routeArray = [];

        if (numberOfRoute > 4) {
            console.log("Exceed route limit")
            return null;
        }

        for (let i = 0; i < numberOfRoute; i++) {
            //searchDatabase for route's centroid +- 0.5 for less query call
            if (true/*if the centroid is smaller that any of array's centroid*/) {
                //pop the biggest
                routeArray.push()//Push the desired route into the array
            }
        }
    }


    return (
        <View
            style={styles.container}>
            <FlatList
                data={initialDummyRoute}
                keyExtractor={item => item.routeId}
                renderItem={({ item }) =>
                    <Card
                        ref={(card) => { cardRef = card; }}
                        title={item.routeName}
                        subTitle={item.routeDescription}
                        route={item}
                        onPress={() => selectThisCard(item, cardRef)} />}
                refreshing={isRefrehing}
                onRefresh={() => setDummyroute(dummyRoute)}
            />
            <BottomTab style={styles.bottomTab}>
                <AppButton
                    title='Confirm'
                    style={styles.confirmButton}
                    onPress={
                        console.log("The selected route is", JSON.stringify(startLocation) + JSON.stringify(endLocation) + JSON.stringify(selectedDate))
                    }
                />

            </BottomTab>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: "80%",
        height: windowHeight,
        backgroundColor: "white",
        alignItems: "center"
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 20
    },
    topFreeSpace: {
        height: 50,
        width: "100%",
    },
    subtitle: {
        color: color.green,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20
    },
    confirmButton: {
        backgroundColor: color.red,
        width: "80%",
    },
    bottomTab: {
        alignItems: "center"
    }

})