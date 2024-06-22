/* eslint-disable dot-notation */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient';
import Screen from '../../components/Screen';


import { setUserData } from '../../assets/asyncData/utils';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const AddMoney = (props) => {

    const navigateData = async () => {
        let data = props.route.params;
        data['salary'] = "";
        const result = await setUserData(data);
        if (result === 1) {
            props.navigation.navigate("Welcome")
        } else {
            console.error('Error saving user data.');
        }
    }
  return (
    <Screen>
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"}   barStyle={'dark-content'} />

            <View style={styles.headerStyle}>
                <Pressable style={styles.backButtonStyle} onPress={()=> props.navigation.goBack()}>
                    <Image style={styles.backButtonImageStyle} source={require("../../assets/images/whitearrow.png")}/>
                </Pressable>
            </View>
            <View style={styles.middleContainer}>
                <Image  style={styles.mainImage} source={require("../../assets/images/addmoney.png")}/>
                <View style={styles.textContainer}>
                    <Text style={styles.textHeader}>{`add your income`}</Text>
                    <Text style={styles.textSubTitle}>{`Lorem Ipsum, the trusted companion of designers and typesetters`}</Text>
                </View>
            </View>

            <View style={{ flexDirection:"row",  marginBottom:15}}>
                    <Pressable onPress={()=>props.navigation.navigate("AddAmount", {
                        data : props.route.params,
                    })} style={{paddingVertical:10, flex:1}}>
                        <LinearGradient colors={['rgba(48, 82, 248, 1)', 'rgba(48, 82, 248, 1)', '#5B7FFF']} style={{ marginRight: 10,backgroundColor:"rgba(48, 82, 248, 1)" , paddingVertical:12, borderRadius:10, alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.idStyle}>{`Add`}</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable onPress={()=>navigateData()} style={{paddingVertical:10, flex:1}}>
                        <LinearGradient colors={['rgba(48, 82, 248, 1)', 'rgba(48, 82, 248, 1)', '#5B7FFF']} style={{ marginLeft: 10,backgroundColor: "rgba(48, 82, 248, 0.3)", paddingVertical:12, borderRadius:10, alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.idStyle}>{`Skip Now >>`}</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    textHeader:{
        fontFamily:"Century Gothic Bold",
        fontSize:25,
        textTransform:"uppercase",
        marginTop:40,
        color: 'black',

    },
    textSubTitle:{
        fontFamily:"Century Gothic",
        fontSize:12,
        textTransform:"uppercase",
        textAlign:"center",
        marginHorizontal:35,
        marginTop:15,
        color: 'black',

    },
    textContainer:{
        alignItems:"center",
    },
    idStyle:{
        fontFamily:"Century Gothic",
        fontSize:16,
        color:"white",
    },
    tagStyleBox:{
        flex:1
    },
    bottomContainer:{
        flexDirection:"row",
    },
    middleContainer:{
        flex:1,
        justifyContent:"center",
    },
    mainImage:{
        height:DEVICE_HEIGHT / 4,
        aspectRatio:1,
        alignSelf:"center",
        marginTop:-50,
    },
    container:{
        flex:1,
        marginHorizontal:30,
    },
    backButtonStyle:{
        backgroundColor:"rgba(48, 82, 248, 0.25)",
        height:40,
        width:40,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:20,
    },
    backButtonImageStyle:{
        width:15,
        height:15,
        resizeMode:'contain',
    },
    headerStyle:{
        marginTop:15,
        marginBottom:10,
    },

})

export default AddMoney