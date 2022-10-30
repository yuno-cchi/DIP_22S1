import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Alert } from 'react-native';
// import AppText from "../Components/AppText";

import { color } from '../Config/Color';
import axios from 'axios';
import Card from "../Components/Card";
import AppButton from "../Components/AppButton";
import BottomTab from "../Components/BottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const dummyRoute = [
    {
        routeId: 0,
        routeName: 'Route1',
        routeDescription: 'Route1 so fun',
        start: { latitude: 1.33300621554807, longitude: 103.71818707395227 },
        destination: { latitude: 1.3259478205865913, longitude: 103.81212770732003 },
        centroid: { latitude: 1.329477, longitude: 103.765158 },
        selected: false,

    },
    {
        routeId: 1,
        routeName: 'Route2',
        routeDescription: 'Route2 so fun',
        start: { latitude: 1.3259478205865913, longitude: 103.81212770732003 },
        destination: { latitude: 1.4057132690528746, longitude: 103.85914023847647 },
        centroid: { latitude: 1.3658, longitude: 103.8356 },
        selected: false,
    },
    {
        routeId: 2,
        routeName: 'Route3',
        routeDescription: 'Route3 so fun',
        start: { latitude: 1.287764200204629, longitude: 103.84689407843125 },
        destination: { latitude: 1.3521, longitude: 103.8198 },
        centroid: { latitude: 1.31995, longitude: 103.833345 },
        selected: false,
    },
    {
        routeId: 3,
        routeName: 'Route4',
        routeDescription: 'Route4 so fun',
        start: { latitude: 1.4057132690528746, longitude: 103.85914023847647 },
        destination: { latitude: 1.3521, longitude: 103.8198 },
        centroid: { latitude: 1.378905, longitude: 103.83947 },
        selected: false,
    }
]

const route = {
    startLocation: { latitude: 1.302127, longitude: 103.625382 },
    endLocation: { latitude: 1.2988981, longitude: 103.8547574 },
    centroid: { latitude: 1.30051255, longitude: 103.740097 },
    selectedDate: "2022-10-05T07:22:13.049Z"
}

const getBestRoutes = (routeObjectArray, driverRoute) => {
    console.log("Starting");

    let tempRouteObjectArray = [...routeObjectArray];// Copy into another array to prevent altering the original array.
    let tempRouteObject = null;
    let returnRouteObjectArray = [];
    const originalArrayLength = tempRouteObjectArray.length;
    //console.log("Number of route: ", originalArrayLength)
    for (let y = 0; y < originalArrayLength; y++) {
        let leastDist = 99999;
        let leastDistId = null;
        let dist = null;
        let tempRouteName = null;

        for (let x = 0; x < tempRouteObjectArray.length; x++) {

            //Finding the distance of driver coordinates and the given route coordinates
            dist = Math.sqrt(Math.pow((tempRouteObjectArray[x].centroid.latitude - driverRoute.centroid.latitude), 2)
                + Math.pow((tempRouteObjectArray[x].centroid.longitude - driverRoute.centroid.longitude), 2));

            //console.log("Route ID", tempRouteObjectArray[x].routeId, ": ", dist);
            if (dist < leastDist) {

                leastDist = dist;
                tempRouteName = tempRouteObjectArray[x].routeName;
                leastDistId = tempRouteObjectArray[x].routeId;
                tempRouteObject = tempRouteObjectArray[x];

                //console.log("Has lesser dist", "Route leastDistId: ", leastDistId)
            }
        }
        // console.log("Final leastDistId: ", leastDistId);
        // console.log("Best route is: ", tempRouteObject.routeId, " dist: ", leastDist, "Route name: ", tempRouteName)

        returnRouteObjectArray.push(
            {
                routeId: tempRouteObject.routeId,
                routeRider: tempRouteObject.routeRider,
                routeName: tempRouteObject.routeName,
                routeDescription: tempRouteObject.routeDescription,
                start: { latitude: tempRouteObject.start.latitude, longitude: tempRouteObject.start.longitude },
                destination: { latitude: tempRouteObject.destination.latitude, longitude: tempRouteObject.destination.longitude },
                centroid: { latitude: tempRouteObject.centroid.latitude, longitude: tempRouteObject.centroid.longitude },
                selected: tempRouteObject.selected,
                bestRouteKey: y
            }
        )

        tempRouteObjectArray = tempRouteObjectArray.filter(routeObj => routeObj.routeId !== leastDistId)
        console.log(tempRouteObjectArray.length)


    }
    console.log(returnRouteObjectArray)
    return returnRouteObjectArray;
}
let selectCount = 0;

