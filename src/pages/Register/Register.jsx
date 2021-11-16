import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Segment,Label, Container, Input, Icon } from 'semantic-ui-react'
//redux
import {connect} from 'react-redux';
import { registerUser } from "../../actions/auth";
import PropTypes from 'prop-types';

const Register = ({isAuthenticated, registerUser}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //stores auxilary data which is not needed in the form
  const [auxData, setAuxData] = useState({
    cpassword: "",
    showPassword: false,
    showCPassword: false
  });

  //Handles value changes in text inputs
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onAuxChange = (e) =>
    setAuxData({ ...auxData, [e.target.name]: e.target.value });
  
  const hidePassword = () => {
    setAuxData({...auxData, showPassword: ! auxData.showPassword})
  }

  const hideCPassword = () => {
    setAuxData({...auxData, showCPassword: !auxData.showCPassword})
  }
  const onSubmit = async (data) => {
    registerUser(formData)
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { firstName, lastName, address, email, phone, password } = formData;
  const { cpassword } = auxData;

  return (
    <Container textAlign="center" style={{width:"40vw"}}>
      <h1>SIGN UP</h1>
      <Segment style={{padding:"5vh"}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", {
            required: true,
          })}
          value={firstName}
          onChange={(e) => onChange(e)}
        />
        {errors.firstName?.type === "required" && <Label basic color='red' pointing>First Name is required</Label>}
        </Form.Field>
        <Form.Field>
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
          value={lastName}
          onChange={(e) => onChange(e)}
        />
        {errors.lastName?.type === "required" && <Label basic color='red' pointing>Last Name is required</Label>}
        </Form.Field>
        <Form.Field>
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
          value={address}
          onChange={(e) => onChange(e)}
        />
        {errors.address?.type === "required" && <Label basic color='red' pointing>Address is required</Label>}
        </Form.Field>
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
        <input
          type="text"
          placeholder="Phone"
          {...register("phone", { required: true })}
          value={phone}
          onChange={(e) => onChange(e)}
        />
        {errors.phone?.type === "required" && <Label basic color='red' pointing>Phone number is required</Label>}
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
        <Form.Field>
        <Input icon placeholder="Confirm Password">
        <input
          type={auxData.showCPassword ? "text" : "password"}
          {...register("cpassword", { required: true })}
          value={cpassword}
          onChange={(e) => onAuxChange(e)}
        />
        <Icon name={auxData.showCPassword ? "eye slash" : "eye"} link onClick={hideCPassword}></Icon>
        </Input>
        {errors.cpassword?.type === "required" && <Label basic color='red' pointing>Passwords do not match</Label>}
        </Form.Field>
        <Button type="submit" color='violet'>REGISTER</Button>
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </Form>
      </Segment>
    </Container>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps, {registerUser})(Register);
