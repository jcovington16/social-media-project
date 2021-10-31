import React, {useState} from 'react';
import axios from 'axios';

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
        axios.post('http://localhost:5001/api/users/', regform);
        event.preventDefault();

        }

    return (
        <div>
                
            <form onSubmit={(event) => handleSubmit(event)} >
                <div>
                    <h3>Register</h3>
                    <label>Name</label>
                    <input type="text"  placeholder="Name"  name="name" value={regform.name} onChange={handleChange} />
                </div>

                <div >
                    <label>Email address</label>
                    <input type="email"  placeholder="Enter email" name="email" value={regform.email} onChange={handleChange}/>
                </div>

                <div >
                    <label>Password</label>
                    <input type="password"  placeholder="Enter password" name="password" value={regform.password} onChange={handleChange} />
                </div>

                <div >
                    <label>Username</label>
                    <input type="text"  placeholder="Username" name="username" value={regform.username} onChange={handleChange}/>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered?<a href="./login">Sign in</a>
                </p>
                </div>
            </form>  
        </div>
    )
}

export default Register;
