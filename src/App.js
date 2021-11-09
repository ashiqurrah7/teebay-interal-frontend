import React, { useEffect } from "react";
import {  } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {Container} from 'semantic-ui-react'
//Redux
import { Provider } from "react-redux";
import store from './store';
import { loadUser } from "./actions/auth";
import setAuthToken from './utils/setAuthToken';
import Products from "./pages/Products/Products";
import PrivateRoute from "./routing/PrivateRoute";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <PrivateRoute exact path='/products' component={Products} />
      </Switch>
  </Router>
  </Provider>
  )
};

export default App;
