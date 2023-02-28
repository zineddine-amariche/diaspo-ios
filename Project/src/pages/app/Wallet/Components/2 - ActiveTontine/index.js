import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Rectangle from '../../../../../components/views/Rectangle';
import {COLORS} from '../../../../../theme';
import {Txt} from '../../../../../components/utils';
import Space from '../../../../../components/Space';
import Item from './components/RenderItemsTontine';
import HView from '../../../../../components/views/HView/HView';
import {
  PrimaryButton,
  PrimaryButtonLinear,
} from '../../../../../components/Buttons';
import {useSelector} from 'react-redux';
const ActiveTontine = ({navigation}) => {
  const {tontines} = useSelector(state => ({
    ...state.tontines,
  }));

  const Filter = tontines?.ProjectLists?.filter(item => {
    return item.status.includes('ACTIVATED');
  });
  const reversedArray = Filter?.slice().reverse();
  // console.log('reversedArray', reversedArray)
  let SliceData = reversedArray?.slice(0, 2);
  return (
    <Rectangle elevation={0.2} style={{paddingVertical: 10, width: '90%'}}>
      <View style={{paddingHorizontal: 20}}>
        <Space />
        <HView spaceBetween style={{alignItems: 'center'}}>
          <Txt
            color={COLORS.blueGreen}
            fontSize={17}
          //  fontFamily="Poppins-Bold"
            style={{marginTop: 3}}>
            {'Active Tontines'}
          </Txt>

          {SliceData?.length ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Tontine');
              }}>
              <Txt color={COLORS.orangeYellow} fontSize={12}>
                View all 8 tontines
              </Txt>
            </TouchableOpacity>
          ) : null}
        </HView>
        <Space />

         {     tontines?.ProjectLists?.length ?
         
        <>
          {SliceData?.map((i, index) => {
            return (
              <View key={index}>
                <Item item={i} />
              </View>
            );
          })}
        </>
        : <View style={{flex:1, padding:20,justifyContent:"center" , alignItems:"center"}}>
          <Txt fontSize={13} color={COLORS.silver}>no active tontine</Txt>
        </View>
        }

      </View>

      <PrimaryButton
        width={'90%'}
        style={{alignSelf: 'center'}}
        textTransform="uppercase"
        onPress={() => {
          navigation.navigate('CreateTontine', {ind: 0});
        }}>
        create a new tontine
      </PrimaryButton>
    </Rectangle>
  );
};

export default ActiveTontine;

const styles = StyleSheet.create({
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  wrapper: {
    height: 280,
  },
});
// <Rectangle
//   title={"LAST DISCOUNTS"}
//   sousTitre={" (coming soon)"}
//   style={{ paddingVertical: 10 }}
// >
{
  /* <Image source={banner} />
   */
}
{
  /* </Rectangle> */
}
