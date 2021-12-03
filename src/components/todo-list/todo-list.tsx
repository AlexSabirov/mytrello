import { Todo } from '../../types/data';
import TodoItem from '../todo-item/';

interface TodoListProps {
  items: Todo[];
  removeTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  const { items, removeTodo } = props;

  return (
    <div>
      {items.map((todo) => (
        <TodoItem key={todo.id} removeTodo={removeTodo} {...todo} />
      ))}
    </div>
  );
};

export { TodoList };
