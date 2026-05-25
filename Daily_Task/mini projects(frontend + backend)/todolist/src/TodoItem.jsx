import React, { useState } from 'react'
import { IoMdDoneAll } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";

const TodoItem = ({todo,deleteTodo,updateTodo,markAsDone}) => {
    const[isDone,setIsDone]= React.useState(false)
    const[isUpdate,setIsUpdate]= React.useState(false)
    const[inputvalue,setInputvalue]= useState(todo.title);
  return (
    <div style={{
        height:"35px",
        width:"100%",
        backgroundColor:todo.completed?"lightgreen":"lightpink",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"0 10px"
    }}>
      {
        isUpdate? <input value={inputvalue} onChange={(e)=>setInputvalue(e.target.value)} type="text"/> :  <span>{todo.title}</span>
      }  
        <div>
        {
          !todo.completed? isUpdate? <MdOutlineSaveAlt size={20} onClick={()=>{
            updateTodo(todo.id,inputvalue)
            setIsUpdate(false)
          }}/>
            : <div>
              <IoMdDoneAll size={20} onClick={()=>markAsDone(true)} style={{cursor: "pointer",padding: "5px"}}/>
              <MdOutlineBrowserUpdated size={20} onClick={()=>setIsUpdate(true)} style={{cursor: "pointer",padding: "5px"}}/>
              </div>
            :<RiDeleteBin5Line size={20} onClick={()=>deleteTodo(todo.id)}/>
        }
        </div>
    </div>
  )
}

export default TodoItem
