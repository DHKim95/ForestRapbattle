import { AnyAction } from "redux";
import { SET_ERROR_MESSAGE, SET_NOW_ERROR, SET_NOW_LOADING } from "./types";

export interface BaseInfo {
  nowLoading: boolean;
  nowError: boolean;
  errorMessage: string;
}

const initialState: BaseInfo = {
  nowLoading: false,
  nowError: false,
  errorMessage: "",
};

const baseInfoReducer = (state: BaseInfo = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_NOW_LOADING:
      return {
        ...state,
        nowLoading: action.payload,
      };

    case SET_NOW_ERROR:
      return {
        ...state,
        nowError: action.payload,
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default baseInfoReducer;
