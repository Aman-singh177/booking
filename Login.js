import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      console.log(result);
      if (result.data === "Success") {
        localStorage.setItem('currentUser', JSON.stringify(result.data.user));
        navigate('/Homescreen');
      } else {
        console.log(result.data);
        alert(result.data);
      }
    } catch (err) {
      console.log('Error:', err.response || err.message);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-12 col-md-6 col-lg-4 p-4 shadow-lg rounded bg-white">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your Email" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter your Password" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
        </form>
        <div className="text-center">
          <NavLink to={'/signup'}>
            <button className="btn btn-outline-secondary w-100">New User? Sign Up</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
