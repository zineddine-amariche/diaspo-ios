import {Image, Platform, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../../theme';
import searchImg from '../../../../../../Assets/Img/icodn24SearchDefault.png';

import Space from '../../../../../../components/Space';
import FormC3 from '../ContactsForms/FormC3';

const RenderAppUsers = ({ContactsPhone,closeDrawer,setFieldValue}) => {
  return (
    <View
      style={{
        flex: 1,
        
      }}>

      <View style={{flex: 1, backgroundColor:COLORS.white}}>
        <View
          style={{
            backgroundColor: COLORS.finished,
            justifyContent: 'center',
            marginHorizontal: 20,
            borderRadius: 5,
            marginTop: 20,
          }}>
          <Image
            source={searchImg}
            style={{position: 'absolute', marginLeft: 10}}
          />
          <TextInput
            placeholder="Search for name or phone number"
            style={{
              paddingLeft: 40,
              paddingVertical: Platform.OS == 'ios' ? 18 : 7,
            }}
          />
        </View>
        <Space space={20} />

        <View
          style={{
            backgroundColor: !ContactsPhone?.length
              ? COLORS.white
              : COLORS.finished,
            padding: 16,

          }}>
          <FormC3 ContactsPhone={ContactsPhone} closeDrawer={closeDrawer} setFieldValue={setFieldValue} openedPercentage={0.85} />
          <Space space={100}/>
        </View>
      </View>
    </View>
  );
};

export default RenderAppUsers;

const styles = StyleSheet.create({
  Tab: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  LeftButtonTab: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 20,
  },
  RightButtonTab: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 20,
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
});
