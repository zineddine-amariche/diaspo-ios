import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Space from '../../../components/Space'
import { Head } from '../../../components/utils'
import Toast from 'react-native-simple-toast';

const ConfirmIdentity = () => {
  return (
    <View>
      <Text>ConfirmIdentity</Text>
    </View>
  )
}

export default ConfirmIdentity

const styles = StyleSheet.create({})


const FormInputs = ({
  values,
  setFieldValue,
  errors,
  handleChange,
  touched,
  handleBlur,
  hidePass,
  HandlehidePass,
  IsTouched,
}) => {
  const {
    startAt, //
    profIdentity, // BOOLEAN
    profAdress, // BOOLEAN
    profIdentityData, // Data
    profAdressData, // Data
    password,
  } = values;

  const [selected, setSelected] = useState(null);
  const [typeIdentity, setTypeIdentity] = useState(null);
  const [typeAdress, setTypeAdress] = useState(null);

  const onSelect = (item) => {
    setSelected(item);
  };





  return (
    <>
      <Space space={30} />
      {/* proof ID */}
      <Proof
        title={"Proof of identity to be provide by the client*"}
        radioT1={"Passport"}
        radioT2={"Identity card"}
        errors={errors.profIdentity}
        setTypeIdentity={setTypeIdentity}
        typeIdentity={typeIdentity}
        setFieldValue={setFieldValue}
        name="profIdentity"
        IsTouched={IsTouched}
      />
      <UploadProof
        title="Passport/ID Upload"
        sousTitre="Please upload related documents"
        disable={!typeIdentity ? true : false}
        errors={errors.profIdentityData}
        typeIdentity={typeIdentity}
        setFieldValue={setFieldValue}
        name="profIdentityData"
      />

      <Proof
        title={"Proof of address to be provide by the applicant"}
        radioT1={"Passport"}
        radioT2={"Id"}
        errors={errors.profAdress}
        setTypeIdentity={setTypeAdress}
        typeIdentity={typeAdress}
        setFieldValue={setFieldValue}
        name="profAdress"
        IsTouched={IsTouched}
      />
   

      <Space space={20} />
    </>
  );
};
 
const Proof = ({
  title,
  radioT1,
  radioT2,
  errors,
  setTypeIdentity,
  typeIdentity,
  setFieldValue,
  name,
  IsTouched
}) => {
 
  return (
    <>
      <View>
        <Head fontSize={18} color={COLORS.blueGreen}>
          {title}
        </Head>
        <Space />
        <HView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <RadioButton
              color={COLORS.blueGreen}
              label="First item"
              value={typeIdentity}
              onPress={() => {
                setTypeIdentity(radioT1);
                setFieldValue(name, radioT1);
              }}
              status={typeIdentity === radioT1 ? "checked" : "unchecked"}
            />
            <Txt fontSize={14} color={COLORS.BlackModal}>
              {radioT1}
            </Txt>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <RadioButton
              color={COLORS.blueGreen}
              value={true}
              onPress={() => {
                setTypeIdentity(radioT2);
                setFieldValue(name, radioT2);
              }}
              status={typeIdentity === radioT2 ? "checked" : "unchecked"}
            />
            <Txt fontSize={14} color={COLORS.BlackModal}>
              {radioT2}
            </Txt>
          </View>
        </HView>
        <Space />
        {errors && IsTouched ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.error}>{errors} </Text>
          </Animatable.View>
        ) : null}
      </View>

      <Space space={20} />
    </>
  );
};

const UploadProof = ({
  sousTitre,
  title,
  disable,
  errors,
  typeIdentity,
  setFieldValue,
  name,
}) => {
  const [result, setResult] = useState();

  const [IsTouched, setIsTouched] = useState(false);

  // useEffect(() => {
  //   console.log(JSON.stringify('result',result, null, 2));
  // }, [result]);
  const handleError = (err) => {
    if (DocumentPicker.isCancel(err)) {
      Toast.show("cancelled !", Toast.SHORT);
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      // console.warn('multiple pickers were opened, only the last will be considered')
      Toast.show(
        "multiple pickers were opened, only the last will be considered !",
        Toast.SHORT
      );
    } else {
      throw err;
    }
  };

  return (
    <>
      <Head color={disable ? COLORS.silver : COLORS.blueGreen}>{title}</Head>
      <TouchableOpacity
        disabled={disable}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 20,
        }}
        onPressIn={() => {
          setIsTouched(true);
        }}
        onPress={async () => {
          try {
            const pickerResult = await DocumentPicker.pickSingle({
              presentationStyle: "fullScreen",
              copyTo: "cachesDirectory",
              type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
            });
            setResult(pickerResult);
            setFieldValue(
              name,
              JSON.stringify({
                uri: pickerResult.uri,
                name: pickerResult.name,
                type: pickerResult.type,
              })
            );

            // console.log(pickerResult.uri)
          } catch (e) {
            handleError(e);
          }
        }}
      >
        {!result ? (
          <Txt
            color={result ? COLORS.black : COLORS.silver}
            fontSize={12}
            Bold="400"
          >
            {sousTitre}
          </Txt>
        ) : (
          <Txt color={COLORS.black} fontSize={12} Bold="400">
            Content added successfully
          </Txt>
        )}
        {!result ? (
          <Txt color={COLORS.silver}>+</Txt>
        ) : (
          <Txt color={COLORS.black}>✓</Txt>
        )}
      </TouchableOpacity>
      {errors && IsTouched ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.error}>{errors} </Text>
        </Animatable.View>
      ) : null}
      <Space space={30} />
    </>
  );
};


// buttons Confirm

// {step == 4 && (
//   <PrimaryButtonLinear
//     step={step}
//     width={"100%"}
//     onPress={() => {
//       let object = {
//         userId:'6396e8a409230e8d97e4277b',
//         token,
//         data:{
//           type: values.profIdentity,
//           content : values.profIdentityData
//         }
//       };
//       dispatch(attachDocs(object))
//     }}
//     loading={isLoading}
//     disabled={
//       // (!errors.password &&values.password&&!errors.startAt &&!errors.profAdress
//       (!errors.profIdentity && !errors.profIdentityData) ||
//       isSubmitting
//     }
//   >
//     {"Register"}
//   </PrimaryButtonLinear>
// )}