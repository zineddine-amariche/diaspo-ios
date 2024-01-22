import {
    View,
    Animated,
    Modal,
    StyleSheet,
    Dimensions,
    Pressable,
  } from "react-native";
  import React from "react";
import { COLORS } from "../../theme";
  
  const { width, height } = Dimensions.get("screen");
  
  const SelectModal = ({ visible, children, onDissmis, top }) => {
    const [ShowModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
  
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={ShowModal}>
          <Pressable
            style={styles.modalBackGround}
            onPress={() => {
              onDissmis();
            }}
          >
  
  
          <Animated.View
            style={[
              styles.modalContainer,
              {  transform: [{ scale: scaleValue }] },
            ]}
          >
            {children}
          </Animated.View>
  
          </Pressable>
  
      </Modal>
    );
  };
  
  export default SelectModal;
  
  const styles = StyleSheet.create({
    modalBackGround: {
      flex: 1,
      backgroundColor: COLORS.blueGreenOpacity9,
      overflow: "hidden",
      height: height * 1,
      alignItems:'center',
      justifyContent:'center'
  
    },
    modalContainer: {
      backgroundColor: "white",
      elevation: 1,
      borderRadius: 3,
      zIndex: 1000,
      alignSelf: "center",
      flex:1/4,
    width:'90%',
        overflow:'hidden'
    },
  });
  