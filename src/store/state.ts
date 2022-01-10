import { v4 } from 'uuid';

import { Board } from '../types/data';

export const initialState: Board = {
  user: 'Гость',
  cards: {
    card: {
      id: v4(),
      title: 'My card 1',
      todos: {
        todo: {
          id: v4(),
          title: 'My todo',
          comments: {
            comment: {
              id: v4(),
              user: '',
              comment: '',
            },
          },
        },
      },
    },
  },
};
