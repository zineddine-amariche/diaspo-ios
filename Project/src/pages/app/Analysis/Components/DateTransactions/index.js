import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {COLORS} from '../../../../../theme';
import HView from '../../../../../components/views/HView/HView';
import {Txt} from '../../../../../components/utils';
import SimpleView from '../../../../../components/views/Card-Simple-Radius-8';
import Space from '../../../../../components/Space';
import {Image} from 'react-native';

import downRow from '../../../../../Assets/Img/icon16ChevronBottomDefault.png';
import {TouchableOpacity} from 'react-native';
import {Platform} from 'react-native';
import {UIManager} from 'react-native';
import {useState} from 'react';
import {LayoutAnimation} from 'react-native';

const data = [
  {
    transferd: 'Melicia Diya ',
    date: '29 Jan 2020',
    type: 'Food & Drink',
    price: 1.222,
    url: require('../../../../../Assets/Img/TAG1.png'),
  },
  {
    transferd: 'Fatima Cleaning Service',
    date: '29 Jan 2020',
    type: 'Food & Drink',
    price: 1.222,
    url: require('../../../../../Assets/Img/TAG2.png'),
  },
  {
    transferd: 'Beatriz Charles',
    date: '29 Jan 2020',
    type: null,
    price: 1.222,
    url: null,
  },
  {
    transferd: ' Beatriz Charles',
    date: '29 Jan 2020',
    type: 'Food & Drink',
    price: 1.222,
    url: require('../../../../../Assets/Img/TAG3.png'),
  },
];
const DateTransactions = ({onOpen}) => {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <SimpleView>
      <HView style={styles.Hview} spaceBetween>
        <View>
          <View
            style={[
              styles.dateBox,
              {backgroundColor: isOpen ? COLORS.blueGreen : COLORS.paleGrey},
            ]}>
            <Txt
              fontSize={14}
              Bold="700"
              color={isOpen ? COLORS.white : COLORS.blueGreen}>
              16-20, April 2020
            </Txt>
          </View>
          <Space space={20} />
          {!isOpen && (
            <TouchableOpacity onPress={toggleOpen}>
              <HView style={{alignItems: 'center'}}>
                <Txt color={COLORS.orangeYellow}> View detail</Txt>
                <Image source={downRow} style={{marginLeft: 10}} />
              </HView>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.boxPrices}>
          <Txt color={COLORS.greenishTeal}>+ £1,200</Txt>
          <Space space={4}></Space>
          <Txt color={COLORS.coral}>- £270</Txt>
          <Space space={4}></Space>
          <Txt color={COLORS.slateGrey}>{data.length} transactions</Txt>
        </View>
      </HView>
      {isOpen && <Space space={20} />}
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <RenderItems item={item} isOpen={isOpen} onOpen={onOpen} />
            </View>
          );
        })}
      </View>
      <Space />

      {isOpen && (
        <TouchableOpacity onPress={toggleOpen} style={{paddingHorizontal: 20}}>
          <HView style={{alignItems: 'center'}}>
            <Txt color={COLORS.orangeYellow}> Collapse</Txt>
            <Image
              source={downRow}
              style={{
                marginLeft: 10,
                transform: [{rotate: !isOpen ? '180deg' : '0deg'}],
              }}
            />
          </HView>
        </TouchableOpacity>
      )}
    </SimpleView>
  );
};

export default DateTransactions;

const RenderItems = ({item, isOpen, onOpen}) => {
  return (
    <HView style={styles.renderItem} spaceBetween>
      <View style={{width: '70%'}}>
        <Txt fontSize={15} numberOfLines={1}>
          Transfered to : <Txt color={COLORS.black}>{item.transferd}</Txt>{' '}
        </Txt>
        <Txt fontSize={12} color={COLORS.coolGrey}>
          29 Nov 2022
        </Txt>
        <HView style={{alignItems: 'center'}}>
          {item.url ? (
            <Image
              source={item.url}
              style={{height: 20, width: 20, marginRight: 5, marginTop: 3}}
            />
          ) : (
            <TouchableOpacity
              style={{marginRight: 10, marginTop: 5}}
              onPress={onOpen}>
              <Txt
                color={COLORS.orangeYellow}
                // fontFamily={'Poppins-Bold'}
                fontSize={12}>
                Add Tag
              </Txt>
            </TouchableOpacity>
          )}
          <Txt>{item.type}</Txt>
        </HView>
      </View>
      <View>
        <Txt fontSize={17}>- £ {item.price}</Txt>
      </View>
    </HView>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    borderRadius: 4,
    backgroundColor: COLORS.paleGrey,
    padding: 8,
  },
  Hview: {
    paddingHorizontal: 20,
  },
  boxPrices: {
    alignItems: 'flex-end',
  },
  renderItem: {
    backgroundColor: COLORS.paleGreyTwo,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 4,
  },
  hidden: {
    display: 'none',
  },
  list: {
    display: 'flex',
  },
});
