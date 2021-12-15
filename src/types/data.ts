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

export interface Comment {
  id: number;
  userName: string;
  comment: string;
}

export interface Board {
  user: string;
  cards: {
    [key: string]: {
      id: string;
      name: string;
      todos: {
        todo: {
          id: string;
          name: string;
          comments: {
            comment: string;
          };
        };
      };
    };
  };
}
