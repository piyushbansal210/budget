/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Screen from '../../components/Screen';
import LinearGradient from 'react-native-linear-gradient';
import AddItemComponenet from '../../components/AddItemComponenet';
import { USER } from '../../assets/asyncData/keys';
import { getAddItem, getUserData } from '../../assets/asyncData/utils';
import Loader from '../../components/Loader';
import { useFocusEffect } from '@react-navigation/native';
import TransactionsDisplay from '../../components/TransactionsDisplay';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : Platform.OS==="ios"?'ca-app-pub-5520896784082974/3534901110': 'ca-app-pub-5520896784082974/4552469312';
const bannerAdUnitId = __DEV__ ? TestIds.BANNER :  Platform.OS==="ios"?'ca-app-pub-5520896784082974/4391653372': 'ca-app-pub-5520896784082974/5682336704';

export default function Home(props) {
  const [date, setDate] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [salary, setSalary] = useState('');
  const [transactions, setTransactions] = useState([]);
  const interstitial = useRef(InterstitialAd.createForAdRequest(interstitialAdUnitId));
  const [loaded, setLoaded] = useState(false);
  const [isBannerAdLoaded, setIsBannerAdLoaded] = useState(false);

  function dateSetter() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const dates = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${dates}-${month}-${year}`;
    setDate(formattedDate);
  }

  function addItem() {
    props.navigation.navigate('AddItem');
  }

  const getUserDt = async () => {
    setLoading(true);
    try {
      const result = await getUserData(USER);
      setUserName(result.name);
      setSalary(result.salary);
      setLoading(false);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      setLoading(false);
    }
  };

  const getTransactions = async () => {
    setLoading(true);
    try {
      const result = await getAddItem();
      setTransactions(result);
      setLoading(false);
    } catch (err) {
      console.error('Error retrieving user data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    dateSetter();
    const unsubscribe = interstitial.current.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const closeListener = interstitial.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        loadAd();
      },
    );

    loadAd();

    return () => {
      unsubscribe();
      closeListener();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserDt();
      getTransactions();
    }, []),
  );

  useEffect(() => {
    if (loaded) {
      const adInterval = setInterval(showAd, 0.75* 60 * 1000); // Show ad every 2 minutes
      return () => clearInterval(adInterval);
    }
  }, [loaded]);

  const loadAd = () => {
    interstitial.current.load();
  };

  const showAd = () => {
    if (loaded) {
      interstitial.current.show();
      setLoaded(false);
    } else {
      loadAd();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        {isBannerAdLoaded && (
          <View style={styles.adContainer}>
            <BannerAd
              unitId={bannerAdUnitId}
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                console.log('Banner ad loaded successfully');
                setIsBannerAdLoaded(true);
              }}
              onAdFailedToLoad={(error) => {
                console.error('Banner ad failed to load: ', error);
                setIsBannerAdLoaded(false);
              }}
            />
          </View>
        )}
        
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}>
          <View>
            <View style={styles.userHeader}>
              <View style={{ width: "50%", alignItems: "flex-end" }}>
                <Text numberOfLines={1} style={styles.username}>{userName}</Text>
                <Text style={styles.username}>{date}</Text>
              </View>
              <LinearGradient
                colors={[
                  'rgba(48, 82, 248, 1)',
                  'rgba(48, 82, 248, 1)',
                  '#5B7FFF',
                ]}
                style={styles.linearUserPic}>
                <Image
                  source={require('../../assets/images/userprofile.png')}
                  style={styles.userPicStyle}
                />
              </LinearGradient>
            </View>
          </View>
          <View style={styles.helloContainer}>
            <Text style={styles.hello}>Howdy!</Text>
            <Text style={styles.helloMessage}>
              Let’s Manage your budget today so you don’t go overboard
            </Text>
          </View>
          <View style={{ marginHorizontal: 15, marginTop: 50 }}>
            <LinearGradient
              colors={[
                'rgba(48, 82, 248, 1)',
                'rgba(48, 82, 248, 1)',
                '#5B7FFF',
              ]}
              style={styles.containerComp}>
              <View style={styles.leftContainerMainAdd}>
                <Text style={styles.helloAdd}>ADD ITEM</Text>
                <Text style={styles.helloMessageAdd}>
                  Earned something Good or Spent on Something Valuable.
                </Text>
                <Pressable onPress={() => addItem()} style={styles.buttonAdd}>
                  <Text style={styles.buttonTextAdd}>Add +</Text>
                </Pressable>
              </View>
            </LinearGradient>
            <View style={styles.rightContainerMainAdd}>
              <Image
                style={styles.imageFox}
                source={require('../../assets/images/Group.png')}
              />
            </View>
            <View
              style={{
                height: 15,
                backgroundColor: 'rgba(48, 82, 248, 0.2)',
                width: '90%',
                alignSelf: 'center',
                borderBottomRightRadius: 100,
                borderBottomLeftRadius: 100,
              }}
            />
          </View>
          {salary && (
            <View style={styles.incomeTextContainer}>
              <LinearGradient
                start={{ x: 0.5, y: 1.0 }}
                end={{ x: 0.0, y: 0.25 }}
                colors={[
                  'rgba(48, 82, 248, 1)',
                  'rgba(48, 82, 248, 1)',
                  '#5B7FFF',
                ]}
                style={styles.incomeButton}>
                <Text numberOfLines={1} style={styles.incomeButtonText}>{`₹${salary}`}</Text>
              </LinearGradient>
              <Text style={styles.incomeButtonBelowText}>
                Statement of Account to let you navigate with balance in the economic realm.
              </Text>
            </View>
          )}
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <TransactionsDisplay
              data={transactions}
              navigation={props.navigation}
            />
          </View>
        </ScrollView>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  incomeButtonBelowText: {
    fontFamily: 'Century Gothic',
    fontSize: 14,
    color: 'black',
    marginTop: 10,
    width: '90%',
  },
  incomeButton: {
    width: '35%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  incomeButtonText: {
    fontFamily: 'Century Gothic',
    fontSize: 16,
    color: 'white',
  },
  incomeTextContainer: {
    marginHorizontal: 30,
    marginTop: 40,
  },
  imageFox: {
    height: DEVICE_WIDTH / 1.5,
    aspectRatio: 1 / 2,
    resizeMode: 'contain',
    marginTop: -65,
    marginRight: 20,
  },
  containerComp: {
    flexDirection: 'row',
    height: DEVICE_WIDTH / 2 + 10,
    paddingHorizontal: 15,
    borderRadius: 16,
  },
  leftContainerMainAdd: {
    flex: 6 / 10,
    justifyContent: 'center',
  },
  rightContainerMainAdd: {
    position: 'absolute',
    right: 0,
  },
  buttonAdd: {
    backgroundColor: 'white',
    marginTop: 25,
    width: '40%',
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 10,
  },
  buttonTextAdd: {
    fontFamily: 'Century Gothic Bold',
    fontSize: 12,
    color: 'rgba(72, 103, 255, 1)',
  },
  helloAdd: {
    fontFamily: 'Century Gothic Bold',
    fontSize: 25,
    textTransform: 'uppercase',
    color: 'white',
  },
  helloMessageAdd: {
    fontFamily: 'Century Gothic',
    fontSize: 14,
    marginTop: 10,
    color: 'white',
  },
  helloContainer: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  hello: {
    fontFamily: 'Century Gothic Bold',
    fontSize: 25,
    textTransform: 'uppercase',
    color: 'black',
  },
  helloMessage: {
    fontFamily: 'Century Gothic',
    fontSize: 15,
    color: 'black',
    lineHeight: 18,
    marginTop: 8,
    width: '80%',
    lineHeight: 20,
  },
  username: {
    fontFamily: 'Century Gothic',
    fontSize: 15,
    lineHeight: 18,
    color: 'black',
  },
  userPicStyle: {
    width: DEVICE_WIDTH / 16,
    height: DEVICE_WIDTH / 16,
    padding: 10,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  linearUserPic: {
    padding: 10,
    borderRadius: 100,
    marginLeft: 10,
  },
  adContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
});
