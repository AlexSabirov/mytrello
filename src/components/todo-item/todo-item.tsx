import React from 'react';
import styled from 'styled-components';

import { Todo } from '../../types/data';
import CommentsWindow from '../comments-window';

const TodoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

interface TodoItemProps extends Todo {
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { id, title, removeTodo } = props;

  const [isModalComment, setModalComment] = React.useState(false);
  const onOpen = () => setModalComment(true);
  const onClose = () => setModalComment(false);

  return (
    <TodoItemWrapper>
      <div onClick={onOpen}>{title}</div>
      <button onClick={() => removeTodo(id)}>X</button>
      <CommentsWindow
        visible={isModalComment}
        title="Комментарии:"
        onClose={onClose}
        removeComment={function (): void {
          throw new Error('Function not implemented.');
        }}
        id={0}
        userName={''}
        comment={''}
      />
    </TodoItemWrapper>
  );
};

export { TodoItem };
