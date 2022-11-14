import React, {useEffect} from "react";
import {v4 as uuidv4} from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo, setStatus }) => {

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? {title, id, completed} : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };
    useEffect(() => {
        if(editTodo){
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [setInput, editTodo]);

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!editTodo) {
            setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
        setInput("");
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    };

    const statusHandler = (event) => {
        setStatus(event.target.value);
    }

    return (
        <>
        <form onSubmit={onFormSubmit}>
            <input 
                type="text" 
                placeholder="What to do" 
                className="task-input" 
                value={input} 
                required
                onChange={onInputChange}
            />
            <button className="button-add" type="submit">
                {editTodo ? "OK" : "Add"}
            </button>
        </form>
        <div className="select">
            <button onChange={statusHandler} value="all" className="button-select">All</button>
            <button onChange={statusHandler} value="active" className="button-select">Active</button>
            <button onChange={statusHandler} value="completed" className="button-select">Completed</button>
        </div>
        </>
    );
};

export default Form;