import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Segment, Label, Container, Input, Icon } from 'semantic-ui-react'
import './login.css'
//redux
import {connect} from 'react-redux';
import { login } from "../../actions/auth";
import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //stores auxilary data which is not needed in the form
  const [auxData, setAuxData] = useState({
    showPassword: false
  });

  //Handles value changes in text inputs
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const hidePassword = () => {
      setAuxData({...auxData, showPassword: ! auxData.showPassword})
  }
  const onSubmit = async ({email, password}) => {
    login(formData)
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { email, password } = formData;

  if(isAuthenticated){
    return <Redirect to='/products' />
  }

  return (
    <Container textAlign="center" style={{width:"40vw"}}>
      <h1>SIGN IN</h1>
      <Segment style={{padding:"5vh"}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field>
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          value={email}
          onChange={(e) => onChange(e)}
        />
        {errors.email?.type === "required" && <Label basic color='red' pointing>Email is required</Label>}
        {errors.email?.type === "pattern" && <Label basic color='red' pointing>{errors.email.message}</Label>}
        </Form.Field>
        <Form.Field>
        <Input icon placeholder="Password">
        <input
          type={auxData.showPassword ? "text" : "password"}
          {...register("password", { required: true })}
          value={password}
          onChange={(e) => onChange(e)}
        />
        <Icon name={auxData.showPassword ? "eye slash" : "eye"} link onClick={hidePassword}></Icon>
        </Input>
        {errors.password?.type === "required" && <Label basic color='red' pointing>Password is required</Label>}
        </Form.Field>
        <Button type="submit" color='violet'>LOGIN</Button>
        <p>
          Don't have an account? <Link to="/register">Signup</Link>
        </p>
      </Form>
      </Segment>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
