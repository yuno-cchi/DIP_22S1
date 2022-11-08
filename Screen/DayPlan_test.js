import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import data from "./calendarData.json";
import mydata from "./dayTripData.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlanList from "../Components/PlanList";
import { FlatList } from "react-native";
import { color } from "../Config/Color";
import axios from "axios";
import mydates from "./GetDriveData";
import RiderMapScreen from "./RiderMapScreen";
import DriverPutRouteScreen from "./DriverPutRouteScreen";
import DriverPutRouteScreen_Android from "./DriverPutRouteScreen_Android";
import RiderMapScreen_android from "./RiderMapScreen_android";
import MapViewDirections from "react-native-maps-directions";

export default function DayPlan_test({ navigation, route }) {

    let displayPlan = [];
    const [forDisplay, setForDisplay] = useState();
    const [isLoading, setLoading] = useState(false);
    const [getDates, setGetDates] = useState([]);

    //axiosTest(displayPlan, selectedday);
    console.log("can i get my dates?", mydates);

    var selectedday = route.params.selectedday;
    var dist;
    //set to store date no duplicate

<<<<<<< HEAD
  useEffect(() => {
    let dateColect = new Set();
    let returnRouteObjectArray = [];
    try {
      axios
        .get("http://secret-caverns-21869.herokuapp.com/ride")
        .then((response) => {
          //console.log("resp", response.data.length);
          console.log("Data length: ", response.data.length)
          console.log("Data shape: ", response.data[0])
          console.log("selected day is: ", selectedday)
          console.log("Date format is: ", new Date(selectedday.dateString))
          selectedDateObj = new Date(selectedday.dateString);
          for (let i = 0; i < response.data.length; i++) {
            let tempDate = new Date(response.data[i].date)
            // console.log("Date: [", i, "]:", response.data[i].date)
            // console.log("Compare date: ", tempDate.getUTCDate(), selectedDateObj.getUTCDate())
            // console.log("Compage month: ", tempDate.getMonth(), selectedDateObj.getMonth())
            // console.log("Compare year: ", tempDate.getFullYear(), selectedDateObj.getFullYear())
            console.log("Compare userID", response.data[i].routeUserID, "with", route.params.userID)
            if (tempDate.getUTCDate() === selectedDateObj.getUTCDate() && tempDate.getMonth() === selectedDateObj.getMonth()
              && tempDate.getFullYear() === selectedDateObj.getFullYear() && response.data[i].routename === route.params.userID) {
              routeArray.push({
                start: response.data[i].start,
                destination: response.data[i].destination,
                centroid: response.data[i].centroid,
                routename: response.data[i].routename,
                startName: response.data[i].startName,
                destinationName: response.data[i].destinationName,
                driverID: response.data[i].driverID,
                selected: response.data[i].selected,
                date: response.data[i].date,
                key: i
=======
>>>>>>> parent of 3355065 (Merge branch 'copy_main' of https://github.com/yuno-cchi/DIP_22S1 into copy_main)

    //object array for post process


    useEffect(() => {

        let dateColect = new Set();
        let returnRouteObjectArray = [];
        try {
            axios
                .get("http://secret-caverns-21869.herokuapp.com/ride")
                .then((response) => {
                    //console.log("resp", response.data.length);
                    for (let i = 0; i < response.data.length; i++) {
                        let thisRoute = response.data[i];

                        dateColect.add(thisRoute.date.slice(0, 10));

                        //setDbDates()
                        //has to use [4] to get date string
                        console.log("this date?", response.data[i]);
                        if (Object.values(selectedday)[4] === thisRoute.date.slice(0, 10)) {
                            console.log("select", Object.values(selectedday)[4]);
                            console.log("route ", thisRoute.date.slice(0, 10));
                            displayPlan.push(
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>


                                    <PlanList
                                        start={thisRoute.startName}
                                        destination={thisRoute.destinationName}
                                        key={thisRoute._id}
                                        user={thisRoute.routename}
                                        //Price is removed, the calculated is done inside the JSX
                                        style={
                                            thisRoute.selected
                                                ? {
                                                    backgroundColor: color.primary,
                                                }
                                                : {
                                                    backgroundColor: color.white,
                                                }
                                        }
                                    />
                                </View>
                            );
                        }

                        console.log("in display", displayPlan);
                        setForDisplay(displayPlan);
                        console.log("for display?", forDisplay);

                        setTimeout(() => {
                            setLoading(false);
                        }, 300);
                    }

                    let arr = Array.from(dateColect);
                    arr = arr.map(i => i + ": { 'marked': true, 'selectedColor': 'blue'}")

                    console.log(JSON.stringify(arr));

                    setGetDates(JSON.stringify(arr));

                });
        } catch (error) {

        }
    }, []);

    if (isLoading) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    height: "100%",
                    padding: 30,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Loading...</Text>
            </View>
        );
    } else {
        console.log("can display?", forDisplay);
        return (
            <View style={styles.plan}>
                {/* <Text>done</Text> */}
                <View style={styles.component}>{forDisplay}</View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'white'
    },
    plan: {
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        marginTop: 10,
        marginBottm: 10
    },
    component: {
        fontSize: 10,
        height: "15%",
        backgroundColor: "powerblue",
    },
    noplan: {},
})