import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
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
import { FontAwesome5 } from '@expo/vector-icons';

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

                                    {/*Change to use FlatList, maximum render is 3 elements */}
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
                                        onPress={() => {

                                            navigation.navigate("DrivingNavigationScreen", thisRoute)
                                        }}
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
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 40 }}>
                    <TouchableOpacity
                        style={{
                            top: 20,
                            left: 10,
                            width: 40,
                            height: 40,
                            backgroundColor: color.primary,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => {
                            navigation.pop()
                        }}>
                        <FontAwesome5 name={"backward"} size={24} color={'white'} />

                    </TouchableOpacity>
                </View>

                <View style={styles.plan}>

                    {/* <Text>done</Text> */}
                    <View style={styles.component}>{forDisplay}</View>
                </View>
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