import React from 'react'
import TodoState from '../Contexts/TODO/TodoState'
import TodoContainer from './TodoContainer'

function Todo() {
  
  // for now our high lrvr
return (
  <TodoState>
      <TodoContainer/>
  </TodoState>
)
}

export default Todo