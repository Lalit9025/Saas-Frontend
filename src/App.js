import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Routes>
         <Route path = '/' element ={<RegisterPage/>}/>
         <Route path = '/login' element ={<LoginPage/>}/>
         <Route path = '/spinner' element ={<Spinner/>}/>
         <Route path='/profile' element = {<PrivateRoute><UserProfile/></PrivateRoute>}/>
         <Route path = '*' element ={<PageNotFound/>}/>

      </Routes>
      
    </>
  );
}

export default App;
