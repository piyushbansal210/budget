/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const CheckBox = (props) => {
  return (
    <TouchableOpacity onPress={()=>props.setCheck(!props.check)} style={[styles.container, props.check && { backgroundColor:"#3052F8" }]}>
        {
            props.check && <Image source={require("../assets/images/tick.png")} style={styles.tickImageStyle}/>
        }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    tickImageStyle:{
        width:15,
        height:15,
    },
    container:{
        borderWidth:1,
        borderColor:"#E1E1E1",
        width:20,
        height:20,
        alignItems:"center",
        justifyContent:"center"
    }
})

export default CheckBox;