import React, { ReactNode, SyntheticEvent, useEffect, useState, useRef } from "react";
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
import * as Notifications from 'expo-notifications';

//import drivedata from "./GetDriveData";


var dataLen = Object.keys(data).length;
var dayDataLen = Object.keys(mydata).length;
var selectedday;
let drivedata;




const CalendarScreenTabNavigator_Rider = ({ navigation, route }) => {
    const Tab = createBottomTabNavigator(
    );


    return (
        <Tab.Navigator initialRouteName="Calendar" screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="RiderMap" component={RiderMapScreen}>
                {/* {() => <PutRouteScreenSelector route={route} />} */}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

const getTimeString = (selectedDate) => {
    let time = new Date(selectedDate)
    return (time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear())
}

const timeToNotify = (selectedDate) => {
    console.log(selectedDate)
    let timeThen = new Date(selectedDate)
    let timeNow = new Date()
    let dateDiff = timeThen - timeNow
    dateDiff = dateDiff / 1000
    dateDiff = Math.round(dateDiff)
    return dateDiff
    //Notify 2 hours before the ride
}


async function schedulePushNotification(timeLeft) {
    Notifications.scheduleNotificationAsync({
        content: {
            title: "Don't forget your ride",
            body: timeLeft, //getTimeString(timeLeft)
            data: { data: 'goes here' },
        },
        // trigger: { seconds: timeToNotify(selectedDate) - (43200) },
        trigger: { seconds: 3 }
    });
}

function CalendarScreen({ navigation, route }) {
    let today = new Date();
    let tryPlanning = new Date();
    tryPlanning.setMonth(tryPlanning.getMonth() + 1);


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [getDates, setGetDates] = useState([]);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {

        let dateColect = new Set();
        let returnRouteObjectArray = [];

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });



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


                    setTimeout(() => {
                        setLoading(false);
                    }, 300);
                }

                console.log(dateColect)
                let arr = Array.from(dateColect);
                //obj = Object.assign({arr}, "{'marked': true, 'selectedColor': 'blue'}");
                obj = {};
                arr.forEach((elem, i) => {
                    //obj[{${arr[i]}] = "{'marked': true, 'selectedColor': 'blue'}" 
                    obj[`${arr[i]}`] = { 'marked': true, 'selectedColor': 'red' }
                    schedulePushNotification(arr[i]);
                });

                console.log("dd", obj)
                let addedarr = [];

                // for (var i = 0 ; i < arr.length; i++){
                //     addedarr.push({ arr[i]: {'marked': true, 'selectedColor': 'blue'}})
                // }

                // arr = JSON.stringify(arr)
                //dateColect = dateColect.map(i => i + ": {'marked': true, 'selectedColor': 'blue'}")


                //console.log(JSON.stringify(arr));

                setGetDates(obj);




            });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
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
    }

    return (
        <View style={styles.container}>
            <Calendar
                //minDate={today}
                //maxDate={tryPlanning}
                onDayPress={(day) => {
                    //setPickday(day);
                    selectedday = day;
                    navigation.navigate("DayPlan_test", { selectedday: day });
                }}
                onDayLongPress={(day) => {
                    console.log("selected day", day);
                }}
                monthFormat={"MM"}
                onMonthChange={(month) => {
                    console.log("month changed", month);
                    console.log(data);
                }}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                hideExtraDays={true}
                disableMonthChange={false}
                firstDay={7}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={(addMonth) => addMonth()}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={false}
                enableSwipeMonths={false}
                theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#ffffff",
                    textSectionTitleColor: "orange",
                    textSectionTitleDisabledColor: "#f52d00",
                    selectedDayBackgroundColor: "#f52d00",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#00adf5",
                    dayTextColor: "#2d4150",
                    textDisabledColor: "#d9e1e8",
                    dotColor: "#f52d00",
                    selectedDotColor: "#ffffff",
                    arrowColor: "orange",
                    disabledArrowColor: "#d9e1e8",
                    monthTextColor: "orange",
                    indicatorColor: "orange",
                    textDayFontWeight: "300",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "200",
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                }}
                markedDates={getDates}
                // markedDates={{
                //   "2022-10-16": { startingDay: true, color: "green" },
                //   "2022-10-17": { marked: "true" },
                //   "2020-01-18": { color: "green" },
                //   "2022-10-19": { endingDay: true, color: "gray" },
                // }}
                markingType={"period"}
            ></Calendar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    plan: {
        flex: 2,
        justifyContent: "start",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    component: {
        height: "15%",
        backgroundColor: "powerblue",
    },
    noplan: {},
});

export default CalendarScreenTabNavigator_Rider;
