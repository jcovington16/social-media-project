import {Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/Register';
//import MainPage from './components/mainpage/MainPage';
import Profile from './components/profile/profile';
import NotFound from './components/not-found/NotFound';
import jwtDecode from 'jwt-decode';


function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    try{
      setUser(jwtDecode(jwt));
      
    } catch {
  
    }
  },[])

  return (
    <div className="App">
      <Switch>
        <Route path='/profile' render={props => {
            if(!user) {
              return <Redirect to="/not-found" />;
            } else {
              return <Profile user={user} />
            }  
          }}
        />  
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/not-found' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
