import { createSlice } from "@reduxjs/toolkit";

interface authState {
  token: string;
  isLoggedIn: boolean;
}

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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: false,
  },
  reducers: {
    logIn: (state, action) => {
      const { token, expirationTime } = action.payload;
    },
    logOut: (state, action) => {},
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
