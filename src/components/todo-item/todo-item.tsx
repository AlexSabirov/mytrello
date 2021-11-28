import { Todo } from '../../types/data'

interface ITodoItem extends Todo {
	removeTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
	const { id, title, removeTodo } = props;

	return <div className='board__item'>
		<div>
		{title}
		</div>
		<button onClick={() => removeTodo(id)}>X</button>
	</div>
}

export { TodoItem }