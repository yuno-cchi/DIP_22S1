import React, {
    ReactNode,
    SyntheticEvent,
    useEffect,
    useState,
    useRef,
} from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import data from "./calendarData.json";
import mydata from "./dayTripData.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlanList from "../Components/PlanList";
import { FlatList } from "react-native";
import { color } from "../Config/Color";
import axios from "axios";
import mydates from "./GetDriveData";
import RiderMapScreen from "./RiderMapScreen";
import DriverPutRouteScreen from "./DriverPutRouteScreen";
import DriverPutRouteScreen_Android from "./DriverPutRouteScreen_Android";
import RiderMapScreen_android from "./RiderMapScreen_android";
import * as Notifications from "expo-notifications";
import AppButton from "../Components/AppButton";
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { ImageBackground } from "react-native";

//import drivedata from "./GetDriveData";

var dataLen = Object.keys(data).length;
var dayDataLen = Object.keys(mydata).length;
var selectedday;
let drivedata;
var userParams = null;

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

const CalendarScreenTabNavigator_Rider = ({ navigation, route }) => {
    const Tab = createBottomTabNavigator();
    userParams = route.params;
    return (
        <Tab.Navigator
            initialRouteName="Calendar"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: color.primary,
            }}
        >
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="calendar-alt" color={color} size={size} />
                    ),

                }} />
            <Tab.Screen
                name="RiderMap"
                component={Platform.OS === "ios" ? RiderMapScreen : RiderMapScreen_android}
                options={{
                    tabBarLabel: 'RiderMap',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="map-marked-alt" color={color} size={size} />
                    ),
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    );
};

function CalendarScreen({ navigation, route }) {
    let today = new Date();
    let tryPlanning = new Date();
    tryPlanning.setMonth(tryPlanning.getMonth() + 1);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [isLoading, setLoading] = useState(true);
    const [getDates, setGetDates] = useState([]);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        // const userID = AsyncStorage.getItem("userId")
        let dateColect = new Set();
        let returnRouteObjectArray = [];
        console.log("userID is ", userParams.userID);
        axios
            .get("http://secret-caverns-21869.herokuapp.com/ride")
            .then((response) => {
                console.log("Response length: ", response.data.length);
                console.log("Response data: ", response.data);
                for (let i = 0; i < response.data.length; i++) {
                    let thisRoute = response.data[i];
                    console.log("Compare id: ", response.data[i].routename, " with ", userParams.userID)
                    if (response.data[i].routename === userParams.userID) {
                        let tempDate = new Date(thisRoute.date[i])
                        dateColect.add(response.data[i].date.slice(0, 10));
                        console.log("Add data[", i, "]")
                        if (response.data[i].selected === true) {
                            schedulePushNotification(getTimeString(response.data[i].date));
                        }

                    }
                    //setDbDates()
                    //has to use [4] to get date string
                    console.log("this date?", response.data[i]);

                    setTimeout(() => {
                        setLoading(false);
                    }, 300);
                }

                console.log("Collected data:", dateColect);
                let arr = Array.from(dateColect);
                //obj = Object.assign({arr}, "{'marked': true, 'selectedColor': 'blue'}");
                obj = {};
                arr.forEach((elem, i) => {
                    //obj[{${arr[i]}] = "{'marked': true, 'selectedColor': 'blue'}"

                    obj[`${arr[i]}`] = { marked: true, selectedColor: "red" };

                });
                // let tempMarkedDate = []
                // for (let i = 0; i < dateColect.length; i++) {
                //     tempMarkedDate.push({
                //         dateColect: { marked: true, selectedColor: 'red' }
                //     })
                // }
                console.log("dd", obj);
                let addedarr = [];

                setGetDates(obj);
            });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            setLoading(false);
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
                    alignItems: "center",
                }}
            >


                <ActivityIndicator size="large" color={color.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{
                position: 'absolute',
                top: 60,
                left: 10,
                width: 40,
                height: 40,
                backgroundColor: color.primary,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
            }}
                onPress={() => {
                    console.log("Logging out")
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                    /*CheeHean!*/
                }}
            >
                <FontAwesome5 name="sign-out-alt" size={25} color={'white'} />
            </TouchableOpacity>
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
                    textSectionTitleDisabledColor: "#ff0000",
                    selectedDayBackgroundColor: "#f50000",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#ff0000",
                    dayTextColor: "#2d4150",
                    textDisabledColor: "#d9e1e8",
                    dotColor: "#ff0000",
                    selectedDotColor: "#ffffff",
                    arrowColor: "orange",
                    disabledArrowColor: "#d9e1e8",
                    monthTextColor: "red",
                    indicatorColor: "orange",
                    textDayFontWeight: "400",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "700",
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
        backgroundColor: color.white
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
