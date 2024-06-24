import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'


const RegisterPage = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate()
  
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // At least one upper case, one lower case, one number, one special character, and minimum 8 characters long
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
  };

  const validateInputs = () => {
    let valid = true;

    if (name === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (email === '' || !validateEmail(email)) {
      setEmailError('Valid email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    // if (company === '') {
    //   setCompanyError('Company is required');
    //   valid = false;
    // } else {
    //   setCompanyError('');
    // }

    if (password === '' || !validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one upper case letter, one lower case letter, one number, and one special character');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };



  const onButtonClick = async() => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    if (validateInputs()) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`,{name, email, company, password});

          if(response.data.success){
            toast.success('user registered successfully');

            setTimeout(() => {
              navigate('/login');
            }, 3000);
           
          } else {
            console.log(response.data.message);
            toast.error("error is registereing user")
          }
          
        } catch (error) {
          console.log(error)
        }
        
      }
  }
  const useLogin = () => {
    navigate('/login')
  }

  return (
    <Layout btnName={'login'} btnFunction={useLogin}>
  
        <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <div>Register</div>
        </div>
        <br />
        <div className={styles.inputContainer}>
          <input
            value={name}
            placeholder="Enter your name here"
            onChange={(ev) => setName(ev.target.value)}
            className={styles.inputBox}
          />
          <label className={styles.errorLabel}>{nameError}</label>
        </div>
        <br />
        <div className={styles.inputContainer}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={styles.inputBox}
          />
          <label className={styles.errorLabel}>{emailError}</label>
        </div>
        <br />
        <div className={styles.inputContainer}>
          <input
            value={company}
            placeholder="Enter your company here (optional)"
            onChange={(ev) => setCompany(ev.target.value)}
            className={styles.inputBox}
          />
        
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
        <div className={styles.inputContainer} onClick={() => navigate('/login')}>
          <h3 className={styles.already_user}>Already a user ?</h3>
        </div>
        
        
        <div className={styles.inputContainer}>
          <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'Register'} />
        </div>
      </div>
  
    
    </Layout>
    
  )
}

export default RegisterPage