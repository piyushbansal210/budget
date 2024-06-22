/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Alert, PermissionsAndroid, Platform, DeviceEventEmitter } from 'react-native';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();

    const requestSmsPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
            {
              title: "SMS Permission",
              message: "This app needs access to your SMS messages to show transaction notifications.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("SMS permission granted");
          } else {
            Alert.alert("SMS permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestSmsPermission();

    const subscription = DeviceEventEmitter.addListener('onSMSReceived', (message) => {
      const { messageBody, senderPhoneNumber } = message;
      const transactionKeywords = ["credited", "debited"];
      if (transactionKeywords.some(keyword => messageBody.toLowerCase().includes(keyword))) {
        const newMessage = { address: senderPhoneNumber, body: messageBody };
        AsyncStorage.getItem('messages').then(storedMessages => {
          const messages = storedMessages ? JSON.parse(storedMessages) : [];
          const updatedMessages = [...messages, newMessage];
          AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
          console.log("Message stored:", newMessage);
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}
