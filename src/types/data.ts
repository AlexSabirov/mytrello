export interface Todo {
  id: string;
  title: string;
  comments: Record<string, Comment>;
}

export interface Card {
  id: string;
  title: string;
  todos: Record<string, Todo>;
}

export interface Modal {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export interface Comment {
  id: string;
  user: string;
  comment: string;
}

export interface Board {
  user: string;
  cards: Record<string, Card>;
}
