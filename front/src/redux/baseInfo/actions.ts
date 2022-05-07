import { Dispatch } from "redux";
import { SET_ERROR_MESSAGE, SET_NOW_ERROR, SET_NOW_LOADING } from "./types";

export const setNowLoading = (nowLoading: boolean) => {
  return {
    type: SET_NOW_LOADING,
    payload: nowLoading,
  };
};

export const setNowError = (nowError: boolean) => {
  return {
    type: SET_NOW_ERROR,
    payload: nowError,
  };
};

export const setErrorMessage = (errorMessage: string) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  };
};
export const errorControl = (dispatch: Dispatch, error: string | boolean) => {
  if (typeof error === "string") {
    dispatch(setErrorMessage(error));
    dispatch(setNowError(true));
    let noticeId: any = sessionStorage.getItem("noticeId");
    clearTimeout(noticeId);
    noticeId = setTimeout(() => dispatch(setNowError(false)), 2000);
    sessionStorage.setItem("noticeId", noticeId);
  } else {
    dispatch(setNowError(error));
  }
};

export const loadingControl = (dispatch: Dispatch, nowLoading: boolean) => {
  dispatch(setNowLoading(nowLoading));
};
