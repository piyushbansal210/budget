/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Import the items and color arrays
import { items, color } from '../assets/data/items';

const TransactionsDisplay = ({ data, navigation }) => {
  if (!data || data.length === 0) {
    return <></>;
  }

  // Group transactions by date
  const groupedTransactions = data.reduce((groups, transaction) => {
    const date = transaction.date.split('T')[0];
    const time = transaction.time.split('T')[1].split('.')[0]; // Extracting time from ISO format
    const dateTime = new Date(`${date}T${time}`).getTime(); // Creating a Date object for sorting
    if (!groups[date]) {
      groups[date] = { transactions: [], minTime: dateTime, maxTime: dateTime };
    } else {
      if (dateTime < groups[date].minTime) {
        groups[date].minTime = dateTime;
      }
      if (dateTime > groups[date].maxTime) {
        groups[date].maxTime = dateTime;
      }
    }
    // Find the image for the transaction type
    const index = transaction.type === 'Expense' ? 0 : 1;

    const itemType = items[index].items.find(
      item => item.name === transaction.typeName,
    );

    // Select a random shade of blue
    const randomIndex = Math.floor(Math.random() * color[0].shades.length);
    const randomColor = color[0].shades[randomIndex];

    groups[date].transactions.push({
      ...transaction,
      typeImage: itemType?.image,
      bgColor: randomColor, // Add the random color to the transaction
    });
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return (
    <View>
      {sortedDates.map(date => {
        const group = groupedTransactions[date];
        const firstTime = new Date(group.minTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        const lastTime = new Date(group.maxTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        return (
          <View
            key={date}
            style={{
              backgroundColor: 'rgba(228, 228, 228, 0.34)',
              marginBottom: 20,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#EFEFEF',
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Century Gothic',
                  fontSize: 13,
                  color: '#9A9A9A',
                }}>
                {date} | ({firstTime} - {lastTime})
              </Text>
            </View>

            {group.transactions.map((transaction, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RemoveItems', {
                    items: transaction,
                    colorBg: transaction.bgColor,
                  })
                }
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //   alignItems: 'center',
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  borderRadius: 10,
                  backgroundColor: 'rgba(239, 242, 255, 0.7)',
                  paddingVertical: 7,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    backgroundColor: transaction.bgColor, // Apply the random color to the transaction
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={transaction.typeImage}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text
                    style={{
                      fontFamily: 'Century Gothic',
                      fontSize: 14,
                      color: 'black',
                      flex: 1,
                    }}>
                    {transaction.typeName.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Century Gothic',
                      fontSize: 11,
                      color: 'rgba(0,0,0,0.4)',
                    }}>
                    {date.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Century Gothic',
                      fontSize: 11,
                      color: 'rgba(0,0,0,0.4)',
                    }}>
                    {'AT '}
                    {new Date(transaction.time)
                      .toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                      .toUpperCase()}
                  </Text>
                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Century Gothic',
                    fontSize: 14,
                    color:
                      transaction.type === 'Expense' ? '#EA0000' : '#009906',
                    marginRight: 10,
                    flex: 1,
                    textAlign: 'right',
                  }}>
                  {transaction.type === 'Expense' ? '-' : '+'}
                  {transaction.amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
    </View>
  );
};

export default TransactionsDisplay;
