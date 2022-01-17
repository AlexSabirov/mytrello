import { v4 } from 'uuid';

import { Board } from '../types/data';
import { BoardAction, BoardActionTypes } from './actions-type';

export default function reducer(state: Board, action: BoardAction): Board {
  switch (action.type) {
    case BoardActionTypes.AddUserName: {
      return { ...state, ...action.payload };
    }
    case BoardActionTypes.AddColumn: {
      const id = v4();
      return {
        ...state,
        columns: {
          ...state.columns,
          [id]: { ...action.payload, id, cards: {} },
        },
      };
    }
    // case BoardActionTypes.UpdateColumn:
    //   for (const key in state.cards) {
    //     if (state.cards[key] === action.payload) {
    //       state.cards[key].title = action.payload.title;
    //     }
    //   }
    //   return action.payload.title;
    // case BoardActionTypes.RemoveColumn:
    //   for (const key in state.cards) {
    //     if (state.cards[key] === action.payload) {
    //       delete state.cards[key];
    //     }
    //   }
    //   return action.payload;

    case BoardActionTypes.AddCard: {
      const id = v4();
      const { columnId, ...restPayload } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cards: {
              ...state.columns[columnId].cards,
              [id]: { ...restPayload, id, comments: {} },
            },
          },
        },
      };
    }
    // case BoardActionTypes.UpdateCard:
    //   return action.payload;
    // case BoardActionTypes.RemoveCard:
    //   for (const key in state.cards.card.todos) {
    //     if (state.cards.card.todos[key] === action.payload.cards.card.todos?.todo) {
    //       delete state.cards.card.todos[key];
    //     }
    //   }
    //   return action.payload;

    case BoardActionTypes.AddComment: {
      const id = v4();
      const { columnId, cardId, ...restPayload } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cards: {
              [cardId]: {
                ...state.columns[columnId].cards[cardId],
                comments: {
                  ...state.columns[columnId].cards[cardId].comments,
                  [id]: { ...restPayload, id },
                },
              },
            },
          },
        },
      };
    }

    // case BoardActionTypes.UpdateComment:
    //   return action.payload;
    // case BoardActionTypes.RemoveComment:
    //   for (const key in state.cards.card.todos?.todo.comments) {
    //     if (
    //       state.cards.card.todos?.todo.comments[key] ===
    //       action.payload.cards.card.todos?.todo.comments?.comment
    //     ) {
    //       delete state.cards.card.todos?.todo.comments[key];
    //     }
    //   }
    //   return action.payload;
    default:
      return state;
  }
}
