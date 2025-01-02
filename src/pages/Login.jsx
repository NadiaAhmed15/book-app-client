
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post('https://book-app-server-beige.vercel.app/user/login', { username, password })
      .then((response) => {
        const { username } = response.data;
        console.log('Username:', username);

        // تخزين البيانات في Local Storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);

        // عرض رسالة نجاح
        enqueueSnackbar('Login Successfully', { variant: 'success' });

        // الانتقال إلى الصفحة الرئيسية
        navigate('/home', { state: { username } });
      })
      .catch((error) => {
        // عرض رسالة خطأ
        enqueueSnackbar('Login failed', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }} // Optional background color
    >
      <div
        className="border rounded shadow p-4 bg-light"
        style={{ width: "900px", minHeight: "500px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-xl font-bold">Login</h1>
        </div>
        <div className="mb-4">
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
            Login
          </button>
          <div className="text-center">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
