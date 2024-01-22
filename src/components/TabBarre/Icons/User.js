import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import { COLORS } from "../../../theme";
import { ICON_SIZE,  } from "./Constants";

export default ({ active }) => {
  return (
    <Svg width={"100%"} height={"100%"} >
      <G
        transform="translate(1 1)"
        stroke={active ? COLORS.Vert3: COLORS.Noir}
        strokeWidth={2}
        fill={active ? COLORS.Vert3 : "none"}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2" />
        <Circle cx={8} cy={4} r={4} />
      </G>
    </Svg>
  );
};