import React, { useState, useRef } from "react";
import "./App.css";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [currentTask, setCurrentTask] = useState("");
    const inputTask = useRef(null);

    const addTask = () => {
        setTodoList([...todoList, { task: currentTask, completed: false }]); 
        setCurrentTask("");
        inputTask.current.value = "";
    };

    const deleteTask = (taskToDelete) => {
        setTodoList(todoList.filter((task) => {
            return task.task !== taskToDelete;
        }));
    };

    const completeTask = (taskToComplete) => {
        setTodoList(todoList.map((task) => {
            return task.task === taskToComplete
                ? { ...task, completed: true }: task;
        }));
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <input
                ref={inputTask}
                type="text"
                placeholder="Task......"
                onKeyDown={(event)=>{
                    if(event.keyCode==13){
                        addTask()
                    }
                }}
                onChange={(e) => setCurrentTask(e.target.value)}
                value={currentTask}
            />
            <button onClick={addTask}>Add Task</button>
            <hr />
            <ul>
                {todoList.map((val, key) => {
                    return (
                        <div id="task" key={key}>
                            <li>{val.task}</li>
                            <button id="complete" onClick={() => { completeTask(val.task) }}>completed</button>
                            <button id="del" onClick={() => { deleteTask(val.task) }}>Delete</button>
                            {val.completed ? <h1>Task Completed</h1> : <h1>Task not Completed</h1>}
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;