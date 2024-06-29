/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Charts = props => {
  const currentDate = new Date();
  const oneMonthBefore = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate(),
  );
  const [startDate, setStartDate] = useState(oneMonthBefore);
  const [endDate, setEndDate] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    if (Array.isArray(props.data)) {
      const updatedExpenseData = props.data
        .filter(
          item =>
            item.type === 'Expense' &&
            new Date(item.date) >= startDate &&
            new Date(item.date) <= endDate,
        )
        .map((item, index) => ({
          name: item.typeName,
          amount: parseFloat(item.amount.replace('₹', '')),
          color: `rgba(48, 82, 248, ${0.8 - index * 0.04})`, // Adjusted to avoid very light colors
          legendFontColor: '#000080', // Dark Blue
          legendFontSize: 9,
          legendFontStyle: 'Century Gothic',
        }));

      const updatedIncomeData = props.data
        .filter(
          item =>
            item.type === 'Income' &&
            new Date(item.date) >= startDate &&
            new Date(item.date) <= endDate,
        )
        .map((item, index) => ({
          name: item.typeName,
          amount: parseFloat(item.amount.replace('₹', '')),
          color: `rgba(34, 139, 34, ${0.8 - index * 0.04})`, // Adjusted to avoid very light colors
          legendFontColor: '#008000', // Green
          legendFontSize: 9,
          legendFontStyle: 'Century Gothic',
        }));

      setExpenseData(updatedExpenseData);
      setIncomeData(updatedIncomeData);
    } else {
      setExpenseData([]);
      setIncomeData([]);
    }
  }, [startDate, endDate, props.data]);

  const formatDate = date => {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
    var day = date.getDate().toString().padStart(2, '0');
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={{ padding: 30 }}>
      <View>
        <Pressable
          onPress={() => setStartOpen(true)}
          style={{
            backgroundColor: 'rgba(48, 82, 248, 0.1)',
            marginVertical: 10,
            padding: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Century Gothic',
              fontSize: 15,
              color: 'black',
            }}>
            {formatDate(startDate)}
          </Text>
        </Pressable>
        <DatePicker
          modal
          mode="date"
          open={startOpen}
          date={startDate}
          maximumDate={new Date()}
          onConfirm={dt => {
            setStartOpen(false);
            setStartDate(dt);
            console.log(formatDate(dt));
          }}
          onCancel={() => {
            setStartOpen(false);
          }}
        />
      </View>

      <View>
        <Pressable
          onPress={() => setEndOpen(true)}
          style={{
            backgroundColor: 'rgba(48, 82, 248, 0.1)',
            marginVertical: 10,
            padding: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Century Gothic',
              fontSize: 15,
              color: 'black',
            }}>
            {formatDate(endDate)}
          </Text>
        </Pressable>
        <DatePicker
          modal
          mode="date"
          open={endOpen}
          date={endDate}
          maximumDate={new Date()}
          onConfirm={dt => {
            setEndOpen(false);
            setEndDate(dt);
            console.log(formatDate(dt));
          }}
          onCancel={() => {
            setEndOpen(false);
          }}
        />
      </View>

      {/* Expense Section */}
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Inter-Medium' }}>Expenses</Text>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <PieChart
            data={
              expenseData.length > 0
                ? expenseData
                : [
                  {
                    name: 'No Expense Data',
                    amount: 1,
                    color: 'lightgrey',
                    legendFontColor: 'transparent', // Making legend invisible
                    legendFontSize: 0, // Hide the legend text
                  },
                ]
            }
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="27"
            absolute
          />
        </View>
      </View>

      {/* Income Section */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Inter-Medium' }}>Income</Text>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <PieChart
            data={
              incomeData.length > 0
                ? incomeData
                : [
                  {
                    name: 'No Income Data',
                    amount: 1,
                    color: 'lightgrey',
                    legendFontColor: 'transparent', // Making legend invisible
                    legendFontSize: 0, // Hide the legend text
                  },
                ]
            }
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="27"
            absolute
          />
        </View>
      </View>
    </View>
  );
};

export default Charts;
