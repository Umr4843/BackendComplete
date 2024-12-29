import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const navigate=useNavigate();
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/api/admin/users/login", formData);
      if (response.data.success) {
    localStorage.setItem("userToken",response.data.token)
        toast.success("Login Successful.");
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Form className='d-flex justify-content-center align-items-center flex-column' onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Enter your email"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter your password"
          required
        />
      </Form.Group>
      <button className='btn btn-success' type="submit">Login</button>
      <Link to={"/register"} className="mt-3">Don't have an account? Register here</Link>
    </Form>
  );
};

export default Login;
