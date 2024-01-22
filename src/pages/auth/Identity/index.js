import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../theme';
import Space from '../../../components/Space';

import IdentityStepNumber from './components/IdentityStepNumber';
import WhiteHeader from '../../../components/Headers/Auth/KycWhiteHeader';
import Form1 from './components/Forms/Form1';
import Form2 from './components/Forms/Form2';
import Form3 from './components/Forms/Form3';
import Spiner from '../../../components/spiner';

import {UseIdentity} from './Hooks/useIdentity';
import Camera from './components/Camera';
import ButtonsSteps from './components/ButtonsSteps';
import {useSelector} from 'react-redux';

const Identity = ({navigation}) => {
  const {loading, step, openCamera} = useSelector(
    state => state.uploadPhotoSlice,
  );

  const [TypeFileToSend, setTypeFileToSend] = useState('PHOTO_CARD');

  const onSelectType = item => {
    setTypeFileToSend(item.value);
  };
  const renderScene = () => {
    switch (step) {
      case 1:
        return <Form1 navigation={navigation} />;
      case 2:
        return (
          <Form2
            navigation={navigation}
            TypeFileToSend={TypeFileToSend}
            onSelectType={onSelectType}
          />
        );
      case 3:
        return <Form3 navigation={navigation} />;
    }
  };

  const setType = item => {
    setTypeFileToSend(item);
  };

  const {onClose} = UseIdentity();
  return (
    <>
      {!openCamera ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            alignItems: 'center',
          }}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <WhiteHeader
            onClose={() => onClose(navigation, setType)}
            title="Identity Verification"
          />

          <IdentityStepNumber step={step} />
          {loading ? (
            <Spiner />
          ) : (
            <>
              <Space space={20} />
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}>
                {renderScene()}
                <Space space={190} />
              </ScrollView>

              <ButtonsSteps setType={setType} />
            </>
          )}
        </SafeAreaView>
      ) : (
        <Camera
          TypeFileToSend={TypeFileToSend}
          setType={setType}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default Identity;
