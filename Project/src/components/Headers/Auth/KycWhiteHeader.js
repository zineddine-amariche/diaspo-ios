import {TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../theme';
import Space from '../../Space';
import {Txt} from '../../utils';
import React, {useState} from 'react';

const WhiteHeader = ({onClose, title, isClose}) => {
  return (
    <>
     {isClose === false ? <View></View> : (   
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginTop:20
        }}>
     
          <View style={{width: '30%'}}>
            <TouchableOpacity onPress={onClose}>
              <Txt color={COLORS.orangeYellow}>Close</Txt>
            </TouchableOpacity>
          </View>
      
    
      </View>
        )
      }
    </>
  );
};

export default WhiteHeader;

 {/* <Space space={20} /> */}
    {/* <View>
          <Txt color={COLORS.blueGreen}>{title}</Txt>
        </View> */}
