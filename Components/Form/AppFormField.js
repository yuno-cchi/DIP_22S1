import React from "react";


import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";

import ErrorMessage from "./ErrorMessage";
import { color } from "../../Config/Color";




export default function AppFormField({ name, ...otherProps }) {
    //get Object from parent
    const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
    return (
        <React.Fragment>
            <AppTextInput
                placeholderTextColor={color.mediumGray}
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                {...otherProps}
            />
            {touched[name] && <ErrorMessage error={errors[name]} />}
        </React.Fragment>
    );
}