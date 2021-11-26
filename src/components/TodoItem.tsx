import { ITodo } from '../types/data'

interface ITodoItem extends ITodo {
	removeTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
	const { id, title, removeTodo } = props;

	return <div>
		{title}
		<button onClick={() => removeTodo(id)}>X</button>
	</div>
}

export { TodoItem }