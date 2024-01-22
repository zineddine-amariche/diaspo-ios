import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Txt } from '../../../../../components/utils'
import { COLORS } from '../../../../../theme'

const TextSteps = () => {
  return (
    <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              marginRight: 20,
            }}>
            <Txt color={COLORS.BlackModal} fontSize={14}>
              Selfie
            </Txt>
            <Txt color={COLORS.BlackModal} fontSize={14}>
              photo
            </Txt>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              //  marginHorizon:20
              marginLeft: 30,
            }}>
            <Txt
              color={COLORS.gray}
              fontSize={14}
              Bold="400"
              // fontFamily={'Oxygen-Regular'}
              >
              Identity
            </Txt>
            <Txt
              color={COLORS.gray}
              fontSize={14}
              Bold="400"
              // fontFamily={'Oxygen-Regular'}
              >
              document
            </Txt>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              marginLeft: 20,
            }}>
            <Txt
              color={COLORS.gray}
              fontSize={14}
              Bold="400"
              // fontFamily={'Oxygen-Regular'}
              >
              Proof
            </Txt>
            <Txt
              color={COLORS.gray}
              fontSize={14}
              Bold="400"
              // fontFamily={'Oxygen-Regular'}
              >
              of address
            </Txt>
          </View>
        </View>
  )
}

export default TextSteps

const styles = StyleSheet.create({})