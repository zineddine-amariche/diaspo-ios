import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../theme';
import {Head, Txt} from '../../utils';
import icon24ChevronLeftDefault from '../../../Assets/Img/icon24ChevronLeftDefault.png';
import Search from '../../../Assets/Img/icon24Search.png';
import Space from '../../Space';

const SecondaryHeader = ({
  goBack,
  sousTontine,
  title,
  sousTitre,
  Cancel,
  Save,
  Notifications,
  onSearch,
  visible,
  colorText,
  TextIn,
  BackgroundColorText,
}) => {
  return (
    <View style={[styles.header]}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Image source={icon24ChevronLeftDefault} />
          {Cancel && <Txt color={COLORS.white}>{Cancel}</Txt>}
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <View width={'100%'} style={{alignItems: 'center'}}>
            <Head color={COLORS.white} fontSize={15} numberOfLines={1}>
              {title}
            </Head>
          </View>
          {sousTitre ? (
            <Txt fontSize={14} color={COLORS.white}>
              {sousTitre}
            </Txt>
          ) : null}

          <Space space={3} />

          {sousTontine ? (
            <View
              style={{
                backgroundColor: BackgroundColorText,
                paddingHorizontal: 10,
                borderRadius: 8,
                paddingVertical: 3,
              }}>
              <Txt fontSize={14} color={colorText}>
                Tontine {TextIn}
              </Txt>
            </View>
          ) : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={Save}>
          {Cancel && Save ? <Txt color={COLORS.white}>Save</Txt> : null}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSearch}>
          {Notifications && <Image source={Search} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 30,
    zIndex: 999,
  },
  button: {
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    paddingRight: 40,
  },
});
