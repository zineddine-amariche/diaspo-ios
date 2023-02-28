import React, { useEffect, useState, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import RenderTontine from "./Components/cardItem";
import RenderLoader from "./Components/RenderLoader";
import Nodata from "./Components/Nodata";

const Form1 = ({ navigation }) => {
  let nbr = 7;

  const { tontines } = useSelector((state) => ({
    ...state.tontines,
  }));
  
  const [next, setNext] = useState(nbr);
  const [Loading, setLoading] = useState(false);
  const Filter = tontines?.ProjectLists?.filter(item =>{ return item.status.includes("IN PROGRESS")});
  const reversedArray = Filter?.slice().reverse();
  
  let SliceData = reversedArray?.slice(0, next);


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
      {tontines?.ProjectLists.length !== 0 ? (
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

export default Form1;

const styles = StyleSheet.create({});
