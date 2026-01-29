import { useState } from 'react'


function MainToDoList() {

    const [tasks, setTasks] = useState([]); //this creates an array for variable tasks, default value [].
    const [inputValue, setInputValue] = useState(''); //this sets up the input value to ''. inputvalue as the input, setInputValue as the function/modifier.

    //a function for the addBtn, it uses the state that useState created
    const addTask = () => {
        if(inputValue.trim()) //if the inputValue is not null or it has characters
        {
            const newTask = {
                id: Date.now(),
                text: inputValue,
                completed: false
            };

            setTasks([newTask, ...tasks]);
            setInputValue(''); //setting the input value on default affter adding.
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

  return(

    <div className='content'>
        <div className= 'toDoListPage'> 
            <h2>
                My Tasks 📖
            </h2>

            <div className= 'inputSection'>
                <input type = "text" id = "taskInput" value = {inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder= "Add new task..."></input>

                <button onClick = {addTask} id='addBtn'>
                    + Add
                </button>
            </div>
            
            <DisplayTask tasks = {tasks} toggleTask = {toggleTask} deleteTask ={ deleteTask}/>

            <div>

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
                    <li key = {task.id}>
                        <input type="checkbox" checked = {task.completed} onChange={() => toggleTask(task.id)} className= 'task-check'/>
                        <span> {task.text} </span>
                        
                        {task.completed &&(
                            <button onClick={() => deleteTask(task.id)} id = "deleteBtn">
                                delete
                            </button>
                        )}
                    </li>
                ))} 
            </ul>
        </div>
    )
}

export default MainToDoList
