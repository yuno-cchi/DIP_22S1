import { stopLocationUpdatesAsync } from 'expo-location';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../Components/AppButton';


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

export default function TestRouteFinding() {

    const addPropToObject = (routeObjectArray) => {
        routeObjectArray = routeObjectArray.map(props => ({ ...props, bestRouteKey: null }))
        console.log(routeObjectArray)
        return routeObjectArray
    }

    const getBestRoutes = (routeObjectArray, driverRoute) => {
        console.log("Starting")

        //routeObjectArray = routeObjectArray.map(props => ({ ...props, bestRouteKey: null }));

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


    return (
        <View style={styles.container}>
            <AppButton title={"Test"} onPress={() => { getBestRoutes(dummyRoute, route) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})