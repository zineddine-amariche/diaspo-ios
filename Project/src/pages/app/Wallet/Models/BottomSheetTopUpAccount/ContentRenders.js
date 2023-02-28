import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HView from "../../../../../components/views/HView/HView";
import { Head, Txt } from "../../../../../components/utils";
import { COLORS } from "../../../../../theme";
import Space from "../../../../../components/Space";
import {
  PaleGreyButton,
  PrimaryButtonLinear,
  WhiteButton,
} from "../../../../../components/Buttons";

const data = [
  {
    id: 0,
    label: "DIASPO ACCOUNT",
    value: "Main Account",
    price: "32,589.50",
    currency: "euro",
  },
  {
    id: 1,
    label: "TONTINE ACCOUNT",
    value: "2nd FX",
    price: "12,089.50",
    currency: "USD",
  },
];

const ContentRenders = ({
  onPress2,
  navigation,
  closeBottomUp1,
  closeBottomUp2,
  closeAll,
}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
          // height: SIZES.height / 4,
        }}
      >
        <ScrollView>
          <PrimaryButtonLinear disabled={true}>
            top up this ACCOUNT
          </PrimaryButtonLinear>
          <Space space={20} />
          <PrimaryButtonLinear disabled={true}>
            Exchange to another currency
          </PrimaryButtonLinear>
        </ScrollView>
        <WhiteButton
          onPress={() => {
            // closeBottomUp2()
            // closeBottomUp1()
            closeAll();
          }}
        >
          cancel
        </WhiteButton>
        <Space space={40} />
      </View>
    </>
  );
};

export default ContentRenders;

const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
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
  Head: {
    alignSelf: "center",
    paddingVertical: 10,
  },
});

// {data.map((i, ind) => {
//   return (
//     <TouchableOpacity key={ind}
//     onPress={()=>{
//       closeAll()
//       navigation.navigate('TopUp' , {data:i})
//     }}
//     >
//       <HView spaceBetween style={styles.item}>

//           <HView >
//             <View style={styles.Point}></View>
//             <Txt fontSize={17} color={COLORS.orangeYellow}>
//               {i.label}
//             </Txt>
//           </HView>
//           <View >
//             <Txt
//               color={COLORS.blueGreen}
//               style={{ lineHeight: 40, fontSize: 17 }}
//             >
//               {i.price}{" "}
//             </Txt>
//             <Txt
//               color={COLORS.greyblue}
//               style={{ lineHeight: 24, fontSize: 16 , alignSelf:"flex-end" }}
//             >
//               {i.currency}
//             </Txt>
//           </View>
//         </HView>

//     </TouchableOpacity>
//   );
// })}
