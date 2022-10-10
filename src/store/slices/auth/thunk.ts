import { NavigateFunction } from 'react-router-dom';
import { VariantType } from 'notistack';

import { AppThunk } from '../../store';
import { LoginForm } from '../../../pages/Login';
import { api } from '../../../api/axios';
import { setLogin } from './authSlice';
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

            showMessage('Login successfully', 'success');
            navigate('/')

            
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

                showMessage(`Error: ${error.response.status}: ${error.response.data.msg}`, 'error')
            }
        }
    }
}