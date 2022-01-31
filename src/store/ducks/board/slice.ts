import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import { initialState } from './state';
import {
  AddCard,
  AddColumn,
  AddComment,
  RemoveCard,
  RemoveColumn,
  RemoveComment,
  UpdateCard,
  UpdateColumn,
  UpdateComment,
} from './types';

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addUserName(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },

    addColumn(state, action: PayloadAction<AddColumn>) {
      const id = v4();
      const { title } = action.payload;
      state.columns[id] = { title, id, cards: {} };
    },
    updateColumn(state, action: PayloadAction<UpdateColumn>) {
      const { columnId, title } = action.payload;
      state.columns[columnId].title = title;
    },
    removeColumn(state, action: PayloadAction<RemoveColumn>) {
      const { columnId } = action.payload;
      delete state.columns[columnId];
    },
    addCard(state, action: PayloadAction<AddCard>) {
      const id = v4();
      const { title, columnId } = action.payload;
      state.columns[columnId].cards[id] = { title, id, comments: {} };
    },
    updateCard(state, action: PayloadAction<UpdateCard>) {
      const { columnId, cardId, title } = action.payload;
      state.columns[columnId].cards[cardId].title = title;
    },
    removeCard(state, action: PayloadAction<RemoveCard>) {
      const { columnId, cardId } = action.payload;
      delete state.columns[columnId].cards[cardId];
    },
    addComment(state, action: PayloadAction<AddComment>) {
      const id = v4();
      const { title, columnId, cardId } = action.payload;
      state.columns[columnId].cards[cardId].comments[id] = { title, id };
    },
    updateComment(state, action: PayloadAction<UpdateComment>) {
      const { columnId, cardId, commentId, title } = action.payload;
      state.columns[columnId].cards[cardId].comments[commentId].title = title;
    },
    removeComment(state, action: PayloadAction<RemoveComment>) {
      const { columnId, cardId, commentId } = action.payload;
      delete state.columns[columnId].cards[cardId].comments[commentId];
    },
  },
});

export default boardSlice.reducer;
