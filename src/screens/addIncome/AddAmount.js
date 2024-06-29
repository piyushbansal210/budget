/* eslint-disable dot-notation */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, Dimensions, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'

import LinearGradient from 'react-native-linear-gradient';
import Screen from '../../components/Screen';
import { setUserData } from '../../assets/asyncData/utils';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const AddAmount = (props) => {

  const navigateData = async () => {

    let data = props.route.params.data;
    data['salary'] = income;
    const result = await setUserData(data);
    if (result === 1) {
      props.navigation.navigate("Welcome")
    } else {
      console.error('Error saving user data.');
    }
  }

  const [income, setIncome] = useState(0);
  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
        <View style={styles.headerStyle}>
          <TouchableOpacity style={styles.backButtonStyle} onPress={() => props.navigation.goBack()} >
            <Image style={styles.backButtonImageStyle} source={require("../../assets/images/whitearrow.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.middleContainer}>
          <Image style={styles.mainImage} source={require("../../assets/images/addmoney.png")} />
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>{`add your income`}</Text>
            <Text style={styles.textSubTitle}>{`Money management is made simple, record credits and debits to see your relation with the money`}</Text>
          </View>

          <View style={styles.itemInputContainer}>
            <TextInput
              value={income}
              keyboardType="numeric"
              placeholder='ADD YOUR INCOME'
              placeholderTextColor={"black"}
              onChangeText={(text) => {
                setIncome(text)
              }}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <Pressable onPress={() => navigateData()} style={[styles.button]}>
            <Text style={styles.buttonText}>Get Started  →</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#526FFC',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    // marginHorizontal:30,
    marginBottom: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Century Gothic',
    textAlign: "center",
  },
  input: {
    fontFamily: "Century Gothic",
    fontSize: 14,
    textAlign: "center"
  },
  itemInputContainer: {
    backgroundColor: "#EFEFEF",
    width: DEVICE_WIDTH / 2,
    alignSelf: "center",
    marginTop: 30,
    padding: 0,
    borderRadius: 12,

  },
  textHeader: {
    fontFamily: "Century Gothic Bold",
    fontSize: 22,
    textTransform: "uppercase",
    marginTop: 10,
    color: 'black',

  },
  textSubTitle: {
    fontFamily: "Century Gothic",
    fontSize: 12,
    textTransform: "uppercase",
    textAlign: "center",
    marginHorizontal: 35,
    marginTop: 15,
    color: 'black',

  },
  textContainer: {
    alignItems: "center",
  },
  mainImage: {
    height: DEVICE_HEIGHT / 8,
    aspectRatio: 1,
    alignSelf: "center",
  },
  middleContainer: {
    flex: 1,
    marginTop: 20
  },
  headerStyle: {
    marginTop: 15,
    marginBottom: 10,
  },
  backButtonStyle: {
    backgroundColor: "rgba(48, 82, 248, 0.25)",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 20,
  },
  backButtonImageStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
})

export default AddAmount;