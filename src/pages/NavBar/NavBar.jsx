import React, { useState, Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
//redux
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const NavBar = ({ logout }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const divStyle = {
    position: "absolute",
    top: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "10px",
    paddingRight: "10px",
  };
  const history = useHistory();
  const [activeItem, setActiveItem] = useState(user ? "products" : "login");

  const goToProducts = (e, { name }) => {
    setActiveItem(name);
    history.push("/products");
  };
  const goToMyProducts = (e, { name }) => {
    setActiveItem(name);
    history.push("/products/me");
  };
  const goToLogin = (e, { name }) => {
    setActiveItem(name);
    history.push("/login");
  };
  const goToRegister = (e, { name }) => {
    setActiveItem(name);
    history.push("/register");
  };

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div style={divStyle}>
      <Menu color="violet" pointing secondary>
        {user ? (
          <Fragment>
            <Menu.Item
              name="products"
              active={activeItem === "products"}
              onClick={goToProducts}
            />
            <Menu.Item
              name="my products"
              active={activeItem === "my products"}
              onClick={goToMyProducts}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={goToLogin}
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={goToRegister}
            />
          </Fragment>
        )}
      </Menu>
      {user && (
        <Button color="red" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
};

NavBar.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(null, { logout })(NavBar);
