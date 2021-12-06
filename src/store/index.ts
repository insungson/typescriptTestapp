import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice, { authSliceName } from "./auth-slice";

const store = configureStore({
  reducer: {
    [authSliceName]: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 기존의 useDispatch, useSelector 를 대신할 함수들
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

export const API_KEY = "AIzaSyBwuX3ywjJQxmnljVptj8b8ERxX7SlKLAk";
