import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  token: string;
  isLoggedIn: boolean;
}

// setTimeOut의 타입은 아래와 같이 설정한다.
let logOutTime: ReturnType<typeof setTimeout>;

const calculationRemainingTime = (expirationTime: any) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculationRemainingTime(storedExpirationDate);
  if (remainingTime <= 60000) {
    //1분
    //로컬스토리지에 토큰과 expirationTime 을 삭제한다.
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

//로컬스토리지 토큰처리용 함수
const logOutHandler: () => void = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  if (logOutTime) {
    clearTimeout(logOutTime);
  }
};
//로컬스토리지 토큰처리용 함수
const logInHandler = (token: string, expirationTime: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);

  const remainingTime = calculationRemainingTime(expirationTime);
  logOutTime = setTimeout(() => {
    logOutHandler();
  }, remainingTime);
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: false,
  } as authState, //이렇게 타입캐스팅하는게 일단은 최선인거 같다...
  reducers: {
    logIn: (state, action) => {
      const { token, expirationTime } = action.payload;
      logInHandler(token, expirationTime);
      // 위에서 토큰설정이 되면 아래서 토큰 검증
      const tokenObj = retrieveStoredToken();
      if (tokenObj !== null && tokenObj?.token !== null) {
        state.token = tokenObj.token;
        state.isLoggedIn = true;
      } else {
        state.token = "";
        state.isLoggedIn = false;
      }
    },
    logOut: (state, action) => {
      logOutHandler();
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authSliceName = authSlice.name;
export default authSlice.reducer;
