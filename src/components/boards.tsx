import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { ITodo } from '../types/data'

const Boards: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

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

export { Boards }