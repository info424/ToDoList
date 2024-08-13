import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos]=useState([])
  const toDoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos)
      setTodos(storedTodos);
    
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function onClick(e)
  {
     const name = toDoNameRef.current.value
     if(name === '')
      return
      setTodos(prevTodos => {
        return [... prevTodos, {id: uuidv4(), name: name, complete: false}]
      })
      toDoNameRef.current.value = null;
  }

  function onClickErase()
  {
     const newTodos = todos.filter(todo => !todo.complete)
     setTodos(newTodos)
  }

  return (
    <>
      <ToDoList className="todos" todos={todos} toggleTodo={toggleTodo} />
      <input className="form" ref={toDoNameRef} type="text"></input>
      <button className="add-btn" onClick={onClick}>ADD</button>
      <button className="erase-btn" onClick={onClickErase}>ERASE</button>
      <div className="scris"> {todos.filter(todo => !todo.complete).length} left to do's</div>
      <h1 class="titlu">TO DO LIST</h1>
    </>
  );
}

export default App;
