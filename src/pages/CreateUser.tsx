import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';


import { Box,useTheme, Button, IconButton, Typography, StepLabel, Grid, TextField, CircularProgress } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useShowMessage } from '../hooks';
import { IAuth, CreateUserForm } from '../interfaces';
import { useAppDispatch } from '../store';
import { setLogin } from '../store/slices/auth';
import { isEmail, isNumberText } from '../utils';
import { api } from '../api/axios';


const CreateUser = () => {

  const theme = useTheme();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const showMessage = useShowMessage();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUserForm>();
  const [loading, setLoading] = useState(false);

  const onSave = async (form: CreateUserForm) => {
    
    setLoading(true);

    try {
      const { data } = await api.post<IAuth>('/users', form);
      
      dispatch(setLogin( data ));
      showMessage('User saved successfully', 'success');
      Cookies.set('token', data.token);
      
      navigate('/');
      
    } catch (error: any) {
      
      Cookies.remove('token');
      
      console.log('Create User error. Try later', error);
      error.response.data.forEach((el:any)=>{
        showMessage(el.msg, 'error');
      });
      
    }finally{

      setLoading(false);
    }
    
  }

  return (
    <>
      <Box 
        sx={{ backgroundColor: theme.palette.primary.main}} 
        width='100%'
        height={100}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          width='50%'
          sx={{ margin: '0 auto' }}
        >
          <Box display='flex' alignItems='center' >
            <AccountBalanceIcon color='secondary' sx={{ fontSize: 100}} />
            <Box ml={2}>
              <Typography color='secondary' variant='h1' sx={{ fontSize: 38}}>DSU</Typography>
              <Typography color='secondary' variant='subtitle2'>W2-BANK</Typography>
            </Box>
          </Box>
          <IconButton 
            size='small'
            color='secondary'
            sx={{ height: 50}}
            onClick={ () => navigate('/login') }
          >
              Back
              <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        width='50%' 
        margin='6rem auto'
      > 
        <Typography variant='subtitle1'>
          Let's create your online bank user
        </Typography>
        <form onSubmit={ handleSubmit(onSave) } noValidate>
          <Grid container spacing={5} my={'2rem'}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Name'
                { ...register('name', {
                  required: 'Name required',
                  minLength: { value: 2, message: 'Name should be at least 2 characters'}
                })}
                error={ !!errors.name }
                helperText={ errors.name?.message }
                sx={{mb: '1rem'}}
                />
              <TextField
                fullWidth
                label='Username'
                {
                  ...register('username', {
                    required: 'Username required',
                    minLength: { value: 2, message: 'Username should be at least 2 characters'}
                  })
                }
                error={ !!errors.username }
                helperText={ errors.username?.message }
                sx={{mb: '1rem'}}
              />
              <TextField
                type='email'
                fullWidth
                label='Email address'
                {...register('email', {
                required: 'Email required',
                validate: isEmail
                })}
                error={ !!errors.email  }
                helperText={ errors.email?.message }
                sx={{mb: '1rem'}}
              />
              <TextField
                fullWidth
                label='password'
                type='password'
                { ...register('pass', {
                required: 'Password required',
                minLength: { value: 6, message: 'Password should be at least 6 characters' }
                }) }
                error={ !!errors.pass }
                helperText={ errors.pass?.message }
                sx={{mb: '1rem'}}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                label='Phone'
                { ...register('phone', {
                  required: 'phone required',
                  minLength: { value: 8, message: 'phone should be at least 8 characters'},
                  validate: isNumberText
                })}
                error={ !!errors.phone }
                helperText={ errors.phone?.message }
                sx={{mb: '1rem'}}
              />
              <TextField
                fullWidth
                type='date'
                {
                  ...register('birthdate', {
                    required: 'birthdate required',
                  })
                }
                error={ !!errors.birthdate }
                helperText={ errors.birthdate?.message }
                sx={{mb: '1rem'}}
              />
              <TextField
                fullWidth
                label='Address'
                {...register('address', {
                required: 'Address required',
                })}
                error={ !!errors.address  }
                helperText={ errors.address?.message }
                sx={{mb: '1rem'}}
              />
            </Grid>
          </Grid>
          <Button fullWidth color='success' type='submit' >CREATE USER</Button>
          <CircularProgress sx={{ display: loading ? 'flex' : 'none' }}/>
        </form>
      </Box>
    </>
  )
}

export default CreateUser




