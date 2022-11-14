import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodosList from "./components/TodosList";
import "./App.css";

const App = () => {
  
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "active":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form 
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            setStatus={setStatus}
          />
        </div>
        <div>
          <TodosList 
            todos={todos} 
            setTodos={setTodos} 
            setEditTodo={setEditTodo} 
            filteredTodos={filteredTodos}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
