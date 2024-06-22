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
  StatusBar,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';import React, {useEffect, useState, useRef} from 'react'
import Screen from '../../components/Screen'
import LinearGradient from 'react-native-linear-gradient';
import AddItemComponenet from '../../components/AddItemComponenet';

import { USER } from '../../assets/asyncData/keys';
import { getAddItem, getUserData } from '../../assets/asyncData/utils';
import Loader from '../../components/Loader';
import { useFocusEffect } from '@react-navigation/native';
import TransactionsDisplay from '../../components/TransactionsDisplay';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

import {items} from '../../assets/data/items'
import AddItemDisplay from '../../components/AddItemDisplay';
import DashBoardDisplay from '../../components/DashBoardDisplay';


export default function Dashboard(props) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startDate, setStartDate]  = useState({});
  const [endDate, setEndDate]  = useState({});
  const [val, setVal] = useState();


  const flatListRef = useRef(null);

  const scrollToIndex = index => {
    console.log(index);
    if (index >= 0 && index < items.length) {
      flatListRef.current.scrollToIndex({animated: true, index});
      console.log(index);
    }
  };

  return (
    <View style={styles.contianer}>
      <Screen>
        <StatusBar backgroundColor={"white"}   barStyle={'dark-content'} />
        <ScrollView style={{flex:1, }} showsVerticalScrollIndicator={false}>
          <View>
            <View>

            </View>
            <View>
              
            </View>
          </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 15,
            marginTop: 20,
          }}>
          <View style={{paddingVertical: 10, flex: 1}}>
            <Pressable
              onPress={() => scrollToIndex(0)}
              style={{
                marginHorizontal: 10,
                backgroundColor:
                  currentIndex === 0
                    ? 'rgba(48, 82, 248, 1)'
                    : 'rgba(48, 82, 248, 0.3)',
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.buttonTextStyle}>Charts</Text>
              <View style={styles.line} />
            </Pressable>
          </View>
          <View style={{paddingVertical: 10, flex: 1}}>
            <Pressable
              onPress={() => scrollToIndex(1)}
              style={{
                marginHorizontal: 10,
                backgroundColor:
                  currentIndex === 0
                    ? 'rgba(48, 82, 248, 0.3)'
                    : 'rgba(48, 82, 248, 1)',
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.buttonTextStyle}>Stats</Text>
              <View style={styles.line} />
            </Pressable>
          </View>
        </View>
        <View style={styles.flatlistArea}>
                    <FlatList
                        ref={flatListRef}
                        data={[{index:"chart"}, {index:"stats"}]}
                        style={{flex:1,}}
                        renderItem={({item})=><DashBoardDisplay navigation={props.navigation} data={item} ind={val}/>}
                        keyExtractor={(item, index)=> index}
                        horizontal // This enables horizontal scrolling
                        pagingEnabled // This snaps the scrolling to the center of each item
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / DEVICE_WIDTH);
                        setVal(index);
                        if (currentIndex !== index) {
                            setCurrentIndex(index);
                        }
                        }}
                    />
                </View>
        </ScrollView>
      </Screen>
    </View>
  )
}

const styles = StyleSheet.create({
  line:{
      height:3,
      backgroundColor:"white",
      width:"60%",
      position:"absolute",
      bottom:0,
  },
  buttonTextStyle:{
      fontFamily:"Century Gothic",
      fontSize:15,
      color:"white",
  },
  addStyle:{
      fontFamily:"Century Gothic Bold",
      fontSize:25,
  },
  subHeader:{
      fontFamily:"Century Gothic",
      fontSize:14,
      marginTop:8,
      marginBottom:10,
  },
  contianer:{
      flex:1,
  },
  flatlistArea:{
      flex:1,
      // backgroundColor:"red"
  },
  headerStyle:{
      marginTop:15,
      marginBottom:10,
  },
  headerContainer:{
      // marginHorizontal:30,
      marginTop: 20,
  }
});
