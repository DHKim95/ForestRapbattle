import axios, { AxiosInstance } from "axios";

// header의 type에러 방지 위해 null일 경우 빈 문자열 할당
const token = localStorage.getItem("accessToken") || "";

export const customAxios: AxiosInstance = axios.create({
  // baseURL이 작성되어있으므로 뒷부분만 작성해서 사용하면 됨
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    Authorization: token,
  },
});

// 요청 보내기 전 실행할 함수
const successRequest = async (config: any) => {
  const token = localStorage.getItem("accessToken") || "";
  config.headers.Authorization = token;
  return config;
};

// 요청 실패시 실행할 함수
const failureRequest = async (error: any) => {
  return Promise.reject(error);
};

// 요청(request)) interceptor
customAxios.interceptors.request.use(
  (config) => successRequest(config), // 정상적인 응답을 반환한 경우
  (error) => failureRequest(error) // 에러가 발생한 경우
);
