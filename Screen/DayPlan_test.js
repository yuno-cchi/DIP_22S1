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

export default function DayPlan_test({ navigation, route }) {

    let displayPlan = [];
    const [forDisplay, setForDisplay] = useState();
    const [isLoading, setLoading] = useState(false);
    const [getDates, setGetDates] = useState([]);
    //axiosTest(displayPlan, selectedday);
    console.log("can i get my dates?", mydates);

    var selectedday = route.params.selectedday;
    //set to store date no duplicate


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
                                <View>
                                    <PlanList
                                        start={thisRoute.startName}
                                        destination={thisRoute.destinationName}
                                        key={thisRoute._id}
                                        user={thisRoute.routename}
                                        price="$15"
                                        style={
                                            thisRoute.selected
                                                ? { backgroundColor: color.primary }
                                                : { backgroundColor: color.white }
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
                    alignContent: "center",
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

    // setTimeout(() => {
    //   setShowPlan(true);
    //   console.log("my displayplan after 2s,", displayPlan);
    //   // return (
    //   //   <View style={styles.plan}>
    //   //     <View style={styles.component}>{displayPlan}</View>
    //   //   </View>
    //   // );
    // }, 2000);

    // useEffect(() => {
    //   console.log("use effect");
    //   showDayPlan();
    // }, [showPlan]);
    // }

    // useEffect(() => {
    //   setTimeout(() => {
    //     console.log("useeffect now", displayPlan);

    //     if (displayPlan != null) {
    //       setShowPlan(true);
    //     }
    //     //console.log("i suppose to be end ", displayPlan);
    //     return (
    //       <View style={styles.plan}>
    //         <View style={styles.component}>{displayPlan}</View>
    //       </View>
    //     );
    //   }, 2000);
    // }, [showPlan]);
}

const styles = StyleSheet.create({
    container: {
    }
})