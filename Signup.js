import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; // Custom styles

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/auth/signup', { name, email, password })
      .then(result => {
        console.log(result);
        localStorage.setItem('currentUser', JSON.stringify(result.data.user));
        navigate('/Homescreen');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-12 col-md-6 col-lg-4 p-4 shadow-lg rounded signup-card">
        <h2 className="text-center text-white mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your Name" 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="email" 
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
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <NavLink to={'/login'} className="text-white">Already have an account? <span className="text-warning">Login</span></NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
