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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
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


// const storeInDatabase = (startLocation, endLocation, date, key, userID) => {
//     console.log("adding to database")

//     console.log("Start: ")
//     console.log(startLocation)

//     console.log("Destination: ")
//     console.log(endLocation)

//     console.log("Date: ")
//     console.log(date)

//     //userID has to be retrieved from the login
//     console.log("key: ") //this is automatically created so thank god
//     console.log(key)

//     console.log("userID: ")
//     userID = "kigali";
//     console.log(userID)

//     //TODO: use axios to post into database
//     axios({
//         method: 'post',
//         url: 'http://secret-caverns-21869.herokuapp.com/ride/add',
//         headers: {}, 
//         data: {
//             routename: userID,
//             start: startLocation,
//             destination: endLocation,
//             date: date
//         }
//       }).then((response) => {
//         console.log(response);


//         navigateToRecc()


//       }, (error) => {
//         console.log(error);
//       });


// }

export default function DriverPutRouteScreen_Android( route ) {

    const navigation = useNavigation();

    //for datetimepicker
    const [selecteddate, setSelectedDate] = useState(null);
    const [selectedtime, setSelectedTime] = useState(null);
    const [selectedDate, setFinalDate] = useState(null);

    //alter modes, setShow = showtime, showDate = showdate
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState(true);

    //for date and time display, textDate = date, textTime = textTime
    const [textDate, setTextDate] = useState('Empty');
    const [textTime, setTextTime] = useState('Empty');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [startLocation, setStartLocation] = useState();
    const [endLocation, setEndLocation] = useState();
    const [centroidLocation, setCentroid] = useState();

    const [loading, setLoading] = useState(true)

    //for button control
    const [buttonDisabled, setButtonState] = useState(true);


    //WORK IN-PROGRESS: DYNAMIC MARKERS
    const [startDetail, setStartDetail] = useState();
    const [endDetail, setEndDetail] = useState();

    //Ask for userLocation on the first render
    useEffect(() => {
        getLiveLocation();
    }, []);

    const storeLocally = async (startLocation, endLocation, date, key, userID) => {
        console.log("adding to database")
    
        console.log("Start: ")
        console.log(startLocation)
    
        console.log("Destination: ")
        console.log(endLocation)
    
        console.log("Date: ")
        console.log(date)
    
        
        console.log("key: ") //this is automatically created so thank god
        console.log(key)
    
        //TODO: userID has to be retrieved from the login session
        console.log("userID: ")

        userID = await AsyncStorage.getItem("userId");

        console.log(userID)
    
        centroid = {latitude: (startLocation.latitude + endLocation.latitude) / 2.0, longitude: (startLocation.longitude + endLocation.longitude) / 2.0,};

        console.log("centroid coord: ")
        console.log(centroid);

        setCentroid(centroid);

        //TODO: use axios to post into database
        // axios({
        //     method: 'post',
        //     url: 'http://secret-caverns-21869.herokuapp.com/ride/add',
        //     headers: {}, 
        //     data: {
        //         routename: userID,
        //         start: startLocation,
        //         destination: endLocation,
        //         date: date
        //     }
        //   }).then((response) => {
        //     console.log(response);
    
    
        //     navigateToRecc()
    
    
        //   }, (error) => {
        //     console.log(error);
        //   });
        navigateToRecc()
    
    }

    function navigateToRecc(){
        //alert successful and move to next page
        navigation.navigate('ReccommendedRouteScreen', {
            startLocation: startLocation,
            endLocation: endLocation,
            selectedDate: selectedDate,
            centroid: {
                latitude: (startLocation.latitude + endLocation.latitude) / 2, 
                longitude: (startLocation.longitude + endLocation.longitude) / 2
            }
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

        //setLoading(false)

        const userCoordinate = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        console.log(userCoordinate);

    }

    function checkButtonQuery() {
        if (startLocation == undefined && endLocation == undefined) {
            setButtonState(true)
        }
        else {
            setButtonState(false)
        }
    }

    const functionSetTime = () => {
        {
            return <DateTimePicker
                value={new Date()}
                mode="time"
                onChange={(event, selectedTime) => {

                    //halt display of time picker again
                    setShow(false);

                    const currentDate = selectedTime || selectedtime;
                    //setShow(Platform.OS == 'android')a
                    setSelectedTime(currentDate);
                    console.log("default: " + selectedTime);
                    console.log("blyat: " + selectedTime);

                    let fDate = textDate;

                    console.log("datepickerdate: " + selecteddate);
                    console.log("datepickerdate2: " + textDate);


                    let tempDate = new Date(currentDate);
                    let fTime = 'Hours: ' + tempDate.getHours() + ': Minutes: ' + tempDate.getMinutes();
                    var dateobj = new Date(fDate + ' ' + fTime);
                    var B = dateobj.toISOString();
                    console.log(fDate + ' , ' + fTime)
                    console.log(B);

                    setTextDate(fDate);
                    setTextTime(fTime);

                    //format to save in the db: "yyyy/mm/dd , hh:mm"
                    setFinalDate(B);

                    console.log(show);
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


    // if (loading) {
    //     //setRouteVisible(false);
    //     console.log("attenzione");
    //     return <View><Text>Loading, please wait</Text></View>
    // }

    return (
        <View style={styles.container}>
            <MapView
                ref={(mapView) => { mapViewRef = mapView; }}
                style={styles.container}
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

                        checkButtonQuery();
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

                        checkButtonQuery();

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
                <View style={styles.fixToText}>
                    <Button style={styles.timeButton}
                        title={textTime}
                        onPress={() => { setTextTime("Empty"), setShow(true), setMode("time") }}
                    />
                    <Button
                        title={textDate}
                        onPress={() => { setTextDate("Empty"), setShowDate(true), setMode("date") }}
                    />
                </View>
                <AppButton style={styles.showRoute}
                    //disable={buttonDisabled}
                    title="Go"
                    onPress={() => {
                        console.log(startLocation, endLocation, selectedDate);
                        // if (startLocation == undefined && endLocation == undefined) {
                        //     console.log("missing fields");
                        // }
                        // else {
                        //     storeInDatabase(startLocation, endLocation, selectedDate)
                        // }

                        storeLocally(startLocation, endLocation, selectedDate)
                        //Send the two coordiantes to the ReccomendedRouteScreen, then move to a new screen
                    }}
                />

                {/* <View style={styles.timeContainer}>
                    <DatePicker
                        value={selectedDate}
                        //mode={DATE_MODE}
                        mode="time"
                        onChange={(event, selectedDate) => {
                            setSelectedDate(selectedDate);
                            console.log(selectedDate);
                            const d = new Date(selectedDate);
                            
                            var hora = d.getUTCHours()+8;
                            if (hora >= 24){
                                hora = hora - 24
                            }

                            console.log('Hour: ', hora, ' ', 'Minute: ', d.getUTCMinutes(), 'Sec: ', d.getUTCSeconds());
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
                </View> */}
                <View style={styles.androidTimeContainer}>
                    {mode == "date" && showDate == true && <DateTimePicker
                        value={new Date()}
                        //mode={DATE_MODE}
                        mode={mode}
                        onChange={(event, selectedDate1) => {
                            console.log("andorid");
                            //halt display of date picker again
                            setShowDate(false)

                            const currentDate = selectedDate1 || selecteddate;
                            //setShow(Platform.OS == 'android')
                            setSelectedDate(currentDate);
                            console.log("default date: " + selecteddate);
                            console.log("chosen date: " + selectedDate1);

                            let tempDate = new Date(currentDate);
                            let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
                            //let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
                            setTextDate(fDate);
                            console.log("selected date: " + fDate)

                            //show time and hide the dates
                            setMode("time")
                            setShow(true)
                        }}
                        minimumDate={new Date()}
                        accentColor={color.red}
                        textColor={color.medium}
                        display="default"
                        style={{
                            width: 200,
                            transform: [{ scale: 1.5, }],
                        }}
                    />}
                    {mode == "time" && show == true &&
                        functionSetTime()
                    }
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
    },
    fixToText: {
        flexDirection: 'row',
        top: 30,
        right: 40,
        height: 50,
        justifyContent: 'space-between',
    },
})