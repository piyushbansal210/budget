/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { View, Text, Image, Modal } from 'react-native'
import React from 'react'

export default function Loader(props) {
  return (
    <Modal
        transparent={true}
        animationType='fade'
        visible={props.loading}
        >
            <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.4)", justifyContent:"center", alignItems:"center"}}>
                <Image source={require("../assets/images/nobgline.gif")} style={{width:"40%", resizeMode:"contain", aspectRatio:1}}/>

            </View>
    </Modal>
  )
}