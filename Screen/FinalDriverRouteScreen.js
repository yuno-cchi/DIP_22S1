import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AppButton from '../Components/AppButton';
import { color } from '../Config/Color';
import BottomTab from '../Components/BottomTab';


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


const GOOGLE_API_KEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const ANIMATE_SPEED = 1000;
const ANIMATE_ZOOM = 1;
const INITIAL_POINT = null;
const STROKE_WIDTH = 5;
const STROKE_COLOR = 'blue';
const DATE_MODE = "datetime";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getWaypoints = (routeParams) => {
    let tempWaypoints = []
    for (let i = 0; i < routeParams.length; i++) {
        tempWaypoints.push({
            latitude: routeParams[i].start.latitude,
            longitude: routeParams[i].start.longitude
        })
        tempWaypoints.push({
            latitude: routeParams[i].destination.latitude,
            longitude: routeParams[i].destination.longitude
        })
    }
    return tempWaypoints
}

const showStopMarkers = () => {

}


export default function FinalDriverRouteScreen({ navigation, route }) {

    const dataObj = route.params

    return (
        <View style={styles.container}>
            <MapView
                ref={(mapView) => { mapViewRef = mapView; }}
                style={styles.mapStyle}
                showsPointsOfInterest={true}
                showsUserLocation={true}
            >
                <MapViewDirections
                    origin={route.params.startLocation}
                    destination={route.params.endLocation}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={STROKE_WIDTH}
                    strokeColor={STROKE_COLOR}
                    waypoints={getWaypoints(route.params.waypoints)}
                    optimizeWaypoints={true}
                />
                {route.params.startLocation &&
                    <Marker
                        title="Start"
                        description='yeah'
                        coordinate={route.params.startLocation}
                    />}
                {route.params.endLocation &&
                    <Marker
                        title="End"
                        description='qwe'
                        coordinate={route.params.endLocation}
                    />}

                {route.params.waypoints.map(marker => (
                    <>
                        <Marker
                            coordinate={marker.start}
                            title={marker.title}
                            key={marker.bestRouteKey}
                            pinColor={color.secondary}
                        />
                        <Marker
                            coordinate={marker.destination}
                            title={marker.title}
                            key={marker.bestRouteKey * 2}
                            pinColor={color.secondary}
                        />
                    </>

                ))}


            </MapView>

            <BottomTab style={styles.bottomTab}>
                <AppButton
                    title={'COnfirm'}
                    onPress={() => console.log(route.params)} />
            </BottomTab>






        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        height: windowHeight,
        windowWidth: windowWidth
    },
    mapStyle: {
        ...StyleSheet.absoluteFill
    },
    bottomTab: {
        alignItems: "center",
        height: windowHeight * 0.25
    }
})