import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import setAuthToken from "./utils/setAuthToken";
import Products from "./pages/Products/Products";
import PrivateRoute from "./routing/PrivateRoute";
import Product from "./pages/Products/Product";
import Chat from "./pages/ChatRoom/Chat";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import MyProducts from "./pages/Products/MyProducts";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import NavBar from "./pages/NavBar/NavBar";
import LandingPage from "./pages/LandingPage/LandingPage";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer
          hideProgressBar
          autoClose={2500}
          position="top-right"
          style={{ width: "max-content", paddingRight: "10px" }}
        />
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute exact path="/products/add" component={AddProduct} />
          <PrivateRoute exact path="/products/me" component={MyProducts} />
          <PrivateRoute exact path="/products/:id" component={Product} />
          <PrivateRoute
            exact
            path="/products/:id/edit"
            component={EditProduct}
          />
          <PrivateRoute exact path="/chat/:id" component={Chat} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
