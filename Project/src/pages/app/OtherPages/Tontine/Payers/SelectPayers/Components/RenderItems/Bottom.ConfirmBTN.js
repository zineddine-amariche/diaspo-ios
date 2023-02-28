import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HView from '../../../../../../../../components/views/HView/HView';
import {Txt} from '../../../../../../../../components/utils';
import {COLORS} from '../../../../../../../../theme';
import {PrimaryButtonLinear} from '../../../../../../../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import {addPayersList} from '../../../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import Space from '../../../../../../../../components/Space';
import {ActivityIndicator} from 'react-native-paper';
import Line from '../../../../../../../../components/views/line';

const BottomConfirmBTN = ({
  GlobalBen,
  GlobalBen2,
  GlobalBen3,
  ARR,
  index,
  projectId,
  type,
  laoder,
  loadingPayers,
  onSuccess2,
  navigation,
  NavToCnfPayer,
  routeData,
}) => {
  const {isError, isLoading, message, isCanAddBeneficiary} = useSelector(
    state => ({
      ...state.BeneficiariesCheck,
    }),
  );
  return (
    <>
      {ARR?.length ? (
        !laoder ? (
          <View style={styles.containerButton}>
            <HView spaceBetween style={styles.rowButtons}>
              <View>
                {ARR?.length ? (
                  <Txt fontSize={17} 
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
                NavToCnfPayer={NavToCnfPayer}
                isCanAddBeneficiary={isCanAddBeneficiary}
                loadingPayers={loadingPayers}
                type={type}
                ARR={ARR}
              />
            </HView>
            <Space space={25} />
            <Line color={COLORS.black} />
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
  NavToCnfPayer,
  isCanAddBeneficiary,
  loadingPayers,
  type,
  ARR,
}) => {
  const dispatch = useDispatch();

  return (
    <PrimaryButtonLinear
      disabled={type}
      width={'40%'}
      onPress={() => {
        dispatch(addPayersList(ARR));
        onSuccess2();
      }}
      loading={loadingPayers}>
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
    width: '100%',
    paddingHorizontal: 20,
    height: 110,
    backgroundColor: COLORS.white,
  },
  rowButtons: {
    paddingTop: 15,
  },
});
