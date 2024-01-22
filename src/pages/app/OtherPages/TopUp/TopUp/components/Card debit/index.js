import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ViewT1 from '../../../../../../../components/views/CardViewType1';
import HView from '../../../../../../../components/views/HView/HView';
import { Txt } from '../../../../../../../components/utils';
import { COLORS } from '../../../../../../../theme';

const CreditDebit  = ({title,data,onSelect}) => {
  return (
    
      <ViewT1 padding={20} width="90%" style={{ paddingVertical: 10 }}>
        <View style={styles.label}>
          <Txt>{title}</Txt>
        </View>
        <View style={styles.renderCardDebit}>
          {data.map((i, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => {
                  // console.log("item", i);
                  // onPress();
                  // navigation.navigate("TopUp", { data: i });
                  onSelect(i)
                }}
              >
                <HView spaceBetween style={styles.item}>
                  <HView>
                    <Image fontSize={17} color={COLORS.orangeYellow} source={i.url}/>
                  </HView>

                  <HView>
                    
                  {/* <View style={{marginRight:10}}>
                    <Txt
                      color={COLORS.blueGreen}
                      style={{  fontSize: 14 ,  alignSelf: "flex-end", }}
                    >
                      {i.price}
                    </Txt>
                    <Txt
                      color={COLORS.darkBlueGrey}
                      style={{
                        fontSize: 12,
                        alignSelf: "flex-end",
                        paddingVertical:5
                      }}
                    >
                   <Txt color={COLORS.coolGrey} fontSize={12}> Expiry Date:</Txt>  {i.currency}
                    </Txt>

                  </View> */}


                  <Txt>Click here to pay</Txt>
                  {/* {false ? (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: COLORS.blueGreen,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.blueGreen,
                  width: 16,
                  height: 16,
                  borderRadius: 20,
                }}
              ></View>
            </View>
          ) : (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: COLORS.blueGreen,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )} */}
                  </HView>
                </HView>
              </TouchableOpacity>
            );
          })}
        </View>
      </ViewT1>
    
  )
}

export default CreditDebit 

const styles = StyleSheet.create({
  label: {
    marginVertical: 10,
  },
  item: {
    backgroundColor: COLORS.paleGreyTwo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 80,
    justifyContent: "space-between",
    width: "100%",
  },
})