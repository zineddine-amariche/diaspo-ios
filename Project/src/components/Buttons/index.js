import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef } from "react";
import { Txt } from "../utils";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../theme";
import newButton from "../../Assets/Img/newButton.png";
import { View } from "react-native";

export const PrimaryButton = ({
  children,
  style,
  onPress,
  width,
  isHovered,
  opacity,
  Bold,
  loading,
  condition,
  marginVertical,
  textTransform,
  disabled
}) => {
  const hoverRef = useRef(null);
  const stylep = [
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  ];
  return (
    <TouchableOpacity
      ref={hoverRef}
      onPress={onPress}
      style={[
        styles.buttonPrimary,
        !condition ? stylep : null,
        {
          width: width || "auto",
          marginVertical: marginVertical ? marginVertical : 20,
        },

        { ...style },
      ]}
      disabled={disabled} 
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={
          condition
            ? [COLORS.Vert0, COLORS.Vert0]
            : [COLORS.Vert1, COLORS.Vert1]
        }
        style={styles.BoxGradient}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white}></ActivityIndicator>
        ) : (
          <Txt
            numberOfLines={1}
            color={condition ? COLORS.yellow : COLORS.white}
            opacity={opacity}
            Bold={Bold}
            style={[styles.text]}
            textTransform={textTransform}
          >
            {children}
          </Txt>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const PrimaryButtonLinear = ({
  children,
  style,
  onPress,
  width,
  isHovered,
  opacity,
  Bold,
  loading,
  condition,
  disabled,
  color,
  checked,
  textTransform,
}) => {
  const hoverRef = useRef(null);

  const stylep = [
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  ];
  return (
    <TouchableOpacity
      ref={hoverRef}
      onPress={onPress}
      disabled={!disabled}
      style={[
        styles.buttonPrimary,
        !condition ? stylep : null,
        {
          width: width || "auto",
        },

        { ...style },
      ]}
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={
          disabled
            ? [COLORS.dirtyBlue, COLORS.lightNavy]
            : [COLORS.Vert0, COLORS.Vert0]
        }
        style={styles.BoxGradient}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white}></ActivityIndicator>
        ) : (
          <Txt
            numberOfLines={1}
            color={disabled ? COLORS.white : COLORS.slateGrey}
            opacity={opacity}
            Bold={Bold}
            style={styles.text}
            textTransform={textTransform}
          >
            {children}
          </Txt>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const WhiteButton = ({
  children,
  style,
  onPress,
  width,
  isHovered,
  opacity,
  Bold,
  loading,
  condition,
}) => {
  const hoverRef = useRef(null);

  const stylep = [
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  ];
  return (
    <TouchableOpacity
      ref={hoverRef}
      onPress={onPress}
      style={[
        styles.buttonPrimary,
        {
          marginVertical: 10,
          width: width || "auto",
        },

        { ...style },
      ]}
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLORS.white, COLORS.white]}
        style={styles.BoxGradient}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white}></ActivityIndicator>
        ) : (
          <Txt
            numberOfLines={1}
            color={COLORS.blueGreen}
            opacity={opacity}
            Bold={Bold}
            style={styles.text}
          >
            {children}
          </Txt>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const PaleGreyButton = ({
  children,
  style,
  onPress,
  width,
  isHovered,
  opacity,
  Bold,
  loading,
  condition,
  disable,
  height,
}) => {
  const hoverRef = useRef(null);

  return (
    <TouchableOpacity
      disabled={disable}
      ref={hoverRef}
      onPress={onPress}
      style={[
        styles.PaleGreyButton,
        {
          marginVertical: 10,
          width: width || "auto",
          height: height ? height : 51,
        },

        { ...style },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white}></ActivityIndicator>
      ) : (
        <Txt
          numberOfLines={1}
          color={disable ? COLORS.silver : COLORS.dirtyBlue}
          opacity={opacity}
          Bold={Bold}
          style={styles.text}
        >
          {children}
        </Txt>
      )}
    </TouchableOpacity>
  );
};

export const PrimaryLinearOption = ({
  children,
  style,
  onPress,
  width,
  isHovered,
  opacity,
  Bold,
  loading,
  condition,
  disabled,
  color,
  checked,
}) => {
  const hoverRef = useRef(null);

  const stylep = [
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  ];
  return (
    <TouchableOpacity
      ref={hoverRef}
      onPress={onPress}
      disabled={!disabled}
      style={[
        styles.buttonPrimary,
        disabled ? stylep : null,
        {
          width: width || "auto",
        },

        { ...style },
      ]}
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={
          disabled
            ? [COLORS.dirtyBlue, COLORS.lightNavy]
            : [COLORS.white, COLORS.white]
        }
        style={styles.BoxGradient}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white}></ActivityIndicator>
        ) : (
          <Txt
            numberOfLines={1}
            color={disabled ? COLORS.white : COLORS.silver}
            opacity={opacity}
            Bold={Bold}
            style={styles.text}
          >
            {children}
          </Txt>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export const CircleButton = ({
  children,
  style,
  onPress,
  width,
  isHovered,
  opacity,
  Bold,
  loading,
  condition,
  marginVertical,
  Upercase,
}) => {
  const hoverRef = useRef(null);

  const stylep = [
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  ];
  return (
    <TouchableOpacity
      ref={hoverRef}
      onPress={onPress}
      style={[
        {
          ...style,
          shadowColor: "#000",
          shadowOffset: {
            width: 10,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        },
      ]}
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLORS.Vert1, COLORS.Vert1]}
        style={styles.circleGradient}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white}></ActivityIndicator>
        ) : (
          <Image source={newButton} style={{ height: 40, width: 40 }} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const BlackButton = ({
  children,
  style,
  onPress,
  width,
  opacity,
  Bold,
  loading,
  textTransform,
  disabled,
  color,
  line
}) => {
  const hoverRef = useRef(null);


  return (
    <TouchableOpacity
      ref={hoverRef}
      onPress={onPress}
      style={[
        {
          ...style,
          borderRightWidth: line ? 1 : 0 ,
          borderRightColor: COLORS.darkModal,
          width:width ?width : "100%" ,
          alignItems:'center',
          justifyContent:'center',
          paddingVertical:20
        },
      ]}
    >

      {loading ? (
        <ActivityIndicator color={COLORS.white}></ActivityIndicator>
      ) : (
          <Txt
            numberOfLines={1}
            color={disabled ? color : COLORS.silver}
            opacity={opacity}
            Bold={Bold}
            style={styles.text}
            textTransform={textTransform}
          >
            {children}
          </Txt>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonPrimary: {
    height: 51,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  BoxGradient: {
    width: "100%",
    height: 51,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  circleGradient: {
    borderRadius: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
  },
  PaleGreyButton: {
    height: 51,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.paleGrey,
  },

});
