import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import { COLORS } from "../../../theme";

import { ICON_SIZE,  } from "./Constants";

export default ({ active }) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={"100%"} height={"100%"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-search"
    stroke={active ? COLORS.Vert3: COLORS.Noir}
      fill={active ? COLORS.Vert3 : "none"}
  >
    <Circle cx={11} cy={11} r={8} />
    <Path d="m21 21-4.35-4.35" />
  </Svg>
  );
};