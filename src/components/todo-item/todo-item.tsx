import { Todo } from '../../types/data';
import styled from 'styled-components';

const TodoItemWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 5px;
`

interface TodoItemProps extends Todo {
	removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
	const { id, title, removeTodo } = props;

	return <TodoItemWrapper>
		<div>
		{title}
		</div>
		<button onClick={() => removeTodo(id)}>X</button>
	</TodoItemWrapper>
}

export { TodoItem }