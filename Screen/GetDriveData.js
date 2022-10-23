import axios from "axios";
import React from "react";

let drivedata;

async function axiosTest() {
  await axios
    .get("http://secret-caverns-21869.herokuapp.com/ride")
    .then(function (response) {
      console.log("my data!!!", response.data);
      drivedata = response.data;
    });
}

export function giveMeData() {
  axiosTest();

  return drivedata;
}

//export default axiosTest();
