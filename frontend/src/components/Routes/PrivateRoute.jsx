import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './Home';

const PrivateRoute = () => {
  
  return (
    <Switch>
      <Route path="/private" component={Profile} />
      <Redirect to='/private' />
    </Switch>
  )
}

export default PrivateRoute;