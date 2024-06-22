/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';

const HeaderBack = (props) => {
  return (
    <View style={styles.container} >
        <View style={styles.headerBackButton}>
            <TouchableOpacity style={styles.backButtonStyle} onPress={()=>props.navigation.goBack()} >
                <Image style={styles.backButtonImageStyle} source={require("../assets/images/whitearrow.png")}/>
            </TouchableOpacity>
        </View>
        <View style={styles.nameStyleContainer}>
            <Text style={styles.nameTextStyle}>{props.name}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 30,
        flexDirection:"row",
        alignItems:"center"
    },
    nameStyleContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:-40,
    },
    nameTextStyle:{
        fontFamily:"Century Gothic",
        fontSize: 15,
    },
    backButtonImageStyle:{
        width:15,
        height:15,
        resizeMode:'contain',
    },
    backButtonStyle:{
        backgroundColor:"rgba(48, 82, 248, 0.25)",
        height:40,
        width:40,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:20,
    },
})

export default HeaderBack;