import React, { useContext, useEffect } from 'react'
import noteContext from '../Contexts/notes/noteContext'

function About() {
    let user = useContext(noteContext)
    console.log(user)
    
    // This was jjust for practice
    // useEffect(()=>{
    //   user.update()
    // },[])
  return (
    <div>
     This is about 
     page and i am learning the react course from
     
    </div>
  )
}

export default About
