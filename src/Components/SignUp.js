import React from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  let navigate = useNavigate()
    const [formData, setFromData] = React.useState({
        email: "",
        password: "",
        name : ""
      });
    
      function handleChange(event) {
        let { name, value } = event.target;
        setFromData((prevForm) => {
          return {
            ...prevForm,
            [name]: value,
          };
        });
      }
    
     async function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        const response = await fetch("http://localhost:3001/api/auth/createUser"
            , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                
                // body : JSON.stringify({formData.email, formData.password})
                body: JSON.stringify({
                  name : formData.name,
                  email: formData.email,
                  password: formData.password
              })
            }
        )
        let json  = await response.json()
        console.log(json)
        
        if(json.success){
          // <Home/>
          // we need to save the token in user's local storage so that we will be able to match it next time

          localStorage.setItem("token", json.token)
          // after storing it in local storage we need to redirect it to our homepage so now 
          navigate("/login")
          props.showAlert("Sign Up Successful", "success")
        }
        else{
          props.showAlert("Invalid Credentails", "danger")
        }
      } 
  return (
    <div className='container my-5 col-md-8'>

<h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name" >Name</label>
            <input 
                type="text" 
                className="form-control my-3" 
                id="name" 
                aria-describedby="nameHelp" 
                placeholder="Enter name"
                name='name'
                value={formData.name}
                onChange={handleChange}
                />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" >Email address</label>
            <input 
                type="email" 
                className="form-control my-3" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input 
                type="password" 
                className="form-control my-3" 
                id="exampleInputPassword1" 
                placeholder="Password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                />
        </div>

        <button type="submit" className="btn loginSubmit">Submit</button>
   
        
    </form>
    </div>
  )
}

export default SignUp