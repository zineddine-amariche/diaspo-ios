import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Head, Txt} from '../../../../../../components/utils';
import {COLORS} from '../../../../../../theme';

const CardUser = ({item, index,setFieldValue,closeDrawer, length, user1}) => {
  // console.log('item?.phoneNumbers[0].number', JSON.stringify(item?.phoneNumbers[0]?.number))
  
  
  let num = user1 ? item?.phoneNumbers : item?.phoneNumbers[0]?.number
  let adresse  = user1 ? '' : item?.postalAddresses[0]?.country
  return (
    <>
      <TouchableOpacity
        style={styles.Container}
        onPress={() => {
          // console.log('item', item);
          setFieldValue('from',`${item.familyName} ${item.givenName}`)
          setFieldValue('phone',`${num}`)
          // setFieldValue('Country',`${adresse}`)
          closeDrawer()
        }}>
        <View>
          <Image
            source={item.thumbnailPath}
            style={styles.Img}
            resizeMode="contain"
          />
        </View>
        <View>
          <Head fontSize={17} color={COLORS.darkBlueGrey}>
            {item.familyName} {item.givenName}
          </Head>
          <Txt fontSize={12} color={COLORS.coolGrey}>
            {user1 ? item?.phoneNumbers : item?.phoneNumbers[0]?.number}
          </Txt>
        </View>
      </TouchableOpacity>
      {index === length - 1 ? null : (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: COLORS.silverTwo,
          }}></View>
      )}
    </>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  Img: {
    marginRight: 20,
    borderRadius: 5,
    height: 40,
    width: 40,
  },
});
