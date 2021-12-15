import { v4 } from 'uuid';

import { Board } from '../../types/data';

export const initialState: Board = {
  user: '',
  cards: {
    card: {
      id: v4(),
      name: 'My card 1',
      todos: {
        todo: {
          id: v4(),
          name: 'My todo',
          comments: {
            comment: '',
          },
        },
      },
    },
  },
};

interface BoardAction {
  type: 'AddCard';
  payload: Board;
}

export function init(initialState: Board) {
  localStorage.setItem('trello', JSON.stringify(initialState));
  const state = JSON.parse(localStorage.getItem('trello'));
  try {
    return state;
  } catch (err) {
    localStorage.removeItem('trello');
    return initialState;
  }
}

export default function reducer(state: Board, action: BoardAction): Board {
  switch (action.type) {
    case 'AddCard':
      return action.payload;
    default:
      return state;
  }
}
