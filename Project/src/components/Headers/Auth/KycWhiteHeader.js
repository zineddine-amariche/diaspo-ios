import { TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../theme";
import Space from "../../Space";
import { Txt } from "../../utils";
import React, { useState } from 'react';

const WhiteHeader = ({onClose,title}) => {
    return (
      <>
        <Space space={20} />
        <View
          style={{
            backgroundColor: '#FFF',
            width: '100%',
            flexDirection: 'row',
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}>
          <View style={{width: '30%'}}>
            <TouchableOpacity 
              onPress={onClose}
            >
              <Txt color={COLORS.orangeYellow}>Close</Txt>
            </TouchableOpacity>
          </View>
          <View>
            <Txt color={COLORS.blueGreen}>{title}</Txt>
          </View>
        </View>
      </>
    );
  };

  export default WhiteHeader