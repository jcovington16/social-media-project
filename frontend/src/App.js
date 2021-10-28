import {Switch, Route} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/Register';
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
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
