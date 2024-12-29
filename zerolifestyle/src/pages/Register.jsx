import axios from 'axios';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        gender:""
    })
    const {name,email,password,confirmPassword,gender}=formData
    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password does not match.")
        }
        const response=await axios.post("http://localhost:8082/api/admin/users",formData)
        if(response.data.success){
            toast.success("Registration Successful.")
            setFormData({
                name:'',
                email:'',
                password:'',
                confirmPassword:'',
                gender:""
            })
        }
    }
  return (
        <Form className='d-flex justify-content-center align-items-center  flex-column' onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={name} onChange={onChange} placeholder="Enter your name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={onChange} placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={onChange} placeholder="Enter your password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Enter your Confirm Passowrd" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Gender:</Form.Label>
            <Form.Check type="radio" name="gender" value="male" label="Male" onChange={onChange} />
            <Form.Check type="radio" name="gender" value="female" label="Female" onChange={onChange} />
            <Form.Check type="radio" name="gender" value="other" label="Other" onChange={onChange} />

          </Form.Group>
          <Link to={"/login"}>Already Registered Please Login</Link>
          <button className='btn btn-success'>Submit</button>
        </Form>
  )
}

export default Register