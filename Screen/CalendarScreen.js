import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import data from "./calendarData.json";
import mydata from "./dayTripData.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlanList from "../Components/PlanList";
import { FlatList } from "react-native";
import { color } from "../Config/Color";
import axios from "axios";
import mydates from "./GetDriveData";
//import drivedata from "./GetDriveData";

const Stack = createNativeStackNavigator();
var dataLen = Object.keys(data).length;
var dayDataLen = Object.keys(mydata).length;
var selectedday;
let drivedata;

const CalendarNavigator = () => (
  <Stack.Navigator initialRouteName="CalendarScreen">
    <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    <Stack.Screen name="DayPlan" component={DayPlan} />
    {/* <Stack.Screen name="DayPlan" component={PlannedRouteDetails} /> */}
  </Stack.Navigator>
);

function DayPlan({ navigation }) {
  let displayPlan = [];
  const [forDisplay, setForDisplay] = useState();
  const [isLoading, setLoading] = useState(true);
  //axiosTest(displayPlan, selectedday);
  //console.log("can i get my dates?", mydates);

  useEffect(() => {
    axios
      .get("http://secret-caverns-21869.herokuapp.com/ride")
      .then((response) => {
        //console.log("resp", response.data.length);
        for (let i = 0; i < response.data.length; i++) {
          let thisRoute = response.data[i];
          console.log("this date?", response.data[i]);

          if (Object.values(selectedday)[4] === thisRoute.date.slice(0, 10)) {
            console.log("select", Object.values(selectedday)[4]);
            console.log("route ", thisRoute.date.slice(0, 10));
            displayPlan.push(
              <View>
                <PlanList
                  start={thisRoute.start.latitude}
                  destination={thisRoute.destination.latitude}
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
          //console.log("in display", displayPlan);
          setForDisplay(displayPlan);
          console.log("for display?", forDisplay);

          setTimeout(() => {
            setLoading(false);
          }, 300);
        }
      });
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
}

function CalendarScreen({ navigation }) {
  let today = new Date();
  let tryPlanning = new Date();
  tryPlanning.setMonth(tryPlanning.getMonth() + 1);

  const [isLoading, setLoading] = useState(true);
  const [getDates, setGetDates] = useState([]);

  useEffect(() => {
    let dateColect = new Set();

    axios
      .get("http://secret-caverns-21869.herokuapp.com/ride")
      .then((response) => {
        //console.log("resp", response.data.length);
        for (let i = 0; i < response.data.length; i++) {
          let thisRoute = response.data[i];
          let myDate = thisRoute.date.slice(0, 10);

          dateColect.add(myDate);
          console.log("this date?", dateColect);

          setTimeout(() => {
            setLoading(false);
          }, 300);
        }

        console.log(dateColect);
        let arr = Array.from(dateColect);
        //obj = Object.assign({arr}, "{'marked': true, 'selectedColor': 'blue'}");
        let obj = {};
        arr.forEach((elem, i) => {
          //obj[{${arr[i]}] = "{'marked': true, 'selectedColor': 'blue'}"
          obj[`${arr[i]}`] = { marked: true, selectedColor: "blue" };
        });

        console.log("dd", obj);

        setGetDates(obj);
      });
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
          navigation.push("DayPlan");
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
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
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

export default CalendarNavigator;
