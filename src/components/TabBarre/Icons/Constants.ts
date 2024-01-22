import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");


const numberOfIcons = 4;
const horizontalPadding = 68;
export const DURATION = 450;
export const PADDING = 14;
export const SEGMENT = width / numberOfIcons;
export const ICON_SIZE = SEGMENT - horizontalPadding +5;

export const Colors = {
  primary: "#0AC66F",
  border: "#616164"
};