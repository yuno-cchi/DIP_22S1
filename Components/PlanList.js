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
  title,
  user,
  onPress,
  style,
  ...otherProps
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, style]} {...otherProps}>
        <View style={styles.wraptext}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{user}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: color.lightGray,
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
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
    fontWeight: "150",
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
});
