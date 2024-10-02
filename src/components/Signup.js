import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials,setCredentials]= useState({name:"",email:"",password:"",cpassword:""})
  let navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}= credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiNGUxOTMzYzk1YWJmOGIzMWM3Y2NkIn0sImlhdCI6MTcyMzE0MDY4NX0.eHeFGeHnNoaRiBHyA56yM-585V7uKnRBrSv2phD80rI' 
      },
      body:JSON.stringify({name,email,password})
    })
    const json = await response.json()
    console.log(json)
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      navigate('/');  // Redirect to home or desired route
    }
    else{
      alert("Invalid Credentials")
    }
  }
  
  const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required  />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name= "email" aria-describedby="emailHelp" onChange={onChange} required />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required  />
      </div>
    
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Signup
