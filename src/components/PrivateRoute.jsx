import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from './Spinner';


const PrivateRoute = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast.error('Please login first');
    }
    setIsLoading(false);

  }, []);

  if (isLoading) {
    return <div className="spinner"><Spinner/></div>;
  }

  if (!isAuthenticated) {
    toast.error('Please login first');
    setTimeout(() => {
        navigate('/login')
      }, 3000);
    
  }

  return children;
};

export default PrivateRoute;
