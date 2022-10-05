import React, { ReactNode, SyntheticEvent } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import data from "./calendarData.json";
import mydata from "./dayTripData.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlannedDayDetails from "./PlannedDayDetails.js";
import { render } from "react-dom";

const Stack = createNativeStackNavigator();
var dataLen = Object.keys(data).length;
var dayDataLen = Object.keys(mydata).length;

const CalendarNavigator = () => (
  <Stack.Navigator initialRouteName="CalendarScreen">
    <Stack.Screen name="CalendaScreen" component={CalendarScreen} />
    <Stack.Screen name="DayPlan" component={DayPlan} />
  </Stack.Navigator>
);

function DayPlan({ navigation }) {
  var displayPlan = [];

  for (let i = 0; i < dayDataLen; i++) {
    // console.log("i pushed");
    displayPlan.push(
      <View key={i}>
        <View>
          <Text>hello??</Text>
        </View>
      </View>
    );
  }
  return (
    <View>
      {/* <Text>hi</Text>
          <PlannedDayDetails />
          */}
      {displayPlan}
    </View>
  );
}

function CalendarScreen({ navigation }) {
  let today = new Date();
  let maxPlanning = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  return (
    <View style={styles.container}>
      <Calendar
        // Initially visible month. Default = now
        //initialDate={today}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={today}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={maxPlanning}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);

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
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        //renderArrow={(direction) => <Arrow />}
        // Do not show days of other months in month page. Default = false
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
        // Replace default month and year title with custom one. the function receive a date as parameter
        //renderHeader={calendarName}
        // Enable the option to swipe between months. Default = false
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
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    marginTop: 10,
  },
});

export default CalendarNavigator;

// var clientId =
//   "113946587053-a1njd8ctnjvesd9dpiltfod27n6lne33.apps.googleusercontent.com";
// var apiKey = "AIzaSyC1qtkugao3iiOT5X5wYLJznyv_7tFnNuw";
// var scope = "https://www.googleapis.com/auth/calendar";

// event handler
// {
//     day: 1,      // day of month (1-31)
//     month: 1,    // month of year (1-12)
//     year: 2017,  // year
//     timestamp,   // UTC timestamp representing 00:00 AM of this date
//     dateString: '2016-05-13' // date formatted as 'YYYY-MM-DD' string
//   }
