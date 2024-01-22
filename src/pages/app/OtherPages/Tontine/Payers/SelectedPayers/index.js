import React, {useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView, Image, Platform} from 'react-native';
import {PrimaryButtonLinear} from '../../../../../../components/Buttons';
import Space from '../../../../../../components/Space';
import * as _ from '../../../../../../components/utils';
import {COLORS, SIZES} from '../../../../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import thumbnailPath from '../../../../../../Assets/Img/ContactsUser.png';
import Rectangle from '../../../../../../components/views/Rectangle';
import {TouchableOpacity} from 'react-native';
import UseCheckBoxElements from '../../../../../../components/checkBox/useCheckBoxElements';
import ModelConfirmCreatePayers from '../Components/models/Model.ConfirmCreatePayers';
import ModelUseAsBeneficiary from '../Components/models/Model.useAsBeneficiary';
import ReturnHeader from '../../../../../../components/Headers/root/ReturnHeader';
import {UsePayers} from '../Hooks/UsePayers';

const ListPayer = ({navigation, route}) => {
  const {GlobalBen, GlobalBen2, GlobalBen3, ARR, projectId, type} =
    route.params;

  const [success, setsuccess] = useState(false);
  const {selectedconnectUser} = useSelector(state => ({
    ...state.payers,
  }));
  const {isLoading} = useSelector(state => ({
    ...state.createParticipants,
  }));

  const dispatch = useDispatch();
  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const {createPayers, createBenef} = UsePayers();

  const [showModelUseAsbenef, setshowModelUseAsbenef] = useState(false);

  const closeModelUseAsbenef = useCallback(() => {
    setshowModelUseAsbenef(false);
  }, []);

  const openModelConfirmCreatePayers = useCallback(() => {
    setshowModelUseAsbenef(true);
  }, []);

  const handleOnPressYes = () => {
    setshowModelUseAsbenef(false);
    setTimeout(() => {
      
      onSuccess();
    }, 500);
  };

  return (
    <ReturnHeader
      title={'Selected Payers'}
      sousTitre={`${ARR?.length} people selected`}
      goBack={() => {
        navigation.navigate('Payer', {projectId, type});
      }}>
      <>
        <ScrollView
          contentContainerStyle={{width: SIZES.width}}
          showsVerticalScrollIndicator={false}>
          <Space space={15} />
          <View style={{paddingHorizontal: 20,
            shadowColor: '#171717',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,}}>
            <Rectangle width="100%" style={{paddingVertical: 10,}}>
              <Content1 GlobalBen={GlobalBen} GlobalBen2={GlobalBen2} />
              <Content3 GlobalBen3={GlobalBen3} GlobalBen2={GlobalBen2} />
              <Content2 GlobalBen2={GlobalBen2} />
            </Rectangle>
            <Space />
          </View>
        </ScrollView>
        <Space space={120} />
      </>

      <View style={styles.containerButton}>
        <PrimaryButtonLinear
          disabled={true}
          onPress={() => {
            openModelConfirmCreatePayers();
          }}
          width={'100%'}
          loading={isLoading}>
          confirm
        </PrimaryButtonLinear>
      </View>

      <ModelUseAsBeneficiary
        success2={success}
        onDissmis2={onDissmis}
        NavToCnfBenef={() => {
          let props = {
            selectedconnectUser,
            GlobalBen,
            projectId,
          };
          createBenef(props);
        }}
        NavToCnfPayer={() => {
          let props = {
            selectedconnectUser,
            GlobalBen,
            type,
            projectId,
          };
          createPayers(props);
        }}
      />

      <ModelConfirmCreatePayers
        success={showModelUseAsbenef}
        onDissmis={closeModelUseAsbenef}
        pressNo={closeModelUseAsbenef}
        pressYes={handleOnPressYes}
      />
    </ReturnHeader>
  );
};
export default ListPayer;

const Content1 = ({GlobalBen, GlobalBen2}) => {
  return GlobalBen?.map((i, index) => {
    return (
      <View key={index} style={{}}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              // handleOnChange(index, item);
            }}>
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '57%'}}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}>
                {i.firstName} {i.lastName}
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i.mobileNumber}
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen?.length - 1 && !GlobalBen2.length ? null : (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.silverTwo,
              }}></View>
          )}
        </>
      </View>
    );
  });
};

const Content3 = ({GlobalBen3, GlobalBen2}) => {
  return GlobalBen3?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              // handleOnChange(index, item);
            }}>
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '57%'}}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}>
                Pippa Rachel
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i.mobileNumber}
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen3?.length - 1 && !GlobalBen2.length ? null : (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.silverTwo,
              }}></View>
          )}
        </>
      </View>
    );
  });
};

const Content2 = ({GlobalBen2}) => {
  return GlobalBen2?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              handleOnChange(index, item);
            }}>
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '57%'}}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}>
                {i.displayName}
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i.mobileNumber}
                {/* {i?.phoneNumbers[0]?.number} */}
              </_.Txt>
              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                jonathan-joseph@diaspo.com
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen2?.length - 1 ? null : (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.silverTwo,
              }}></View>
          )}
        </>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  containerButton: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: Platform.OS =="ios"? 30 :20,
    padding:Platform.OS =="ios"? 30 :20
  },

  Container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
  },
});
