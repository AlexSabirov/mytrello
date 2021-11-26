import { TodoItem } from "./TodoItem"

import { ITodo } from '../types/data'

interface ITodoListProps {
	items: ITodo[];
	removeTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
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