import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HView from '../views/HView/HView';
import {Head, Txt} from '../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../theme';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-simple-toast';

const DropDown = ({
  data = [],
  value = {},
  onSelect = () => {},
  fontSize,
  setFieldValue,
  name,
  errors,
  label,
  placeholder,
  placeholderTextColor,
  onPress,
  touched,
}) => {
  const [ShowOption, setShowOption] = useState(false);
  const onSelectItem = val => {
    setShowOption(false);
    onSelect(val);
    if (setFieldValue) {
      setFieldValue(name, val.label.toUpperCase());
    }
  };

  const colorScheme = useColorScheme();

  return (
    <>
      {label ? <Head style={styles.title}>{label}</Head> : null}
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.DropDownStyle]}
          activeOpacity={0.8}
          onPress={() => {
            if (onPress) {
              onPress();
              setShowOption(!ShowOption);
            } else {
              setShowOption(!ShowOption);
            }
          }}>
          <HView spaceBetween>

            
            
            {!!value ? (
            <View style={{ padding:30 }}>

              <Txt
                Bold="700"
                color={
                  colorScheme == 'dark'
                    ? COLORS.silver
                    : COLORS.silver
                }
              
                
                >
                {value?.label?value?.label:value.toString()}
              </Txt>
            </View>

            ) : (

            <View style={{backgroundColor:'#019',padding:10 }}>

              <Txt
                numberOfLines={1}
                lineHeight={24}
               
                color={
                  colorScheme == 'dark'
                    ? COLORS.silver
                    : COLORS.silver
                }
                Bold="700"
                fontSize={fontSize ? fontSize : 16}
                style={{width: '90%'}}>
                {placeholder}
              </Txt>
            </View>
            )}

            <AntDesign
              name="caretdown"
              size={20}
              style={{
                transform: [
                  {
                    rotate: ShowOption ? (onPress ? '0deg' : '180deg') : '0deg',
                  },
                ],
                color: COLORS.grayIcon,
              }}
            />
          </HView>
        </TouchableOpacity>

        {errors && touched ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.error}>{errors} </Text>
          </Animatable.View>
        ) : null}

        <View style={{position: 'relative'}}>
          {ShowOption && (
            <View style={styles.containerItems}>
              {data.map((val, i) => {
                return (
                  <View key={i}>
                    <TouchableOpacity
                      onPress={() => {
                        if (val.disabled) {
                          Toast.show('not available.');
                        } else {
                          onSelectItem(val);
                        }
                      }}
                      style={styles.item}>
                      <HView>
                        {val.icon ? (
                          <FontAwesome5
                            name={val.icon}
                            color={
                              colorScheme == 'dark'
                                ? COLORS.silver
                                : COLORS.silver
                            }
                          />
                        ) : (
                          <View
                            style={{
                              height: 20,
                              width: 20,
                              backgroundColor: val.color,
                            }}></View>
                        )}

                        <Txt
                          style={{
                            color:
                              colorScheme == 'dark'
                                ? COLORS.black
                                : COLORS.dark,
                            paddingLeft: 10,
                          }}>
                          {val.label}
                        </Txt>
                      </HView>
                    </TouchableOpacity>
                    {data.length !== i + 1 && <View style={styles.divider} />}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  DropDownStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.silver,
    height: 45,
    marginTop: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  containerItems: {
    paddingVertical: 10,
    zIndex: 100,
    width: '100%',
  },
  item: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.light,
  },
  error: {
    color: COLORS.coral,
    paddingVertical: 5,
    fontSize: 13,
  },
});

{
  /* <Image
                source={Chevron2}
                style={{
                  transform: [{ rotate: ShowOption ? "180deg" : "0deg" }],
                }}
              /> */
}
