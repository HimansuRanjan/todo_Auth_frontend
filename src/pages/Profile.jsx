import React,{useContext, useEffect} from 'react';
import { Context } from '../main';
import Loader from '../components/Loader';
import axios from 'axios';
import { server } from '../main';
import { Navigate } from 'react-router-dom';



const Profile = () => {
  const {isAuthenticated, loading, setLoading, setIsAuthenticated,setUser, user} = useContext(Context);


  useEffect(()=>{
    setLoading(true);

    axios.get(`${server}/users/me`, {
      withCredentials: true,
    })
    .then((res) => {
      setUser(res.data.user)
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((err)=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
  },[])

  if(!isAuthenticated) return <Navigate to={"/"}/>
  return (
    loading ? <Loader /> :(
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
    )
  )
}

export default Profile