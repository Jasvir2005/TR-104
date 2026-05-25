import React from 'react'
import TodoItem from './TodoItem'
import todos from './data'

const Todolist = () => {
    const[inputvalue,setInputValue] = React.useState(" ")
    const[tododata,setTododata] = React.useState(JSON.parse(localStorage.getItem("todos")))

    const addTodo =()=>{
        let newTodo = {
            id:tododata[tododata.length-1].id+1,
            title:inputvalue,
            completed:false
        }
        let newTodoArray = [];

        for(let i=0;i<tododata.length;i++){
            newTodoArray.push(tododata[i])
        }
        newTodoArray.push(newTodo)
        setTododata(newTodoArray)

        localStorage.setItem("todos",JSON.stringify(newTodoArray))
    }

    const deleteTodo = (id)=>{
        let newTodoArray = [];

        for(let i=0;i<tododata.length;i++){
            if(tododata[i].id!==id){
                newTodoArray.push(tododata[i])
            }
        }
        setTododata(newTodoArray)
        localStorage.setItem("todos",JSON.stringify(newTodoArray))
    }

    const updateTodo = (id,data)=>{
        let newTodoArray = [];

        for(let i=0;i<tododata.length;i++){
            if(tododata[i].id == id){
                tododata[i].title= data;
                newTodoArray.push(tododata[i])
            }
            else{
                newTodoArray.push(tododata[i])
            }
        }
        setTododata(newTodoArray)
        localStorage.setItem("todos",JSON.stringify(newTodoArray))
    }

    const markAsDone = (id)=>{
        let newTodoArray = [];

        for(let i=0;i<tododata.length;i++){
            if(tododata[i].id == id){
                tododata[i].completed= true;
                newTodoArray.push(tododata[i])
            }
            else{
                newTodoArray.push(tododata[i])
            }
        }
        setTododata(newTodoArray)
        localStorage.setItem("todos",JSON.stringify(newTodoArray))
    }
    
    return (
    <div style={{
        height:"500px",
        width:"400px",
        margin:"0 auto",
        padding:"10px",
        display:"flex",
        flexDirection:"column",
        gap:"10px"
        
    }}>
        <h2>TODOLIST</h2>
        <div style={{
            height:"35px",
            width:"105%",
            display:"flex",
            justifyContent:"space-between"
        }}>
            <input value={inputvalue} onChange={(e)=>setInputValue(e.target.value)} style={{width:"90%"}} type="text" />
            <button onClick={addTodo} style={{backgroundColor:"blue",color:"white"}}>Add</button>
        </div>

        {
            tododata.map((todo)=>(
                <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} markAsDone={markAsDone}/>
            ))
        }
    </div>
  )
}

export default Todolist
