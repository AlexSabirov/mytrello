export interface Todo {
  id: number;
  title: string;
}

export interface Card {
  idCard: number;
  titleCard: string;
}

export interface Modal {
  visible: boolean;
  title: string;
  onClose: () => void;
}
