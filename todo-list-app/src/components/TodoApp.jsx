import React, { useState } from 'react';
import './styles/TodoApp.css';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleAdd = () => {
    if (task.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTodoList([newTask, ...todoList]);
    setTask('');
  };

  const handleDelete = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="todo-container">
      <h2>📝 React To-Do List</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      <ul className="task-list">
        {todoList.map((item) => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(item.id)}>{item.text}</span>
            <button onClick={() => handleDelete(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
