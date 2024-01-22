import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HView from '../../../../../../components/views/HView/HView';
import Rectangle from '../../../../../../components/views/Rectangle';
import {Txt} from '../../../../../../components/utils';
import {COLORS} from '../../../../../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Space from '../../../../../../components/Space';

const MainAccount = ({Visible, onPress, Change, price}) => {
  return (
    <Rectangle style={styles.Rectangle} width="90%">
      <HView spaceBetween style={{paddingHorizontal: 20, paddingVertical: 5}}>
        <View style={{height: 50, justifyContent: 'space-between'}}>
          <Txt color={COLORS.black}>From:</Txt>
          <Space space={20} />
          <TouchableOpacity onPress={onPress}>
            <HView>
              <Txt color={COLORS.orangeYellow}>
                {Change ? Change : 'DIASPO ACCOUNT'}
              </Txt>

              <AntDesign
                name="caretdown"
                size={16}
                style={{
                  transform: [{rotate: Visible ? '180deg' : '0deg'}],
                  color: COLORS.orangeYellow,
                  marginLeft: 10,
                }}
              />
            </HView>
          </TouchableOpacity>
        </View>

        <View style={styles.RightBox}>
          <Txt fontSize={24} Bold="700" lineHeight={30}>
            {price ? price : '32,589.50'}
          </Txt>
          <Txt color={COLORS.greyblue}>euro</Txt>
        </View>
      </HView>
      <Space space={30} />
    </Rectangle>
  );
};

export default MainAccount;

const styles = StyleSheet.create({
  LeftButtonTab: {
    width: '50%',
    flex: 1,
    alignItems: 'center',
  },
  RightButtonTab: {
    width: '50%',
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
  },
  Tab: {
    height: 30,
    marginTop: 20,
    flexDirection: 'row',
  },
  line: {
    height: 3,
    width: '100%',
    backgroundColor: COLORS.blueGreen,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  Rectangle: {
    backgroundColor: '#FFF',
    paddingTop: 10,
  },
  RightBox: {
    alignItems: 'flex-end',
    height: 50,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '900',
    fontSize: 18,
  },
});
