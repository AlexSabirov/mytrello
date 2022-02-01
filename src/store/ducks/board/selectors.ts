import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';

const selectSelf = (state: RootState) => state;

export const selectorCards = createSelector(
  selectSelf,
  (state) => state.boardSlice.columns,
);

export const getCardList = createSelector(selectSelf, (cards) => Object.values(cards));
