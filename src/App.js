import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
//Redux
import { Provider } from "react-redux";
import store from './store';
import { loadUser } from "./actions/auth";
import setAuthToken from './utils/setAuthToken';
import Products from "./pages/Products/Products";
import PrivateRoute from "./routing/PrivateRoute";
import Product from "./pages/Products/Product";
import Chat from "./pages/ChatRoom/Chat";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import MyProducts from "./pages/Products/MyProducts";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = ({cableApp}) => {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[cableApp]);
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute exact path='/products' component={Products} />
        <PrivateRoute exact path='/products/add' component={AddProduct} />
        <PrivateRoute exact path='/products/me' component={MyProducts} />
        <PrivateRoute exact path='/products/:id' component={Product} />
        <PrivateRoute exact path='/products/:id/edit' component={EditProduct} />
        <Route exact path='/chat/:id' render={(props) => (
          <Chat {...props} cableApp={cableApp} />
        )} />
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
  </Router>
  </Provider>
  )
};

export default App;
