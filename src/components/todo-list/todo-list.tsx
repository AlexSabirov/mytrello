import { TodoItem } from "../todo-item/todo-item"

import { Todo } from '../../types/data'

interface TodoListProps {
	items: Todo[];
	removeTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
	const { items, removeTodo } = props;

	return <div>
		{
			items.map(todo =>
				<TodoItem
					key={todo.id}
					removeTodo={removeTodo}
					{...todo}
				/>
			)}
	</div>
}

export { TodoList }