import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);


    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
            localStorage.setItem('tasks', JSON.stringify([...tasks, { text: newTask, completed: false }]));
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(tasks.filter((_, i) => i !== index)));

    };

    return (
        <div className="todo-page">
            <h1>Todo List</h1>
            <div className="search">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder='Add a task!'
                />
                <div className="button-src">
                    <button onClick={addTask}>
                        <i className="ri-add-line"></i>
                    </button>
                </div>
            </div>

            {tasks.map((task, index) => (
                <p key={index} className={task.completed ? 'completed ' : '' + 'd-flex justify-content-between w-100 my-2 px-4 py-2'}>
                    <span onClick={() => toggleTaskCompletion(index)}>
                        {task.text}
                    </span>
                    <button className='btn' onClick={() => deleteTask(index)}>
                        <i className="ri-delete-bin-line"></i>
                    </button>
                </p>
            ))}
        </div>
    );
};

export default TodoList;
