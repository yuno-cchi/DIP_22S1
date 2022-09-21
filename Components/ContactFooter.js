import React from "react";
import { StyleSheet, View } from "react-native";
import ContactDriverModal from "./ModalTypes/ContactDriverModal";
import CancelRideModal from "./ModalTypes/CancelRideModal";
//changed
const ContactFooter = () => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.footerView}>
        <View style={styles.myFlexView}>
          <ContactDriverModal></ContactDriverModal>
          <CancelRideModal></CancelRideModal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "baseline",
    marginTop: 20,
  },
  footerView: {
    width: "100%",
    height: "25%",
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "baseline",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  myFlexView: {
    flex: 2,
    flexDirection: "row",
  },
});

export default ContactFooter;
