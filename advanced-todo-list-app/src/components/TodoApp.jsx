import React, { useState, useEffect } from 'react';
import './styles/TodoApp.css';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todos'));
    if (savedTasks) {
      setTodoList(savedTasks);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const handleAdd = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      dueDate,
      priority,
    };

    setTodoList([newTask, ...todoList]);
    setTask('');
    setDueDate('');
    setPriority('Low');
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

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    );
    setEditId(null);
    setEditText('');
  };

  const filteredList = todoList.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return item.completed;
    if (filter === 'Incomplete') return !item.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h2>📋 Enhanced To-Do List</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
        <button onClick={() => setFilter('Incomplete')}>Incomplete</button>
      </div>

      <ul className="task-list">
        {filteredList.map((item) => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            {editId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(item.id)}>Save</button>
              </>
            ) : (
              <>
                <div onClick={() => toggleComplete(item.id)} className="task-info">
                  <strong>{item.text}</strong>
                  <div className="meta">
                    <span>📅 {item.dueDate || 'No date'}</span>
                    <span>🔥 {item.priority}</span>
                  </div>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(item.id, item.text)}>✏️</button>
                  <button onClick={() => handleDelete(item.id)}>❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
