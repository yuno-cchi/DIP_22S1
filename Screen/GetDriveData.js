import axios from "axios";
import React from "react";

const mydates=new Set();

function GetDriveData(){

  let mydates;
  useEffect(() => {
    axios
      .get("http://secret-caverns-21869.herokuapp.com/ride")
      .then((response) => {
        //console.log("resp", response.data.length);
        for (let i = 0; i < response.data.length; i++) {
          let thisRoute = response.data[i];
          mydates.add(thisRoute.date.slice(0, 10));

          //has to use [4] to get date string
          console.log("this date?", mydates);

          // setTimeout(() => {
          //   setLoading(false);
          // }, 300);
        }


      });
  }, []);


}


// export default mydates;

