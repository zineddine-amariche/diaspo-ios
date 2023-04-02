import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Txt} from '../../../../../../../../components/utils';
import {COLORS} from '../../../../../../../../theme';
import {PrimaryButtonLinear} from '../../../../../../../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import {addPayersList} from '../../../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import Space from '../../../../../../../../components/Space';
import {ActivityIndicator} from 'react-native-paper';

const BottomConfirmBTN = ({
  GlobalBen,
  GlobalBen2,
  GlobalBen3,
  ARR,
  index,
  projectId,
  type,
  laoder,
  onSuccess2,
  navigation,
  routeData,
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
                  // fontFamily={'Roboto-Bold'}
                >
                  {ARR?.length} people selected
                </Txt>
              ) : null}

              <Space space={8} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ListPayer', {
                    GlobalBen,
                    GlobalBen2,
                    GlobalBen3,
                    ARR,
                    ind: index,
                    projectId,
                    type,
                    routeData,
                  });
                }}>
                <Txt fontSize={14} color={COLORS.orangeYellow}>
                  View the selected list
                </Txt>
              </TouchableOpacity>
            </View>
            {/* confirm btn */}
            <CustomConfirmButton
              addPayersList={addPayersList}
              onSuccess2={onSuccess2}
              type={type}
              ARR={ARR}
            />
          </View>
        ) : (
          <CustomSpiner />
        )
      ) : null}
    </>
  );
};

export default BottomConfirmBTN;

const CustomConfirmButton = ({
  addPayersList,
  onSuccess2,
  type,
  ARR,
}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => ({
    ...state.createParticipants,
  }));

  return (
    <PrimaryButtonLinear
      disabled={type}
      width={'40%'}
      onPress={() => {
        dispatch(addPayersList(ARR));
        onSuccess2();
      }}
      loading={isLoading}>
      confirm
    </PrimaryButtonLinear>
  );
};

const CustomSpiner = () => {
  return (
    <View
      style={{
        height: 110,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={COLORS.blueGreen} size="small" />
    </View>
  );
};
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
