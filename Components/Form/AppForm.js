import React from "react";

import { Formik } from "formik";


export default function AppForm({ initialValues, onSubmit, validationSchema, children }) {
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {() => (
                <>
                    {children}
                </>
            )}
        </Formik>
    );
}