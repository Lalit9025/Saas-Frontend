import React, { useState } from 'react'
import styles from './LoginPage.module.css'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'


const LoginPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate();


const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  let valid = true;

  if (email === '' || !validateEmail(email)) {
    setEmailError('Valid email is required');
    valid = false;
  } else {
    setEmailError('');
  }

  if (password === '') {
    setPasswordError('Password is required');
    valid = false;
  } else {
    setPasswordError('');
  }

  return valid;
};

const onButtonClick = async () => {
  if (validateInputs()) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success('Login successful');

        localStorage.setItem('token', response.data.token);

        setTimeout(() => {
          navigate('/profile');
        }, 2000);

      } else {

        toast.error(response.data.message); 
        
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      toast.error('There was an error logging in!'); 
    }
  }
};
const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');

    toast.success('Logout successful');

    navigate('/login');
  };

  return logout;
};
const useRegister = () =>{
  navigate('/')
}

  return (
    <Layout btnName={'Register'} btnFunction = {useRegister}>
      <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Login</div>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={email}
          placeholder="Enter your username here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{emailError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={styles.inputBox}
        />
        <label className={styles.errorLabel}>{passwordError}</label>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
    </Layout>
  )
}

export default LoginPage