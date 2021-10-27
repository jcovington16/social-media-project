import {Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
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
