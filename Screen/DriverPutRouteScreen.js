import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Platform } from 'react-native';
import BottomTab from '../Components/BottomTab';
import AppButton from '../Components/AppButton';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import TopSearchBar from '../Components/TopSearchBar';
import { color } from '../Config/Color'
import { Marker } from 'react-native-maps';
import TopTab from '../Components/TopTab';
import SearchBar from '../Components/SearchBar';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

// DateTimePickerAndroid.open(params: AndroidNativeProps);
// DateTimePickerAndroid.dismiss(model: AndroidNativeProps['mode']);

const GOOGLE_API_KEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const ANIMATE_SPEED = 1000;
const ANIMATE_ZOOM = 1;
const INITIAL_POINT = null;
const STROKE_WIDTH = 5;
const STROKE_COLOR = color.danger;
const DATE_MODE = "datetime"

console.log("loading")

const animateToLocation = (coordinates) => {
    mapViewRef.animateToRegion(
        coordinates
        , ANIMATE_SPEED);
}

const getTimeInLocalTimeZone = (UTCTime) => {

}

const getCoordinatesKey = () => {

}


const storeInDatabase = (startLocation, endLocation, date, key, userID) => {


}

export default function DriverPutRouteScreen({ navigation, route }) {


    //for datetimepicker
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    //const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [startLocation, setStartLocation] = useState();
    const [endLocation, setEndLocation] = useState();

    const [loading, setLoading] = useState(true)



    //WORK IN-PROGRESS: DYNAMIC MARKERS
    const [startDetail, setStartDetail] = useState();
    const [endDetail, setEndDetail] = useState();

    //Ask for userLocation on the first render
    useEffect(() => {
        getLiveLocation();
    }, []);

    const storeInDatabase = (startLocation, endLocation, date, key, userID) => {
        console.log("adding to database")

        console.log("Start: ")
        console.log(startLocation)

        console.log("Destination: ")
        console.log(endLocation)

        console.log("Date: ")
        console.log(date)

        //userID has to be retrieved from the login
        console.log("key: ") //this is automatically created so thank god
        console.log(key)

        console.log("userID: ")
        userID = "kigali";
        console.log(userID)

        //TODO: use axios to post into database
        axios({
            method: 'post',
            url: 'http://secret-caverns-21869.herokuapp.com/ride/add',
            headers: {},
            data: {
                routename: userID,
                start: startLocation,
                destination: endLocation,
                date: date
            }
        }).then((response) => {
            console.log(response);


            navigateToRecc()


        }, (error) => {
            console.log(error);
        });


    }

    function navigateToRecc() {
        //alert successful and move to next page
        navigation.navigate('ReccommendedRouteScreen', {
            startLocation: startLocation,
            endLocation: endLocation,
            selectedDate: selectedDate.toISOString()
        })
    }

    async function getLiveLocation() {
        console.log("getting location")
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync();
        setLocation(location);

        setLoading(false)

        const userCoordinate = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        console.log(userCoordinate);

    }

    const functionSetTime = () => {
        {
            return <DateTimePicker
                value={new Date()}
                //mode={DATE_MODE}
                mode="datetime"
                onChange={(event, selectedDate) => {
                    setSelectedDate(selectedDate);
                    console.log(selectedDate);
                    const d = new Date(selectedDate);

                    // setTimeDisplay(true);

                    // let tempDate = new Date(currentDate);
                    // let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getDay();
                    // let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();

                    var hora = d.getUTCHours() + 8;
                    if (hora >= 24) {
                        hora = hora - 24
                    }

                    console.log('Hour: ', d.getUTCHours() - 16, ' ', 'Minute: ', d.getUTCMinutes(), 'Sec: ', d.getUTCSeconds());
                    //Need to offset by -4 hours, this is UTC time
                }}
                minimumDate={new Date()}
                accentColor={color.red}
                textColor={color.medium}
                display="default"
                style={{
                    width: 200,
                    transform: [{ scale: 1.5, }],
                }}
            />
        }
    }


    return (
        <View style={styles.container}>
            <MapView
                ref={(mapView) => { mapViewRef = mapView; }}
                style={styles.container}
                showsPointsOfInterest={true}
                showsUserLocation={true}
            >
                <MapViewDirections
                    origin={startLocation}
                    destination={endLocation}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={STROKE_WIDTH}
                    strokeColor={STROKE_COLOR}
                />
                {startLocation &&
                    <Marker
                        title="Start"
                        description='yeah'
                        coordinate={startLocation}
                    />}
                {endLocation &&
                    <Marker
                        title="End"
                        description='qwe'
                        coordinate={endLocation}
                    />}
            </MapView>

            <View style={styles.locationTextBoxContainer}>
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    styles={styles.endTextBox}
                    placeholder='End Location'
                    onPress={(data, details) => {
                        // 'details' is provided when fetchDetails = true
                        coordinates = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
                        setEndLocation(coordinates);
                        console.log(coordinates);
                        animateToLocation(coordinates);
                    }}
                    on
                    fetchDetails={true}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                        components: 'country:sg'
                    }}
                    nearbyPlacesAPI="GoogleReverseGeocodingQuery" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                    }}
                    enablePoweredByContainer={false}

                />
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    fetchDetails={true}
                    styles={styles.startTextBox}
                    placeholder='Start Location'
                    onPress={(data, details) => {
                        // 'details' is provided when fetchDetails = true
                        coordinates = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
                        setStartLocation(coordinates);
                        console.log(coordinates);
                        animateToLocation(coordinates);

                    }}

                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                        components: 'country:sg'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GooglePlacesSearchQuery={{
                        rankby: 'distance',
                    }}
                    enablePoweredByContainer={false}
                />

            </View>
            <BottomTab style={{ alignItems: 'center' }}>
                <AppButton style={styles.showRoute}
                    title="Go"
                    onPress={() => {
                        console.log(startLocation, endLocation, selectedDate);

                        //storeInDatabase();
                        navigation.navigate('ReccommendedRouteScreen', {
                            startLocation: startLocation,
                            endLocation: endLocation,
                            selectedDate: selectedDate.toISOString()
                        })
                        // Send the two coordiantes to the Database, then move to a new screen
                    }}
                />

                <View style={styles.timeContainer}>
                    <DateTimePicker
                        value={selectedDate}
                        mode={DATE_MODE}
                        onChange={(event, selectedDate1) => {
                            const currentDate = selectedDate1 || selecteddate;
                            setSelectedDate(currentDate);
                            console.log(selectedDate);
                            let tempDate = new Date(currentDate);
                            let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDay();
                            let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
                            setText(fDate + '\n' + fTime);
                            console.log(fDate + ' || ' + fTime)
                        }}
                        minimumDate={new Date()}
                        accentColor={color.red}
                        textColor={color.medium}
                        display="default"
                        style={{
                            width: 200,
                            transform: [{ scale: 1.5, }],
                        }}
                    />
                </View>

            </BottomTab>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill
    },
    showRoute: {
        position: 'absolute',
        bottom: 40,
        width: 80,
        right: 20,
        height: 80,
    },
    showLoc: {
        position: 'absolute',
        bottom: 40,
        width: 200,
        left: 20
    },
    tab: {
        position: 'absolute',
        backgroundColor: color.lightGray,
        width: '100%',
        height: 200,
        bottom: 0
    },
    searchBar: {
        height: '5%',
        width: '60%',
        borderRadius: 20,
        backgroundColor: color.lightGray,
        borderColor: color.black,
        borderWidth: 2,
        padding: 15
    },
    confirmButtonStyle: {
        position: 'absolute',
        backgroundColor: color.primary,
        color: color.primary,
        height: 40,
        width: 80,
        borderRadius: 15,
        padding: 5,
        right: 10,
        top: 130
    },
    textInput: {
        backgroundColor: color.white,
        width: 250,
        height: 40,
        borderRadius: 10,
        margin: 4,
        padding: 5
    },
    locationTextBoxContainer: {
        top: 50,
        right: 0,
        backgroundColor: color.black
    },
    startTextBox: {
        container: {
            position: 'absolute',
            width: 300,
            height: 200,
            top: 0,
            right: 20,

        },
    },
    endTextBox: {
        container: {
            position: 'absolute',
            width: 300,
            height: 200,
            top: 60,
            right: 20,

        },
    },
    textboxContainer: {
        width: '100%',
        height: 400,
        backgroundColor: color.lightGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeContainer: {
        position: 'absolute',
        left: 0,
        top: 10,
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    androidTimeContainer: {
        position: 'absolute',
        left: 0,
        top: 10,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})