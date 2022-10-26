import React from "react";
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

//const GOOGLE_MAPS_APIKEY = "AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PlanList({
  start,
  destination,
  user,
  style,
  price,
  onPress,
  ...otherProps
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, style]} {...otherProps}>
        <View style={styles.wraptext}>
          <View style={styles.topcontainer}>
            <View style={styles.image}>
              {/* <Image source={require("./pic/pulse.png")} /> */}
              {/* <Image source={require("./pic/Arrow.png")} /> */}
            </View>
            <View style={styles.mylocation}>
              <AppText style={styles.title}>{start}</AppText>
              <AppText style={styles.title}>{destination}</AppText>
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
            <AppText style={[styles.subTitle, { marginLeft: "auto" }]}>
              {price}
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
    height: windowHeight * 0.18,
    marginTop: 15,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "75%",
  },
  title: {
    fontWeight: "200",
    marginTop: 5,
    marginLeft: 5,
  },
  subTitle: {
    color: color.green,
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
    padding: "5%",
  },
  topcontainer: {
    height: "80%",
  },
  botcontainer: {
    flexDirection: "row",
    height: "20%",
  },
  mylocation: {
    width: "85%",
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
