import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LinearGradient from 'react-native-linear-gradient';
import AppIcon, {Icons} from './AppIcon';
import Home from '../../../pages/app/Home';
import Wallet from '../../../pages/app/Wallet';
import {COLORS} from '../../../theme';
import Analysis from '../../../pages/app/Analysis';
import {Txt} from '../../../components/utils';
import MyCode from '../../../pages/app/MyCode';
import Categories from '../../../pages/app/Home/pages/Categories';
import {useSelector} from 'react-redux';
 

const BottomTab = ({type, color, size = 34, isFocused, index}) => {
  const icon =
    index == 0
      ? 'home-sharp'
      : index == 1
      ? 'wallet'
      : index == 2
      ? 'qrcode-scan'
      : index == 3
      ? 'scan-circle'
      : 'stats-chart';
  const gradient = index == 2;
  return (
    <View style={{}}>
      {gradient ? (
        <LinearGradient
          colors={[COLORS.blueGreen, COLORS.blueGreen]}
          start={{x: isFocused ? 0 : 1, y: 0}}
          end={{x: isFocused ? 1 : 0, y: 0}}
          style={styles.middleIcon}>
          <AppIcon
            name={'qrcode-scan'}
            type={'MaterialCommunityIcons'}
            size={size}
            color={'white'}
          />
        </LinearGradient>
      ) : (
        <View style={styles.icon}>
          <AppIcon name={icon} type={type} size={size} color={color} />
        </View>
      )}
    </View>
  );
};

const MyTabBar = ({state, descriptors, navigation}) => {

  return (
    <View
      style={{
        height: 94,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <View style={styles.bottomBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const {options} = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              if (route.name == 'TopUp') {
                return;
              } else {
                navigation.navigate(route.name);
              }
            }
          };

          const color = isFocused ? COLORS.blueGreen : COLORS.coolGrey;
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              testID={options.tabBarTestID}
              accessibilityRole="button"
              style={{
                alignItems: 'center',
              }}>
              {isFocused && state.index !== 2 && (
                <View
                  style={{
                    height: 3,
                    width: 46,
                    backgroundColor: COLORS.blueGreen,
                    position: 'absolute',
                    top: -8,
                    alignSelf: 'center',
                  }}></View>
              )}
              <BottomTab
                type={
                  index == 0 || 1 || 3
                    ? Icons.Ionicons
                    : Icons.MaterialCommunityIcons
                }
                index={index}
                isFocused={isFocused}
                size={26}
                color={color}
              />
              <View style={{width: 60, alignItems: 'center'}}>
                <Txt
                  color={isFocused ? COLORS.blueGreen : COLORS.coolGrey}
                  textTransform={'none'}
                  fontSize={12}>
                  {route.name == '.' ? '' : route.name}
                </Txt>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          bottom: 0,
          right: 0,
          left: 0,
          borderTopLeftRadius: 1,
          borderTopRightRadius: 1,
          position: 'absolute',
          zIndex: -1,
          overflow: 'visible',
        },
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wallet" component={Wallet} />
      {/* <Tab.Screen name="Tontine" component={Tontine} /> */}
      <Tab.Screen name="." component={MyCode} />
      <Tab.Screen name="Discount" component={Categories} />
      <Tab.Screen name="Analysis" component={Analysis} />
      {/* <Tab.Screen name="." component={MyCode} /> */}
      {/* <Tab.Screen name="TopUp" component={TopUp} /> */}
      {/* <Tab.Screen name="CashOut" component={CashOut} /> */}
    </Tab.Navigator>
  );
};

const BottomTabOrange = () => {
  return <TabNavigator />;
};

const styles = StyleSheet.create({
  bottomBar: {
    height: Platform.OS == 'ios' ? 85 : 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS == 'ios' ? -10 : -20,
  },
  middleIcon: {
    bottom: 18,
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});

export default BottomTabOrange;
