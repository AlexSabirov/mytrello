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
    case BoardActionTypes.UpdateColumn: {
      const { columnId, ...restPayload } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            ...restPayload,
          },
        },
      };
    }
    case BoardActionTypes.RemoveColumn: {
      const { columnId } = action.payload;
      const newState = { ...state };
      delete newState.columns[columnId];
      return newState;
    }

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
    case BoardActionTypes.UpdateCard: {
      const { columnId, cardId, ...restPayload } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cards: {
              ...state.columns[columnId].cards,
              [cardId]: { ...state.columns[columnId].cards[cardId], ...restPayload },
            },
          },
        },
      };
    }
    case BoardActionTypes.RemoveCard: {
      const { columnId, cardId } = action.payload;
      const newState = { ...state };
      delete newState.columns[columnId].cards[cardId];
      return newState;
    }

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
              ...state.columns[columnId].cards,
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

    case BoardActionTypes.UpdateComment: {
      const { columnId, cardId, commentId, ...restPayload } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cards: {
              ...state.columns[columnId].cards,
              [cardId]: {
                ...state.columns[columnId].cards[cardId],
                comments: {
                  ...state.columns[columnId].cards[cardId].comments,
                  [commentId]: {
                    ...state.columns[columnId].cards[cardId].comments[commentId],
                    ...restPayload,
                  },
                },
              },
            },
          },
        },
      };
    }
    case BoardActionTypes.RemoveComment: {
      const { columnId, cardId, commentId } = action.payload;
      const newState = { ...state };
      delete newState.columns[columnId].cards[cardId].comments[commentId];
      return newState;
    }
    default:
      return state;
  }
}
