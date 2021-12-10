// https://leejss.github.io/2021-07-20/redux-saga-and-api
// https://mytutorials.tistory.com/421
// https://redux-saga.js.org/docs/advanced/RootSaga

import { all, fork, put, call } from "redux-saga/effects";
import { getcomments, getCommentsReq, getCommentsError } from "./quotes-slice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FIREBASE_DOMAIN } from "./index";
