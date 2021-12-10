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
}

const commentsInitialState: commentreqresState = {
  loading: false,
  data: [],
  error: null,
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
    },
    getCommentsReq: (state, action) => {
      state.comments.loading = true;
    },
    getCommentsError: (state, { payload }) => {
      state.comments.error = payload;
      state.comments.loading = false;
    },
  },
});

export const { getAllQuotes, getcomments, getCommentsReq, getCommentsError } =
  quotesSlice.actions;
export const quotesSliceName = quotesSlice.name;
export default quotesSlice.reducer;
