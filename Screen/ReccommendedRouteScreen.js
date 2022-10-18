import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Alert } from 'react-native';
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
    console.log("Number of route: ", originalArrayLength)
    for (let y = 0; y < originalArrayLength; y++) {
        let leastDist = 99999;
        let leastDistId = null;
        let dist = null;
        let tempRouteName = null;

        for (let x = 0; x < tempRouteObjectArray.length; x++) {

            //Finding the distance of driver coordinates and the given route coordinates
            dist = Math.sqrt(Math.pow((tempRouteObjectArray[x].centroid.latitude - driverRoute.centroid.latitude), 2)
                + Math.pow((tempRouteObjectArray[x].centroid.longitude - driverRoute.centroid.longitude), 2));

            console.log("Route ID", tempRouteObjectArray[x].routeId, ": ", dist);
            if (dist < leastDist) {

                leastDist = dist;
                tempRouteName = tempRouteObjectArray[x].routeName;
                leastDistId = tempRouteObjectArray[x].routeId;
                tempRouteObject = tempRouteObjectArray[x];

                console.log("Has lesser dist", "Route leastDistId: ", leastDistId)
            }
        }
        console.log("Final leastDistId: ", leastDistId);
        console.log("Best route is: ", tempRouteObject.routeId, " dist: ", leastDist, "Route name: ", tempRouteName)

        returnRouteObjectArray.push(
            {
                routeId: tempRouteObject.routeId,
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

export default function ReccommendedRouteScreen({ navigation, route }) {

    const [initialDummyRoute, setDummyroute] = useState(dummyRoute);
    const [isRefrehing, setRefreshing] = useState(false);

    const [selectedRoute, setSelectedRoute] = useState([]);





    const storeInDatabase = async (startLocation, endLocation, date, key, userID) => {
        console.log("adding to database")

        console.log("Start: ")
        console.log(startLocation)

        console.log("Destination: ")
        console.log(endLocation)

        console.log("Date: ")
        console.log(date)

        console.log("key: ") //this is automatically created so thank you
        console.log(key)

        console.log("userID: ")
        console.log(userID)

        userID = await AsyncStorage.getItem("userId");


        centroid = { latitude: (startLocation.latitude + endLocation.latitude) / 2.0, longitude: (startLocation.longitude + endLocation.longitude) / 2.0, };

        console.log("centroid coord: ")
        console.log(centroid);

        setCentroid(centroid);

    }



    //const [ routeArrays, setLoadRoutes ] = useState({bestRouteKey: null, centroid: null, destination: null, routeDescription: null, routeName: null, routeId: null, selected: false, start: null});
    const [ loading, setLoading ] = useState(true);

    const { startLocation, endLocation, selectedDate } = route; //route has to be route.param, use const route in place for testing 

    const deleteThisCard = (deleteRoute) => {
        setDummyroute(initialDummyRoute.filter(route => route.routeId !== deleteRoute.routeId));

    }

    const selectThisCard = (selectedRouteId) => {

        tempRoute2 = selectedRoute;
        if (selectedRouteId.selected === false) {
            tempRoute2.push(initialDummyRoute.filter(prop => prop.routeId === selectedRouteId.routeId));
            setSelectedRoute(tempRoute2);
        } else {
            tempRoute2.pop(initialDummyRoute.filter(prop => prop.routeId === selectedRouteId.routeId));
            setSelectedRoute(tempRoute2);
        }
        //console.log(selectedRouteId)
        selectedRouteId.selected = !selectedRouteId.selected;
        tempRoute = initialDummyRoute.map(route => route.routeId !== selectedRouteId.routeId ? route : selectedRouteId);
        setDummyroute(tempRoute);

    }

    
    useEffect(() => {
        getNearestRoutes();
    }, []);

    const getNearestRoutes = async () => {

        let routeArray = [];
        const resp = await axios.get('http://secret-caverns-21869.herokuapp.com/ride');
        ridedata = resp.data;

        console.log(centroid);
        console.log(ridedata);

        for (let i = 0; i < ridedata.length; i++) {
            console.log("inside now")
            if (ridedata[i].selected == false) {
                // if (ridedata[i].centroid.latitude <= centroid1.latitude + 0.5 && ridedata[i].centroid.latitude >= centroid1.latitude - 0.5) {
                //     routeArray.push({centroid: ridedata[i].centroid, destination: ridedata[i].destination, routeDescription: ridedata[i].routeName, routeId: ridedata[i]._id, selected: false,
                //     start: ridedata[i].start});
                // }
                routeArray.push({bestRouteKey: i, centroid: ridedata[i].centroid, destination: ridedata[i].destination, routeDescription: ridedata[i].routename, routeName: "Route " + i, routeId: ridedata[i]._id, selected: false,
                    start: ridedata[i].start});
            }
        }

        console.log("route from db: ");
        console.log(routeArray);
        setDummyroute(routeArray);

        console.log("routeArrays: ");
        console.log(initialDummyRoute);

        setLoading(false);
    }


    if (loading) {
        //setRouteVisible(false);
        console.log("loading");
        return <View><Text>Loading, please wait</Text></View>
    }

    const sortedRoutes = getBestRoutes(initialDummyRoute, route.params)
    console.log("Route parrams", route.params.centroid)
    return (
        <View
            style={styles.container}>
            <FlatList
                data={sortedRoutes}
                keyExtractor={item => item.bestRouteKey}
                renderItem={({ item }) =>
                    <Card
                        title={item.routeName}
                        subTitle={item.routeDescription}
                        route={item}
                        style={item.selected ? { backgroundColor: color.primary } : { backgroundColor: color.white }}
                        onPress={() => selectThisCard(item)} />}
                refreshing={isRefrehing}
                onRefresh={() => setDummyroute(dummyRoute)}
            />
            <BottomTab style={styles.bottomTab}>
                <AppButton
                    title='Confirm'
                    style={styles.confirmButton}
                    onPress={
                        () => {
                            console.log("The selected route is", JSON.stringify(startLocation) + JSON.stringify(endLocation) + JSON.stringify(selectedDate))
                            console.log("Hello there")

                            //Send driver's startLocation, endLocation, selectedDate to the database.
                            //navigation.navigate('CalendarScreen')
                        }
                    }
                />
                <AppButton
                    title='Route'
                    style={styles.confirmButton}
                    onPress={
                        () => {
                            console.log("There are: ", selectedRoute.length, "routes")
                            console.log("Selected route: ", selectedRoute[0])
                            console.log("The selected route is/are")
                            for (let x = 0; x < selectedRoute.length; x++) {
                                console.log(selectedRoute[x][0].routeId)

                            }
                            console.log("Hello there")
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
        alignItems: "center"
    }

})