import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import React from 'react';
import ViewT1 from '../../../../components/views/CardViewType1';
import {Formik} from 'formik';
import PrimaryInput from '../../../../components/Input';
import {PrimaryButtonLinear} from '../../../../components/Buttons';
import {COLORS} from '../../../../theme';
import {useCreatePassword} from '../Hooks/useCreatePassword';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {confirmationPassword} from '../../../../redux/Features/authentification/ConfirmPass/Slice';
const Form2 = ({onErrorAction, onSuccesAction, object}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {confirmationCode, username} = object;
  const {
    initialState,
    validationSchema,
    hidePass,
    HandlehidePass,
    c_hidePass,
    HandlehideC_Pass,

    onDissmis,
  } = useCreatePassword();

  const {isLoading} = useSelector(state => ({
    ...state.confirmpass,
  }));

  return (
    <View style={{marginHorizontal: 20}}>
      <ViewT1>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values, formikAction) => {
            setTimeout(() => {
              formikAction.setSubmitting(false);
              let object = {
                confirmationCode,
                userName: username,
                userPassword: values.newPassword,
                onErrorAction,
                onSuccesAction,
              };

              dispatch(confirmationPassword(object));
            }, 200);
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
            const {c_password, newPassword} = values;

            return (
              <>
                <PrimaryInput
                  placeholder="New password"
                  style={styles.Input}
                  name={newPassword}
                  id={newPassword}
                  value={newPassword}
                  onBlur={handleBlur('newPassword')}
                  onChangeText={handleChange('newPassword')}
                  Label="New password"
                  secureTextEntry={hidePass ? true : false}
                  isPassword={'pass'}
                  hidePass={hidePass}
                  HandlehidePass={HandlehidePass}
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                  placeholderTextColor={COLORS.Noir}
                />
                <View style={styles.space}></View>
                <PrimaryInput
                  placeholder="Retype New password"
                  style={styles.Input}
                  name={c_password}
                  id={c_password}
                  value={c_password}
                  onBlur={handleBlur('c_password')}
                  onChangeText={handleChange('c_password')}
                  Label="Retype new password"
                  secureTextEntry={c_hidePass ? true : false}
                  isPassword={'pass'}
                  hidePass={c_hidePass}
                  HandlehidePass={HandlehideC_Pass}
                  errors={errors.c_password}
                  touched={touched.c_password}
                  placeholderTextColor={COLORS.Noir}
                />

                <View style={styles.space}></View>
                <PrimaryButtonLinear
                  width={'100%'}
                  onPress={() => {
                    handleSubmit();
                  }}
                  loading={isLoading}
                  disabled={true}>
                  CONFIRM
                </PrimaryButtonLinear>
              </>
            );
          }}
        </Formik>
      </ViewT1>
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'space-between'
  },
  space: {
    height: 20,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.slateGrey,
    textAlign: 'center',
  },
  Input: {
    color: COLORS.Noir,
    fontSize: 16,
    // fontFamily: "Roboto-Bold",
    flex: 1,
    paddingLeft: 2,
  },
});
