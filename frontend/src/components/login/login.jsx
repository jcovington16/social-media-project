import React, {useState} from 'react';
import axios from 'axios';
import './Login.css'; 
//This is our login form

function Login() {

    const [login, setLogin] = useState({
        email: "",
        password : "",
      });
    const handleChange = (event) => {
        setLogin({
        ...login , [event.target.name]: event.target.value
        },[]);
      }

    const handleSubmit = (event) =>  {
        // store the states in the form data
        event.preventDefault();
        axios.post('http://localhost:5001/api/auth/', login)
            .then (response => {
                const responseData = response.data
                localStorage.setItem('token', responseData);
                window.location='/home';              
            })
            
    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                <div class="form-group input-group">
                        <span class="border-label-flt">
                        <input type="email" className="form-control" id="label-email" name="email" placeholder="email" value={login.email} onChange={handleChange} required autofocus/>
                        <label for="label-email">email</label>
                        </span>
                    </div> 
               {/*  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={login.email} onChange={handleChange} />
                </div> */}

                {/* <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={login.password} onChange={handleChange}/>
                </div> */}
                <div class="form-group border-label-flt">
                    <input type="password" id="label-password" class="form-control" name="password" value={login.password} onChange={handleChange} placeholder="password" required/>
                    <label for="label-password">password</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="dont_have_acct text-right">
                    Don't have an account?<a href="./register">Register</a>
                </p>
            </form>
        </div>
    )
}

export default Login;
