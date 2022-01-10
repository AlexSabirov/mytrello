export interface Board {
  user: string;
  cards: Record<string, Card>;
}

export interface Card {
  id: string;
  title: string;
  todos: Record<string, Todo> | null;
}

export interface Todo {
  id: string;
  title: string | null;
  comments: Record<string, Comment> | null;
}

export interface Comment {
  id: string;
  user: string;
  comment: string | null;
}

export interface Modal {
  visible: boolean;
  title: string;
  onClose: () => void;
}
