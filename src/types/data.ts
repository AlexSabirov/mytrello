export interface Todo {
  id: number;
  title: string;
}

export interface Card {
  idCard: number;
  titleCard: string;
}

export interface ModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
}
