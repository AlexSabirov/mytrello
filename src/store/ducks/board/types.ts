export interface AddColumn {
  title: string;
}

export interface UpdateColumn {
  columnId: string;
  title: string;
}

export interface RemoveColumn {
  columnId: string;
}

export interface AddCard {
  title: string;
  columnId: string;
}

export interface UpdateCard {
  columnId: string;
  cardId: string;
  title: string;
}

export interface RemoveCard {
  columnId: string;
  cardId: string;
}

export interface AddComment {
  title: string;
  columnId: string;
  cardId: string;
}

export interface UpdateComment {
  columnId: string;
  cardId: string;
  commentId: string;
  title: string;
}

export interface RemoveComment {
  columnId: string;
  cardId: string;
  commentId: string;
}
