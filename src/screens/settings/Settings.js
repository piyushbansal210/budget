/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useMemo, useEffect} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Screen from '../../components/Screen';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import CheckBox from '../../components/CheckBox';
import { getUserData } from '../../assets/asyncData/utils';
import { USER } from '../../assets/asyncData/keys';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default function Settings(props) {
  const bottomSheetRef = useRef(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [profileImage, setProfileImage] = useState(null);


  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const screens = [
    {
      id: 1,
      screen_name: 'Personal Details',
      image: require('../../assets/images/profile.png'),
      screenName: 'PersonalInfo',

    },
    {
      id: 3,
      screen_name: "FAQ's",
      image: require('../../assets/images/faq.png'),
      screenName: 'FAQ',
    },
    {
      id: 4,
      screen_name: 'Export To Excel',
      image: require('../../assets/images/excel.png'),
      screenName: 'ExportExcel',
    },
    {
      id: 5,
      screen_name: 'Check Updates',
      image: require('../../assets/images/reuse.png'),
      screenName: 'Updates',
    },
    {
      id: 8,
      screen_name: 'Reset All Data',
      image: require('../../assets/images/reset.png'),
    },
  ];

  const [pressedItems, setPressedItems] = useState({});
  const [image, setImage] = useState('');
  const [name, setName] = useState('');

  useFocusEffect(
    React.useCallback(() => {

      const getUserDt = async () => {
        try {
          const result = await getUserData(USER);
          console.log(JSON.stringify(result)+" this is the result")
          setName(result.name);
        } catch (error) {
          console.error('Error retrieving user data:', error);
          setLoading(false);
        }
      };
      getUserDt();
    }, [])
  );


  useFocusEffect(
    React.useCallback(() => {
      const loadProfileImage = async () => {
        const storedImage = await AsyncStorage.getItem('profileImage');
        if (storedImage) {
          setProfileImage(storedImage);
        }
      };
      loadProfileImage();
    }, [])
  );

  const renderItem = ({item, index}) => {
    const onPress = () => {
      if (item.screen_name === 'Reset All Data') {
        setModalVisible(true);
      } else {
        props.navigation.navigate(item.screenName);
      }
    };

    return (
      <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() => onPress()}>
        <View style={styles.leftItemStyle}>
          <LinearGradient
            colors={['rgba(48, 82, 248, 1)', 'rgba(48, 82, 248, 1)', '#5B7FFF']}
            style={styles.tagStyleBox}>
            <Image source={item.image} style={styles.tagSettingsStyle} />
          </LinearGradient>
          <Text style={styles.buttonTextStyle}>{item.screen_name}</Text>
        </View>
        <Image
          source={require('../../assets/images/arrow_right.png')}
          style={styles.arrowRightStyle}
        />
      </TouchableOpacity>
    );
  };

  const renderHeaderItem = () => {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.headerLeftContainer}>
        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{uri: profileImage}} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Choose a Picture</Text>
            </View>
          )}
        </View>
        </View>
        <View style={styles.headerRightContainer}>
          <Text style={styles.userNameStyle}>{name}</Text>
          <Text style={styles.userNameDescStyle}>
            Lorem Ipsum, the trusted companion of designers and typesetters
          </Text>
        </View>
      </View>
    );
  };

  const handleResetData = async () => {
    if (isChecked) {
      try {
        setModalVisible(!modalVisible);
        await AsyncStorage.clear();
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Splash' }],
            })
        );
        console.log('pressed');
      } catch (error) {
        console.error('Error clearing async storage:', error);
      }
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <FlatList
          data={screens}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeaderItem}
          ListHeaderComponentStyle={{
            marginBottom: 40,
            marginTop: 50,
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={require('../../assets/images/resetImg.png')}
                style={{width: 150, height: 100, resizeMode: 'contain'}}
              />
              <Text style={styles.modalText}>
                Would you like to reset all data in your app?
              </Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  check={isChecked}
                  setCheck={setIsChecked}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>
                  Please be aware that data backup will not be available after a
                  reset.
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button,isChecked?styles.buttonConfirm: styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, isChecked?styles.buttonClose: styles.buttonConfirm]}
                  onPress={handleResetData}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  //   checkbox: {
  //     alignSelf: 'center',
  //   },
  label: {
    margin: 8,
    fontFamily: 'Century Gothic',
    fontSize: 12,
    color: '#000000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Century Gothic',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 15,
    fontFamily: 'Century Gothic',
    fontSize: 15,
    color: '#000000',
    textAlign: 'left',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    flex:1,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#4867FF',
  },
  buttonConfirm: {
    backgroundColor: '#E1E1E1',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Make the background semi-transparent
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  userNameStyle: {
    fontFamily: 'Century Gothic',
    fontSize: 20,
    color: '#5B7FFF',
  },
  userNameDescStyle: {
    fontFamily: 'Century Gothic',
    fontSize: 13,
    marginTop: 3,
    color: '#000000',
  },
  linearBg: {
    width: DEVICE_WIDTH / 4.8,
    height: DEVICE_HEIGHT / 7.9,
    borderRadius: 10,
  },
  noImageLinearStyle: {
    flex: 1,
    borderRadius: 10,
  },
  tagStyle: {
    position: 'absolute',
    backgroundColor: '#3052F8',
    bottom: -10,
    zIndex: 99,
    padding: 10,
    right: -10,
    borderRadius: 10,
  },
  imageBoxContainerStyle: {
    width: DEVICE_WIDTH / 4.8,
    height: DEVICE_HEIGHT / 7.9,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUserStyle: {
    width: DEVICE_WIDTH / 5,
    height: DEVICE_HEIGHT / 9,
    resizeMode: 'contain',
  },
  addImageButtonStyle: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  headerRightContainer: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
  },
  headerLeftContainer: {},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonTextStyle: {
    fontFamily: 'Century Gothic',
    fontSize: 14,
  },
  headerStyle: {
    marginHorizontal: 30,
    flexDirection: 'row',
    flex: 1,
  },
  pressedItem: {
    backgroundColor: 'rgba(48, 82, 248, 0.25)',
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    paddingVertical: 10,
  },
  tagSettingsStyle: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  arrowRightStyle: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  leftItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  tagStyleBox: {
    backgroundColor: 'red',
    padding: 10,
    marginRight: 12,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    textAlign:"center",
    fontFamily:"Century Gothic",
  },
});
