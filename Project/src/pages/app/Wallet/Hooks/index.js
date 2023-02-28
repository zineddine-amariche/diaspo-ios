import {useDispatch, useSelector} from 'react-redux';

export function UseWallets() {
  const dispatch = useDispatch();

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let token = user.AccessToken;
  let userId = user.userId;

  let object = {
    token,
    userId,
  };

  return {
    dispatch,
    object,
  };
}
