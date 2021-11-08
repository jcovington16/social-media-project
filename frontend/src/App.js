import {Switch, Route} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/Register';
import MainPage from './components/mainpage/MainPage';
import Profile from './components/profile/profile';
import NotFound from './components/not-found/NotFound';
import Logout from './components/logout/Logout';
import Friends from './components/friends/Friends';
import Requests from './components/requests/Requests';
import jwtDecode from 'jwt-decode';
import EditProfile from './components/EditProfile/editprofile';


function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    try{

      const decode = jwtDecode(jwt);
      setUser(decode)

    } catch {

    }

  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path='/home' render={props => {
            if(user) {
              return <MainPage {...props} user={user}/>
            } else {
              return <Route component={NotFound} />
            }  
          }}
        />  
        <Route path='/register' component={Register} />
        <Route path='/' exact component={Login} />
        <Route path='/profile' render={() => <Profile user={user} />} />
        <Route path='/not-found' component={NotFound} />
        <Route path='/logout' component={Logout} />
        <Route path='/friendsList' render={() => <Friends user={user}/>} />
        <Route path='/requests' render={() => <Requests user={user} />} />
        <Route path='/edit-profile' render={() => <EditProfile user={user} />} />
      </Switch>
    </div>
  );
}

export default App;
