import React, { useRef, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Button,
    Platform,
    Dimensions,
    Alert,
} from "react-native";
import BottomTab from "../Components/BottomTab";
import AppButton from "../Components/AppButton";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import TopSearchBar from "../Components/TopSearchBar";
import { color } from "../Config/Color";
import { Marker } from "react-native-maps";
import TopTab from "../Components/TopTab";
import SearchBar from "../Components/SearchBar";
import { Formik } from "formik";
import { TextInput } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import HeaderTab from "../Components/HeaderTab";

// DateTimePickerAndroid.open(params: AndroidNativeProps);
// DateTimePickerAndroid.dismiss(model: AndroidNativeProps['mode']);

const GOOGLE_API_KEY = "AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88";
const ANIMATE_SPEED = 1000;
const ANIMATE_ZOOM = 1;
const INITIAL_POINT = null;
const STROKE_WIDTH = 5;
const STROKE_COLOR = "blue";
const DATE_MODE = "datetime";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

console.log("loading");

const animateToLocation = (coordinates) => {
    mapViewRef.animateToRegion(coordinates, ANIMATE_SPEED);
};

const getTimeInLocalTimeZone = (UTCTime) => { };

const getCoordinatesKey = () => { };

const storeInDatabase = (startLocation, endLocation, date, key, userID) => {
    console.log("adding to database");

    console.log("Start: ");
    console.log(startLocation);

    console.log("Destination: ");
    console.log(endLocation);

    console.log("Date: ");
    console.log(date);

    //userID has to be retrieved from the login
    console.log("key: "); //this is automatically created so thank god
    console.log(key);

    console.log("userID: ");
    userID = "kigali";
    console.log(userID);

    //TODO: use axios to post into database
    axios({
        method: "post",
        url: "http://secret-caverns-21869.herokuapp.com/ride/add",
        headers: {},
        data: {
            routename: userID,
            start: startLocation,
            destination: endLocation,
            date: date,
            centroid: centroid,
            selected: false,
        },
    }).then(
        (response) => {
            console.log(response);

            navigateToRecc();
        },
        (error) => {
            console.log(error);
        }
    );
};

