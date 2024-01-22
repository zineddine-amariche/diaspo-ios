import React, { useEffect, useState, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import RenderTontine from "./Components/cardItem";
import RenderLoader from "./Components/RenderLoader";
import Nodata from "./Components/Nodata";

const Form3 = ({ navigation }) => {
  let nbr = 7;

  const { tontines } = useSelector((state) => ({
    ...state.tontines,
  }));

  const Filter = tontines?.ProjectLists?.filter((item) => {
    return item.status.includes("COMPLETED");
  });

  const [next, setNext] = useState(nbr);
  const [Loading, setLoading] = useState(false);

  let SliceData = Filter?.slice(0, next);

  const loadMore = () => {
    if (next < tontines?.ProjectLists.length) {
      handleMoreImage();
    }
  };
  const renderItem = ({ item }) => {
    return (
      <>
        <RenderTontine item={item} navigation={navigation} />
      </>
    );
  };
  const memoizedValue = useMemo(() => renderItem, [tontines?.ProjectLists]);

  const handleMoreImage = () => {
    setLoading(true);
    setNext(next + 7);
  };

  useEffect(() => {
    if (next > tontines?.ProjectLists.length) {
      setLoading(false);
    }
  }, [next]);

  return (
    <>
      {SliceData?.length !== 0 ? (
        <FlatList
          data={SliceData}
          renderItem={memoizedValue}
          keyExtractor={(item) => item.accountId}
          ListFooterComponent={() => RenderLoader(Loading)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      ) : (
        <Nodata />
      )}
    </>
  );
};

export default Form3;

const styles = StyleSheet.create({});
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import ViewT1 from "../../../../../../../../components/views/CardViewType1";
// import { SmTxt, Txt } from "../../../../../../../../components/utils";
// import { COLORS } from "../../../../../../../../theme";
// import Space from "../../../../../../../../components/Space";

// const Form3 = ({navigation}) => {
//   return (
//     <View style={{padding:20}}>
//       <Space space={15} />

//       <ViewT1>
//         <Txt color={COLORS.darkBlueGrey} fontSize={14} >
//           There are no <Txt color={COLORS.blueGreen}>Finished</Txt> tontines .        </Txt>
//       </ViewT1>

//     </View>
//   );
// };

// export default Form3;

// const styles = StyleSheet.create({});
