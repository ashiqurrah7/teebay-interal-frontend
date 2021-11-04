import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });

    //Handles value changes in text inputs
    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (data) => {
        console.log(data)
    };

    const {register, handleSubmit} = useForm();

    const {email, password} = formData;

    return (
        <div>
            <h1>SIGN IN</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="text" placeholder="Email" {...register("email")} value={email} onChange={(e) => onChange(e)}/>
                <input type="password" placeholder="Password" {...register("password")} value={password} onChange={(e) => onChange(e)}/>
                <button type="submit">LOGIN</button>
                <p>Don't have an account? <Link to='/register'>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login
