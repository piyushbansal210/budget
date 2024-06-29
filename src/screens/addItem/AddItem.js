/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, StatusBar, StyleSheet, FlatList, Dimensions, Image, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import HeaderBack from '../../components/HeaderBack'
import AddItemDisplay from '../../components/AddItemDisplay'

import { items } from '../../assets/data/items'
import Screen from '../../components/Screen'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const AddItem = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    console.log(currentIndex)

    console.log(items)

    const scrollToIndex = (index) => {
        console.log(index)
        if (index >= 0 && index < items.length) {
            flatListRef.current.scrollToIndex({ animated: true, index });
            console.log(index)
        }
    };
    return (
        <Screen>
            <View style={styles.contianer}>
                <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
                <View style={{ position: "absolute", width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 3, bottom: 0 }}>
                    <Image source={require("../../assets/images/background.png")} style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 3 }} />

                </View>
                <Pressable style={styles.headerStyle} onPress={() => props.navigation.goBack()}>
                    <HeaderBack name="Add Item" navigation={props.navigation} />
                </Pressable>
                <View style={styles.headerContainer}>
                    <Text style={styles.addStyle}>ADD ITEM</Text>
                    <Text style={styles.subHeader}>Earned something Good or Spent{"\n"}on Something Valuable.</Text>
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 30, marginBottom: 15, marginTop: 20 }}>
                    <View style={{ paddingVertical: 10, flex: 1 }}>
                        <Pressable onPress={() => scrollToIndex(0)} style={{ marginHorizontal: 10, backgroundColor: currentIndex === 0 ? "rgba(48, 82, 248, 1)" : "rgba(48, 82, 248, 0.3)", paddingVertical: 12, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                            <Text style={styles.buttonTextStyle}>Expense</Text>
                            <View style={styles.line} />
                        </Pressable>
                    </View>
                    <View style={{ paddingVertical: 10, flex: 1 }}>
                        <Pressable onPress={() => scrollToIndex(1)} style={{ marginHorizontal: 10, backgroundColor: currentIndex === 0 ? "rgba(48, 82, 248, 0.3)" : "rgba(48, 82, 248, 1)", paddingVertical: 12, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                            <Text style={styles.buttonTextStyle}>Income</Text>
                            <View style={styles.line} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.flatlistArea}>
                    <FlatList
                        ref={flatListRef}
                        data={items}
                        renderItem={({ item }) => <AddItemDisplay navigation={props.navigation} data={item} />}
                        keyExtractor={(item, index) => index}
                        horizontal // This enables horizontal scrolling
                        pagingEnabled // This snaps the scrolling to the center of each item
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => {
                            const index = Math.round(event.nativeEvent.contentOffset.x / DEVICE_WIDTH);
                            if (currentIndex !== index) {
                                setCurrentIndex(index);
                            }
                        }}
                    />
                </View>
            </View>
        </Screen>

    )
}


const styles = StyleSheet.create({
    line: {
        height: 3,
        backgroundColor: "white",
        width: "60%",
        position: "absolute",
        bottom: 0,
    },
    buttonTextStyle: {
        fontFamily: "Century Gothic",
        fontSize: 15,
        color: "white",
    },
    addStyle: {
        fontFamily: "Century Gothic Bold",
        fontSize: 25,
        color: "black"
    },
    subHeader: {
        fontFamily: "Century Gothic",
        fontSize: 14,
        marginTop: 8,
        marginBottom: 10,
        color: "black"
    },
    contianer: {
        flex: 1,
        // backgroundColor:"orange"
    },
    flatlistArea: {
        flex: 1,
        // backgroundColor:"red"
    },
    headerStyle: {
        marginTop: 15,
        marginBottom: 10,
    },
    headerContainer: {
        marginHorizontal: 30,
        marginTop: 20,
    }
});

export default AddItem