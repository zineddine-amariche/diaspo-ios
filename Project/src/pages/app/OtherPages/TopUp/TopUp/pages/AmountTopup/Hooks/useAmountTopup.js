import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {transaction} from '../../../../../../../../redux/Features/Payements/MTN/slice';
import {CrediteCard, ShowBg} from '../../../../../../../../redux/Features/Payements/creditCard/slice';
import {useStripe} from '@stripe/stripe-react-native';
import {Alert} from 'react-native';
export function useAmoutTopup() {
  const dispatch = useDispatch();

  const state = {
    amount: '',
  };

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async obj => {
    let {showSuccess, clientSecret} = obj;

    // 1. Create a payment intent
    // const response = await createPaymentIntent({
    //   amount: Math.floor(total * 100),
    // });
    // if (response.error) {
    //   Alert.alert('Something went wrong');
    //   return;
    // }

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'notJust.dev',
      paymentIntentClientSecret:clientSecret,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
    dispatch(ShowBg(false))

      return;
    }
    dispatch(ShowBg(true))

    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
    dispatch(ShowBg(false))

      return;
    }

    // 4. If payment ok -> create the order
    showSuccess();
  };

  const onSubmit = async data => {
    // console.log('data', data.info.obj.type);
    // console.log("data", data.info.obj);

    if (data.info.obj.type == 'MTN') {
      dispatch(transaction(data));
    } else if (data.info.obj.type == 'Main Account') {
      dispatch(CrediteCard(data));
    }
  };

  const numericRegEx = /(?=.*[0-9])/;

  let schema = Yup.object().shape({
    amount: Yup.string()
      .max(10, 'Amount is too long - must be no more than 10 .')
      .min(2, 'Amount is too short - must be at least 2 .')
      .matches(numericRegEx, 'Must contain a numeric character!')
      .required('Amount required'),
  });

  return {
    onSubmit,
    state,
    schema,
    onCheckout,
  };
}
