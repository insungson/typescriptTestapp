// https://leejss.github.io/2021-07-20/redux-saga-and-api
// https://mytutorials.tistory.com/421
// https://redux-saga.js.org/docs/advanced/RootSaga

import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
  getcomments,
  getCommentsReq,
  getCommentsError,
  postCommentsReq,
  postCommentsSuccess,
  postCommentsError,
} from "./quotes-slice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FIREBASE_DOMAIN } from "./index";

// FIREBASE_DOMAIN  로 검색해서 관련 API를 여기에 추가하고 사가도 처리하기!!

// postComments in Quote with QuoteID
function postCommentAPI(quoteId: string, text: string) {
  console.log("API  quoteId, text: ", quoteId, text);
  return axios.post(
    `${FIREBASE_DOMAIN}/comments/${quoteId}.json`,
    { text: text },
    { headers: { "Content-Type": "application/json" } }
  );
}

function* postComment(action: any) {
  try {
    const { quoteId, text } = action.payload;
    const result: AxiosResponse = yield call(postCommentAPI, quoteId, text);
    console.log("result: ", result);
    if (result.status === 200) {
      yield put(postCommentsSuccess({ result: result.status === 200 }));
    } else {
      throw new Error("comment add Error Occur!");
    }
  } catch (error: any) {
    console.log("error: ", error);
    yield put(postCommentsError);
  }
}

// getAllComments in Quote with QuoteID
function getAllCommentsAPI(quoteId: string) {
  return axios.get(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
}

function* getAllComments(action: any) {
  try {
    const { quoteId } = action.payload;
    const result: AxiosResponse = yield call(getAllCommentsAPI, quoteId);
    if (result.status === 200) {
      yield put(getcomments({ data: result.data }));
    } else {
      throw new Error("Get CommentList Error Occur!");
    }
  } catch (error: any) {
    console.log("error: ", error);
    yield put(getCommentsError({ error }));
  }
}

function* watchPostCommentsReq() {
  yield takeLatest(postCommentsReq, postComment);
}

function* watchGetCommentReq() {
  yield takeLatest(getCommentsReq, getAllComments);
}

export default function* quoteSaga() {
  yield all([fork(watchGetCommentReq), fork(watchPostCommentsReq)]);
}
