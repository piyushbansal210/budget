/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import HeaderBack from '../../components/HeaderBack';

import CheckBox from '../../components/CheckBox';
import Screen from '../../components/Screen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default function Updates(props) {

    const [check, setCheck] = useState(false);

  return (
    <Screen>
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
            <View style={styles.headerStyle}>
                <HeaderBack name="Check Updates" navigation={props.navigation}/>
            </View>
            <ScrollView contentContainerStyle={styles.middleContainer}>
                <Image source={require("../../assets/images/updates.png")} style={styles.onboardImageStyle}/>
                <Text style={styles.header}>Check Updates</Text>
            </ScrollView>
            <View style={styles.bottomItems}>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Check For Updates  →</Text>
            </TouchableOpacity>
            </View>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    checkBoText:{
        flex:1,
        fontSize: 13,
        fontFamily:'Century Gothic',
        color:"rgba(0, 0, 0, 0.6)",
        marginTop:10,
        marginLeft:10,
    },
    header:{
        fontSize: 16,
        fontFamily:'Century Gothic',
        textAlign:"center",
        marginTop:10,
        color:"black"

    },
    subHeader:{
        fontSize: 16,
        fontFamily:'Century Gothic',
        textAlign:"center",
        width:DEVICE_WIDTH / 1.5,
        textAlign:"center",
        alignSelf:"center",
        marginTop:30,

    },
    checkBoxArea:{
        flexDirection:"row",
        alignItems:"center",
        width:DEVICE_WIDTH / 1.7,
        alignSelf:"center",
        marginTop:10,
    },
    onboardImageStyle:{
        height:DEVICE_HEIGHT / 4.0,
        aspectRatio:1,
        alignSelf:"center",
    },
    button: {
        backgroundColor: '#526FFC',
        padding: 15,
        borderRadius: 5,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily:'Century Gothic',
        textAlign:"center",
    },
    bottomItems:{
        justifyContent:"flex-end",
        paddingBottom:25,
        paddingHorizontal:20,
    },
    container:{
        flex:1,
    },
    headerStyle:{
        marginTop:15,
        marginBottom:10,
    },
    middleContainer:{
        flex:1,
        justifyContent:"center"
    },
});