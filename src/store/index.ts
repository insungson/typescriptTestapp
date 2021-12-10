import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice, { authSliceName } from "./auth-slice";
import quotesSlice, { quotesSliceName } from "./quotes-slice";
import createSagaMiddleware from "@redux-saga/core";
import { call, put, all, fork } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([]);
}

const store = configureStore({
  reducer: {
    [authSliceName]: authSlice,
    [quotesSliceName]: quotesSlice,
  },
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 기존의 useDispatch, useSelector 를 대신할 함수들
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

export const API_KEY = "AIzaSyBwuX3ywjJQxmnljVptj8b8ERxX7SlKLAk";
export const FIREBASE_DOMAIN =
  "https://react-http-text-default-rtdb.firebaseio.com/yoyo/";

export type googleapisType = {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
};
