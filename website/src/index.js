import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/login/login';
import NewUser from './pages/newUser/newUser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path ="/" component={Login}/>
        <Route path="/new_user" component={NewUser}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


