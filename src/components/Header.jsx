import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { server } from "../main";
import toast from 'react-hot-toast';

const Header = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  const logoutHandler = async (e)=>{
    setLoading(true);
    try {
        await axios.get(
            `${server}/users/logout`, 
            {
                withCredentials: true,
            }
        );

        toast.success("Logged Out Successfully!");
        setIsAuthenticated(false);
        setLoading(false);
    } catch (error) {
        toast.error("Some Error");
        setIsAuthenticated(true);
        setLoading(false);
    }
    
  };

  return (
    <nav className='header'>

        <div>
            <h2>TODO APP.</h2>
        </div>
        <article>
            <Link to={'/'}>Home</Link>
            <Link to={'/profile'}>Profile</Link>
            {
              isAuthenticated ? <button disabled={loading} className='btn' onClick={logoutHandler}>LogOut</button> :
              <Link to={'/login'}>Login</Link>
            }
            
            
        </article>
      
    </nav>
  );
};

export default Header
