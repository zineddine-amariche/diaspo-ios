import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../../../../theme';
import {Txt} from '../../../../../../../../components/utils';
import Space from '../../../../../../../../components/Space';
import {PrimaryButtonLinear} from '../../../../../../../../components/Buttons';
import Loader from './Loader';

const BottomConfirmButton = ({
  ARR,
  laoder,
  GlobalBen,
  projectId,
  GlobalBen2,
  loading,
  navigation,
  index,
  type,
  token,
  title,
  routeData,
  showPopUp,
}) => {

  return (
    <>
      {ARR?.length ? (
        !laoder ? (
          <View style={styles.containerButton}>
            <View style={{flex:1}}>
                {ARR?.length ? (
                  <Txt
                    fontSize={17}
                    //fontFamily={"Roboto-Bold"}
                  >
                    {ARR?.length} people selected
                  </Txt>
                ) : null}

                <Space space={8} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ListBéneféciare', {
                      GlobalBen,
                      GlobalBen2,
                      ARR,
                      ind: index,
                      projectId,
                      type,
                      title,
                      routeData,
                    });
                    // console.log('projectId', projectId)
                  }}
                  disabled={ARR.length !== 0 ? false : true}>
                  <Txt fontSize={14} color={COLORS.orangeYellow}>
                    View the selected list
                  </Txt>
                </TouchableOpacity>
            </View>

              <PrimaryButtonLinear
                loading={loading}
                disabled={true}
                width={'40%'}
                onPress={() => {
                  showPopUp();
                }}>
                confirm
              </PrimaryButtonLinear>
          </View>
        ) : (
          <Loader />
        )
      ) : null}
    </>
  );
};

export default BottomConfirmButton;

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS=="ios"?30: 20,
    paddingHorizontal: Platform.OS=="ios"?30: 20
  },
  rowButtons: {
    paddingTop: 15,
  },
});
