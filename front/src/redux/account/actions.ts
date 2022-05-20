import axios from "axios";
import { Dispatch } from "redux";
import { customAxios } from "../../customAxios";
import { LoginUserInfo, NavUserInfo, SetUserInfo } from "../../types/account";
import { errorControl, loadingControl } from "../baseInfo/actions";
// import { resetFullCourse } from "../createFullCourse/actions";
import {
  USER_LOGIN_SUCCESS,
  SET_PROFILE_IMG,
  SET_USER_INFO,
  RESET_USER_INFO,
} from "./types";

const userLoginSuccess = (navUserInfo: NavUserInfo) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: navUserInfo,
  };
};

export const setProfileImg = (imgUrl: string) => {
  console.log('들어왔니 ?')
  return {
    type: SET_PROFILE_IMG,
    payload: imgUrl,
  };
};

export const resetUserInfo = () => {
  return {
    type: RESET_USER_INFO,
  };
};
export const setUserInfo = (userInfo: SetUserInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  };
};
export const getUserInfo = (userId: number) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);
    try {
      const res = await axios({
        method: "get",
        url: `users/${userId}`,
      });
      console.log(res.data)
      dispatch(setUserInfo(res.data));
    } catch (err) {}
    errorControl(dispatch, "유저정보를 받아오는데 실패했습니다.");

    loadingControl(dispatch, false);
  };
};

export const userLogin = (userInfo: LoginUserInfo) => {
  return async (dispatch: Dispatch) => {
    loadingControl(dispatch, true);

    const data = {
      email: userInfo.username,
      password: userInfo.password,
    };
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/api-token-auth/`,
        data: data,
      });
      console.log(res)
      localStorage.setItem(
        "accessToken",
        `JWT ${res.data.token}`
      );
      const res1 = await customAxios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        data: data,
      });
      const newUserInfo = {
        nickname: res1.data.nickname,
        userId: res1.data.user_id,
        profileImg:
          res1.data.profile["profile_img"] ||
          "https://cdn.newspenguin.com/news/photo/202002/1208_2870_473.jpg",
        win_point: res1.data.win_point
      };
      localStorage.setItem("profileId",res1.data.profile["profile_id"]);
      dispatch(userLoginSuccess(newUserInfo));

      // 로그인 성공시 메인페이지로 이동
    } catch (err: any) {
      errorControl(dispatch, "유저정보가 일치하지 않습니다.");
      console.log(err.response)
    }
    loadingControl(dispatch, false);
  };
};