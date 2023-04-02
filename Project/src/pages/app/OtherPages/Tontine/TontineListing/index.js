import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {Modalize} from 'react-native-modalize';

import ImgBack from '../../../../../Assets/headerImg/background.png';
import {PrimaryButton} from '../../../../../components/Buttons';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import Space from '../../../../../components/Space';
import {Txt} from '../../../../../components/utils';
import {COLORS, SIZES} from '../../../../../theme';

import {UseTontines} from './Hooks';
import Form0 from './Components/Forms/Form0/Form0';
import Form1 from './Components/Forms/Form1/Form1';
import Form2 from './Components/Forms/Form2/Form2';
import Form3 from './Components/Forms/Form3/Form3';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import Spiner from '../../../../../components/spiner';
import ContentRenders from './BottomSheetSelect/ContentRenders';
import {getTontines} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import {TabBar, TabView} from 'react-native-tab-view';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const Tontine = ({navigation, navigation: {goBack}}) => {
  const layout = useWindowDimensions();
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {object} = UseTontines();
  const modalRef = useRef(null);

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

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const onOpen = () => {
    modalRef.current?.open();
  };

  useEffect(() => {
    dispatch(getTontines(object));
  }, [isFocused]);

  return (
    <CustomHeader navigation={navigation}>
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
                // bottomSheetModalRef2.current?.present();
                onOpen();
              }}
              loading={isLoading}>
              {t('Tontine.button1')}
            </PrimaryButton>
          </View>
        )}
      </>

      <Modalize
        snapPoint={700}
        ref={modalRef}
        overlayStyle={{
          backgroundColor: COLORS.blueGreenOpacity9,
        }}
        adjustToContentHeight={false}>
        <ContentRenders
          navigation={navigation}
          closeSelect={handleCloseModal}
        />
      </Modalize>
    </CustomHeader>
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

const CustomHeader = ({children, navigation}) => {
  const {t, i18n} = useTranslation();

  const {tontines, isLoading} = useSelector(state => ({
    ...state.tontines,
  }));
  let num = isLoading ? '  ' : ' (' + tontines?.ProjectLists.length + ')';

  return (
    <>
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
        {children}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground: {
    // ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    // height: 170,
    zIndex: 99,
    position: 'absolute',
    top: Platform.OS == 'android' ? -40 : 0,
  },

  containerButton: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },

  Tabs: {
    backgroundColor: COLORS.white,
    flex: 1,
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
});
 