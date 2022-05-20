import { AnyAction } from "redux";
import { NavUserInfo } from "../../types/account";
import {
  RESET_USER_INFO,
  SET_PROFILE_IMG,
  SET_USER_INFO,
  USER_LOGIN_SUCCESS,
} from "./types";

interface AccountStateType extends NavUserInfo {
  loading: boolean;
  err?: any;
  isLogin: boolean;
  password: string;
  passwordConfirmation: string;
}

const initialState: AccountStateType = {
  nickname: "",
  userId: 0,
  profileImg: "https://cdn.newspenguin.com/news/photo/202002/1208_2870_473.jpg",
  loading: false,
  isLogin: false,
  password: "",
  passwordConfirmation: "",
  win_point: 0,
};

const accountReducer = (
  state: NavUserInfo = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...action.payload,
        isLogin: true,
      };

    case SET_PROFILE_IMG:
      return {
        ...state,
        profileImg: action.payload,
      };

    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case RESET_USER_INFO:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default accountReducer;
