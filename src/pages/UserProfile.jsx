import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.css';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const UserProfile = () => {
  const [name, setName] = useState('John Wayne');
  const [email, setEmail] = useState('johnnie86@gmail.com');
  const [company, setCompany] = useState('Mombasa');

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if(!token){
          toast.error('No token found, please login')
          return ;
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.data.success) {
          setUserData(response.data.user);
          setLoading(false);
        } else {
          toast.error('Failed to fetch user data.');
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data.');
        
      }finally {
        setIsLoading(false);
      }
    }
    fetchData();
  },[]);

  const onUpdateClick = () => {
    
    console.log({ name, email, company});
  };

  const useLogout = () => {
  

      // Remove the token from local storage or cookies
      localStorage.removeItem('token');
  
      // Show a toast message
      toast.success('Logout successful');
  
      // Navigate to the login page
      navigate('/login');
   
  };
  if (isLoading) {
    return (
      <div className={styles.spinner}>
          <Spinner/>
      </div>
    );
  }
  const getFirstName = (name) => {
    if (!name) return '';
    const [firstName] = name.trim().split(' ');
    return firstName;
  };

  if (!userData) {
    return (
      <div className={styles.spinner}>
          <Spinner/> 
          <h2>Please Login first</h2>
      </div>
    );
    
  }

  return (
    <Layout btnName={'Logout'} btnFunction={useLogout}>
        <div className={styles.main_con}>
          <div className={styles.container}>
            <div className={styles.profileContainer}>
              <h1 className={styles.title}>Hello, {getFirstName(userData?.name)}</h1>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <span className={styles.label}>Name :</span>
                  <span className={styles.input}>{userData?.name}</span>
                </div>
                <div className={styles.formGroup}>
                  <span className={styles.label}>Email :</span>
                  <span className={styles.input}>{userData?.email}</span>
                </div>
                <div className={styles.formGroup}>
                  <span className={styles.label}>Company :</span>
                  <span className={styles.input}>{userData?.company ? userData.company : "not available"}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
    </Layout>
    
  );
};

export default UserProfile;
