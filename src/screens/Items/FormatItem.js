/* eslint-disable space-infix-ops */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
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
  StatusBar,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../components/Screen';
import HeaderBack from '../../components/HeaderBack';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {addAddItem} from '../../assets/asyncData/utils';
import DatePicker from 'react-native-date-picker';

import {items, color} from '../../assets/data/items';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_ITEMS} from '../../assets/asyncData/keys';

export default function FormatItem(props) {
  const [amount, setAmount] = useState(
    props.route.params.item.amount ? props.route.params.item.amount : '',
  );
  const [date, setDate] = useState(
    props.route.params.item.date
      ? new Date(props.route.params.item.date)
      : new Date(),
  );
  const [time, setTime] = useState(
    props.route.params.item.time
      ? new Date(props.route.params.item.time)
      : new Date(),
  );
  const [note, setNote] = useState(
    props.route.params.item.note ? props.route.params.item.note : '',
  );
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState('');
  const [openTime, setOpenTime] = useState(false);
  const [timeSetted, setTimeSetted] = useState(true);
  const [dateSetted, setDateSetted] = useState(true);
  const [timeFormat, setTimeFormat] = useState(
    props.route.params.item.timeFormat
      ? props.route.params.item.timeFormat
      : '',
  );
  const [dateFormat, setDateFormat] = useState(
    props.route.params.item.dateFormat
      ? props.route.params.item.dateFormat
      : '',
  );

  const EditAddress = async () => {
    try {
      // Fetch existing items from AsyncStorage
      const existingItemsString = await AsyncStorage.getItem(USER_ITEMS);
      let existingItems = [];
      if (existingItemsString) {
        existingItems = JSON.parse(existingItemsString);
      }

      console.log(existingItems);
      console.log(props.route.params.item)

      // Find the index of the item to edit
      const itemIndex = existingItems.findIndex(
        item =>
          item.amount === props.route.params.item.amount &&
          item.date === props.route.params.item.date && // Ensure date comparison is in ISO format
          item.time === props.route.params.item.time && // Ensure time comparison is in ISO format
          item.note === props.route.params.item.note &&
          item.type === props.route.params.item.type &&
          item.typeName === props.route.params.item.typeName,
      );

      console.log(itemIndex);

      if (itemIndex !== -1) {
        // Update the item at the found index
        existingItems[itemIndex] = {
          amount: amount,
          date: date,
          time: time,
          note: note,
          typeName: props.route.params.item.typeName,
          type: props.route.params.item.type,
          typeImage: props.route.params.item.typeImage,
        };

        await AsyncStorage.setItem(USER_ITEMS, JSON.stringify(existingItems));
        console.log('Item updated successfully');
        props.navigation.navigate("Home");
      } else {
        console.log('Item not found for update');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      // Handle error scenario
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Pressable
          style={styles.headerStyle}
          onPress={() => props.navigation.goBack()}>
          <HeaderBack name="Edit Item" navigation={props.navigation} />
        </Pressable>

        <ScrollView>
          <View style={styles.itemDesc}>
            <View style={styles.descLeft}>
              <Text style={styles.header}>
                {props.route.params.item.typeName}
              </Text>
              <Text style={styles.headerTitle}>
                Lorem Ipsum, the trusted companion of designers and typesetters
              </Text>
            </View>
            <View style={styles.descRight}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {props.route.params.item.type}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.itemsAmountContainer}>
            <View style={styles.itemAmountContainerLeft}>
              <View style={styles.itemImageContainer}>
                <Image
                  style={styles.itemImage}
                  source={props.route.params.item.typeImage}
                />
              </View>
              <Text style={styles.titleItem}>
                {props.route.params.item.typeName}
              </Text>
            </View>

            <View style={styles.amountContainer}>
              <TextInput
                style={styles.amountText}
                value={amount}
                placeholder="₹"
                keyboardType="numeric"
                placeholderTextColor={
                  amount.length === 0
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(255, 255, 255, 1)'
                }
                onChangeText={text => {
                  if (text === '') {
                    setAmount('');
                  } else if (text.startsWith('₹')) {
                    const amountWithoutRs = text.replace('₹', '');
                    setAmount(`₹${amountWithoutRs}`);
                  } else {
                    setAmount(`₹${text}`);
                  }
                }}
              />
            </View>
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.bottomContainer}
              onPress={() => setOpen(true)}>
              <View style={styles.imageBackContainer}>
                <Image
                  source={require('../../assets/images/icons/dates.png')}
                  style={styles.bottomImageDesign}
                />
              </View>
              <View style={styles.inputsContainer}>
                <Text
                  style={{
                    fontFamily: 'Century Gothic',
                    fontSize: 15,
                    // alignSelf:"center",
                    color: '#111111',
                  }}>
                  {dateSetted ? dateFormat : 'Date'}
                </Text>
              </View>
            </TouchableOpacity>

            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={dt => {
                setOpen(false);
                setDate(dt);
                setDateSetted(true);

                var year = dt.getFullYear();
                var month = (dt.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
                var day = dt.getDate().toString().padStart(2, '0');
                var formattedDate = day + ' - ' + month + ' - ' + year;
                setDateFormat(formattedDate);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <TouchableOpacity
              style={styles.bottomContainer}
              onPress={() => setOpenTime(true)}>
              <View style={styles.imageBackContainer}>
                <Image
                  source={require('../../assets/images/icons/time.png')}
                  style={styles.bottomImageDesign}
                />
              </View>
              <View style={styles.inputsContainer}>
                <Text
                  style={{
                    fontFamily: 'Century Gothic',
                    fontSize: 15,
                    color: '#111111',
                    // alignSelf:"center",
                  }}>
                  {timeSetted ? timeFormat : 'Time'}
                </Text>
              </View>
            </TouchableOpacity>

            <DatePicker
              modal
              mode="time"
              open={openTime}
              date={time}
              onConfirm={dt => {
                setOpenTime(false);
                setTime(dt);
                setTimeSetted(true);

                var dateObj = new Date(dt);
                var hours = dateObj.getHours();
                var minutes = dateObj.getMinutes().toString().padStart(2, '0');
                var period = hours >= 12 ? 'PM' : 'AM';

                // Convert to 12-hour format
                hours = hours % 12 || 12;

                var formattedTime = hours + ':' + minutes + ' ' + period;
                setTimeFormat(formattedTime);
              }}
              onCancel={() => {
                setOpenTime(false);
              }}
            />

            <View
              style={{
                backgroundColor: '#F5F5F5',
                flexDirection: 'row',
                marginHorizontal: 30,
                marginBottom: 20,
                paddingHorizontal: 10,
                borderRadius: 10,
                paddingVertical: 8,
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(48, 82, 248, 1)',

                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                }}>
                <Image
                  source={require('../../assets/images/icons/notes.png')}
                  style={[styles.bottomImageDesign]}
                />
              </View>
              <View style={styles.inputsContainer}>
                <TextInput
                  // multiline={true}
                  style={[
                    {
                      fontFamily: 'Century Gothic',
                      fontSize: 15,
                      // backgroundColor:"red",
                      color: '#111111',
                    },
                  ]}
                  placeholder={'Note'}
                  placeholderTextColor={'#111111'}
                  value={note}
                  onChangeText={text => {
                    setNote(text);
                  }}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => EditAddress()}
            style={{
              paddingHorizontal: 30,
              marginTop: 20,
              marginBottom: 30,
              borderRadius: 10,
            }}>
            <LinearGradient
              colors={[
                'rgba(48, 82, 248, 1)',
                'rgba(48, 82, 248, 1)',
                '#5B7FFF',
              ]}
              style={{
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Century Gothic',
                  fontSize: 15,
                  color: 'white',
                }}>
                Confirm
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    marginTop: 50,
  },
  bottomContainer: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  imageBackContainer: {
    backgroundColor: 'rgba(48, 82, 248, 1)',

    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 40,
  },
  noteStyleTag: {
    backgroundColor: 'rgba(48, 82, 248, 1)',
  },
  itemImage: {
    width: 25,
    height: 25,
    padding: 8,
  },
  inputsBottom: {
    fontFamily: 'Century Gothic',
    fontSize: 15,
    // backgroundColor:"red",
    color: '#111111',
  },
  inputsContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  bottomImageDesign: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(48, 82, 248, 1)',
  },

  itemsAmountContainer: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 30,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  itemAmountContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAmountContainerRight: {},
  itemImageContainer: {
    marginRight: 10,
    backgroundColor: 'rgba(48, 82, 248, 1)',
    borderRadius: 100,
    // width:"100%",
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  sritemImage: {
    width: '40%',
    aspectRatio: 1 / 4,
    resizeMode: 'contain',
  },
  titleItem: {
    fontFamily: 'Century Gothic',
    fontSize: 14,
    color: 'black',
  },
  itemText: {},
  amountContainer: {
    backgroundColor: 'rgba(48, 82, 248, 1)',
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: -10,
  },
  amountText: {
    fontFamily: 'Century Gothic Bold',
    fontSize: 14,
    color: 'white',
  },

  header: {
    fontFamily: 'Century Gothic Bold',
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'black',
  },
  headerTitle: {
    fontFamily: 'Century Gothic',
    fontSize: 12,
    color: 'black',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Century Gothic',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#3052F8',
    fontFamily: 'Century Gothic',
    fontSize: 10,
    width: '80%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  descLeft: {
    flex: 3 / 5,
  },

  descRight: {
    flex: 2 / 5,
    alignItems: 'flex-end',
  },
  itemDesc: {
    marginHorizontal: 30,
    marginTop: 30,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  headerStyle: {
    marginTop: 15,
    marginBottom: 10,
  },
});
