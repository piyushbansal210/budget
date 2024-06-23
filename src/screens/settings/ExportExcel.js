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
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import HeaderBack from '../../components/HeaderBack';
  import CheckBox from '../../components/CheckBox';
  import Screen from '../../components/Screen';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import RNFS from 'react-native-fs';
  import XLSX from 'xlsx';
  import Share from 'react-native-share';
  import { useFocusEffect } from '@react-navigation/native';
  import { getAddItem } from '../../assets/asyncData/utils';
  
  const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;
  
  export default function ExportExcel(props) {
    const [check, setCheck] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
  
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
  
    const exportDataToExcel = async () => {
      try {
        // Filter out the typeImage column from the transactions
        const filteredData = transactions.map(({ typeImage, ...rest }) => rest);
  
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
        const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
  
        const path = `${RNFS.DocumentDirectoryPath}/data.xlsx`;
  
        await RNFS.writeFile(path, wbout, 'ascii');
  
        const options = {
          url: `file://${path}`,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          filename: 'data',
        };
  
        Share.open(options)
          .then(res => console.log(res))
          .catch(err => err && console.log(err));
      } catch (error) {
        console.error('Error exporting data:', error);
        Alert.alert(
          'Error',
          'There was an error exporting the data. Please try again.',
        );
      }
    };
  
    useFocusEffect(
      React.useCallback(() => {
        getTransactions();
      }, [])
    );
  
    return (
      <Screen>
        <View style={styles.container}>
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
          <View style={styles.headerStyle}>
            <HeaderBack name="Export To Excel" navigation={props.navigation} />
          </View>
          <ScrollView contentContainerStyle={styles.middleContainer}>
            <Image
              source={require('../../assets/images/excellogo.png')}
              style={styles.onboardImageStyle}
            />
            <Text style={styles.header}>Export Excel</Text>
            <Text style={styles.subHeader}>
              Lorem Ipsum, the trusted companion of designers and typesetters
            </Text>
            <View style={styles.checkBoxArea}>
              <CheckBox check={check} setCheck={setCheck} />
              <Text style={styles.checkBoText}>
                Really want to export your data or share your data?
              </Text>
            </View>
          </ScrollView>
          <View style={styles.bottomItems}>
            <TouchableOpacity
              style={styles.button}
              onPress={exportDataToExcel}
              disabled={!check}>
              <Text style={styles.buttonText}>Export To Excel →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    );
  }
  
  const styles = StyleSheet.create({
    checkBoText: {
      flex: 1,
      fontSize: 13,
      fontFamily: 'Century Gothic',
      color: 'rgba(0, 0, 0, 0.6)',
      marginLeft: 10,
      color:"black"

    },
    header: {
      fontSize: 16,
      fontFamily: 'Century Gothic',
      textAlign: 'center',
      color:"black"
    },
    subHeader: {
      fontSize: 16,
      fontFamily: 'Century Gothic',
      textAlign: 'center',
      width: DEVICE_WIDTH / 1.3,
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: 30,
      color:"black"

    },
    checkBoxArea: {
      flexDirection: 'row',
      alignItems: 'center',
      width: DEVICE_WIDTH / 1.4,
      alignSelf: 'center',
      marginTop: 10,
    },
    onboardImageStyle: {
      height: DEVICE_HEIGHT / 4.0,
      aspectRatio: 1,
      alignSelf: 'center',
    },
    button: {
      backgroundColor: '#526FFC',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Century Gothic',
      textAlign: 'center',
    },
    bottomItems: {
      justifyContent: 'flex-end',
      paddingBottom: 25,
      paddingHorizontal: 20,
    },
    container: {
      flex: 1,
    },
    headerStyle: {
      marginTop: 15,
      marginBottom: 10,
    },
    middleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  