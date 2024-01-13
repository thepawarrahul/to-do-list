import React, { useState } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToAdd, setTaskToAdd] = useState("");

  const handleTaskAddChange = (event) => {
    setTaskToAdd(event.target.value);
  };

  const handAddTask = () => {
    const newTaskToAdd = {
      id : Date.now(),
      task: taskToAdd,
      completed: false
    };

    setTasks([...tasks, newTaskToAdd]);
    setTaskToAdd("");
  };

  return (
    <>
      <div>
        <input 
          type='text' 
          placeholder="task"
          onChange={handleTaskAddChange}
        />
      </div>
      <div>
        <button onClick={handAddTask}>Add Task</button>
      </div>
      <div>
        <ul style={{ listStyleType: 'none' }}>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
              />
              {task.task}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDo;