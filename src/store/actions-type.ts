export type BoardAction = ColumnAction | CardAction | CommentAction | UserAction;

export enum BoardActionTypes {
  AddUserName = 'BOARD/ADD_USER_NAME',
  AddColumn = 'BOARD/ADD_COLUMN',
  UpdateColumn = 'BOARD/UPDATE_COLUMN',
  RemoveColumn = 'BOARD/REMOVE_COLUMN',
  AddCard = 'BOARD/COLUMN/ADD_CARD',
  UpdateCard = 'BOARD/COLUMN/UPDATE_CARD',
  RemoveCard = 'BOARD/COLUMN/REMOVE_CARD',
  AddComment = 'BOARD/COLUMN/CARD/ADD_COMMENT',
  UpdateComment = 'BOARD/COLUMN/CARD/UPDATE_COMMENT',
  RemoveComment = 'BOARD/COLUMN/CARD/REMOVE_COMMENT',
}

interface ColumnAddAction {
  type: BoardActionTypes.AddColumn;
  payload: { title: string };
}

export interface ColumnUpdateAction {
  type: BoardActionTypes.UpdateColumn;
  payload: { title: string; columnId: string };
}

interface ColumnRemoveAction {
  type: BoardActionTypes.RemoveColumn;
  payload: { columnId: string };
}

type ColumnAction = ColumnAddAction | ColumnUpdateAction | ColumnRemoveAction;

interface CardAddAction {
  type: BoardActionTypes.AddCard;
  payload: { title: string; columnId: string };
}

interface CardUpdateAction {
  type: BoardActionTypes.UpdateCard;
  payload: { title: string; columnId: string; cardId: string };
}

interface CardRemoveAction {
  type: BoardActionTypes.RemoveCard;
  payload: { columnId: string; cardId: string };
}

type CardAction = CardAddAction | CardUpdateAction | CardRemoveAction;

interface CommentAddAction {
  type: BoardActionTypes.AddComment;
  payload: { title: string; columnId: string; cardId: string };
}

interface CommentUpdateAction {
  type: BoardActionTypes.UpdateComment;
  payload: { title: string; columnId: string; cardId: string; commentId: string };
}

interface CommentRemoveAction {
  type: BoardActionTypes.RemoveComment;
  payload: { columnId: string; cardId: string; commentId: string };
}

type CommentAction = CommentAddAction | CommentUpdateAction | CommentRemoveAction;

interface AddUserName {
  type: BoardActionTypes.AddUserName;
  payload: { user: string };
}

type UserAction = AddUserName;
