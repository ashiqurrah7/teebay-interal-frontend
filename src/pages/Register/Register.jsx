import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: "",
        password: ""
      });

    const [auxData, setAuxData] = useState({
        cpassword: ""
    })

    //Handles value changes in text inputs
    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onAuxChange = (e) =>
    setAuxData({ ...auxData, [e.target.name]: e.target.value });

    const onSubmit = async (data) => {
        console.log(data)
    };

    const {register, handleSubmit} = useForm();

    const { firstName, lastName, address, email, phone, password } = formData;
    const {cpassword} = auxData;

    return (
        <div>
            <h1>SIGN UP</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
            <input type="text" placeholder="First Name" {...register("firstName")} value={firstName} onChange={(e) => onChange(e)}/>
                <input type="text" placeholder="Last Name" {...register("lastName")} value={lastName} onChange={(e) => onChange(e)}/>
                <input type="text" placeholder="Address" {...register("address")} value={address} onChange={(e) => onChange(e)}/>
                <input type="text" placeholder="Email" {...register("email")} value={email} onChange={(e) => onChange(e)}/>
                <input type="text" placeholder="Phone" {...register("phone")} value={phone} onChange={(e) => onChange(e)}/>
                <input type="password" placeholder="Password" {...register("password")} value={password} onChange={(e) => onChange(e)}/>
                <input type="password" placeholder="Confirm Password" {...register("cpassword")} value={cpassword} onChange={(e) => onAuxChange(e)}/>
                <button type="submit">REGISTER</button>
                <p>Already have an account? <Link to='/'>Sign In</Link></p>
            </form>
        </div>
    )
}

export default Register
