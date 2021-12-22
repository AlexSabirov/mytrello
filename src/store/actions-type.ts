import { Board } from '../types/data';

export type BoardAction = CardAction | TodoAction | CommentAction;

export enum BoardActionTypes {
  AddCard = 'BOARD/ADD_CARD',
  UpdateCard = 'BOARD/UPDATE_CARD',
  RemoveCard = 'BOARD/REMOVE_CARD',
  AddTodo = 'BOARD/CARD/ADD_TODO',
  UpdateTodo = 'BOARD/CARD/UPDATE_TODO',
  RemoveTodo = 'BOARD/REMOVE_TODO',
  AddComment = 'BOARD/CARD/ADD_COMMENT',
  UpdateComment = 'BOARD/CARD/UPDATE_COMMENT',
  RemoveComment = 'BOARD/REMOVE_COMMENT',
}

interface CardAddAction {
  type: BoardActionTypes.AddCard;
  payload: Board;
}

interface CardUpdateAction {
  type: BoardActionTypes.UpdateCard;
  payload: Board;
}

interface CardRemoveAction {
  type: BoardActionTypes.RemoveCard;
  payload: Board;
}

type CardAction = CardAddAction | CardUpdateAction | CardRemoveAction;

interface TodoAddAction {
  type: BoardActionTypes.AddTodo;
  payload: Board;
}

interface TodoUpdateAction {
  type: BoardActionTypes.UpdateTodo;
  payload: Board;
}

interface TodoRemoveAction {
  type: BoardActionTypes.RemoveTodo;
  payload: Board;
}

type TodoAction = TodoAddAction | TodoUpdateAction | TodoRemoveAction;

interface CommentAddAction {
  type: BoardActionTypes.AddComment;
  payload: Board;
}

interface CommentUpdateAction {
  type: BoardActionTypes.UpdateComment;
  payload: Board;
}

interface CommentRemoveAction {
  type: BoardActionTypes.RemoveComment;
  payload: Board;
}

type CommentAction = CommentAddAction | CommentUpdateAction | CommentRemoveAction;
