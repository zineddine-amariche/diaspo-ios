import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreatedSuccess from '../../../../../../../components/views/Layouts/AuthLayout/Model'
import { Head, Txt } from '../../../../../../../components/utils'
import Space from '../../../../../../../components/Space'
import HView from '../../../../../../../components/views/HView/HView'
import { PaleGreyButton, PrimaryButtonLinear } from '../../../../../../../components/Buttons'

const ModelRemove = ({success,onDissmis}) => {
  return (
    <CreatedSuccess Visible={success} onDissmis={onDissmis}>
    {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
  </CreatedSuccess>
  )
}

export default ModelRemove

const styles = StyleSheet.create({})


const BodyModel = ({ onDissmis }) => {
    return (
      <View style={styles.ModelContainer}>
        {/* <Image source={illusphone} style={{ width: "100%" }} /> */}
  
        <Head
        //  fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
        >
          Confirm to remove
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: "center",
            //fontFamily: "Poppins-SemiBold",
          }}
        >
          Are you sure to remove Colin{" "}
          <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
            Christopher{" "}
          </Txt>
          from your non-user list? .
        </Txt>
        <Space></Space>
        <HView width={"100"} spaceBetween>
          <PaleGreyButton width={"48%"} onPress={onDissmis}>
            cancel
          </PaleGreyButton>
          <PrimaryButtonLinear width={"48%"} disabled onPress={onDissmis}>
            remove
          </PrimaryButtonLinear>
        </HView>
      </View>
    );
  };