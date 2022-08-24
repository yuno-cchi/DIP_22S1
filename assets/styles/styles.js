/*
 *  ~/assets/styles/styles.js
 *
 *  general purpose StyleSheet import for most of our components
 *  to be used via
 * 
 *      import styles from '../assets/styles/styles.js';
 * 
 *  in the beginning of your file
 * 
 *  Last Updated 24/8 by Cris
 *  Changelog:
 *  24/8 - Created file, added basic component styling based on current Figma - Cris
*/

import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fcf8e8",
        justifyContent: "center",
        alignItems: "center"
    },

    inputView: {
        backgroundColor: "#e76850",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: 'center'
    },

    TextInput: {
        height: 50,
        flex: 1,
    },

    logoView: {
        width:200,
        height:300,
        marginBottom: 10,
    }
})