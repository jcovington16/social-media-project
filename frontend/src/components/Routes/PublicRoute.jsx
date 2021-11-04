import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../login/login';
import Profile from '../profile/profile';

const PublicRoute = () => {
  
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Redirect to='/' />
    </Switch>
  )
}

export default PublicRoute;