import { NavigateFunction } from 'react-router-dom';
import Cookies from 'js-cookie'
import { VariantType } from 'notistack';

import { AppThunk } from '../../store';
import { LoginForm } from '../../../pages/Login';
import { api } from '../../../api/axios';
import { setCreateUser, setLogin, setLogout } from './authSlice';
import { setError } from '../error';
import { IAuth } from '../../../interfaces';

interface Props {
    form: LoginForm,
    navigate: NavigateFunction,
    showMessage: (message: string, variant: VariantType ) => void,
}

export const authLogin = ({ form, navigate, showMessage }: Props): AppThunk => {
    
    return async ( dispatch, getState ) => {

        try {            
            const { data } = await api.post<IAuth>('/auth', form); 

            dispatch(setError({ isError: false, message: '' }));
            
            dispatch(setLogin( data ));
            
            Cookies.set('token', data.token);

            showMessage(data.msg, 'success');
            navigate('/');

            
        } catch (error: any) {
            Cookies.remove('token')
            
            if (error.message === 'Network Error') {

                dispatch(setError({
                    isError: true,
                    message: error.message,
                    status: 500,
                    statusText: 'Server is down. Contact your admin'
                }));

                showMessage(`Error: ${ 500 }: ${error.message}`, 'error')
                               
            } else {

                dispatch(setError({
                    isError: true,
                    message: error.response.data.msg,
                    status: error.response.status,
                    statusText: error.message
                }));

                dispatch(setLogout({
                    msg: 'Logged out successfully',
                    ok: false,
                    token: ''
                }));

                showMessage(`Error: ${error.response.status}: ${error.response.data.msg}`, 'error')
            }
        }
    }
}


export const createUserThunk = ({ showMessage, navigate, form }: Props):AppThunk => {
    
    // TODO: I have to validate with a regex that the user is valid
    
    return async ( dispatch ) => {
        try {
            const { data } = await api.post<IAuth>('/users', form)
            dispatch(setCreateUser( data ));

            Cookies.set('token', data.token);
            showMessage(data.msg, 'success');
            navigate('/')

        } catch (error: any) {
            Cookies.remove('token')
            console.log(error);
            console.log('Something went wront, contact your admin', error);    
            
            if (error.message === 'Network Error') {

                dispatch(setError({
                    isError: true,
                    message: error.message,
                    status: 500,
                    statusText: 'Server is down. Contact your admin'
                }));

                showMessage(`Error: ${ 500 }: ${error.message}`, 'error')
                               
            } else {

                dispatch(setError({
                    isError: true,
                    message: 'Error just happened',
                    status: error.response.status,
                    statusText: error.message
                }));

                dispatch(setLogout({
                    msg: 'Logged out successfully',
                    ok: false,
                    token: ''
                }));
                
                error.response.data.forEach((el:any) => {
                    showMessage(`Error: ${error.response.status}: ${el.msg}`, 'error')
                });
            }
        }

    }
}