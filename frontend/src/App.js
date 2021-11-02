import {Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/Register';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/profile';
import NotFound from './components/not-found/NotFound';
import jwtDecode from 'jwt-decode';
import Logout from './components/logout/Logout';


function App() {

  const [user, setUser] = useState('');
  useEffect(() => {
    const jwt = localStorage.getItem('token');
    try{
<<<<<<< Updated upstream

      const decode = jwtDecode(jwt);
      setUser(decode)
=======
      setUser(jwtDecode(jwt));
      console.log(`The token is${jwt}`);
>>>>>>> Stashed changes

    } catch {

    }

<<<<<<< Updated upstream
  }, []);
=======
  },[]);
>>>>>>> Stashed changes

  return (
    <div className="App">
     <Navbar user={user} />
      <Switch>
<<<<<<< Updated upstream
        <Route path='/profile' render={props => {
            if(user) {
              return <Profile {...props} user={user} />
              
            } else {
              return <Route component={NotFound} />
            }  
          }}
        />  
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/not-found' component={NotFound} />
=======
        <Route path="/profile" render={props => { 
          if(!user)  {
           return <NotFound/>;
              } else {  
            return <Profile {...props} user={user} />
          }     
       } 
    }/>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/logout" component={Logout} />
>>>>>>> Stashed changes
      </Switch>
    </div>
  );
}

export default App;
