import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTab from '../Components/BottomTab';
import AppButton from '../Components/AppButton';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import TopSearchBar from '../Components/TopSearchBar';
import { color } from '../Config/Color'
import { Marker } from 'react-native-maps';
import TopTab from '../Components/TopTab';
import SearchBar from '../Components/SearchBar';
import { Formik } from 'formik';
import { TextInput } from 'react-native';


const findCoordinatesFromLocationNames = (locationNames) => {

}



export default function DriverPutRoute() {
    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText('Some Text');
    }, []);
    return (
        <View style={styles.container}>
            <MapView style={styles.container}>
            </MapView>
            <TopTab>
                <Formik
                    initialValues={{ startLocation: "", endLocation: "" }}
                    onSubmit={(value) => console.log(value)}
                >
                    {
                        ({ handleChange, handleSubmit }) => (


                            <React.Fragment>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Start location"
                                    onChangeText={handleChange("startLocation")}
                                >

                                </TextInput>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="End location"
                                    onChangeText={handleChange("endLocation")}
                                >

                                </TextInput>
                                <AppButton
                                    title="Confirm"
                                    style={styles.confirmButtonStyle}
                                    onPress={(value) => { handleSubmit(value) }}
                                    textSize={14} >
                                </AppButton>


                            </React.Fragment>
                        )

                    }
                </Formik >
            </TopTab>


            <BottomTab>
                <AppButton style={styles.showRoute} title="Route" onPress={() => {
                    setRouteVisible(!routeVisible)
                    setButtonColor(buttonColor === color.primary ? color.secondary : color.primary)
                }} />
                <Marker draggable />
            </BottomTab>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill
    },
    showRoute: {
        position: 'absolute',
        bottom: 40,
        width: 200,
        right: 20
    },
    tab: {
        position: 'absolute',
        backgroundColor: color.lightGray,
        width: '100%',
        height: 200,
        bottom: 0
    },
    searchBar: {
        height: '5%',
        width: '60%',
        borderRadius: 20,
        backgroundColor: color.lightGray,
        borderColor: color.black,
        borderWidth: 2,
        padding: 15
    },
    confirmButtonStyle: {
        backgroundColor: color.primary,
        color: color.primary,
        height: 40,
        width: 100,
        borderRadius: 15,
        padding: 5
    },
    textInput: {
        backgroundColor: color.white,
        width: 250,
        height: 40,
        borderRadius: 10,
        margin: 4,
        padding: 5
    }
})