import React, { ReactNode, SyntheticEvent, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import data from "./calendarData.json";
import mydata from "./dayTripData.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlanList from "../Components/PlanList";
import { FlatList } from "react-native";
import { color } from "../Config/Color";
import axios from "axios";

const Stack = createNativeStackNavigator();
var dataLen = Object.keys(data).length;
var dayDataLen = Object.keys(mydata).length;
var selectedday;

//const axios = require("axios");
//let ridedata;
// This is the second configuration option
// const ridedata = async () => {
//   return await axios.get("http://secret-caverns-21869.herokuapp.com/drive");
// };
//let resp;
let ridedata;

// async function getdata() {
//   resp = await axios.get("http://secret-caverns-21869.herokuapp.com/drive");
// }

const resp = axios.get("http://secret-caverns-21869.herokuapp.com/drive");

function passindata(getdata) {
  ridedata = resp;
  return ridedata;
}

const CalendarNavigator = () => (
  <Stack.Navigator initialRouteName="CalendarScreen">
    <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    <Stack.Screen name="DayPlan" component={DayPlan} />
    {/* <Stack.Screen name="DayPlan" component={PlannedRouteDetails} /> */}
  </Stack.Navigator>
);

function DayPlan({ navigation }) {
  var displayPlan = [];
  // console.log("loop", Object.values(mydata)[i].date.slice(0, 10));
  console.log();
  let childkey = Object.values(mydata);

  for (let i = 0; i < dayDataLen; i++) {
    let thisRoute = Object.values(mydata)[i];
    if (
      Object.values(selectedday)[4] ==
      Object.values(mydata)[i].date.slice(0, 10)
    ) {
      displayPlan.push(
        <View>
          <PlanList
            title={thisRoute.date}
            keyExtractor={(thisRoute) => thisRoute.date}
            user="User"
            style={
              Object.values(mydata)[i].selected
                ? { backgroundColor: color.primary }
                : { backgroundColor: color.white }
            }
            //onPress={}
          />
        </View>
      );
    }

    if (!displayPlan) {
      displayPlan.push(
        <View>
          <Text>No data</Text>
        </View>
      );
    }
  }
  passindata;
  console.log("ride data !", resp);
  return (
    <View style={styles.plan}>
      <View style={styles.component}>{displayPlan}</View>
    </View>
  );
}

function MarkCalender() {
  for (let i = 0; i < dayDataLen; i++) {}
}

function CalendarScreen({ navigation }) {
  let today = new Date();
  let tryPlanning = new Date();
  tryPlanning.setMonth(tryPlanning.getMonth() + 1);

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
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={7}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={false}
        enableSwipeMonths={true}
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
        markedDates={data}
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
  },
  component: {
    height: "15%",
    backgroundColor: "powerblue",
  },
  noplan: {},
});

export default CalendarNavigator;