export default function ReccommendedRouteScreen({ navigation, route }) {

    const [initialDummyRoute, setDummyroute] = useState([]);
    const [isRefrehing, setRefreshing] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState([]);

    const [newDriveId, setIdapp] = useState('empty');


    //const [ routeArrays, setLoadRoutes ] = useState({bestRouteKey: null, centroid: null, destination: null, routeDescription: null, routeName: null, routeId: null, selected: false, start: null});
    const [loading, setLoading] = useState(true);

    const { startLocation, endLocation, selectedDate } = route; //route has to be route.param, use const route in place for testing 

    const deleteThisCard = (deleteRoute) => {
        setDummyroute(initialDummyRoute.filter(route => route.routeId !== deleteRoute.routeId));

    }





    //update 'ride' table w DriverID: drives's _id and selected: true
    async function updateRideTable(selectedRoute, selectedRideIDs, driveID, driveruserID) {
        //const resp = await axios.get('http://secret-caverns-21869.herokuapp.com/drive');

        for (let x = 0; x < selectedRideIDs.length; x++) {
            //TODO: update 'ride' table w DriverID: drives's _id and selected: true
            console.log("updating ride table:")
            console.log(selectedRideIDs[x]);
            console.log(driveID);


            //once my new drive id has been retrieved, i can run a for loop here
            axios.post('http://secret-caverns-21869.herokuapp.com/ride/update/' + selectedRideIDs[x], {
                routename: selectedRoute[x].routeRider,
                startName: selectedRoute[x].routename,
                start: selectedRoute[x].start,
                destinationName: selectedRoute[x].routeDescription,
                destination: selectedRoute[x].destination,
                date: selectedRoute[x].date,
                centroid: selectedRoute[x].centroid,
                selected: true, //set selected to tru
                driverID: driveID
            })
                .then(response => {
                    console.log(response);


                    //navigate to FinalDriverRouteScreen
                    navigation.navigate('FinalDriverRouteScreen', {
                        startLocation: route.params.startLocation,
                        endLocation: route.params.endLocation,
                        selectedDate: route.params.selectedDate,
                        userId: driveruserID,
                        waypoints: selectedRoute
                    })

                })
                .catch(error => {
                    console.log(err);
                });
        }

    }


    const selectThisCard = (selectedRouteId) => {

        let tempRoute2 = selectedRoute;
        if (selectedRouteId.selected === false && selectCount < 3) {
            tempRoute2.push(initialDummyRoute.filter(prop => prop.routeId === selectedRouteId.routeId));
            setSelectedRoute(tempRoute2);
            selectCount++;
        } else if (selectedRouteId.selected === true) {
            tempRoute2.pop(initialDummyRoute.filter(prop => prop.routeId === selectedRouteId.routeId));
            setSelectedRoute(tempRoute2);
            selectCount--;
        } else {
            Alert.alert(
                "Alert",
                "You've reached the limit!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        //console.log(selectedRouteId)
        selectedRouteId.selected = !selectedRouteId.selected;
        let tempRoute = initialDummyRoute.map(route => route.routeId !== selectedRouteId.routeId ? route : selectedRouteId);
        setDummyroute(tempRoute);

    }

    const clean2DArray = (inputArray = [0][0]) => {
        let tempArray = []
        for (let i = 0; i < inputArray.length; i++) {
            tempArray.push({
                routeId: inputArray[i][0].routeId,
                routeName: inputArray[i][0].routeName,
                routeDescription: inputArray[i][0].routeDescription,
                start: { latitude: inputArray[i][0].start.latitude, longitude: inputArray[i][0].start.longitude },
                destination: { latitude: inputArray[i][0].destination.latitude, longitude: inputArray[i][0].destination.longitude },
                centroid: { latitude: inputArray[i][0].centroid.latitude, longitude: inputArray[i][0].centroid.longitude },
                selected: inputArray[i][0].selected,
                bestRouteKey: inputArray[i][0].bestRouteKey
            }
            )
        }
        return tempArray
    }


    useEffect(() => {
        console.log("\n start of recommendedroutesscreen")
        try {
            getNearestRoutes();
        } catch (error) {

        }

    }, []);

    const getNearestRoutes = async () => {

        let routeArray = [];
        const resp = await axios.get('http://secret-caverns-21869.herokuapp.com/ride');
        ridedata = resp.data;


        // console.log(ridedata);

        for (let i = 0; i < ridedata.length; i++) {
            //console.log("inside now")
            if (ridedata[i].selected == false) {
                // if (ridedata[i].centroid.latitude <= centroid1.latitude + 0.5 && ridedata[i].centroid.latitude >= centroid1.latitude - 0.5) {
                //     routeArray.push({centroid: ridedata[i].centroid, destination: ridedata[i].destination, routeDescription: ridedata[i].routeName, routeId: ridedata[i]._id, selected: false,
                //     start: ridedata[i].start});
                // }
                routeArray.push({
                    centroid: ridedata[i].centroid,
                    destination: ridedata[i].destination,
                    routeDescription: ridedata[i].destinationName, //to show destination name
                    routeName: ridedata[i].startName, //to show start location name
                    routeRider: ridedata[i].routename, //ride user's id, to store as hidden
                    routeId: ridedata[i]._id,
                    selected: false,
                    start: ridedata[i].start
                });
            }
        }

        // console.log("route from db: ");
        // console.log(routeArray);
        setDummyroute(routeArray);

        // console.log("routeArrays: ");
        // console.log(initialDummyRoute);

        setLoading(false);
    }





    const sortedRoutes = getBestRoutes(initialDummyRoute, route.params)
    //console.log("Route parrams", route.params.centroid)
    return (
        <View
            style={styles.container}>
            <View style={{ height: windowHeight * 0.75, width: windowWidth, backgroundColor: color.lightGray, alignItems: 'center' }}>
                <FlatList
                    data={sortedRoutes}
                    keyExtractor={item => item.bestRouteKey}
                    renderItem={({ item }) =>
                        <Card
                            title={item.routeName}
                            subTitle={item.routeDescription}
                            route={item}
                            driverRoute={route.params}
                            style={item.selected ? { backgroundColor: color.primary } : { backgroundColor: color.white }}
                            onPress={() => selectThisCard(item)} />}
                    refreshing={isRefrehing}
                    onRefresh={() => {
                        try {
                            getNearestRoutes()
                        } catch (error) {

                        }
                    }}
                />
            </View>

            <BottomTab style={styles.bottomTab}>
                <AppButton
                    title='Select'
                    style={styles.confirmButton}
                    onPress={
                        () => {
                            selectCount = 0;
                            const tempSelectedRoute = clean2DArray(selectedRoute)
                            // console.log("The selected route is", route.params.selectedDate)
                            // console.log("Hello there")
                            console.log(tempSelectedRoute)

                            //storeInDrive(route.params.startLocation, route.params.endLocation, route.params.selectedDate, route.params.startName, route.params.endName, tempSelectedRoute)


                            navigation.navigate('FinalDriverRouteScreen', {
                                startLocation: route.params.startLocation,
                                endLocation: route.params.endLocation,
                                selectedDate: route.params.selectedDate,
                                userId: route.params.userId,
                                waypoints: tempSelectedRoute
                            })

                        }
                    }
                />
                <AppButton
                    title='Back'
                    style={styles.confirmButton}
                    onPress={
                        () => {
                            // console.log("There are: ", selectedRoute.length, "routes")
                            // console.log("Selected route: ", selectedRoute[0])
                            // console.log("The selected route is/are")
                            // for (let x = 0; x < selectedRoute.length; x++) {
                            //     console.log(selectedRoute[x][0].routeId)

                            // }
                            selectCount = 0;
                            navigation.navigate('CalendarScreen_Driver')
                        }
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
        alignItems: "center",
        height: windowHeight * 0.25
    }

})