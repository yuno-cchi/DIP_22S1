import { React, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

import Screen from "../Components/Screen";
import SearchBar from "../Components/SearchBar";
import Icon from "../Components/Icon";
import AppButton from "../Components/AppButton";
import CircularButton from "../Components/CircularButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../Config/Color";
import BottomTab from "../Components/BottomTab";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeaderTab from "../Components/HeaderTab";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_API_KEY = "AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88";
const ANIMATE_SPEED = 1000;
const STROKE_WIDTH = 5;
const STROKE_COLOR = color.danger;
const DATE_MODE = "datetime";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function RiderMapScreen({ route, navigation }) {
  const [coordinate, updateMarker] = useState([]);
  const [startLocation, setStartLocation] = useState();
  const [endLocation, setEndLocation] = useState();
  const [startLocationName, setStartLocationName] = useState();
  const [endLocationName, setEndLocationName] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const animateToLocation = (coordinates) => {
    mapViewRef.animateToRegion(coordinates, ANIMATE_SPEED);
  };

  const storeInDatabase = async (
    startLocation,
    endLocation,
    date,
    startName,
    endName
  ) => {
    console.log("adding to database");

    console.log("Start: ");
    console.log(startLocation);

    console.log("Destination: ");
    console.log(endLocation);

    console.log("Date: ");
    console.log(date);

    console.log("startName: ", startName);
    console.log("endName: ", endName);

    //userID has to be retrieved from the login
    centroid = {
      latitude: (startLocation.latitude + endLocation.latitude) / 2.0,
      longitude: (startLocation.longitude + endLocation.longitude) / 2.0,
    };

    console.log("userID: ");
    // if (userID === null) {
    //     userID = "user" + Math.floor(Math.random() * 100);
    // }

    userID = await AsyncStorage.getItem("userId");

    console.log(userID);

    //TODO: use axios to post into database
    axios({
      method: "post",
      url: "http://secret-caverns-21869.herokuapp.com/ride/add",
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
      },//Issue when there's a duplication of userID
    }).then(
      (response) => {
        console.log(response);


      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <View style={styles.container}>

      <MapView
        ref={(map) => {
          mapViewRef = map;
        }}
        style={{ ...StyleSheet.absoluteFill }}
        showsUserLocation={true}
        showsPointsOfInterest={true}
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
              console.log(data.description);
              animateToLocation(coordinates);
            }}
            on
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
              console.log(data.description);
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
                width: 200,
                transform: [{ scale: 1.5 }],
              }}
            />
          </View>
          <View style={styles.flexbtn}>
            <AppButton
              style={styles.sendButton}
              thisColor={color.danger}
              title="Ride"
              onPress={() => {
                storeInDatabase(
                  startLocation,
                  endLocation,
                  selectedDate,
                  startLocationName,
                  endLocationName
                );
                navigation.navigate(
                  "Calendar"
                )
              }}
            />
          </View>
        </View>
      </BottomTab>
    </View>
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
    position: "absolute",
    bottom: 40,
    width: 100,
    right: 20,
    height: 80,
    top: 20
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
  },
  timeContainer: {
    flexDirection: "row",
    //position: "absolute",
    // left: 0,
    // top: 10,
    //width: 300,
    height: 150,
    //justifyContent: "center",
    //alignItems: "center",
  },
  flextime: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",

    //alignItems: "center",
  },
  flexbtn: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    //alignItems: "right",
  },
});
