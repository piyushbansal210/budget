/* eslint-disable keyword-spacing */
/* eslint-disable eol-last */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { View, Text, StatusBar, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import FAQItem from '../../components/FAQItem'
import HeaderBack from '../../components/HeaderBack'
import Screen from '../../components/Screen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default function FAQ(props) {

    const data = [
        {
            id:1,
            question:"What kind of transactions can I track with this app?",
            answer:"You can track all your income and expenses, including cash, debit card, credit card, and bank transfers.",
        },
        {
            id:2,
            question:"How do I categorize my transactions?",
            answer:"The app provides pre-defined categories for common expenses and income sources. You can also create custom categories to suit your needs.",
        },
        {
            id:3,
            question:"Can I set budgets for different categories?",
            answer:"Yes, you can set spending limits for each category to help you stay on track with your financial goals.",
        },
        {
            id:4,
            question:"Is my financial data safe with this app?",
            answer:"Yes, your data is protected by industry-standard security measures, including encryption and secure login protocols.",
        },
        {
            id:5,
            question:"What happens to my data if I uninstall the app?",
            answer:"our data will be deleted from our servers upon uninstalling the app, unless you choose to back it up beforehand.",
        },
        {
            id:6,
            question:"Does the app offer any budgeting tips or financial advice?",
            answer:"The app may offer basic budgeting tips or resources within the app. For personalized financial advice, we recommend consulting a financial advisor.",
        },
        {
            id:7,
            question:"Can I back up my data?",
            answer:"Yes, you can back up your data to a secure cloud storage option.",
        },
        {
            id:8,
            question:"How do I add a new income or expense?",
            answer:"Simply enter the amount, date, category, and any optional notes for the transaction. You can also add a picture of a receipt if needed.",
        },

    ]

    const renderItem = ()=>{
        return(
            <View style={styles.headerFlatlistStyle}>
                <Image source={require("../../assets/images/FAQLogo.png")} style={styles.onboardImageStyle}/>
                <Text style={styles.imageTextStyle}>frequently{"\n"}asked questions</Text>
            </View>
        )
    }
  return (
    <Screen>
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"}   barStyle={'dark-content'} />
            <View style={styles.headerStyle}>
                <HeaderBack name="FAQ's"  navigation={props.navigation}/>
            </View>
            <FlatList
                data = {data}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=><FAQItem data = {item} length = {data.length}/>}
                keyExtractor={(item)=>item.id}
                ListHeaderComponent={renderItem}
                style={styles.flatListStyling}
            />
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    headerStyle:{
        marginTop:15,
        marginBottom:10,
    },
    onboardImageStyle:{
        height:DEVICE_HEIGHT / 5,
        aspectRatio:1,
        alignSelf:"center",
    },
    imageTextStyle:{
        fontFamily:"Inter-Medium",
        fontSize:15,
        textTransform:"uppercase",
        textAlign:"center",
    },
    flatListStyling:{
        paddingTop:40,
    },
    headerBackButton:{

    },
    headertextButton:{

    },
    headerFlatlistStyle:{
        marginBottom:40,
    }
})