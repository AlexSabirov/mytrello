import { Board } from '../types/data';
import { BoardAction, BoardActionTypes } from './actions-type';

export default function reducer(state: Board, action: BoardAction): Board {
  switch (action.type) {
    case BoardActionTypes.AddCard:
      return action.payload;
    case BoardActionTypes.UpdateCard:
      return action.payload;
    case BoardActionTypes.RemoveCard:
      return action.payload;
    case BoardActionTypes.AddTodo:
      return action.payload;
    case BoardActionTypes.UpdateTodo:
      return action.payload;
    case BoardActionTypes.RemoveTodo:
      return action.payload;
    case BoardActionTypes.AddComment:
      return action.payload;
    case BoardActionTypes.UpdateComment:
      return action.payload;
    case BoardActionTypes.RemoveComment:
    default:
      return state;
  }
}
