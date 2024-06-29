import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  StatusBar,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../../components/Screen';
import HeaderBack from '../../components/HeaderBack';
import { getUserData, setUserData } from '../../assets/asyncData/utils';
import { USER } from '../../assets/asyncData/keys';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const PersonalDetailsScreen = (props) => {
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [gender, setGender] = useState('Male');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserDt = async () => {
      setLoading(true);
      try {
        const result = await getUserData(USER);
        setName(result.name);
        setIncome(result.salary);
        setGender(result.gender || 'Male');
        setProfileImage(result.profileImage);
        setLoading(false);
        console.log(JSON.stringify(result) + ' this is the user data');
      } catch (error) {
        console.error('Error retrieving user data:', error);
        setLoading(false);
      }
    };
    getUserDt();
  }, []);

  useEffect(() => {
    const loadProfileImage = async () => {
      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedImage) {
        setProfileImage(storedImage);
      }
    };
    loadProfileImage();
  }, []);

  const saveUserDetails = async () => {
    const userData = {
      name,
      salary: income,
      gender,
      profileImage,
    };
    try {
      const result = await setUserData(userData);
      if (result !== 1) {
        console.error('Error saving user data.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  useEffect(() => {
    saveUserDetails();
  }, [name, income, gender, profileImage]);

  const pickImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0].uri;
        setProfileImage(source);
        AsyncStorage.setItem('profileImage', source);
      }
    });
  };

  return (
    <Screen>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={{
          position: 'absolute',
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT / 3,
          bottom: 0,
        }}
      >
        <Image
          source={require('../../assets/images/background.png')}
          style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 3 }}
        />
      </View>
      <Pressable style={styles.headerStyle} onPress={() => props.navigation.goBack()}>
        <HeaderBack name="Personal Information" navigation={props.navigation} />
      </Pressable>

      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Choose a Picture</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />

        <Text style={styles.label}>Monthly Income</Text>
        <TextInput
          style={styles.input}
          value={income}
          keyboardType="numeric"
          onChangeText={setIncome}
          placeholder="₹ 10 000-50 000"
        />
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'Male' && styles.selectedGender,
              { marginRight: 5 },
            ]}
            onPress={() => setGender('Male')}
          >
            <Text style={[styles.genderText, gender === 'Male' ? { color: '#fff' } : { color: '#3052F8' }]}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'Female' && styles.selectedGender,
              { marginLeft: 5 },
            ]}
            onPress={() => setGender('Female')}
          >
            <Text style={[styles.genderText, gender === 'Female' ? { color: '#fff' } : { color: '#3052F8' }]}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    textAlign: 'center',
    fontFamily: 'Century Gothic',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Century Gothic',
    marginTop: 10,
    color: '#888',
    marginBottom: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    fontFamily: 'Century Gothic',
    fontSize: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedGender: {
    backgroundColor: '#3052F8',
  },
  genderText: {
    color: '#fff',
    fontFamily: 'Century Gothic',
    fontSize: 15,
  },
  headerStyle: {
    marginTop: 15,
    marginBottom: 10,
  },
});

export default PersonalDetailsScreen;
