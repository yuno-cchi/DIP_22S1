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
//import PlannedDayDetails from "./PlannedDayDetails.js";
//import { render } from "react-dom";

const Stack = createNativeStackNavigator();
var dataLen = Object.keys(data).length;
var dayDataLen = Object.keys(mydata).length;
var selectedday;

const CalendarNavigator = () => (
  <Stack.Navigator initialRouteName="CalendarScreen">
    <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    <Stack.Screen name="DayPlan" component={DayPlan} />
  </Stack.Navigator>
);

function DayPlan({ navigation }) {
  var displayPlan = [];

  for (let i = 0; i < dayDataLen; i++) {
    console.log("loop", Object.values(mydata)[i].date.slice(0, 10));
    let thisRoute = Object.values(mydata)[i];
    if (
      Object.values(selectedday)[4] ==
      Object.values(mydata)[i].date.slice(0, 10)
    ) {
      displayPlan.push(
        <View>
          <PlanList
            title={thisRoute.date}
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
  }
  console.log("display?", displayPlan);
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
  let maxPlanning = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  //const [pickday, setPickday] = useState(0);
  return (
    <View style={styles.container}>
      <Calendar
        minDate={today}
        maxDate={maxPlanning}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          //setPickday(day);
          selectedday = day;
          console.log("my picked date in the functionm", selectedday);
          navigation.push("DayPlan");
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
          console.log(data);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
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
    //margin: 10,
  },
  component: {
    height: "15%",
    backgroundColor: "powerblue",
  },
});

export default CalendarNavigator;
