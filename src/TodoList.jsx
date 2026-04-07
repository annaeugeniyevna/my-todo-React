import { useState, useEffect } from "react";

const TodoList = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("my_todos");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [input, setInput] = useState("");

    useEffect(() => {
        localStorage.setItem("my_todos", JSON.stringify(tasks));
    }, [tasks]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.done).length;

    const addTask = () => {
        if (input === "") return;
        const newTasks = [...tasks, {text: input, done: false}];
        setTasks(newTasks);
        setInput("");
    };

    const deleteTask = (indexToDelete) => {
        const filteredTasks = tasks.filter((item, index) => index !== indexToDelete);
        setTasks(filteredTasks);
    };

    const clearCompleted = () => {
        const activeTasks = tasks.filter(task => !task.done);
        setTasks(activeTasks);
    };

    const toggleTask = (indexToToggle) => {
        const updateTasks = tasks.map((task, index) => {
            if (index === indexToToggle) {
                return {...task, done: !task.done};
            }
            return task;
        });
        setTasks(updateTasks);
    }

    return (
        <div>
            <h1>Мої задачі!</h1>
            <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Нова задача..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}

            style={{marginRight: "10px"}}
            />
            <button onClick={addTask}>Додати</button>

            {totalTasks > 0 && (
                <p style={{marginTop: "20px", fontSize: "14px", color: "#aaa"}}>
                    Виконано: {completedTasks} з {totalTasks}

                    {completedTasks > 0 && (
                        <button 
                        onClick={clearCompleted}
                        style={{marginLeft: "15px", fontSize: "12px", cursor: "pointer"}}>
                        Очистити виконані
                        </button>
                    )}
                </p>
                )}


            <ul>
                {tasks.map((task, index) => (
                    <li key={index}
                    style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px"}}>
                    <span onClick={() => toggleTask(index)}
                        style={{textDecoration: task.done ? "line-through" : "none", 
                        cursor: "pointer", color: task.done ? "gray" : "white"}}>
                        {task.text}
                        </span>
                    <button onClick={() => deleteTask(index)}
                    style={{marginLeft: "10px"}}>
                        ✕
                    </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;