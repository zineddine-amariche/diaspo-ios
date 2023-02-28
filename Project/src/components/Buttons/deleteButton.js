import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import trash from '../../Assets/Kyc/trash.png';
 
const DeleteButton = ({onDelete}) => {
  return (
    <TouchableOpacity
    onPress={onDelete}
    style={{
      position: 'absolute',
      backgroundColor: '#FFF',
      height: 40,
      width: 40,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 15,
      right: 15,
      zIndex: 100,
    }}>
    <Image source={trash} />
  </TouchableOpacity>
  )
}

export default DeleteButton

const styles = StyleSheet.create({})