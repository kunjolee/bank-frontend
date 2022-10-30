import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { api } from "../api/axios";
import { useAppSelector } from "../store"
import { useAppDispatch } from '../store/hooks';

import { IAuth } from '../interfaces';
import { setLogin } from '../store/slices/auth';

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


  if ( auth === null) return;

  return auth?.ok  ? (
    <Outlet />
    ) : (
    <Navigate to='/login' />
  )
}

export default PrivateRouter;