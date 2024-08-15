import React from 'react'
import TodoContext from './TodoContext';

function TodoState(props){
    let host = 3001;
    let [todo, setTodo] = React.useState([])
    async function getToDO(){
        try {
            let response = await fetch(`http://localhost:${host}/api/todo/gettoDoList`,
                {
                    method : "GET",
                    headers : {
                        "Content-Type" : "application/json",
                        "auth-token" : localStorage.getItem("token")
                    }
                }
            )
            let json = await response.json()
            console.log("success")
            setTodo(json)
        } catch (error) {
            
        }
    }

    async function addTodo(description, checked) {
        try {
            let response = await fetch(`http://localhost:${host}/api/todo/addListItem`,
                {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                        "auth-token" : localStorage.getItem("token")
                    },
                    body : JSON.stringify({description, checked})
                }
            )
            let newListItem = {description, checked}
            setTodo((prevTodo)=>{
                return [
                    ...prevTodo, newListItem
                ]
            })
        } catch (error) {
            console.log(Error)
        }
    }
    async function deleteTodo(id) {
        try {
            let response = await fetch(`http://localhost:${host}/api/todo/deleteListItem/${id}`,
                {
                    method : "DELETE",
                    headers : {
                        "Content-Type" : "application/json",
                        "auth-token" : localStorage.getItem("token")
                    }
                }
            )
            
            setTodo((prevTodo)=>{
                return prevTodo.filter((todo)=>{
                    return todo._id !== id
                })
            })
        } catch (error) {
            console.log(Error)
        }
    }
    async function updateTodo(description, checked, id) {
        console.log("id in todostate -> updateto= "+ id)
        try {
            let response = await fetch(`http://localhost:${host}/api/todo/updateListItem/${id}`,
                {
                    method : "PUT",
                    headers : {
                        "Content-Type" : "application/json",
                        "auth-token" : localStorage.getItem("token")
                    }
                    , 
                    body : JSON.stringify({description, checked})
                }
            )

            
            setTodo((prevTodo)=>{
                let newTodo = [];
                for (let index = 0; index < prevTodo.length; index++) {
                    const element = prevTodo[index];
                    if(element._id === id){
                        let newItem = {
                            // while making a new updated object we also need to add the id because now we are 
                            // making a whole new array which is setting todo state so id is also needed 
                            // if we only mention description and checked 
                            _id : id,
                            description : description,
                            checked : checked    
                            
                        }
                        console.log("within the todo state and udate function "+ element._id + " = " + checked)
                        newTodo.push(newItem)
                    }
                    else{
                        newTodo.push(element)
                    }
                    
                }

                return newTodo
            })
        } catch (error) {
            console.log(Error)
        }
    }
    return(
        <TodoContext.Provider value={{todo, getToDO, addTodo, deleteTodo, updateTodo}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState


