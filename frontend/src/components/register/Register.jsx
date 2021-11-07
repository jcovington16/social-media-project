import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';

// This is our register form

function Register() {
    const [regform, setRegform] = useState({
        name:   "",
        email: "",
        password : "",
        username: ""
      });

    const handleChange = (event) => {
        setRegform({
        ...regform , [event.target.name]: event.target.value
        },[]);
      }

    const handleSubmit = (event) =>  {
        // store the states in the form data
        event.preventDefault();
        axios.post('http://localhost:5001/api/users/', regform);
        window.location='/'; 
        }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)} >
                <h3>Register</h3>
                    <div class="form-group input-group">
                        <span class="border-label-flt">
                        <input type="text" className="form-control" id="label-name" name="name" value={regform.name} onChange={handleChange}  placeholder="name"  required autofocus/>
                        <label for="label-name">name</label>
                        </span>
                    </div> 
                    <div class="form-group input-group">
                        <span class="border-label-flt">
                        <input type="email" className="form-control" id="label-email" name="email" value={regform.email} onChange={handleChange}  placeholder="email" required autofocus/>
                        <label for="label-email">email address</label>
                        </span>
                    </div> 
                   
                <div class="form-group border-label-flt">
                    <input type="password" id="label-password" class="form-control" name="password" value={regform.password} onChange={handleChange} placeholder="password" required/>
                    <label for="label-password">password</label>
                </div>
   
                 <div class="form-group input-group">
                        <span class="border-label-flt">
                        <input type="text" className="form-control" id="label-username" name="username" value={regform.username} onChange={handleChange}  placeholder="username"  required autofocus/>
                        <label for="label-username">username</label>
                        </span>
                    </div>
            
                <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered?<a href="./">Sign in</a>
                </p>
            
            </form>  
        </div>
    )
}

export default Register;
