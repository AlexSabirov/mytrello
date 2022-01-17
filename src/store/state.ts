import { v4 } from 'uuid';

import { Board } from '../types/data';

const columnId = v4();
const cardId = v4();
const commentId = v4();

export const initialState: Board = {
  user: '',
  columns: {
    [columnId]: {
      id: columnId,
      title: 'My column 1',
      cards: {
        [cardId]: {
          id: cardId,
          title: 'My card',
          comments: {
            [commentId]: {
              id: commentId,
              title: '123',
            },
          },
        },
      },
    },
  },
};
