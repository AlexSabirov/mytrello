import React, { useState } from 'react';
import { TodoList } from '../todo-list/todo-list';
import { Todo } from '../../types/data'

const Card: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') addTodo();
  }

  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value
      }])
      setValue('')
    }
  }

  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  };

	return <div className='app__board'>
    <div className='board__buttons'>
        <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyDown} className='board__input' />
        <button onClick={addTodo} className='board__button'>Добавить</button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} />
  </div>
}

export { Card }