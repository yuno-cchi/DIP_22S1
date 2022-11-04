import React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { color } from "../Config/Color";
import AppText from "../Components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
//const GOOGLE_MAPS_APIKEY = "AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const GOOGLE_API_KEY = "AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88";
var dist;
export default function PlanList({
  start,
  destination,
  user,
  style,
  onPress,
  ...otherProps
}) {


  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const getPrice = (distance, duration) => {
    //Calculate price based on ditance and time
    var fare = 0;
    const distFactor = (50 / distance)
    const timeFactor = (duration / 30)
    fare = distFactor * timeFactor;
    return fare;
  }

  return (
    <TouchableOpacity style={{ marginVertical: 40 }} onPress={onPress}>
      <MapViewDirections
        style={{ flex: 0 }}
        origin={start}
        destination={destination}
        apikey={GOOGLE_API_KEY}
        onReady={result => {
          console.log(`Distance: ${result.distance} km`)
          console.log(`Duration: ${result.duration} min.`)
          setDistance(result.distance)
          setDuration(result.duration)
          setPrice("$" + Math.round(getPrice(result.distance, result.duration)))
          dist = result.distance;
          console.log("distance is ", dist)
        }}
      />
      <View style={[styles.card, style]} {...otherProps}>
        <View style={styles.wraptext}>
          <View style={styles.topcontainer}>
            <View style={styles.image}>
              {/* <Image source={require("./pic/pulse.png")} /> */}
              {/* <Image source={require("./pic/Arrow.png")} /> */}
            </View>
            <View style={styles.mylocation}>
              <AppText style={styles.title}>{String.fromCodePoint(128663) + start}</AppText>
              <AppText style={styles.title}>{String.fromCodePoint(128665) + destination}</AppText>
            </View>
          </View>
          {/* </View> */}
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />

          <View style={styles.botcontainer}>
            <AppText style={styles.subTitle}>{user}</AppText>
            <AppText style={styles.subTitle2}>
              {price}{/* Price calculation here */}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: color.lightGray,
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "75%",
  },
  title: {
    fontWeight: "500",
    marginTop: 2,
    marginLeft: 5,
    fontSize: 18
  },
  subTitle: {
    color: color.primary,
    fontWeight: "120",
    marginTop: 2,
    marginLeft: 5,
  },
  subTitle2: {
    color: color.secondary,
    fontWeight: "120",
    marginTop: 2,
    marginLeft: 5,
  },
  mapStyle: {
    height: "70%",
    width: "100%",
  },
  deleteButton: {
    height: 30,
    width: 30,
    position: "absolute",
    right: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wraptext: {
    paddingHorizontal: "5%",
  },
  topcontainer: {
    marginTop: 0,
    height: "80%",
  },
  botcontainer: {
    flexDirection: "row",
    height: "20%",
  },
  mylocation: {
    width: "100%",
    //flexDirection: "row",
    marginLeft: "auto",
  },
  image: {
    //flex: 1,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
