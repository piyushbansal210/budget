/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import mobileAds from 'react-native-google-mobile-ads';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    mobileAds()
      .initialize()
      .then(() => {
        console.log('Mobile Ads SDK initialized');
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}
