/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default function AddItemComponenet() {
  return (
    <View style={styles.container}>

        <LinearGradient colors={['rgba(48, 82, 248, 1)', 'rgba(48, 82, 248, 1)', '#5B7FFF']} style={styles.containerComp}>
            <View style={styles.leftContainerMain}>
                <Text style={styles.hello}>ADD ITEM</Text>
                <Text style={styles.helloMessage}>Lorem Ipsum, the trusted companion of designers and typesetters</Text>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add +</Text>
                </View>
            </View>
            <View style={styles.rightContainerMain}>
                <Image style={styles.imageFox} source={require("../assets/images/Group.png")}/>
            </View>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"white",
        marginTop:25,
        width:"40%",
        paddingVertical:7,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:12,
        marginBottom:10,
    },
    buttonText:{
        fontFamily:"Century Gothic Bold",
        fontSize: 12,
        color:"rgba(72, 103, 255, 1)",

    },
    hello:{
        fontFamily:"Century Gothic Bold",
        fontSize: 25,
        textTransform:"uppercase",
        color:"white"
    },
    helloMessage:{
        fontFamily:"Century Gothic",
        fontSize: 14,
        // lineHeight:18,
        marginTop:15,
        // width:"80%",
        // lineHeight:20,
        color:"white"
      },
    imageFox:{
        // width:DEVICE_WIDTH / 4.5,
        position:"absolute",
        height:DEVICE_HEIGHT/4,
        resizeMode:"contain",
        // aspectRatio:1/2,
        // backgroundColor:"green",
        // marginRight:20,
        // marginTop:-40
    },
    leftContainerMain:{
        flex:1,
        // marginHorizontal:10,
        paddingVertical:20,
        marginLeft:20,
    },
    rightContainerMain:{
        // flex:1,
        backgroundColor:"red",
        alignItems:"flex-end"
    },
    containerComp:{
        flexDirection:"row",
        marginHorizontal:10,
        borderRadius:18,
        height:DEVICE_HEIGHT/4.5
    },
    container:{
        // width:"100%",
        // backgroundColor:"rgba(48, 82, 248, 0.2)",

        // height:
    }
})