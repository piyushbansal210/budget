/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



const FAQItem = (props) => {
  const {question, answer, id} = props.data;
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <View style={[styles.container,{
        marginBottom: props.length === id? 60: 20,
    }]}>
        <View style={{backgroundColor:"orange", marginHorizontal: 20, borderRadius: 10, backgroundColor:"#EFEFEF"}}>
            <TouchableOpacity style={[styles.itemContainer, showAnswer && {margin:1}]} onPress={()=>setShowAnswer(true)}>
                <LinearGradient colors={['rgba(48, 82, 248, 1)', 'rgba(48, 82, 248, 1)', '#5B7FFF']} style={styles.tagStyleBox}>
                    <Text style={styles.idStyle}>{id}</Text>
                </LinearGradient>
                <Text style={styles.buttonTextStyle}>{question}</Text>
                <View style={[styles.arrowRightStyle, {opacity: showAnswer? 0.3: 1}]}>
                    <Image  source={require("../assets/images/plus.png")} style={styles.addImageButtonStyle}/>
                </View>
            </TouchableOpacity>
            {
                showAnswer && <View style={[styles.answerContainer,{
                    borderTopLeftRadius: showAnswer? 0:10,
                    borderTopRightRadius: showAnswer? 0:10,
                }]}>
                    <Text style={styles.answer}>{answer}</Text>
                    <Pressable  style={[styles.arrowRightStyle, {marginTop:3}]} onPress={()=>setShowAnswer(false)}>
                        <Image  source={require("../assets/images/minus.png")} style={styles.addImageButtonStyle}/>
                    </Pressable>
                </View>
            }
        </View>
        
        
    </View>
  );
};

const styles = StyleSheet.create({
    addImageButtonStyle:{
        width: 10,
        height:10, 
        resizeMode:"contain",
        margin:3,
    },
    answer:{
        flex:1,
        fontFamily:"Century Gothic",
        fontSize: 14,
        marginHorizontal:10,

    },
    container:{
        marginBottom: 20,
        
    },
    
    answerContainer:{
        backgroundColor:"#EFEFEF",
        // backgroundColor:"red",
        // marginHorizontal:30,
        borderRadius: 10,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:9,
        paddingVertical:14,
        alignItems:"flex-start",
    },
    itemContainer:{
        backgroundColor:"#FAFAFA",
        // backgroundColor:"green",
        // marginHorizontal:30,
        
        borderRadius: 10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:9,
        paddingVertical:10,
    } ,
    idStyle:{
        color:"white",
        fontFamily:"Century Gothic",
        fontSize: 12,
    },
    buttonTextStyle:{
        flex:1,
        fontFamily:"Century Gothic",
        fontSize: 14,
        marginHorizontal:10,
    },
    arrowRightStyle:{
        
        backgroundColor:"#3052F8",
        borderRadius: 2,
    },
    tagStyleBox:{
        backgroundColor:"red",
        padding:10,
        borderRadius: 10,

    }
});

export default FAQItem;
