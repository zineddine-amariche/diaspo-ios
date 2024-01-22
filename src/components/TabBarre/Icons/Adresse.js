import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
import { COLORS } from "../../../theme";
import { ICON_SIZE,  } from "./Constants";

export default ({ active }) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={"100%"} height={"100%"}
    stroke={active ? COLORS.Vert3: COLORS.Noir}
      fill={active ? COLORS.Vert3 : "none"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-map"
  >
    <Path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" />
  </Svg>
  );
};