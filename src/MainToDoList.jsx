import { useState } from 'react'


function MainToDoList() {

    const [tasks, setTasks] = useState([]); //this creates an array for variable tasks, default value [].
    const [inputValue, setInputValue] = useState(''); //this sets up the input value to ''. inputvalue as the input, setInputValue as the function/modifier.

    //a function for the addBtn, it uses the state that useState created
    const addTask = () => {
        if(inputValue.trim()) //if the inputValue is not null or it has characters
        {
            setTasks([inputValue, ...tasks]); //function for tasks array or vector in c++ where it pushes elements in it. ...tasks is the elements, inputvalue is the pushback
            setInputValue(''); //setting the input value on default affter adding.
        }
    };

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
            
            <DisplayTask tasks = {tasks}/>

            <div>

            </div>
        </div>
    </div>
  )
}

function DisplayTask({tasks})
{
    return(
        <div className="displayScreen"> 
            <ul id = "taskList">
                {tasks.map((task, index) => (
                    <li key = {index}>
                        {task}
                    </li>
                ))} 
            </ul>
        </div>
    )
}

export default MainToDoList
