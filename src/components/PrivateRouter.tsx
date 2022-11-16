import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { api } from "../api/axios";
import { useAppSelector } from "../store"
import { useAppDispatch } from '../store/hooks';

import { IAuth } from '../interfaces';
import { setLogin } from '../store/slices/auth';
import Navbar from './ui/Navbar';
import { Sidebar } from './ui';

const PrivateRouter = ( ) => {

  const { auth } = useAppSelector((state)=> state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get<IAuth>('/auth/verify');

        Cookies.set('token', data.token); 

        dispatch( setLogin( data ));

      } catch (error) {
          navigate('/login');
          Cookies.remove('token');
          console.log('Error checking the user authentication', error);
      }
    }

    fetchData();
  }, []);


  if ( auth === null) return null;

  return auth?.ok  ? (
    <>
      <Navbar/>
      <Sidebar/>
      <main style={{
        padding: '8rem 0 0',
        maxWidth: '80%',
        margin: '0 auto',
      }}>
        <Outlet />
      </main>
    </>
    ) : (
    <Navigate to='/login' />
  )
}

export default PrivateRouter;