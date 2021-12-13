import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface quotesState {
  id: string;
  author: string;
  text: string;
  sortId: number;
}
export interface commentState {
  id: string;
  text: string;
}

interface commentreqresState {
  loading: boolean;
  data: commentState[] | null;
  error: AxiosError | null;
  quoteId: string | null;
  postResult: boolean;
}

const commentsInitialState: commentreqresState = {
  loading: false,
  data: [],
  error: null,
  quoteId: null,
  postResult: false,
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    quotes: [] as quotesState[],
    comments: commentsInitialState,
  },
  reducers: {
    getAllQuotes: (state, action) => {
      const { data } = action.payload;
      let tempQuotes = [];
      let tempnum = 0;
      for (const key in data) {
        const quoteObj = {
          id: key,
          sortId: tempnum++,
          ...data[key],
        };
        tempQuotes.push(quoteObj);
      }
      state.quotes = tempQuotes;
    },
    getcomments: (state, action) => {
      const { data } = action.payload;
      let tempComments = [];
      for (const key in data) {
        const commentObj = {
          id: key,
          ...data[key],
        };
        tempComments.push(commentObj);
      }
      state.comments.loading = false;
      state.comments.data = tempComments;
      // state.comments.quoteId = null;
      state.comments.error = null;
    },
    getCommentsReq: (state, action) => {
      const { quoteId } = action.payload;
      state.comments.loading = true;
      state.comments.quoteId = quoteId;
      state.comments.error = null;
    },
    getCommentsError: (state, { payload }) => {
      state.comments.error = payload;
      state.comments.loading = false;
      state.comments.quoteId = null;
    },
    postCommentsReq: (
      state,
      action: { payload: { quoteId: string; text: string } }
    ) => {
      const { quoteId, text } = action.payload;
      state.comments.loading = true;
      state.comments.quoteId = quoteId;
      state.comments.postResult = false;
    },
    postCommentsError: (state, action) => {
      state.comments.error = action.payload;
      state.comments.postResult = false;
      state.comments.quoteId = null;
      state.comments.loading = false;
    },
    postCommentsSuccess: (state, action) => {
      const { result } = action.payload;
      state.comments.error = null;
      state.comments.loading = false;
      state.comments.postResult = result;
    },
  },
});

export const {
  getAllQuotes,
  getcomments,
  getCommentsReq,
  getCommentsError,
  postCommentsReq,
  postCommentsSuccess,
  postCommentsError,
} = quotesSlice.actions;
export const quotesSliceName = quotesSlice.name;
export default quotesSlice.reducer;
