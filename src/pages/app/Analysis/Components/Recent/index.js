import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Rectangle from '../../../../../components/views/Rectangle-Home'
import RectangleItem from '../../../../../components/views/Rectangle-Home-Item'

const Recent = () => {
  return (
    <Rectangle title={"Recent Transactions"} >
    <>
      <RectangleItem
        T1={"Transfered to"}
        T2={"Melicia Diya"}
        T3={""}
        date={"29 Nov 2022"}
        Price={"+ £1,200"}
      />
      <RectangleItem
        T1={"Charged for "}
        T2={"Melicia Diya"}
        T3={"chargerd"}
        date={"29 Oct 2022"}
        Price={"+ £1,300"}
      />
      <RectangleItem
        T1={"Transfered to"}
        T2={"Beatriz Charles"}
        T3={""}
        date={"29 Fev 2022"}
        Price={"+ £1,200"}
      />
    </>
  </Rectangle>
  )
}

export default Recent

const styles = StyleSheet.create({})