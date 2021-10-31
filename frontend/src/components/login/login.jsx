import React, {useState} from 'react';
import axios from 'axios';

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
                const responseData = response.data;
                localStorage.setItem('token', responseData);
                console.log(responseData);
            })
            //window.location='/';
    }
    
    return (
        <div>
             <form onSubmit={(event)=>handleSubmit(event)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={login.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={login.password} onChange={handleChange}/>
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
