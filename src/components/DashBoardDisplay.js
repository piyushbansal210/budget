/* eslint-disable eol-last */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable keyword-spacing */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAddItem} from '../assets/asyncData/utils';
import Charts from './DashboadSections/Charts';
import Stats from './DashboadSections/Stats';
import { useFocusEffect } from '@react-navigation/native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const DashBoardDisplay = props => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getTransactions();
    }, []),
  );

  const getTransactions = async () => {
    setLoading(true);
    try {
      const result = await getAddItem();
      console.log(JSON.stringify(result) + ' these are the transaction');
      setTransactions(result);
      setLoading(false);
    } catch (err) {
      console.error('Error retrieving user data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  console.log(props.ind)

  return (
    <View style={styles.container}>
      {props.ind === 0 || props.ind == undefined? (
        <Charts data={transactions} />
      ) : (
        <Stats data={transactions} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomIconStyle: {
    marginBottom: 20,
  },
  otherContianer: {
    backgroundColor: 'rgba(48, 82, 248, 1)',
    width: DEVICE_WIDTH / 7,
    height: DEVICE_WIDTH / 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  textStyle: {
    fontSize: 12,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    marginTop: 5,
    marginHorizontal: 3,
  },
  circleStyle: {
    backgroundColor: 'rgba(48, 82, 248, 1)',
    borderRadius: 100,
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    // width:DEVICE_WIDTH / 5.5,
    // height: DEVICE_WIDTH / 5.5,
    margin: 12,
    // padding:10,
    // alignItems:"center",
    // justifyContent:"center",
    flex: 1 / 4,
  },
  imageStyle: {
    width: '50%',
    aspectRatio: 1 / 3,
    resizeMode: 'contain',
  },
  container: {
    width: DEVICE_WIDTH,
    // paddingHorizontal: 30,
    flex: 1,
  },
});

export default DashBoardDisplay;
