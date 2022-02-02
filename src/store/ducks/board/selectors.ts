import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';

const selectSelf = (state: RootState) => state;

export const selectorColumns = createSelector(selectSelf, (state) => state.boardSlice);

export const selectorCards = (columnId: string) =>
  createSelector(selectSelf, (state) => state.boardSlice.columns[columnId]);

export const selectorComments = (columnId: string, cardId: string) =>
  createSelector(selectSelf, (state) => state.boardSlice.columns[columnId].cards[cardId]);
