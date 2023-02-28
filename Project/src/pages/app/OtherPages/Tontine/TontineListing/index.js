import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';

import ImgBack from '../../../../../Assets/Img/HomeBack.png';
import {PrimaryButton} from '../../../../../components/Buttons';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import Space from '../../../../../components/Space';
import {Txt} from '../../../../../components/utils';
import {COLORS, SIZES} from '../../../../../theme';
import Bottom4 from './BottomSheetPassword';

import {Formik} from 'formik';
import {UseTontines} from './Hooks';
import Form0 from './Components/Forms/Form0/Form0';
import Form1 from './Components/Forms/Form1/Form1';
import Form2 from './Components/Forms/Form2/Form2';
import Form3 from './Components/Forms/Form3/Form3';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import Spiner from '../../../../../components/spiner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getTontines,
  resetTontine,
} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import {Logout} from '../../../../../redux/Features/authentification/Login/Slice';
import {  TabBar, TabView} from 'react-native-tab-view';
import {useIsFocused} from '@react-navigation/native';
import BottomSheetSelect from './BottomSheetSelect';
import {useTranslation} from 'react-i18next';
 

const Tontine = ({navigation, navigation: {goBack}}) => {
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const {t, i18n} = useTranslation();
  const {object} = UseTontines();

  // const [SelectMethod, setSelectMethod] = useState(null);
  const {state, schema, onSubmit} = UseTontines();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeSelect = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);

  // const DeleteSelectMethod = () => {
  //   setSelectMethod(null);
  // };

  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const {tontines, isLoading, message} = useSelector(state => ({
    ...state.tontines,
  }));

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'Active ',
    },
    {
      key: 'second',
      title: 'Pending ',
    },
    {
      key: 'third',
      title: 'Cancelled ',
    },
    {
      key: 'fourth',
      title: 'Finished ',
    },
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <Form0 navigation={navigation} />;
      case 'second':
        return <Form1 navigation={navigation} tontines={tontines} />;
      case 'third':
        return <Form2 navigation={navigation} />;
      case 'fourth':
        return <Form3 navigation={navigation} />;
    }
  };

  useEffect(() => {
    dispatch(getTontines(object));
  }, [isFocused]);

  const clearAsyncStorage = async () => {
    dispatch(Logout());
    AsyncStorage.clear();
    dispatch(resetTontine());
  };

  useEffect(() => {
    if (message) {
      Alert.alert(
        message?.status,
        message?.statusDescription
          ? message?.statusDescription
          : 'Error getting information',
        [
          {
            text: 'Cancel',
            onPress: () => {
              if (
                message?.statusDescription == 'Expired token' ||
                message?.statusDescription == 'Wrong number of segments'
              ) {
                clearAsyncStorage();
              } else {
                dispatch(resetTontine());
              }
            },

            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              if (message?.statusDescription == 'Expired token') {
                clearAsyncStorage();
              } else {
                dispatch(resetTontine());
              }
            },
          },
        ],
      );
    }
  }, [message]);
  const layout = useWindowDimensions();

  let num = isLoading ? '  ' : ' (' + tontines?.ProjectLists.length + ')';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader
        Cancel="Return"
        goBack={() => {
          navigation.navigate('DiaspoBottomTab');
        }}
        title={t('Tontine.title') + num}
      />
      <Formik
        initialValues={state}
        validationSchema={schema}
        onSubmit={(values, formikAction) => {
          formikAction.setSubmitting(false);
          formikAction.resetForm();
          onSubmit(values);
          handlePresentModalPress();
        }}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          isSubmitting,
        }) => {
          const {amount} = values;

          return (
            <>
              {isLoading ? (
                <Spiner />
              ) : (
                <View
                  style={{width: SIZES.width, flex: 1}}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.Tabs}>
                    <Space space={10} />
                    <TabView
                      navigationState={{index, routes}}
                      renderScene={renderScene}
                      onIndexChange={index => setIndex(index)}
                      initialLayout={{width: layout.width}}
                      renderTabBar={renderTabBar}
                      removeClippedSubviews={false}
                      swipeEnabled
                      swipeVelocityImpact={0.2}
                      gestureHandlerProps={{
                        activeOffsetX: [-30, 30], // To solve swipe problems on Android
                      }}
                    />
                  </View>
                </View>
              )}

              {!isLoading && (
                <View style={styles.containerButton}>
                  <PrimaryButton
                    width={'100%'}
                    onPress={() => {
                      bottomSheetModalRef2.current?.present();
                    }}
                    loading={isSubmitting}>
                    {t('Tontine.button1')}
                  </PrimaryButton>
                </View>
              )}
            </>
          );
        }}
      </Formik>
      <Bottom4
        bottomSheetModalRef={bottomSheetModalRef}
        // DeleteSelectMethod={DeleteSelectMethod}
      />

      <BottomSheetSelect
        closeSelect={closeSelect}
        bottomSheetModalRef={bottomSheetModalRef2}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default Tontine;

const renderTabBar = props => {
  const {navigationState} = props;
  return (
    <TabBar
      {...props}
      renderLabel={({focused, route}) => {
        return (
          <View
            style={{
              width: 90,
              alignSelf: 'center',
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Txt
              fontSize={14}
              style={{
                color: focused ? COLORS.blueGreen : COLORS.silver,
                textAligne: 'center',
              }}
              size={14}
              color={focused ? COLORS.blueGreen : COLORS.slateGrey}>
              {route.title}
            </Txt>
          </View>
        );
      }}
      indicatorStyle={[
        styles.indicatorStyle,
        // { marginLeft: navigationState.index === 0 ? 15 : navigationState.index === 1 ? 10 : 0 },
      ]}
      style={styles.tabBar}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    height: 170,
    zIndex: 99,
  },
  topinuptxt: {
    padding: 20,
  },
  containerButton: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },

  line: {
    height: 3,
    width: '110%',
    backgroundColor: COLORS.blueGreen,
    position: 'absolute',
    bottom: -17,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    alignSelf: 'center',
  },
  Tabs: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  rowButtons: {
    paddingTop: 15,
  },
  tabBar: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  indicatorStyle: {
    backgroundColor: COLORS.blueGreen,
    height: 4.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: -1,
  },
  lineVertical: {
    height: 45,
    width: 1,
    backgroundColor: COLORS.lightBlueGrey,
  },
});