export default function DriverPutRouteScreen({ navigation, route }) {
    //for datetimepicker
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    //const [show, setShow] = useState(false);
    const [text, setText] = useState("Empty");

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [startLocationName, setStartLocationName] = useState();
    const [endLocationName, setEndLocationName] = useState();

    const [startLocation, setStartLocation] = useState();
    const [endLocation, setEndLocation] = useState();

    const [loading, setLoading] = useState(true);

    //WORK IN-PROGRESS: DYNAMIC MARKERS
    const [startDetail, setStartDetail] = useState();
    const [endDetail, setEndDetail] = useState();

    //Ask for userLocation on the first render
    // useEffect(() => {
    //     getLiveLocation();
    // }, []);

    function navigateToRecc() {
        //alert successful and move to next page
        navigation.navigate("ReccommendedRouteScreen", {

            startLocation: startLocation,
            endLocation: endLocation,
            selectedDate: selectedDate.toISOString(),

        });
    }

    async function getLiveLocation() {
        console.log("getting location");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync();
        setLocation(location);

        setLoading(false);

        const userCoordinate = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        console.log("User coordinates:", userCoordinate);
    }

    const functionSetTime = () => {
        {
            return (
                <DateTimePicker
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
                            hora = hora - 24;
                        }
                        date = Date("2022-10");

                        console.log(
                            "Hour: ",
                            d.getUTCHours() - 16,
                            " ",
                            "Minute: ",
                            d.getUTCMinutes(),
                            "Sec: ",
                            d.getUTCSeconds()
                        );
                        //Need to offset by -4 hours, this is UTC time
                    }}
                    minimumDate={new Date()}
                    accentColor={color.red}
                    textColor={color.medium}
                    display="default"
                    style={{
                        width: 200,
                        transform: [{ scale: 1.5 }],
                    }}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={(mapView) => {
                    mapViewRef = mapView;
                }}
                style={styles.container}
                showsPointsOfInterest={true}
                showsUserLocation={true}
                userInterfaceStyle='light'
            >
                <MapViewDirections
                    origin={startLocation}
                    destination={endLocation}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={STROKE_WIDTH}
                    strokeColor={STROKE_COLOR}
                />
                {startLocation && (
                    <Marker title="Start" description="yeah" coordinate={startLocation} />
                )}
                {endLocation && (
                    <Marker title="End" description="qwe" coordinate={endLocation} />
                )}
            </MapView>
            <HeaderTab>


                <View style={styles.locationTextBoxContainer}>
                    <GooglePlacesAutocomplete
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        styles={styles.endTextBox}
                        placeholder="End Location"
                        onPress={(data, details) => {
                            // 'details' is provided when fetchDetails = true
                            coordinates = {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            };
                            setEndLocation(coordinates);
                            setEndLocationName(data.description);
                            console.log(coordinates);
                            animateToLocation(coordinates);
                        }}
                        fetchDetails={true}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: "en",
                            components: "country:sg",
                        }}
                        nearbyPlacesAPI="GoogleReverseGeocodingQuery" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: "distance",
                        }}
                        enablePoweredByContainer={false}
                    />
                    <GooglePlacesAutocomplete
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        fetchDetails={true}
                        styles={styles.startTextBox}
                        placeholder="Start Location"
                        onPress={(data, details) => {
                            // 'details' is provided when fetchDetails = true
                            coordinates = {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            };
                            setStartLocation(coordinates);
                            setStartLocationName(data.description);
                            console.log(coordinates);
                            animateToLocation(coordinates);
                        }}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: "en",
                            components: "country:sg",
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GooglePlacesSearchQuery={{
                            rankby: "distance",
                        }}
                        enablePoweredByContainer={false}
                    />
                </View>
            </HeaderTab>

            <BottomTab>
                <View style={styles.timeContainer}>
                    <View style={styles.flextime}>
                        <DateTimePicker
                            value={selectedDate}
                            mode={DATE_MODE}
                            onChange={(event, selectedDate1) => {
                                console.log("ios rider");
                                const currentDate = selectedDate1 || selecteddate;
                                setSelectedDate(currentDate);
                                console.log(selectedDate);
                                let tempDate = new Date(currentDate);
                                let fDate =
                                    tempDate.getFullYear() +
                                    "/" +
                                    (tempDate.getMonth() + 1) +
                                    "/" +
                                    tempDate.getDay();
                                let fTime =
                                    "Hours: " +
                                    tempDate.getHours() +
                                    " | Minutes: " +
                                    tempDate.getMinutes();
                                console.log(fDate + " || " + fTime);
                            }}
                            minimumDate={new Date()}
                            accentColor={color.red}
                            textColor={color.medium}
                            display="default"
                            style={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                width: 200,
                                height: 100,
                                transform: [{ scale: 1.4 }],
                            }}
                        />
                    </View>

                    <AppButton
                        style={styles.sendButton}
                        thisColor={color.danger}
                        title="Drive"
                        onPress={() => {
                            console.log(
                                "Driver info:",
                                startLocation,
                                endLocation,
                                selectedDate
                            );
                            if (startLocation !== undefined && endLocation !== undefined) {
                                navigation.navigate("ReccommendedRouteScreen", {
                                    startName: startLocationName,
                                    endName: endLocationName,
                                    startLocation: startLocation,
                                    endLocation: endLocation,
                                    selectedDate: selectedDate.toISOString(),
                                    centroid: {
                                        latitude: (startLocation.latitude + endLocation.latitude) / 2,
                                        longitude:
                                            (startLocation.longitude + endLocation.longitude) / 2,
                                    },
                                });
                            } else {
                                Alert.alert(
                                    "Empty destination fields!",
                                    "Please enter the destination",
                                    [
                                        {
                                            text: "Ok",
                                            onPress: () => {

                                            },
                                            style: "default",
                                        },
                                    ],
                                    {
                                        cancelable: false,
                                    })
                            }

                        }}
                    />

                </View>
            </BottomTab>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
    },
    searchBar: {
        position: "absolute",
        marginTop: 60,
        right: 20,
    },
    dashButton: {
        position: "absolute",
        width: 40,
        height: 40,
        left: 30,
        marginTop: 60,
    },
    tab: {
        position: "absolute",
        backgroundColor: color.lightGray,
        width: "100%",
        height: 500,
        bottom: 0,
    },
    sendButton: {
        width: 130,
        marginLeft: 50

    },
    locationTextBoxContainer: {
        top: 50,
        right: 0,
        backgroundColor: color.black,
    },
    startTextBox: {
        container: {
            position: 'absolute',
            alignItems: "center",
            width: windowWidth * 0.8,
            height: 200,
            top: 0,
            left: 40,
        },
        textInput: {
            backgroundColor: color.lightGray,
            height: 44,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
        },
    },
    endTextBox: {
        container: {
            position: 'absolute',
            alignItems: "center",
            width: windowWidth * 0.8,
            height: 200,
            top: 60,
            left: 40,
        },

        textInput: {
            backgroundColor: color.lightGray,
            height: 44,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
        },
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,

    },
    flextime: {
        alignItems: "center",
        justifyContent: "center",
        alignContent: 'center',
        marginLeft: 0
        //alignItems: "center",
    },
    flexbtn: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        //alignItems: "right",
    },
});
