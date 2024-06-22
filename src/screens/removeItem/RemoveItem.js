/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import HeaderBack from '../../components/HeaderBack';

import {items} from '../../assets/data/items';
import LinearGradient from 'react-native-linear-gradient';
import {addAddItem, removeItem} from '../../assets/asyncData/utils';

const RemoveItem = props => {
  console.log(
    JSON.stringify(props.route.params.colorBg) + ' these are the params',
  );

  // Find the image for the transaction type
  const index = props.route.params.items.type === 'Expense' ? 0 : 1;

  const itemType = items[index].items.find(
    item => item.name === props.route.params.items.typeName,
  );

  const removeBinItem = async () => {
    console.log();

    const result = await removeItem(props.route.params.items);
    if (result === 1) {
      props.navigation.navigate('Home');
      console.log('data is removed');
    } else {
      console.error('Error saving user data.');
    }
  };

  const pressedEditPayment = () => {

    var formatDate = props.route.params.items.date;
    var frdt = new Date(formatDate);

    var year = frdt.getFullYear();
    var month = (frdt.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
    var day = frdt.getDate().toString().padStart(2, '0');
    var formattedDate = day + ' - ' + month + ' - ' + year;

    var dateObj = new Date(props.route.params.items.time);
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes().toString().padStart(2, '0');
    var period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    var formattedTime = hours + ':' + minutes + ' ' + period;

    var data = props.route.params.items;
    data["timeFormat"] = formattedTime
    data["dateFormat"] = formattedDate

    
    props.navigation.navigate('FormatItem', {
      item: data,
      typeNavi:"edit_item"
    });
  };

  return (
    <View style={{flex: 1}}>
      <Screen>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
          <Pressable
            style={styles.headerStyle}
            onPress={() => props.navigation.goBack()}>
            <HeaderBack navigation={props.navigation} />
          </Pressable>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => removeBinItem()}>
            <Image
              source={require('../../assets/images/bin.png')}
              style={{width: 40, height: 40, marginHorizontal: 30}}
            />
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: 'rgba(91, 127, 255, 0.12)',
              marginHorizontal: 20,
              marginTop: 30,
              borderRadius: 10,
              padding: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: props.route.params.colorBg,
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <View style={{}}>
                  <Image
                    source={itemType.image}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <Text
                  style={{
                    fontFamily: 'Century Gothic',
                    fontSize: 14,
                    color: 'black',
                  }}>
                  {props.route.params.items.typeName}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Century Gothic',
                    fontSize: 11,
                    color: 'rgba(0,0,0,0.4)',
                  }}>
                  {props.route.params.items.date}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Century Gothic',
                    fontSize: 11,
                    color: 'rgba(0,0,0,0.4)',
                  }}>
                  {'AT '}
                  {new Date(props.route.params.items.time)
                    .toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                    .toUpperCase()}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Century Gothic',
                    fontSize: 14,
                    color:
                      props.route.params.items.type === 'Expense'
                        ? '#EA0000'
                        : '#009906',
                    marginRight: 10,
                  }}>
                  {props.route.params.items.amount}
                </Text>
              </View>
            </View>
            {props.route.params.items.note && (
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 8,
                  marginTop: 10,
                }}>
                <Text style={{fontFamily: 'Century Gothic', fontSize: 14}}>
                  {props.route.params.items.note}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.incomeTextContainer}>
            <TouchableOpacity onPress={() => pressedEditPayment()}>
              <LinearGradient
                start={{x: 0.5, y: 1.0}}
                end={{x: 0.0, y: 0.25}}
                style={{borderRadius: 10}}
                colors={[
                  'rgba(48, 82, 248, 1)',
                  'rgba(48, 82, 248, 1)',
                  '#5B7FFF',
                ]}>
                <Text style={styles.incomeButtonText}>Edit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: 15,
    marginBottom: 10,
  },
  incomeButtonText: {
    fontFamily: 'Century Gothic',
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  incomeTextContainer: {
    marginHorizontal: 30,
    marginTop: 20,
    width: '35%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default RemoveItem;
