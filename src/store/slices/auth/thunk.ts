import { NavigateFunction } from 'react-router-dom';
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
            
            localStorage.setItem('bootcam-token', data.token);
            showMessage(data.msg, 'success');
            navigate('/');

            
        } catch (error: any) {
            
            
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

                dispatch(setLogout());
                localStorage.clear();

                showMessage(`Error: ${error.response.status}: ${error.response.data.msg}`, 'error')
            }
        }
    }
}


export const createUserThunk = ({ showMessage, navigate }: Props):AppThunk => {
    // TODO: make this work, the createUser. now i have to validate the JWT
    // in the localstorage there is the token, now i have to validate that the token is removed from the local storage when it expires its time. 

    // Make validations such as the username, pass, etc,should be always required and the email can't be repeated
    // I have to validate with a regex that the user is valid
    
    return async ( dispatch ) => {
        try {
            const { data } = await api.post<IAuth>('/users')
            dispatch(setCreateUser( data ));

            console.log('vamos a ver si work well', data)
            localStorage.setItem('bootcam-token', data.token);
            showMessage(data.msg, 'success');
            navigate('/')

        } catch (error) {
            
            console.log(error)
            console.log('Something went wront, contact your admin', error)       
        }

    }
}