// https://leejss.github.io/2021-07-20/redux-saga-and-api
// https://mytutorials.tistory.com/421
// https://redux-saga.js.org/docs/advanced/RootSaga

import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { getcomments, getCommentsReq, getCommentsError } from "./quotes-slice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FIREBASE_DOMAIN } from "./index";

// FIREBASE_DOMAIN  로 검색해서 관련 API를 여기에 추가하고 사가도 처리하기!!

function getAllCommentsAPI(data) {
  return axios.post(``);
}

function* getAllComments() {}

function* watchGetCommentReq() {
  yield takeLatest();
}

export default function* quoteSaga() {
  yield all([]);
}
