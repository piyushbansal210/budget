/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';

import {USER, USER_ITEMS} from './keys';

export const setUserData = async props => {
  try {
    await AsyncStorage.setItem(USER, JSON.stringify(props));
    return 1;
  } catch (error) {
    console.error('Error storing user data:', error);
    return -1;
  }
};

export const getUserData = async props => {
  try {
    const jsonValue = await AsyncStorage.getItem(props);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const addAddItem = async props => {
  // try {
  //     await AsyncStorage.setItem(USER_ITEMS, JSON.stringify(props));
  //     return 1;
  // } catch (error) {
  //     console.error('Error storing user data:', error);
  //     return -1;
  // }

  try {
    // Get existing items from AsyncStorage
    const existingItemsString = await AsyncStorage.getItem(USER_ITEMS);
    let existingItems = [];
    if (existingItemsString) {
      existingItems = JSON.parse(existingItemsString);
    }

    console.log(
      JSON.stringify(existingItems) + ' thesea re the existing items',
    );

    // Append new item to the existing list
    existingItems.push(props);

    // // Store the updated list back in AsyncStorage
    await AsyncStorage.setItem(USER_ITEMS, JSON.stringify(existingItems));

    return 1;
  } catch (error) {
    console.error('Error storing user data:', error);
    return -1;
  }
};

export const getAddItem = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_ITEMS);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const removeItem = async object => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_ITEMS);
    let items = jsonValue != null ? JSON.parse(jsonValue) : [];

    console.log(object);

    // Filter out the item with the given itemId
    items = items.filter(
      item =>
        item.amount !== object.amount &&
        item.date !== object.date &&
        item.typeName !== object.typeName,
    );

    console.log(JSON.stringify(items)+" these are the items");

    // Save the updated list back to AsyncStorage
    await AsyncStorage.setItem(USER_ITEMS, JSON.stringify(items));
    return 1;
  } catch (err) {
    console.error('Error storing user data:', err);
    return -1;
  }
};
