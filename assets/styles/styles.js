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
 *  Last Updated 25/8 by Cris
 *  Changelog:
 * 
 *  25/8 - added button styling, changed some colors around to fit closer to Figma - Cris
 *  24/8 - Created file, added basic component styling based on current Figma - Cris
*/

import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        marginTop: "10%",
        //backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        width:"100%",
    },

    inputView: {
        marginTop:10,
        backgroundColor: "#ffcccc",
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center'
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },

    logoView: {
        width:200,
        height:300,
        marginBottom: 10,
    },

    textLinks: {
        fontSize: 15,
        marginBottom:5,
        alignContent: "center",
        justifyContent: "center",
    },
    
    buttonNormal: {
        backgroundColor: "#e76850",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonDisabled: {
        backgroundColor: "#e76850",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },

    buttonText: {
        marginTop:30,
        height:50,
        color:"#f5f5f5",
        alignContent: "center",
        justifyContent: "center",
    },

    errorText: {
        color:"#ff0000",
        fontStyle:'italic',
    }
})