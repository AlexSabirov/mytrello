import React, { useState } from 'react';
import styled from 'styled-components';

import { Todo } from '../../types/data';
import { Card } from '../../types/data';
import TodoList from '../todo-list';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 15px;
  max-width: 33%;
  background-color: rgb(202, 202, 202);
  border-radius: 5px;
  min-width: 240px;
`;

const CardTitle = styled.div`
  padding: 10px 5px;
  font-size: 26px;
`;

const CardButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardInput = styled.input`
  height: 40px;
  padding: 5px;
`;

const CardButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: rgb(79, 79, 211);
  color: #ffffff;
  border: 1px solid white;
  &:hover {
    opacity: 0.9;
  }
`;

interface CardItemProps extends Todo, Card {
  removeTodo: (id: number) => void;
}

const CardItem: React.FC<CardItemProps> = (props) => {
  const { titleCard } = props;
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  const addTodo = () => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
        },
      ]);
      setValue('');
    }
  };

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <CardWrapper>
      <CardButtonsWrapper>
        <CardTitle>{titleCard}</CardTitle>
        <CardInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <CardButton onClick={addTodo}>Добавить</CardButton>
      </CardButtonsWrapper>
      <TodoList items={todos} removeTodo={removeTodo} />
    </CardWrapper>
  );
};

export { CardItem };
