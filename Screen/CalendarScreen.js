import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CalendarScreen() {
    return (
        <View></View>
    );
<<<<<<< Updated upstream
=======
  }
  return (
    <View style={styles.plan}>
      {/* <Text>hi</Text>
          <PlannedDayDetails />
          */}
      {displayPlan}
    </View>
  );
}

function CalendarScreen({ navigation }) {
  let today = new Date();
  let maxPlanning = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  return (
    <View style={styles.container}>
      <Calendar
        // Initially visible month. Default = now
        //initialDate={today}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={today}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={maxPlanning}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);

          navigation.push("DayPlan");
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
          console.log(data);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        //renderArrow={(direction) => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={7}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={false}
        // Replace default month and year title with custom one. the function receive a date as parameter
        //renderHeader={calendarName}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
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
        markedDates={data}
        markingType={"period"}
      ></Calendar>
    </View>
  );
>>>>>>> Stashed changes
}

const styles = StyleSheet.create({
    container: {
    }
})