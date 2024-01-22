import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import PrimaryInput from '../../../../../../components/Input';
import {COLORS} from '../../../../../../theme';
import Space from '../../../../../../components/Space';
import SelectAccount from './Components';
import {Head} from '../../../../../../components/utils';

const Form0 = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  navigation,
  setchecked,
  checked,
  setNavigationCashOut,

  onPress
}) => {
  const {amount} = values;

  return (
    <Pressable 
    onPress={onPress}
    >
      <View style={{paddingHorizontal: 20,height:100,marginTop:20}}>
        <PrimaryInput
          name={amount}
          Label={'Amount of money'}
          placeholder="12,000"
          style={styles.Input}
          errors={errors.amount}
          touched={touched.amount}
          value={amount}
          onBlur={handleBlur('amount')}
          onChangeText={handleChange('amount')}
          amount="euro"
          keyboardType="numeric"
          placeholderTextColor={COLORS.darkBlueGrey}
        />
      </View>
      < >
        <Head color={COLORS.blueGreen} style={{marginLeft: 20}}>
          Select Cash Out Method
        </Head>
        <SelectAccount
          navigation={navigation}
          setchecked={setchecked}
          checked={checked}
          setNavigationCashOut={setNavigationCashOut}
        />
      </>
    </Pressable>
  );
};

export default Form0;

const styles = StyleSheet.create({
  Input: {
    color: COLORS.black,
    fontSize: 20,
    paddingLeft: 2,
    height: 45,
  },
  errors: {
    color: COLORS.coral,
    fontSize: 13,
  },
});
