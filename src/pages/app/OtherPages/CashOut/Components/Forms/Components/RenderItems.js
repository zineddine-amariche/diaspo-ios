import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Txt} from '../../../../../../../components/utils';
import HView from '../../../../../../../components/views/HView/HView';
import {COLORS} from '../../../../../../../theme';
import {Image} from 'react-native';
import RadioInput from '../../../../../../../components/radionButton';

const RenderItemsWalletConnection = ({
  T2,
  source,
  item,
  checked,
  ChangeCheck,
  disable,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: disable ? COLORS.finished : COLORS.paleGrey,
          marginTop: 8,
          padding: 10,
          borderRadius: 8,
        }}
        onPress={() => {
          if (disable) {
            return;
          } else {
            ChangeCheck(item.T2);
          }
        }}>
        <HView
          spaceBetween
          style={{
            justifyContent: 'space-between',
          }}>
          <HView
            style={{
              borderRadius: 6,
              marginVertical: 5,
            }}>
            <Image source={source} style={{marginRight: 10}} />
            <View style={{}}>
              <Txt fontSize={16} color={COLORS.darkBlueGrey}>
                {T2}
              </Txt>
            </View>
          </HView>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <RadioInput
              onPress={() => {
                if (disable) {
                  return;
                } else {
                  ChangeCheck(item.T2);
                }
              }}
              disable={false}
              checked={checked == item.T2 ? true : false}
            />
          </View>
        </HView>
      </TouchableOpacity>
    </>
  );
};

export default RenderItemsWalletConnection;

const styles = StyleSheet.create({
  item: {
    justifyContent: 'space-between',
  },
});
