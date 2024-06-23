/* eslint-disable eol-last */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable keyword-spacing */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Pressable, LogBox } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DatePicker from 'react-native-date-picker';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Stats = ({ data }) => {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const sortedData = data
        .filter(item => new Date(item.date) >= startDate && new Date(item.date) <= endDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);
    } else {
      setFilteredData([]);
    }
  }, [startDate, endDate, data]);

  const parsedData = filteredData.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    income: item.type === 'Income' ? parseFloat(item.amount.replace(/[^0-9.-]+/g, "")) : 0,
    expense: item.type === 'Expense' ? parseFloat(item.amount.replace(/[^0-9.-]+/g, "")) : 0,
    balance: 0 // This will be calculated
  }));

  let runningBalance = 0;
  const balanceData = parsedData.map(item => {
    runningBalance += item.income - item.expense;
    return { ...item, balance: isFinite(runningBalance) ? runningBalance : 0 };
  });

  console.log("Parsed Data:", parsedData);
  console.log("Balance Data:", balanceData);

  const chartData = {
    labels: balanceData.length > 0 ? balanceData.map(item => item.date) : ["No Data"],
    datasets: [
      {
        data: balanceData.length > 0 ? balanceData.map(item => item.balance) : [0],
        color: (opacity = 1) => `rgba(48, 82, 248, ${opacity})`,
        strokeWidth: 2,
        
      }
    ],
    legend: ["Balance"]
  };

  console.log("Chart Data:", chartData);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.date}</Text>
      <Text style={styles.tableCell}>{item.income.toFixed(2)}</Text>
      <Text style={styles.tableCell}>{item.expense.toFixed(2)}</Text>
      <Text style={styles.tableCell}>{item.balance.toFixed(2)}</Text>
    </View>
  );

  const formatDate = date => {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.container}>
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
            marginBottom: 25
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

      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={DEVICE_WIDTH - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            fontFamily:"Century Gothic",
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffffff'
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            fontFamily:"Century Gothic",
          }}
        />
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>DATE</Text>
        <Text style={styles.tableHeaderText}>INCOME</Text>
        <Text style={styles.tableHeaderText}>EXPENSE</Text>
        <Text style={styles.tableHeaderText}>BALANCE</Text>
      </View>
      <FlatList
        data={balanceData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noDataText}>No Data Available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  datePickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: 'rgba(48, 82, 248, 0.1)',
    padding: 10,
    borderRadius: 5,
  },
  datePickerText: {
    fontFamily: 'Century Gothic',
    fontSize: 15,
    color: 'black',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontFamily:"Century Gothic",
    color:"black"

  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color:"black",
    
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily:"Century Gothic",
  },
});

export default Stats;
