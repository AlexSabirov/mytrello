import { v4 } from 'uuid';

import { Board } from '../types/data';
import { BoardAction, BoardActionTypes } from './actions-type';

export default function reducer(state: Board, action: BoardAction): Board {
  switch (action.type) {
    case BoardActionTypes.AddCard:
      return {
        ...state,
        cards: {
          ...state.cards,
          Card: { id: v4(), title: action.payload.cards.card.title, todos: null },
        },
      };
    case BoardActionTypes.UpdateCard:
      for (const key in state.cards) {
        if (state.cards[key] === action.payload.cards.card) {
          state.cards[key].title = action.payload.cards.card.title;
        }
      }
      return action.payload;
    case BoardActionTypes.RemoveCard:
      for (const key in state.cards) {
        if (state.cards[key] === action.payload.cards.card) {
          delete state.cards[key];
        }
      }
      return action.payload;

    case BoardActionTypes.AddTodo:
      return {
        ...state,
        cards: {
          ...state.cards,
          Card: {
            ...state.cards.id,
            ...state.cards.title,
            todos: {
              ...state.cards.card.todos,
              todo: {
                id: v4(),
                title: action.payload.cards.card.todos?.todos.title || null,
                comments: null,
              },
            },
          },
        },
      };
    case BoardActionTypes.UpdateTodo:
      return action.payload;
    case BoardActionTypes.RemoveTodo:
      for (const key in state.cards.card.todos) {
        if (state.cards.card.todos[key] === action.payload.cards.card.todos?.todo) {
          delete state.cards.card.todos[key];
        }
      }
      return action.payload;
    case BoardActionTypes.AddComment:
      return {
        ...state,
        cards: {
          ...state.cards,
          Card: {
            ...state.cards.id,
            todos: {
              ...state.cards.card.todos,
              todo: {
                ...state.cards.todos,
                comments: {
                  ...state.cards.card.todos?.todo.comments,
                  comment: {
                    id: v4(),
                    user: state.user,
                    comment:
                      state.cards.card.todos?.todo.comments?.comment.comment || null,
                  },
                },
              },
            },
          },
        },
      };
    case BoardActionTypes.UpdateComment:
      return action.payload;
    case BoardActionTypes.RemoveComment:
      for (const key in state.cards.card.todos?.todo.comments) {
        if (
          state.cards.card.todos?.todo.comments[key] ===
          action.payload.cards.card.todos?.todo.comments?.comment
        ) {
          delete state.cards.card.todos?.todo.comments[key];
        }
      }
      return action.payload;
    default:
      return state;
  }
}
