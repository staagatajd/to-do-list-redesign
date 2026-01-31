import { useEffect, useState } from 'react'


function MainToDoList() {

    const [tasks, setTasks] = useState(() => {
        const savedData = localStorage.getItem("task_list");
        return savedData ? JSON.parse(savedData) : [];
    }); 

    useEffect(() => {
        localStorage.setItem("task_list", JSON.stringify(tasks));
    }, [tasks]);

    const [inputValue, setInputValue] = useState(''); 

    
    const addTask = () => {
        if(inputValue.trim()) 
        {
            const newTask = {
                id: Date.now(),
                text: inputValue,
                completed: false
            };

            setTasks([newTask, ...tasks]);
            setInputValue(''); 
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task));
    }

    const deleteTask = (id) => {
        const upatedTasks = tasks.filter(task => task.id !== id);
        setTasks(upatedTasks);
    }

    const deleteAllChecked = () => {
        const nonCheckedTasks = tasks.filter(task => !task.completed);
        setTasks(nonCheckedTasks);
    }

  return(

    <div className='content'>
        <div className= 'toDoListPage'> 
            <h2>
                My Tasks 📖
            </h2>

            <div className= 'inputSection'>
                <input type = "text" id = "taskInput" value = {inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') addTask(); }} placeholder= "Add new task..."></input>

                <button onClick = {addTask} id='addBtn'>
                    + Add
                </button>
            </div>
            
            <DisplayTask tasks = {tasks} toggleTask = {toggleTask} deleteTask ={ deleteTask}/>

            <div>
                <button id = "deleteAllButton" onClick={deleteAllChecked}>
                    Delete All
                </button>
            </div>

        </div>
    </div>
  )
}

function DisplayTask({tasks, toggleTask, deleteTask})
{
    return(
        <div className="displayScreen"> 
            <ul id = "taskList">
                {tasks.map(task => (
                    <li key = {task.id} className= {`task-item ${task.completed ? 'checked-item' : ''}`}>
                        <input type="checkbox" checked = {task.completed} onChange={() => toggleTask(task.id)} className= 'task-check'/>
                        <span> {task.text} </span>
                        
                        {task.completed &&(
                            <button onClick={() => deleteTask(task.id)} id = "deleteBtn">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        )}
                    </li>
                ))} 
            </ul>
        </div>
    )
}

export default MainToDoList