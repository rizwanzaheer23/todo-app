import React, { useState, useEffect } from 'react'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setTodos([
      ...todos,
      {
        text: inputValue,
        completed: false,
        id: Date.now(),
      },
    ])

    setInputValue('')
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleTodoItemDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleTodoItemToggle = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      }),
    )
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos)
  }, [])

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleTodoItemDelete}
            onToggle={handleTodoItemToggle}
          />
        ))}
      </ul>
    </div>
  )
}
