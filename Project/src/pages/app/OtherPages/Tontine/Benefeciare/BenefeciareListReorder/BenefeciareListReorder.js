import React, {useEffect} from 'react';
import {View, SafeAreaView, StatusBar, Image, Platform} from 'react-native';

import ImgBack from '../../../../../../Assets/Img/HomeBack.png';
import SecondaryHeader from '../../../../../../components/Headers/root/SecondaryHeader';
import Space from '../../../../../../components/Space';
import {COLORS} from '../../../../../../theme';
import Line from '../../../../../../components/views/line';

import {PrimaryButtonLinear} from '../../../../../../components/Buttons';

import {
  deleteSelectedList,
  deleteToReoderListBeneficiary,
  resetBeneficaire,
} from '../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare';
import UseDraggebleFlatList from '../../../../../../components/DraggebleFlatList';
import ModelConfirmReorder from './components/Models/Model.ConfirmReorder';
import {useReoder} from './Hooks';
import {getBeneficiaries} from '../../../../../../redux/Features/Tontine/Participants/getBeneficiaires/slice';
import {useSelector} from 'react-redux';
import Spiner from '../../../../../../components/spiner';
import styles from './styles';

const durationMs = 1350;

const BenefeciareListReorder = ({navigation, route}) => {
  const {success2, onDissmis2, onSuccess2, pressNo, pressYes, dispatch} =
    useReoder();

  const {ListToReorder} = useSelector(state => state.beneficaire);

  // console.log('ListToReorder', ListToReorder)
  const {projectId, title, routeData, confirmbtn} = route.params;
  const {isSuccess, isError, data, isLoading, message} = useSelector(state => ({
    ...state.benef,
  }));
  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let object = {
    projectId: projectId,
    token: user?.AccessToken,
  };

  useEffect(() => {
    dispatch(getBeneficiaries(projectId));
  }, [projectId, dispatch, title]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      {isLoading ? (
        <Spiner></Spiner>
      ) : (
        <>
          <SecondaryHeader
            Cancel="Return"
            goBack={() => {
              navigation.navigate('InfoScreenTontine', {
                routeData: '',
                projectId,
                object,
              });
              setTimeout(
                () =>
                  dispatch(
                    resetBeneficaire(),
                    dispatch(deleteToReoderListBeneficiary()),
                    dispatch(deleteSelectedList()),
                  ),
                durationMs,
              );
            }}
            title={title ? title : 'Set Beneficiary Order'}
          />

          <>
            <UseDraggebleFlatList DataV={data?.data?.beneficiaries} />
            <Space space={180} />
          </>

          <View style={styles.containerButton}>
            {confirmbtn ? (
              <PrimaryButtonLinear
                disabled={ListToReorder?.length == 0 ? false : true}
                onPress={() => {
                  onSuccess2();
                }}
                width={'100%'}>
                Confirm
              </PrimaryButtonLinear>
            ) : (
              <PrimaryButtonLinear
                disabled={true}
                onPress={() => {
                  onSuccess2();
                }}
                width={'100%'}>
                Finish And Send Invitation
              </PrimaryButtonLinear>
            )}


            {/* <Space space={25} /> */}
            {/* <Line color={COLORS.black} /> */}
          </View>
        </>
      )}
      <ModelConfirmReorder
        onDissmis2={onDissmis2}
        success2={success2}
        pressYes={pressYes}
        pressNo={pressNo}
        navigation={navigation}
        projectId={projectId}
        routeData={routeData}
        confirmbtn={confirmbtn}
      />
    </SafeAreaView>
  );
};
export default BenefeciareListReorder;
