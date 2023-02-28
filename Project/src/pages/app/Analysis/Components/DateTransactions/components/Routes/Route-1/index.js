import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AnalysisImg from "../../../../../../../../Assets/Img/analysisImg.png";
import { COLORS } from "../../../../../../../../theme";
import { Txt } from "../../../../../../../../components/utils";
import HView from "../../../../../../../../components/views/HView/HView";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


const Route1 = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.paleGrey,
        flex:1
      }}
    >
      <LineChart
        data={{
          labels: ["01-05", "06-10", "11-15", "16-20", "21-25", "26-30"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.96} // from react-native
        height={180}
        // yAxisLabel=""
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: COLORS.paleGrey,
          backgroundGradientFrom: COLORS.paleGrey,
          backgroundGradientTo: COLORS.paleGrey,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 122, 94, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: COLORS.coral,
            fill: COLORS.coral,
          },
        }}
        // bezier
        style={{
          borderRadius: 1,
          paddingVertical: 20,
          // flex:1
        }}
      />


    </View>
  );
};

export default Route1;




const styles = StyleSheet.create({

});

