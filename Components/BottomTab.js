import React, { Children } from "react";
import { View, StyleSheet } from "react-native";
import { color } from "../Config/Color";

export default function BottomTab({ children, style }) {
  return <View style={[styles.tab, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  tab: {
    position: "absolute",
    backgroundColor: color.white,
    width: "100%",
    //height: 150,
    bottom: 0,
  },
});
