/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default function UserDetails(props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateFormat, setDateFormat] = useState('');
  const [inputRef, setInputRef] = useState(null);

  function getaAddSalary() {
    if (name && date) {
      props.navigation.navigate('AddMoney', {
        name: name,
        date: dateFormat,
      });
    }
  }

  const handleInputPress = () => {
    setOpen(true);
    inputRef.focus(); // Focus on the TextInput after opening the date picker
  };

  return (
    <LinearGradient
      colors={['rgba(231, 236, 255, 1)', 'rgba(192, 206, 255, 1)']}
      style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView contentContainerStyle={styles.upperContainer}>
          <View style={styles.iconStyle}>
            <Image
              source={require('../../assets/images/foxLogo.png')}
              style={styles.logoImageStyle}
            />
            <Text style={styles.logoTextStyle}>spend sync</Text>
          </View>
          <View style={styles.textLabelContainer}>
            <Text style={styles.userDetails}>USER DETAILS</Text>
            <Text style={styles.loremLabel}>
              Lorem Ipsum, the trusted companion of designers and typesetters
            </Text>
          </View>
          <View style={styles.inputAreaContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.labelStyle}>
                Name<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                value={name}
                ref={ref => setInputRef(ref)}
                onChangeText={setName}
                style={styles.inputStyle}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text  style={styles.labelStyle}>
                DOB<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                value={dateFormat}
                style={styles.inputStyle}
                editable={false}
              />
              <Pressable
                style={{flex: 1}}
                hitSlop={{top: 50, bottom: 0, left: 10, right: 10}}
                onPress={handleInputPress}
              />
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={dt => {
                setOpen(false);
                setDate(dt);
                // setDateSetted(true);

                var year = dt.getFullYear();
                var month = (dt.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
                var day = dt.getDate().toString().padStart(2, '0');
                var formattedDate = day + '/' + month + '/' + year;
                setDateFormat(formattedDate);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.lowerContainer}>
          <Pressable
            onPress={() => getaAddSalary()}
            style={[
              styles.button,
              !(name && date) && {backgroundColor: '#EAEAEA'},
            ]}>
            <Text style={styles.buttonText}>Get Started →</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#526FFC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 30,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Century Gothic',
    textAlign: 'center',
    
  },
  userDetails: {
    textAlign: 'center',
    fontFamily: 'Century Gothic Bold',
    fontSize: 22,
    marginBottom: 15,
    color: 'black',

  },
  loremLabel: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Century Gothic',
    marginBottom: 30,
    color: 'black',

  },
  textLabelContainer: {
    alignSelf: 'center',
    width: DEVICE_WIDTH / 1.5,
    marginTop: 40,
  },
  nameContainer: {
    // backgroundColor:"red",
    marginBottom: 20,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'Century Gothic',
    color: 'black',

  },
  inputStyle: {
    fontSize: 16,
    fontFamily: 'Century Gothic',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    color: 'black',
  },
  inputAreaContainer: {
    marginHorizontal: 30,
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -20,
  },
  lowerContainer: {},
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  logoImageStyle: {
    height: DEVICE_HEIGHT / 10,
    width: DEVICE_WIDTH / 5,
    resizeMode: 'contain',
    shadowColor: '#ccc',
    shadowOffset: {width: 1, height: 6},
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  logoTextStyle: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 18,
    marginTop: 15,
    color: 'black',

  },
  iconStyle: {
    alignItems: 'center',
  },
});
