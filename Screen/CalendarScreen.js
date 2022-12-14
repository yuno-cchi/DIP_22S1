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
//import drivedata from "./GetDriveData";


var dataLen = Object.keys(data).length;
var dayDataLen = Object.keys(mydata).length;
var selectedday;
let drivedata;

async function axiosTest(displayPlan, selectedday) {
  await axios
    .get("http://secret-caverns-21869.herokuapp.com/ride")
    .then(function (response) {
      for (let i = 0; i < dayDataLen; i++) {
        let thisRoute = response.data[i];
        console.log("selected date", Object.values(selectedday)[4]);
        //has to use [4] to get date string
        if (Object.values(selectedday)[4] == thisRoute.date.slice(0, 10)) {
          console.log("display in loop ", thisRoute.routename);

          displayPlan.push(
            <View>
              <PlanList
                title={thisRoute.date}
                key={thisRoute.routename}
                user={thisRoute.routename}
              //style={thisRoute.selected}
              />
            </View>
          );
        }

        //console.log("in display", displayPlan);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// const CalendarNavigator = () => (
//   <Stack.Navigator initialRouteName="CalendarScreen">
//     <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
//     <Stack.Screen name="DayPlan" component={DayPlan} />
//     {/* <Stack.Screen name="DayPlan" component={PlannedRouteDetails} /> */}
//   </Stack.Navigator>
// );

function DayPlan({ navigation }) {
  let displayPlan = [];
  const [forDisplay, setForDisplay] = useState();
  const [isLoading, setLoading] = useState(true);
  //axiosTest(displayPlan, selectedday);
  console.log("can i get my dates?", mydates);


  //set to store date no duplicate


  //object array for post process


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
          //console.log("in display", displayPlan);
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

function MarkCalender() {
  for (let i = 0; i < dayDataLen; i++) { }
}

const PutRouteScreenSelector = (route) => {


  console.log(route.params.userType)

  if (Platform.OS === 'ios') {
    if (route.params.userType === 'rider') {
      return RiderMapScreen
    } else {
      return DriverPutRouteScreen
    }
  }
  else {
    if (route.params.userType === 'rider') {
      return RiderMapScreen_android
    } else {
      return DriverPutRouteScreen_Android
    }
  }

}

const CalendarScreenTabNavigator = ({ navigation, route }) => {
  const Tab = createBottomTabNavigator();
  if (route === undefined) {
    route.params.userType = 'rider' //Set default
  }

  return (
    <Tab.Navigator initialRouteName="Calendar">
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="PutRouteScreen" >
        {() => <PutRouteScreenSelector route={route} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

function CalendarScreen({ navigation, route }) {
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

          dateColect.add(thisRoute.date.slice(0, 10));

          //setDbDates()
          //has to use [4] to get date string
          console.log("this date?", response.data[i]);


          setTimeout(() => {
            setLoading(false);
          }, 300);
        }

        console.log(dateColect);
        let arr = Array.from(dateColect);
        //obj = Object.assign({arr}, "{'marked': true, 'selectedColor': 'blue'}");
        obj = {};
        arr.forEach((elem, i) => {
          //obj[{${arr[i]}] = "{'marked': true, 'selectedColor': 'blue'}" 
          obj[`${arr[i]}`] = { 'marked': true, 'selectedColor': 'blue' }
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

export default CalendarScreenTabNavigator;
