import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import {Modalize} from 'react-native-modalize';
import {COLORS} from '../../../theme';
import {Txt} from '../../utils';
import { forwardRef } from 'react';

const UseModalize = ({children, ref, Com, bottomRef, snapPoint}) => {
  return (
    <Modalize
      style={styles.modal}
      contentContainerStyle={styles.contentContainer}
      snapPoint={snapPoint ? snapPoint : 800}
      ref={bottomRef}
      overlayStyle={{
        backgroundColor: COLORS.blueGreenOpacity9,
      }}
      adjustToContentHeight={false}>
      <View
        style={{
          marginTop: 20,
        }}>
        {Com}
      </View>
    </Modalize>
  );
};

// export default UseModalize;

// const UseModalize = forwardRef(
//   (props, ref) => {

//     const {children, bottomRef, Com, snapPoint}=props
//     return (
//       <Modalize
//         style={styles.modal}
//         contentContainerStyle={styles.contentContainer}
//         snapPoint={snapPoint ? snapPoint : 800}
//         ref={ref}
//         overlayStyle={{
//           backgroundColor: COLORS.blueGreenOpacity9,
//         }}
//         adjustToContentHeight={false}>
//         <View
//           style={{
//             marginTop: 20,
//           }}>
//             <View>
//               <Text>test</Text>
//             </View>
//           {/* {Com} */}
//         </View>
//       </Modalize>
//     );
//   },
// );

export default UseModalize;

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    overflow: 'hidden',
  },
});
