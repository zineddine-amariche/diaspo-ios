import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../theme'

const HeaderView = () => {
  return (
    <View
    style={{
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        height: 6,
        width: 60,
        backgroundColor: COLORS.blueGreen,
        borderRadius: 4,
      }}></View>
  </View>
  )
}

export default HeaderView

const styles = StyleSheet.create({})