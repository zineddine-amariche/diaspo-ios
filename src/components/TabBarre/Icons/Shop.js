import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import { COLORS } from "../../../theme";

import { ICON_SIZE } from "./Constants";

export default ({ active }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={"100%"} height={"100%"}
      strokeWidth={2}
      strokeLinecap="round"
      stroke={active ? COLORS.Vert3: COLORS.Noir}
      fill={active ? COLORS.Vert3 : "none"}
      strokeLinejoin="round"
      className="feather feather-shopping-cart"
    >
      <Circle cx={9} cy={21} r={1} />
      <Circle cx={20} cy={21} r={1} />
      <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </Svg>
  );
};
