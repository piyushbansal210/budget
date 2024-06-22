/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable space-infix-ops */
/* eslint-disable react/self-closing-comp */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native'
import React from 'react'

export default function Screen({children}) {
  return (
    <SafeAreaView style={styles.container}>
        {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        // marginTop: Platform.OS === 'ios' ?0: StatusBar.currentHeight,
    },
})