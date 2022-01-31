export interface Board {
  user: string;
  columns: Record<string, Columns>;
}

export interface Columns {
  id: string;
  title: string;
  cards: Record<string, Card>;
}

export interface Card {
  id: string;
  title: string;
  comments: Record<string, Comment>;
}

export interface Comment {
  id: string;
  title: string;
}

export interface Modal {
  onClose: () => void;
}
