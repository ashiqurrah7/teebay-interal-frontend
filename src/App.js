import React, { Fragment } from "react";
import {  } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import {Container} from 'semantic-ui-react'
//Redux
// import { Provider } from "react-redux";
// import store from './store';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";


const App = () => {
  return (
    // <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
  </Router>
  // </Provider>
  )
};

export default App;
