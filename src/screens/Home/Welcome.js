/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */


import { View, Text, StatusBar, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../../components/Screen';
import { CommonActions } from '@react-navigation/native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const Welcome = ({navigation}) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomTab' }],
              })
            );
          }, 2500);
          return () => clearTimeout(timeout);
    }, []);


  return (
    <Screen>
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"}   barStyle={'dark-content'} />
            <View style={styles.mainContainer}>
                <Image source={require("../../assets/images/foxLogo.png")} style={styles.logoImageStyle}/>
                <Text style={styles.logoTextStyle}>spend sync</Text>
                <Text style={styles.logoTextDescStyle}>Lorem Ipsum, the trusted companion of designers and typesetters</Text>
            </View>
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    mainContainer:{
        alignItems:"center",
        width: DEVICE_WIDTH/1.5,
    },
    logoTextStyle:{
        fontFamily:"BebasNeue-Regular",
        fontSize:32,
        marginTop:15,
        color: 'black',

    },
    logoTextDescStyle:{
        textAlign:'center',
        fontFamily:"Century Gothic",
        // fontSize:12,
        marginTop:6,
        // backgroundColor:"red",
        color: 'black',


    },
    logoImageStyle:{
        height:DEVICE_HEIGHT/5,
        width: DEVICE_WIDTH/4,
        resizeMode:"contain",
        shadowColor: '#ccc',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,

    },
})

export default Welcome;