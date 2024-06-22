/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/splash/Splash';
import UserDetails from '../screens/UserDetails/UserDetails';
import Settings from '../screens/settings/Settings';
import Updates from '../screens/settings/Updates';
import FAQ from '../screens/settings/FAQ';
import ExportExcel from '../screens/settings/ExportExcel';
import Onboarding from '../screens/onboarding/Onboarding';
import BottomTab from './BottomTab'
import AddAmount from '../screens/addIncome/AddAmount';
import AddMoney from '../screens/addIncome/AddMoney';
import AddItem from '../screens/addItem/AddItem';
import Items from '../screens/Items/Items';
import PersonalInfo from '../screens/settings/PersonalInfo';
import EditItem from '../screens/ItemChanges/EditItem';
import Welcome from '../screens/Home/Welcome'
import RemoveItem from '../screens/removeItem/RemoveItem';
import FormatItem from '../screens/Items/FormatItem';



const Stack = createStackNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false,
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={Splash} 
        />
                <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="FormatItem" component={FormatItem}/>

        <Stack.Screen name="EditItem" component={EditItem}/>
        <Stack.Screen name="Updates" component={Updates} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="ExportExcel" component={ExportExcel} />
        <Stack.Screen name="AddItem" component={AddItem}/>
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="RemoveItems" component={RemoveItem} />

        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="Welcome" component={Welcome}/>



        
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="AddAmount" component={AddAmount} />
        <Stack.Screen name="AddMoney" component={AddMoney} />


        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}