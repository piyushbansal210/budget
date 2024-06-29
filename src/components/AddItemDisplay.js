/* eslint-disable eol-last */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable keyword-spacing */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Dimensions, FlatList, Image, Pressable } from 'react-native';
import React from 'react';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const AddItemDisplay = (props) => {

    const renderItem = ({ item }) => {
        console.log(JSON.stringify(item) + " this is an item")
        return (
            <Pressable style={styles.itemContainer} onPress={() => {
                props.navigation.navigate("Items", {
                    item: item,
                    type: props.data.name,
                });
            }}>
                <View style={styles.circleStyle}>
                    <Image source={item.image} style={styles.imageStyle} />
                </View>
                <Text numberOfLines={1} style={styles.textStyle}>{item.name}</Text>
            </Pressable>
        )
    }
    // console.log(props.data.items);
    return (
        <View style={styles.container}>
            <FlatList
                key={'#'}
                data={props.data.items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={4}
                // eslint-disable-next-line react-native/no-inline-styles
                contentContainerStyle={{ justifyContent: 'space-around' }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                    return (
                        <Pressable style={styles.bottomIconStyle} onPress={() => {
                            props.navigation.navigate("Items", {
                                item: {
                                    name: "Others",
                                    image: require("../assets/images/icons/dots.png"),
                                },
                                type: props.data.name,
                            });
                        }}>
                            <View style={styles.otherContianer}>
                                <Image source={require("../assets/images/icons/dots.png")} style={styles.imageStyle} />
                            </View>
                            <Text numberOfLines={1} style={styles.textStyle}>Others</Text>

                        </Pressable>
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    bottomIconStyle: {
        marginBottom: 20,
    },
    otherContianer: {
        backgroundColor: "rgba(48, 82, 248, 1)",
        width: DEVICE_WIDTH / 7,
        height: DEVICE_WIDTH / 7,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        alignSelf: "center",
        marginTop: 20,
    },
    textStyle: {
        fontSize: 12,
        fontFamily: 'Century Gothic',
        textAlign: "center",
        marginTop: 5,
        marginHorizontal: 3,
        color: "black"
    },
    circleStyle: {
        backgroundColor: "rgba(48, 82, 248, 1)",
        borderRadius: 100,
        width: "100%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    itemContainer: {
        // width:DEVICE_WIDTH / 5.5,
        // height: DEVICE_WIDTH / 5.5,
        margin: 12,
        // padding:10,
        // alignItems:"center",
        // justifyContent:"center",
        flex: 1 / 4,
    },
    imageStyle: {
        width: "50%",
        aspectRatio: 1 / 3,
        resizeMode: "contain",
    },
    container: {
        width: DEVICE_WIDTH,
        paddingHorizontal: 30,
    },
});

export default AddItemDisplay;