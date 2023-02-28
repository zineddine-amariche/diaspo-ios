import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../theme';
import {Head} from '../../utils';

const AuthHead = ({children, onPress, width}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.Button} onPress={onPress}>
          <AntDesign name="arrowleft" color={COLORS.Vert1} size={25} />
        </TouchableOpacity>

        <View style={[styles.children, {width: width}]}>
          <Head
            Bold={'700'}
            fontSize={20}
            color={COLORS.white}
            style={styles.Head}>
            {children}
          </Head>
        </View>
      </View>
    </View>
  );
};

export default AuthHead;

const styles = StyleSheet.create({
  container: {
    height: '25%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent:"center"
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 40,
    
  },
  Button: {
    backgroundColor: COLORS.Vert0,
    borderRadius: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:20,
  },
  children: {
    justifyContent: 'center',
    flex:1

  },
  Head: {
    textAlign: 'center',
    fontSize: 24,
    marginLeft:-20
    
  },
});
