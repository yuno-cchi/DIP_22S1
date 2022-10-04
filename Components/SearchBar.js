import { Formik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { TextInput, StyleSheet, Button } from "react-native";
import { color } from "../Config/Color";
import AppButton from "./AppButton";
import AppForm from "./Form/AppForm"
import AppFormField from "./Form/AppFormField"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function SearchBar({ style }) {
    return (
        /*
        <Formik
            initialValues={{ startLocation: "", endLocation: "" }}
            onSubmit={(value) => console.log(value)}
        >
            {
                ({ handleChange, handleSubmit }) => (

                    


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
        */
        <>
            <GooglePlacesAutocomplete
                styles={styles.googleTextBox}
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyBYDEKY12RzWyP0ACQEpgsr4up2w3CjH88',
                    language: 'en',
                }}
            />



        </>
    );
}

const styles = StyleSheet.create({
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
    },
    googleTextBox: {
        container: {
            width: 300,
            backgroundColor: 'black'
        },
        textInputContainer: {
            flexDirection: 'row',
        },
        textInput: {
            backgroundColor: '#FFFFFF',
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
        },
        poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
        },
        powered: {},
        listView: {},
        row: {
            backgroundColor: '#FFFFFF',
            padding: 13,
            height: 44,
            flexDirection: 'row',
        },
        separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
        },
        description: {},
        loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
        },
    },
    googleTextBox2: {
        container: {
            width: 300,
            backgroundColor: 'pink'
        },
        textInputContainer: {
            flexDirection: 'row',
        },
        textInput: {
            backgroundColor: '#FFFFFF',
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
        },
        poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
        },
        powered: {},
        listView: {},
        row: {
            backgroundColor: '#FFFFFF',
            padding: 13,
            height: 44,
            flexDirection: 'row',
        },
        separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
        },
        description: {},
        loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
        },
    }
})