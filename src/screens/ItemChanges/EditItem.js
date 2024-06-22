/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'
import LinearGradient from 'react-native-linear-gradient'

export default function EditItem() {

    const data = {
        id:1,
        transferMoney: 100,
        image:require("../../assets/images/bin.png"),
        transferType:"Expense",
        category:"Vegetable",
        time: "10:00 PM",
        date:"22.02.2024",
        note:"Lorem Ipsum, the trusted companion of designers and typesetters",
    }
  return (
    <Screen>
        <View style={styles.container}>
            <View style={styles.upperItems}>
                <TouchableOpacity style={styles.backButtonStyle} >
                    <Image style={styles.backButtonImageStyle} source={require("../../assets/images/whitearrow.png")}/>
                </TouchableOpacity>
            </View>
            <View>
                <Image source={data.image} style={styles.binImage}/>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.upperContainer}>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <View style={styles.imageContainer}>
                            <Image source={require("../../assets/images/icons/fruits.png")} style={styles.imageStyle}/>
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.itemCategory}>{data.category}</Text>
                            <Text style={styles.itemDate}>{data.date}</Text>
                            <Text style={styles.itemTime}>at {data.time}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.moneyText, {
                            color: data.transferType === "Expense" ? "#EA0000" : "#009906",
                        }]}>₹{data.transferMoney}</Text>
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    <Text style={styles.noteText}>{data.note}</Text>
                </View>
            </View>
            <View style={{}}>
                <LinearGradient start={{x: 0.5, y: 1.0}} end={{x: 0.0, y: 0.25}} colors={['rgba(48, 82, 248, 1)', 'rgba(48, 82, 248, 1)', '#5B7FFF']} style={styles.incomeButton}>
                    <Image source={require("../../assets/images/icons/pen.png")} style={{width:13, aspectRatio:1, marginRight:10}}/>
                    <Text style={styles.incomeButtonText}>Edit</Text>
                </LinearGradient>
            </View>
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    incomeButton:{
        // width:"30%",
        padding:12,
        paddingHorizontal:25,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
        alignSelf:"center",
        marginTop:15,
        flexDirection:"row"
      },
      incomeButtonText:{
        fontFamily:"Century Gothic",
        fontSize: 16,
        color:"white",
      },
    noteText:{
        fontFamily:"Century Gothic",
        fontSize: 15,
        color:"rgba(0, 0, 0, 1)",
    },
    moneyText:{
        fontFamily:"Century Gothic",
        fontSize: 17,
        color:"rgba(0, 0, 0, 1)",
    },
    imageContainer:{
        backgroundColor:"rgba(48, 82, 248, 1)",
        padding:15,
        borderRadius:100,
    },
    dateTimeContainer:{
        marginLeft:15,
    },
    upperContainer:{
        flexDirection:"row"
    },
    lowerContainer:{
        backgroundColor:"rgba(255, 255, 255, 0.6)",
        padding:15,
        borderRadius:10,
        marginTop:15,
        paddingVertical:15,
    },
    itemCategory:{
        fontFamily:"Century Gothic",
        fontSize: 17,
        color:"rgba(0, 0, 0, 1)",
        marginBottom:5,
    },
    itemDate:{
        fontFamily:"Century Gothic",
        fontSize: 14,
        color:"rgba(0, 0, 0, 0.6)",
    },
    itemTime:{
        fontFamily:"Century Gothic",
        fontSize: 14,
        color:"rgba(0, 0, 0, 0.6)",
    },
    mainContainer:{
        backgroundColor:"rgba(91, 127, 255, 0.12)",
        borderRadius:10,
        padding:15,
        marginTop:45,
    },
    imageStyle:{
        width:30,
        height:30,
    },

    binImage:{
        width: 35,
        height:35,
        alignSelf:"flex-end",
        marginTop:5,
    },
    container:{
        marginHorizontal:30,
    },
    backButtonStyle:{
        backgroundColor:"rgba(48, 82, 248, 0.25)",
        height:40,
        width:40,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:20,
        marginTop:20,
    },
    backButtonImageStyle:{
        width:15,
        height:15,
        resizeMode:'contain',
    },
})