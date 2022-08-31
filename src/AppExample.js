import React, { Component } from "react";
import { Text, View, Button, Alert } from 'react-native';

class AppExample extends Component {

   constructor(props) {
      super(props);
      this.state = { isToggle: true };
   }

   render(props) {
      return (
         <View style={{ flex: 1, justifyContent: 'center', margin: 15 }}>
            <Button
               onPress={() => {
                  this.setState({ isToggle: !this.state.isToggle });
               }}
               title={
                  this.state.isToggle ? 'ONE' : "TWO"
               }
               color="green"
            />
         </View>
      );
   }
}
export default AppExample;