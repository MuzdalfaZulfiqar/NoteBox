import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link , useLocation, useNavigate} from 'react-router-dom'

const NavBar = () => {
  let navigate = useNavigate()
  function handleLogout(){
    localStorage.removeItem("token")
    navigate("/login")
  }
  let location  = useLocation();
  React.useEffect(()=>{
    console.log(location.pathname)
    // it will give us the pathname where we will click like "/" or "/about"
  },[location])
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#" style={{color:"white"}}>NoteBox</a>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"
        style={{backgroundColor :"rgb(247, 202, 201)"}}
        ></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            
            <Link className={`nav-link ${location.pathname=='/'? "active" : ""}`} 
            style={{color:"white"}}
            aria-current="page" to="/">My Notes</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname=='/todo'? "active" : ""}`} to="/todo"
             style={{color:"white"}}
            >TODO</Link>
          </li>
          
          
        </ul>
        {/* if there is not token in localstorage means you have not logged in so you need to display the login and signUp button and if it has the token in local storage means that it is already logged in so only show the logout button */}
        { ! localStorage.getItem("token") ? 
        
        <form className="d-flex" >
          <Link to="/login"><Button className='submitButton'>Login</Button></Link>
          <Link to="/signUp"><Button className='submitButton'>SignUp</Button></Link>
         
        </form> 
        : 
        
        <Button className='submitButton' onClick={handleLogout}>Logout</Button>
        }
         
      </div>
    </div>
  </nav>
  )
}

export default NavBar
