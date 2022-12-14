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
*/

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    container: {
        marginTop: "20%",
        //backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    
    inputView: {
        marginTop: 10,
        backgroundColor: "#ffcccc",
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },
    
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },
    
    logoView: {
        width: 400,
        height: 200,
        marginBottom: 10,
    },
    
    textLinks: {
        fontSize: 15,
        marginBottom: 5,
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
    
    iconButtonBig: {
        //backgroundColor: "#e76850", //debug
        width: 150,
        height: 180,
        marginLeft: 20,
        marginRight: 20,
    },
    
    iconButtonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
    },
    
    buttonIcon: {
        height: 100,
        width: 100,
        marginTop: 10,
        marginLeft: 25,
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
        marginTop: 30,
        height: 50,
        color: "#f5f5f5",
        alignContent: "center",
        justifyContent: "center",
    },
    
    errorText: {
        color: "#ff0000",
        fontStyle: 'italic',
    }
})