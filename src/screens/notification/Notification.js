/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, StatusBar, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import NotificationItem from '../../components/NotificationItem';
import Screen from '../../components/Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Notification = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('messages').then(storedMessages => {
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
        console.log("Messages retrieved:", JSON.parse(storedMessages));
      } else {
        console.log("No messages found in storage.");
      }
    });
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
        <View style={styles.header}>
          <Text style={styles.nameTextStyle}>Notification</Text>
          <View>
            <Image source={require("../../assets/images/bell.png")} style={styles.bell} />
            {messages.length > 0 && <View style={styles.dot} />}
          </View>
        </View>
        <View style={styles.listContainer}>
          {messages.length > 0 ?
            <FlatList
              data={messages}
              renderItem={({ item }) => <NotificationItem navigation={props.navigation} data={item} length={messages.length} />}
              keyExtractor={(item, index) => index.toString()}
              style={{ marginTop: 10, paddingTop: 25, flex: 1 }}
            /> :
            <View>
              <Image source={require("../../assets/images/nonoti.png")} style={styles.nonotiImage} />
              <Text style={styles.nonotitext}>Lately, there have been no notifications for you.</Text>
            </View>
          }
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  nonotitext: {
    fontFamily: "Century Gothic",
    fontSize: 15,
    alignSelf: "center",
    width: DEVICE_WIDTH / 2,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.5)",
  },
  nonotiImage: {
    width: DEVICE_WIDTH / 2,
    resizeMode: "contain",
    height: DEVICE_WIDTH / 2,
    alignSelf: "center",
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  bell: {
    width: 25,
    resizeMode: "contain",
    height: 25,
  },
  nameTextStyle: {
    fontFamily: "Century Gothic",
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
    marginLeft: 30,
  },
  header: {
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#FFC700",
    borderRadius: 40,
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default Notification;
