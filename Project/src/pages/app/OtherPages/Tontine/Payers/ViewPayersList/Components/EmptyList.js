import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Txt } from '../../../../../../../components/utils'

const EmptyList = () => {
  return (
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Txt textTransform={"none"}>Payers list is empty </Txt>
  </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})