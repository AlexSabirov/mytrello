import { useContext } from 'react';

import { BoardContext } from '../../context/board/board-context';
import TodoItem from '../todo-item/';

const TodoList: React.FC = () => {
  const [state] = useContext(BoardContext);
  return (
    <div>
      {() => {
        for (const key in state.cards.card.todos) {
          <TodoItem>
            <h4>{state.cards.card.todos[key]}</h4>
          </TodoItem>;
        }
      }}
    </div>
  );
};

export { TodoList };
