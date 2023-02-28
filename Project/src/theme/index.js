import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
export const COLORS = {
  Vert0: "#E7F1F1",
  Vert1: "#2A6672",
  linBlue: "rgb(163, 199, 203)",
  coral: "rgb(255, 89 ,54)",
  light: "#f5f5f6",
  // gray: "#BABCBE",
  gray: "rgb(159,165,169)",
  black: "#000000",
  yellow: "#FEC87A",
  white: "#FFFFFF",
  transparent: "transparent",
  opacity1: "rgba(0, 0, 0, 0.1)",
  opacity4: "rgba(0, 0, 0, 0.2)",
  slateGrey: "rgb(87 ,97 ,105)",
  lightNavy: "rgb(15 ,75, 91)",
  dirtyBlue: "rgb(71, 144 ,152)",
  orangeYellow: "rgb(247, 161 ,0)",
  silver: "rgb(183,187,191)",
  blueGreen: "rgb(25 ,116 ,126)",
  blueGreenOpacity9: "rgba(25 ,116 ,126,0.90)",
  blueGreenOpacity5: "rgba(25 ,116 ,126,0.50)",
  darkBlueGrey: "rgb(15,30,41)",
  paleGrey: "rgb( 232 ,241 ,242)",
  grayIcon: "rgb(111,120,126)",
  lightBlueGrey: "rgb(209,227,229)",
  lightBlueGrey30: "rgba(209,227,229,0.3)",
  dark: "rgb( 39, 52 ,62)",
  paleGreyTwo: "rgb( 243, 248, 249)",
  coolGrey: "rgb( 159, 165, 169)",
  greenishTeal: "rgb( 55, 210, 135)",
  peachyPink: "rgb( 255, 155, 134)",
  greyblue: "rgb( 117, 172, 178)",
  silverTwo: "rgb(231,232,234)",
  Blur: "rgba(205,208,212,0.92)",
  shadows: "rgb(252,252,254)",
  darkSkyBlue: "rgb(64,190,228)",
  offWhite: "rgb(255,251,236)",
  iceBlue: "rgb(239,248,255)",
  lightSage: "rgb(233,248,239)",
  veryLightPink: "rgb(255,239,235)",
  darkSkyBlue: "rgb(64,190,228)",
  iceBlueTwo: "rgb(235,251,255)",
  lightGreyBlue: "rgb(163,199,203)",
  lightCheck: "rgb(210,241,223)",
  pale: "rgb(255,247,217)",
  green: "rgb(32, 187, 95)",
  BlackModal: "rgba(30,30,30,0.75)",
  BlueTxt: "rgb(10,132,255)",
  darkModal: "rgba(84 ,84, 88, 0.65)",
  finished: "rgb(242 ,243, 244)",
  TextBody:"#798395"
  
};
export const SIZES = {
  // global sizes
  base: 4,
  base1: 8,
  font: 14,
  radius1: 12,
  radius: 8,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body: 40,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  // largeTitle: { fontFamily: "Poppins-Black", fontSize: SIZES.largeTitle },
  // h1: { fontFamily: "Poppins-Bold", fontSize: SIZES.h1, lineHeight: 36 },
  // h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  // h3: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h3, lineHeight: 22 },
  // h4: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h4, lineHeight: 22 },
  // h5: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h5, lineHeight: 22 },
  body1: {
    // fontFamily: "Poppins-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    // fontFamily: "Poppins-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    // fontFamily: "Poppins-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    // fontFamily: "Poppins-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    // fontFamily: "Poppins-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
