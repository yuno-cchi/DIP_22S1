import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
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
import MapViewDirections from "react-native-maps-directions";
import { FontAwesome5 } from "@expo/vector-icons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DayPlan_test({ navigation, route }) {
  let displayPlan = [];
  let routeArray = [];
  const [forDisplay, setForDisplay] = useState();
  const [isLoading, setLoading] = useState(false);
  const [getDates, setGetDates] = useState([]);
  const [plan, setPlan] = useState([]);

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

              })
            }

          }
          setPlan(routeArray)

        });
    } catch (error) { }
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 40,
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
              navigation.pop();
            }}
          >
            <FontAwesome5 name={"backward"} size={24} color={"white"} />
          </TouchableOpacity>
        </View>

        <View style={{ height: windowHeight * 0.75, width: windowWidth, alignItems: 'center' }}>
          <FlatList
            data={plan}
            keyExtractor={item => item.key}
            renderItem={({ item }) =>

              <PlanList
                start={item.startName}
                destination={item.destinationName}
                key={item.key}
                user={item.routename}
                style={
                  item.selected
                    ? {
                      backgroundColor: color.selected,
                    }
                    : {
                      backgroundColor: color.white,
                    }
                }
                onPress={() => {
                  navigation.navigate("DrivingNavigationScreen", {
                    start: item.start,
                    destination: item.destination,
                    user: item.routename,
                    centroid: item.centroid
                  })
                }}
              />
            }

          />
          {/* <View style={styles.component}>{forDisplay}</View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  plan: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  component: {
    fontSize: 10,
    height: "15%",
    backgroundColor: "powerblue",
  },
  noplan: {},
});
