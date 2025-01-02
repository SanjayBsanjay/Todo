import React, { useState } from 'react'
import './Todo.css'

const Todo = () => {
  const [taskName,setTaskName] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [priority,setPriority] = useState('low');
  const [estimatedTime,setEstimatedTime] = useState('');
  const [tasks,setTasks] = useState([]);

  const addTask = () =>{
    if(taskName === '' || dueDate === '' || priority === ''){
      alert('Please fill in all fields!');
      return;
    }

    const newTask = {
      taskName,
      dueDate,
      priority,
      estimatedTime: priority === 'high' ? estimatedTime : "",
      status: 'Pending',
    };

    setTasks([...tasks,newTask]);

    setTaskName('');
    setDueDate('');
    setPriority('low');
    setEstimatedTime('');
  };

  const markComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = 'Completed';
    setTasks(updatedTasks);
  }

  const deleteTask = (index) =>{
    const updatedTasks = tasks.filter((task,i)=> i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className='container'>
        <h1>Todo</h1>
        <div className="todo-form">
            <label htmlFor="task-name">Task Name: </label>
            <input 
               type="text"
               id='task-name'
               value={taskName}
               onChange={(e)=> setTaskName(e.target.value)}
               placeholder='Task name'
            />
            <label htmlFor="due-date">Due Date: </label>
            <input type="date"
            id='due-date'
            value={dueDate}
            onChange={(e)=> setDueDate(e.target.value)}
             />
            <label htmlFor="priority">Priority: </label>
            <select id="priority" value={priority}
            onChange={(e)=> setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>   
            </select> 
            {priority === 'high' && (
                <> <br />
                <label htmlFor="estimated-time">Estimated Time (hrs):</label>
                <input type="text" id='estimated-time'
                value={estimatedTime}
                onChange={(e)=> setEstimatedTime(e.target.value)}
                placeholder='Estimated time(hrs)'/>
                </>       
            )}
            <button onClick={addTask}>Add Task</button>
        </div>

        <table className="todo-list">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Due Date</th>
              <th>priority</th>
              <th>Estimated Time (hrs)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task,index)=>(
              <tr key={index} className={task.status === 'Completed' ? 'completed' : ""}>
                <td>{task.taskName}</td>
                <td>{task.dueDate}</td>
                <td className={`${task.priority}-priority`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </td>
              <td>{task.priority === 'high' ? task.estimatedTime + ' hrs' : ''}</td>
                <td>{task.status}</td>
                <td>
                  <button
                  className="button-complete"onClick={()=> markComplete(index)}>Complete</button>
                  <button
                  className="button-delete"onClick={()=> deleteTask(index)}>Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

    </div>
  )
}

export default Todo