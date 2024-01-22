import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HView from '../../../../../components/views/HView/HView'
import { Txt } from '../../../../../components/utils'
import icon24Info from "../../../../../Assets/Img/icon24Info.png";
import Space from '../../../../../components/Space';
import { COLORS } from '../../../../../theme';

const AcceptTerms = () => {
  return (
    <>
    <Space space={20} />

    <HView>
      <Image source={icon24Info} style={{ marginRight: 10 }} />
      <Txt style={styles.bodyText}>By creating an account, you agree to</Txt>
    </HView>
    <>
      <Txt style={styles.copyrightText}>
        Diaspo’s Terms of Service and Privacy Policy.
      </Txt>
    </>
    <Space space={20} />
  </>
  )
}

export default AcceptTerms

const styles = StyleSheet.create({
    copyrightText: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.orangeYellow,
        paddingLeft: 26,
      },
      bodyText: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.slateGrey,
        textAlign: "center",
      },
})