import {StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import PrimaryInput from '../../../../../components/Input';
import {COLORS} from '../../../../../theme';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import Space from '../../../../../components/Space';
import SelectCountry from '../../../../../components/select/SelectCountry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Head, Txt} from '../../../../../components/utils';
import {ActivityIndicator} from 'react-native-paper';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  View,
  Text,
} from 'react-native';

import axios from 'axios';
const key = 'AIzaSyCVMEeau_kXYIENxFDuzrKtHFJExe0qcrQ';
const PlacesInput = ({apiKey, onSelect}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('step3FormData').then(data => {
      if (data) {
        let obj = JSON.parse(data);
        setSelected(obj.streetName);
      }
    });
  }, []);

  useEffect(() => {
    setSelected('');
  }, [query]);

  const handleQueryChange = text => {
    setQuery(text);
    if (!text) {
      setSelected('');
      setResults([]);
    } else if (text.length > 2) {
      setLoading(true);
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}`,
        )
        .then(response => {
          if (response.data.predictions.length > 0) {
            setLoading(false);
            return setResults(response.data.predictions);
          } else if (response.data.predictions.length === 0) {
            setLoading(false);
            return setResults([]);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  const handleSelect = result => {
    if (Object.keys(result).length === 0) {
      setSelected('');
    } else {
      onSelect(result);
      setSelected(result.description);
      setResults([]);
    }
  };

  const colorScheme = useColorScheme();

  return (
    <>
      <TextInput
        value={selected || query}
        onChangeText={handleQueryChange}
        placeholder={selected ? '' : 'Enter your address'}
        placeholderTextColor={COLORS.silver}
        style={{
          fontWeight: selected?.length !== 0 ? '700' : '400',
          fontSize: selected?.length == 0 ? 16 : 20,
          color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.silver,
        }}
      />

      {(loading && (
        // add the spiner at the center of the view
        <View
          style={{
            flex: 1,
            padding:20
          }}>
          <ActivityIndicator size="small" color={COLORS.blueGreen} />
        </View>
      )) ||
        null}
      {!loading ? (
        <ScrollView horizontal contentContainerStyle={{width:"100%"}}>
          <FlatList
            data={results}
            key={results.id}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.silver,
                  backgroundColor: COLORS.lightBlueGrey30,
                  borderRadius:2
                }}>
                <Txt
                style={{paddingLeft:10}}
                  fontSize={14}
                  numberOfLines={1}
                  color={colorScheme == 'dark' ? COLORS.black : COLORS.dark}>
                  {item.description}
                </Txt>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      ) : null}
    </>
  );
};

const Step3 = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  handleBlur,
  setValues,
  dirty,
  step,
}) => {
  const [selectedCity, setSelectedCIty] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState('');

  const onSelect = item => {
    setSelected(item);
  };

  const onSelectCity = item => {
    setSelectedCIty(item);
  };

  const onSelectState = item => {
    setSelectedState(item);
  };

  const {loading, message} = useSelector(state => ({
    ...state.auth,
  }));

  return (
    <View style={{flex: 1, }}>
      <FormInputs
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        values={values}
        errors={errors}
        step={step}
        setValues={setValues}
        dirty={dirty}
      />
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({});

const FormInputs = ({
  values,
  setFieldValue,
  errors,
  handleChange,
  touched,
  handleBlur,
  step,
  setValues,
  dirty,
}) => {
  const {streetName, country, postCode} = values;
  const [address, setAddress] = useState('');

  const isReturns = useSelector(
    state => state.registerPerssisteSlice.isReturns,
  );

  useEffect(() => {
    if (step == 3 && isReturns === 3) {
      AsyncStorage.getItem('step3FormData').then(data => {
        if (data) {
          let obj = JSON.parse(data);
          console.log(obj.streetName);
          setAddress(obj.streetName);
          setValues(JSON.parse(data));
        }
      });
    }
  }, [step, dirty]);

  const handleSelect = result => {
    setFieldValue('streetName', result.description);
    setAddress(result.description);
  };

  return (
    <>
      <Space space={20} />
      <Head>Address</Head>
      <View style={{flex: 1,  }}>
        <PlacesInput
          apiKey={key}
          onSelect={handleSelect}
          streetName={address}
        />
      </View>
      <Space space={20} />

      <Head>Postal Code</Head>
      <View style={{flex: 1, zIndex: -1}}>
        <PrimaryInput
          name={postCode}
          placeholder="Postal Code"
          style={{
            fontWeight: postCode?.length !== 0 ? '700' : '400',
            fontSize: postCode?.length == 0 ? 16 : 20,
          }}
          errors={errors.postCode}
          touched={touched.postCode}
          value={postCode}
          onBlur={handleBlur('postCode')}
          onChangeText={handleChange('postCode')}
          placeholderTextColor={COLORS.silver}
        />
      </View>
    </>
  );
};
