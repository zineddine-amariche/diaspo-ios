import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import HView from "../../../../../../components/views/HView/HView";
import { Head, Txt } from "../../../../../../components/utils";
import { COLORS } from "../../../../../../theme";
import Space from "../../../../../../components/Space";
import { WhiteButton } from "../../../../../../components/Buttons";
import { createTypeParticipants } from "../../../../../../redux/Features/Tontine/Participants/create/slice";
import { useDispatch, useSelector } from "react-redux";
import SimpleSpiner from "../../../../../../components/spiner/SimpleSpiner";
import { checkBeneficiaries } from "../../../../../../redux/Features/Tontine/Participants/checkBeneficiary/slice";

const ContentRenders = ({
  onPress,
  navigation,
  closeSelect,
  projectId,
  tontineProjectInfo,
}) => {
  const dispatch = useDispatch();

  const { isError, isLoading, message, isCanAddBeneficiary } = useSelector(
    (state) => ({
      ...state.BeneficiariesCheck,
    })
  );

  const { token } = useSelector((state) => ({ ...state.token }));

  const obj = {
    token,
    projectId,
  };

  useEffect(() => {
    if (projectId) {
      dispatch(checkBeneficiaries(obj));
    }
  }, [projectId]);

  // console.log('isCanAddBeneficiary useLayoutEffect', isCanAddBeneficiary)s
  const data = [
    {
      name: "PAYER AND BENEFICIARY",
      discription: "Béneféciare",
      value: "PAYER_AND_BENEFICIARY",
      disable: isCanAddBeneficiary ? false : true,
      title:'Select participants'
    },

    {
      name: "BENEFICIARY",
      discription: "Béneféciare",
      value: "BENEFICIARY",
      disable: isCanAddBeneficiary ? false : true,
      title:'Select Béneféciare'
    },
    {
      name: "PAYER",
      discription: "Payer",
      value: "PAYER",
      disable: false,
      title:'Select Payer'
    },

  ];

  return (
    <>
      {isLoading ? (
        <SimpleSpiner />
      ) : (
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 16,
          }}
        >
          <Head style={styles.Head}>Select Type of participants</Head>
          <ScrollView>
            {data.map((i, ind) => {
              return (
                <TouchableOpacity
                  key={ind}
                  onPress={() => {
                    closeSelect();

                    setTimeout(() => {
                      
                      navigation.navigate(i.discription, {
                        projectId,
                        type: i.value,
                        routeData:tontineProjectInfo,
                        title:i.title
                      });
                      dispatch(createTypeParticipants(i.value));
                    }, 1000);
                  }
                
                }
                  disabled={i.disable ? true : false}
                >
                  <View
                    spaceBetween
                    style={[
                      styles.item,
                      {
                        backgroundColor: i.disable
                          ? COLORS.coolGrey
                          : COLORS.paleGrey,
                      },
                    ]}
                  >
                    <HView>
                      <Txt
                        fontSize={17}
                        color={i.disable ? COLORS.grayIcon : COLORS.blueGreen}
                      >
                        {i.name}
                      </Txt>
                    </HView>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <WhiteButton onPress={onPress}>cancel</WhiteButton>
          <Space space={20} />
        </View>
      )}
    </>
  );
};

export default ContentRenders;

const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
  },

  Head: {
    alignSelf: "center",
    paddingVertical: 10,
  },
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
  },
  item: {
    backgroundColor: COLORS.paleGreyTwo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 60,
    justifyContent: "center",
  },
});
