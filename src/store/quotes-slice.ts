import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    quotes: [] as quotesState[],
    comments: [] as commentState[],
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
      state.comments = tempComments;
    },
  },
});

export const { getAllQuotes, getcomments } = quotesSlice.actions;
export const quotesSliceName = quotesSlice.name;
export default quotesSlice.reducer;
