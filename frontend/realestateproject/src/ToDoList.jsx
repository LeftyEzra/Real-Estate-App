import React, {useState, useEffect} from "react";
import { useOptimistic } from "react";

function ToDoList(props){

    const [tasks, setTasks] = useState([]);
    const [newtask, setNewTask] = useState("");
  
   

    // Function to handle what is being written in the input field
    function handleInputChange(event){
        setNewTask(event.target.value);

    }

    // Add function
    function addTask(){
        if(newtask.trim() !== ""){
        setTasks(t => [...t, newtask]);
        setNewTask("");
        }
        
    }

    //  Update Task function
    function updateTask(index){

        const updateTasks = tasks.get((_, i) => i !== index);
        setTasks(updateTasks);

        
    }
    //  Delete Task function
    function deleteTask(index){

        const deleteTasks = tasks.filter((_, i) => i !== index);
        setTasks(deleteTasks);
    }

    //  Move Task Up
    function moveTaskUp(index){

        if(index > 0 ){
            const moveTasksUp = [...tasks];
            [moveTasksUp[index], moveTasksUp[index - 1]] = [moveTasksUp[index - 1], moveTasksUp[index]];
            setTasks(moveTasksUp);

            }
    }

    //  Move Task Down
    function moveTaskDown(index){
        if(index < tasks.length -1 ){
            const moveTasksDown = [...tasks];
            [moveTasksDown[index], moveTasksDown[index + 1]] = [moveTasksDown[index + 1], moveTasksDown[index]];
            setTasks(moveTasksDown);
            
            }
        
    }

    return(
        <div className="to-do-list">
           <h1> To Do List </h1>
           <div>
                <input type="text"
                placeholder="Enter task here..."
                value={newtask}
                onChange={handleInputChange}/>
                <button className="add-button"
                   onClick={addTask}>
                    Add Task 
                </button> 
           </div>
           
          

             <ol>
              {tasks.map((task, index) =>
                  <li key={index}>
                    <span className="text">{task}</span>
                    <button className="delete-button"
                            onClick={() => updateTask(index)}>
                      Update Task
                    </button>
                    <button className="delete-button"
                            onClick={() => deleteTask(index)}>
                      Delete Task
                    </button>
                    <button className="move-button"
                            onClick={() => moveTaskUp(index)}>
                      Move Up
                    </button>
                    <button className="move-button"
                            onClick={() => moveTaskDown(index)}>
                      Move Down
                    </button>
                  </li>
                  
              )}
           </ol>
          

           

        </div>
        
        
    );

}





export default ToDoList