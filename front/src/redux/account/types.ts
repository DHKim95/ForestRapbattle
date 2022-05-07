import { userLogin } from "./actions";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

export const SET_PROFILE_IMG = "SET_PROFILE_IMG";
export const SET_USER_INFO = "SET_USER_INFO";
export const RESET_USER_INFO = "RESET_USER_INFO";

export type AccountAction = ReturnType<typeof userLogin>;
