import React, {useEffect, useState, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import RenderTontine from './Components/cardItem';
import RenderLoader from './Components/RenderLoader';
import Nodata from './Components/Nodata';
import { addActiveTontine } from '../../../../../../../../redux/Features/Tontine/TontinesTypes';

const Form0 = ({navigation}) => {
  let nbr = 7;

  const {tontines} = useSelector(state => ({
    ...state.tontines,
  }));

  const Filter = tontines?.ProjectLists?.filter(item => {
    return item.status.includes('ACTIVATED');
  });



  useEffect(() => {
    if (Filter) {
      // console.log('Filter');
      addActiveTontine(Filter)
    }
  }, [Filter]);

  const [next, setNext] = useState(nbr);
  const [Loading, setLoading] = useState(false);

  let SliceData = Filter?.slice(0, next);

  const loadMore = () => {
    if (next < SliceData?.length) {
      handleMoreImage();
    }
  };
  const renderItem = ({item}) => {
    return (
      <>
        <RenderTontine item={item} navigation={navigation} />
      </>
    );
  };
  const memoizedValue = useMemo(() => renderItem, [SliceData]);

  const handleMoreImage = () => {
    setLoading(true);
    setNext(next + 7);
  };

  useEffect(() => {
    if (next > SliceData?.length) {
      setLoading(false);
    }
  }, [next]);

  return (
    <>
      {SliceData?.length !== 0 ? (
        <FlatList
          data={SliceData}
          renderItem={memoizedValue}
          keyExtractor={item => item.accountId}
          ListFooterComponent={() => RenderLoader(Loading)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{paddingTop: 20}}
        />
      ) : (
        <Nodata />
      )}
    </>
  );
};

export default Form0;

const styles = StyleSheet.create({});

// import {
//   StyleSheet,
//   Text,
//   Touchable,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React from "react";
// import ViewT1 from "../../../../../../../../components/views/CardViewType1";
// import { Txt } from "../../../../../../../../components/utils";
// import { COLORS, SIZES } from "../../../../../../../../theme";
// import Space from "../../../../../../../../components/Space";
// import { ScrollView } from "react-native";
// import { useSelector } from "react-redux";
// import Clipboard from "@react-native-clipboard/clipboard";
// import Toast from "react-native-simple-toast";

// const Form0 = () => {
//   return (
//     <ScrollView
//       contentContainerStyle={{ width: SIZES.width }}
//       showsVerticalScrollIndicator={false}
//     >
//       <Space space={15} />
//       <View style={{ padding: 20 }}>
//         <ViewT1>
//           <Txt color={COLORS.darkBlueGrey} fontSize={14}>
//             There are no <Txt color={COLORS.greenishTeal}> Active </Txt>{" "}
//             tontines .
//           </Txt>
//         </ViewT1>
//       </View>
//       <Space />
//     </ScrollView>
//   );
// };

// export default Form0;

// const ShowTokens = () => {
//   const { devicetoken, deviceOS } = useSelector((state) => ({
//     ...state.register,
//   }));

//   const { informationsUser } = useSelector((state) => ({
//     ...state.userInformations,
//   }));
//   return (
//     <>
//       <Space space={30} />

//       <Txt color={COLORS.BlueTxt} fontSize={13}>
//         deviceOS : {deviceOS}
//       </Txt>
//       <Space space={8} />
//       <Txt fontSize={14} color={COLORS.coolGrey}>
//         Devicetoken :
//       </Txt>
//       <TouchableOpacity
//         onPress={() => {
//           Clipboard.setString(devicetoken);
//           Toast.show("The text has been copied ");
//         }}
//       >
//         <Txt fontSize={13} color={COLORS.coolGrey}>
//           {devicetoken}
//         </Txt>
//       </TouchableOpacity>

//       <Space space={30} />
//       <Txt fontSize={14} color={COLORS.coolGrey}>
//         User Device Token (from server)
//       </Txt>
//       <Txt fontSize={13} color={COLORS.coolGrey}>
//         {informationsUser?.data?.walletAccountUser?.device[0].deviceToken}
//       </Txt>
//     </>
//   );
// };

// const styles = StyleSheet.create({});
