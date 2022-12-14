import { React, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import MapView, { Marker } from "react-native-maps";

import Screen from '../Components/Screen';
import SearchBar from "../Components/SearchBar";
import Icon from '../Components/Icon';
import AppButton from "../Components/AppButton";
import CircularButton from "../Components/CircularButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from '../Config/Color';
import BottomTab from "../Components/BottomTab";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';


const GOOGLE_API_KEY = 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88';
const ANIMATE_SPEED = 1000;
const STROKE_WIDTH = 5;
const STROKE_COLOR = color.danger;
const DATE_MODE = "datetime"

export default function RiderMapScreen_android() {

    const navigation = useNavigation();

    const [coordinate, updateMarker] = useState([]);

    const [startLocationName, setStartLocationName] = useState();
    const [endLocationName, setEndLocationName] = useState();
    const [startLocation, setStartLocation] = useState();
    const [endLocation, setEndLocation] = useState();
    //const [selectedDate, setSelectedDate] = useState(new Date());


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

    //A function to get lastest markerKey from DB

    const animateToLocation = (coordinates) => {
        mapViewRef.animateToRegion(
            coordinates
            , ANIMATE_SPEED);
    }

    const storeInDatabase = async (startLocation, endLocation, date, startName, endName) => {
        console.log("adding to database")

        console.log("Start: ")
        console.log(startLocation)

        console.log("Destination: ")
        console.log(endLocation)

        console.log("Date: ")
        console.log(date)

        //convert date to iso format
        var dateobj =
        new Date('October 15, 1996 05:35:32');
 
        var B = dateobj.toISOString();

        //userID has to be retrieved from the login
        centroid = {latitude: (startLocation.latitude + endLocation.latitude) / 2.0, longitude: (startLocation.longitude + endLocation.longitude) / 2.0,};

        console.log("userID: ")
        // if (userID === null) {
        //     userID = "user" + Math.floor(Math.random() * 100);
        // }

        userID = await AsyncStorage.getItem("userId");

        console.log(userID)


        //TODO: use axios to post into database
        axios({
            method: 'post',
            url: 'http://secret-caverns-21869.herokuapp.com/ride/add',
            headers: {},
            data: {
                routename: userID,
                startName: startName,
                start: startLocation,
                destinationName: endName,
                destination: endLocation,
                centroid: centroid,
                date: date,
                selected: false,
                driverID: null,
            }
        }).then((response) => {
            console.log(response);


            //navigateToRecc()
            navigation.navigate(
                "Calendar"
              )


        }, (error) => {
            console.log(error);
        });


    }

    // function navigateToRecc(){
    //     //alert successful and move to next page
    //     navigation.navigate('ReccommendedRouteScreen', {
    //         startLocation: startLocation,
    //         endLocation: endLocation,
    //         selectedDate: selectedDate,
    //         centroid: {
    //             latitude: (startLocation.latitude + endLocation.latitude) / 2, 
    //             longitude: (startLocation.longitude + endLocation.longitude) / 2
    //         }
    //     })
    // }

    //for setting time
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

                    //'October 15, 1996 05:35:32'


                    let fTime = ('0' + tempDate.getHours()).slice(-2) + ':' + ('0' + tempDate.getHours()).slice(-2) + ':00';
                    //setText(fDate + '\n' + fTime);
                    var dateobj =
                    new Date(fDate + ' ' + fTime);
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


    return (
        <View style={styles.container}>
            <MapView
                ref={(map) => { mapViewRef = map; }}
                style={{ ...StyleSheet.absoluteFill }}
                showsUserLocation={true}
                showsPointsOfInterest={true} />
            <CircularButton name='user' onPress={() => { console.log('user pressed') }} style={styles.dashButton} />
            <View style={styles.locationTextBoxContainer}>
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    styles={styles.endTextBox}
                    placeholder='End Location'
                    onPress={(data, details) => {
                        // 'details' is provided when fetchDetails = true
                        coordinates = { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }
                        setEndLocation(coordinates);
                        setEndLocationName(data.description);
                        console.log(coordinates);
                        console.log(data.description);
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
                        setStartLocationName(data.description);
                        console.log(coordinates);
                        console.log(data.description);
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

            <BottomTab>
                <View style={styles.timeContainer}>
                    {mode == "date" && showDate == true && <DateTimePicker
                        value={new Date()}
                        mode={mode}
                        onChange={(event, selectedDate1) => {
                            // console.log("android rider");
                            // const currentDate = selectedDate1 || selecteddate;
                            // setSelectedDate(currentDate);
                            // console.log(selectedDate);
                            // let tempDate = new Date(currentDate);
                            // let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDay();
                            // let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
                            // console.log(fDate + ' || ' + fTime)
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
                <AppButton
                    style={styles.sendButton}
                    thisColor={color.danger}
                    title="Send"
                    onPress={() => {
                        storeInDatabase(startLocation, endLocation, selectedDate, startLocationName, endLocationName);
                    }} />
            </BottomTab>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill
    },
    searchBar: {
        position: 'absolute',
        marginTop: 40,
        right: 20
    },
    dashButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        left: 30,
        marginTop: 60
    },
    tab: {
        position: 'absolute',
        backgroundColor: color.lightGray,
        width: '100%',
        height: 200,
        bottom: 0
    },
    sendButton: {
        position: 'absolute',
        width: 100,
        right: 20,
        top: 30
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
    timeContainer: {
        position: 'absolute',
        left: 0,
        top: 10,
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
})