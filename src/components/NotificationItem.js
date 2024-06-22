/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, StatusBar, StyleSheet,Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const NotificationItem = (props) => {
    const {id, message, image} = props.data;

    const moveToAddItem = () => {
        props.navigation.navigate("AddItem");
    }
  return (
    <LinearGradient colors={['rgba(48, 82, 248, 0.15)','rgba(91, 127, 255, 0.15)' ]}  style={[styles.container, props.length === id ? {marginBottom:40} : {marginBottom:20}]}>
        <View style={styles.upperContainer}>
            {
                image !==  "" ? <Image style={styles.image} source={image}/> :
                <View style={styles.image}/>

            }
            <View style={styles.rightContainer}>
                <Text  style={styles.message} numberOfLines={4}>{message}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.discard} onPress={()=>console.log("pressed discard")}>
                        <Text style={styles.discardText}>Discard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>moveToAddItem()} style={styles.accept}>
                        <LinearGradient colors={['rgba(48, 82, 248, 1)', 'rgba(48, 82, 248, 1)', '#5B7FFF']} style={styles.lgaccept}>
                                <Text style={styles.acceptText}>Keep</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    discardText:{
        fontFamily:"Century Gothic",
        fontSize: 14,
        color:"#3052F8",
    },
    acceptText:{
        fontFamily:"Century Gothic",
        fontSize: 14,
        color:"#ffffff",

    },
    discard:{
        backgroundColor:'white',
        width:"47%",
        paddingVertical:10,
        alignItems:"center",
        borderRadius:10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    accept:{
        // backgroundColor:'red',
        width:"47%",
        borderRadius:10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    lgaccept:{
        flex:1,
        width:"100%",
        paddingVertical:10,
        alignItems:"center",
        borderRadius:10,
    },
    buttonsContainer:{
        flexDirection:"row",
        // backgroundColor:"purple",
        marginTop:15,
        justifyContent:"space-between",
    },
    message:{
        flex:1,
        fontFamily:"Inter-Light",
        fontSize:14
    },
    rightContainer:{
        marginHorizontal:15,
        flex:1
    },
    container:{
        marginHorizontal:30,
        // backgroundColor:"orange",
        padding:20,
        borderRadius:20,
        // opacity:0.2
    },
    image:{
        width:44,
        height:44,
        backgroundColor:"white",
        // resizeMode:"contain",
        borderRadius:50,
    },
    upperContainer:{
        flexDirection:"row",
        zIndex:999,
    }
})

export default NotificationItem;