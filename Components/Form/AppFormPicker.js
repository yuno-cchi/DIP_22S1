import React from "react";
import { View, StyleSheet } from "react-native";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import PickerItem from "../PickerItem";


export default function AppFormPicker({ icon, items, placeholder = 'Hey', style, numberOfColumns, name, PickItemComponent = PickerItem }) {

    const { setFieldValue, errors, values, touched } = useFormikContext();

    return (
        <>
            <View style={[styles.container, style]}>
                <AppPicker
                    numberOfColumns={numberOfColumns}
                    items={items}
                    icon={icon}
                    PickItemComponent={PickItemComponent}
                    placeholder={placeholder}
                    selecedtItem={values[name]}
                    onSelectItem={(item) => setFieldValue(name, item)}>

                </AppPicker>
                {touched[name] && <ErrorMessage error={errors[name]} />}
            </View>

        </>

    );
}
const styles = StyleSheet.create({
    container: {
        height: 30,
        width: '100%'
    }
})