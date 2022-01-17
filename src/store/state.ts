import { v4 } from 'uuid';

import { Board } from '../types/data';

const columnId = v4();
const cardId = v4();
const commentId = v4();
const columnId2 = v4();
const cardId2 = v4();
const commentId2 = v4();
const columnId3 = v4();
const cardId3 = v4();
const commentId3 = v4();
const columnId4 = v4();
const cardId4 = v4();
const commentId4 = v4();

export const initialState: Board = {
  user: '',
  columns: {
    [columnId]: {
      id: columnId,
      title: 'TODO',
      cards: {
        [cardId]: {
          id: cardId,
          title: 'My card',
          comments: {
            [commentId]: {
              id: commentId,
              title: 'My comment',
            },
          },
        },
      },
    },
    [columnId2]: {
      id: columnId2,
      title: 'In Progress',
      cards: {
        [cardId2]: {
          id: cardId2,
          title: 'My card',
          comments: {
            [commentId2]: {
              id: commentId2,
              title: 'My Comment',
            },
          },
        },
      },
    },
    [columnId3]: {
      id: columnId3,
      title: 'Testing',
      cards: {
        [cardId3]: {
          id: cardId3,
          title: 'My card',
          comments: {
            [commentId3]: {
              id: commentId3,
              title: 'My Comment',
            },
          },
        },
      },
    },
    [columnId4]: {
      id: columnId4,
      title: 'Done',
      cards: {
        [cardId4]: {
          id: cardId4,
          title: 'My card',
          comments: {
            [commentId4]: {
              id: commentId4,
              title: 'My Comment',
            },
          },
        },
      },
    },
  },
};
