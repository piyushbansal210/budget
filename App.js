/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Alert, PermissionsAndroid, Platform, DeviceEventEmitter } from 'react-native';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}
