import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { ITodo } from './types/data'

const App: React.FC = () => {
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

  return (
    <div className="app">
      <div>
        <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyDown} />
        <button onClick={addTodo}>Добавить</button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} />
    </div>
  );
}

export default App;
