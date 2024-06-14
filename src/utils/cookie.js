import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 설정하는 함수
// 궁금하실까봐 만들긴 했는데, 우리는 안 쓸거에요!! (쿠키에 토큰 넣어주는 건 서버에서 해주니까요)
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

// 쿠키 정보 가져오는 함수
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키 정보 삭제하는 함수
export const removeCookie = (name) => {
  cookies.remove(name);
};
