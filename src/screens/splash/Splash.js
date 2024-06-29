/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import { View, Text, StatusBar, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../../components/Screen';
import { getUserData } from '../../assets/asyncData/utils';
import { USER } from '../../assets/asyncData/keys';
import { CommonActions } from '@react-navigation/native';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const Splash = ({ navigation }) => {

  const getUserDt = async () => {
    try {
      const result = await getUserData(USER);
      if (result !== null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'BottomTab' }],
          })
        );
      }
      else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          })
        );
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getUserDt();
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
        <View style={styles.mainContainer}>
          <Image source={require("../../assets/images/foxLogo.png")} style={styles.logoImageStyle} />
          <Text style={styles.logoTextStyle}>spend sync</Text>
          <Text style={styles.logoTextDescStyle}>Your virtual monetary manager to track the expenses in one place for optimal spending</Text>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignItems: "center",
    width: DEVICE_WIDTH / 1.5,
  },
  logoTextStyle: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 32,
    marginTop: 15,
    color: 'black',

  },
  logoTextDescStyle: {
    textAlign: 'center',
    fontFamily: "Century Gothic",
    marginTop: 6,
    color: 'black',

  },
  logoImageStyle: {
    height: DEVICE_HEIGHT / 5,
    width: DEVICE_WIDTH / 4,
    resizeMode: "contain",
    shadowColor: '#ccc',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
})

export default Splash;
