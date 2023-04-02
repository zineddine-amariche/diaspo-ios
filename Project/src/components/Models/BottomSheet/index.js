import React from 'react';
import { Modalize } from 'react-native-modalize';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import Space from '../../Space';
import { COLORS } from '../../../theme';

const BottomSheet = ({ modalType,ref, onClose }) => {
 

  const getTitle = () => {
    switch (modalType) {
      case 'modal1':
        return 'Modal 1 Title';
      case 'modal2':
        return 'Modal 2 Title';
      case 'modal3':
        return 'Modal 3 Title';
      case 'modal4':
        return 'Modal 4 Title';
      default:
        return '';
    }
  };

  const getContent = () => {
    switch (modalType) {
      case 'modal1':
        return <Text>Modal 1 content goes here</Text>;
      case 'modal2':
        return <Text>Modal 2 content goes here</Text>;
      case 'modal3':
        return <Text>Modal 3 content goes here</Text>;
      case 'modal4':
        return <Text>Modal 4 content goes here</Text>;
      default:
        return null;
    }
  };
  return (
    <Modalize
      adjustToContentHeight
      modalStyle={{ backgroundColor: '#fff' }}
      onClose={onClose}
      ref={ref}
      snapPoint={400}
      overlayStyle={{
        backgroundColor: COLORS.blueGreenOpacity9,
      }}
    >
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>{getTitle()}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color: 'red' }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          {getContent()}
        </View>
      </View>
    </Modalize>
  );
};

export default BottomSheet;

// const BottomSheet = ({onOpen, handleCloseModal, snapPoint, children,modalizeRef}) => {
// //   const modalizeRef = useRef(null);

//   //   const onOpen = () => {
//   //     modalizeRef.current?.open();
//   //   };
//   //   const handleCloseModal = () => {
//   //     modalizeRef.current?.close();
//   //   };

//   const modalStyle = {
//     headerStyle: {
//       backgroundColor: '#0987DA',
//       height: 90,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderBottomWidth: StyleSheet.hairlineWidth,
//       borderBottomColor: '#ccc',
//     },
//   };

//   const headerProps = {
//     style: {
//       backgroundColor: '#f2f2f2',
//       height: 60,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderBottomWidth: StyleSheet.hairlineWidth,
//       borderBottomColor: '#ccc',
//     },
//     titleStyle: {
//       color: '#333',
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//   };

//   return (
//     <>
//       {/* <TouchableOpacity onPress={onOpen}>
//         <Text>Test</Text>
//       </TouchableOpacity> */}

//       <Modalize
//         // HeaderComponent={<MyHeader />} headerProps={headerProps}
//         snapPoint={snapPoint}
//         ref={modalizeRef}
//         overlayStyle={{
//           backgroundColor: COLORS.blueGreenOpacity9,
//         }}>
//         {/* <UserInfo test={'test'} handleCloseModal={handleCloseModal} /> */}
//         {children}
//       </Modalize>
//     </>
//   );
// };

// export default BottomSheet;

const MyHeader = ({titleStyle}) => {
  return (
    <View
      style={{
        backgroundColor: '#f2f2f2',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
      }}>
      <Text style={[titleStyle, {fontSize: 20, fontWeight: 'bold'}]}>
        Modal Header
      </Text>
    </View>
  );
};

const UserInfo = ({test, handleCloseModal}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
      }}>
      <TouchableOpacity
        onPress={() => {
          console.log('test', test);
        }}>
        <Text>slow motions</Text>
      </TouchableOpacity>
      <Space />
      <TouchableOpacity onPress={handleCloseModal}>
        <Text>close slow motions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
