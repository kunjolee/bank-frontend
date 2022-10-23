import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';

import { useAppDispatch } from '../store';
import { authLogin } from '../store/slices/auth';

import { useShowMessage, useForm } from '../hooks/';

import login_image from "../assets/login_image.svg";
import bank_image from "../assets/bank-image.jpg";

import './Pages.css';

export interface LoginForm {
  username: string;
  pass: string;
}


const Login = () => {
  
  const dispatch = useAppDispatch();

  const [isTouched, setIsTouched] = useState(false);
  
  const navigate = useNavigate();

  const showMessage = useShowMessage();


  const { form, handleChange, username, pass } = useForm({ username:'', pass: '',  })


  const handleLogin = () => {

    if (!username || !pass) return;  

    dispatch(authLogin({ 
      form,
      navigate,
      showMessage
    }));
  
  }

  return (
    <Grid container width='90%' height='95vh' margin=' 0 auto' >
      
      <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
        <Card 
          sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center' 
            }} 
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h1' marginBottom={3} >Welcome back!</Typography>
              <img src={login_image} alt='login-img' />
          
              <Box>
                <TextField
                    sx={{ width: '80%'}}
                    label='username'
                    name='username'
                    helperText='insert your username'
                    value={ username }
                    error={ isTouched && username.length === 0 }
                    margin='normal'
                    onChange={ handleChange }
                    onBlur = { () => setIsTouched( true ) }
                    required
                />
                <TextField
                    sx={{ width: '80%'}}
                    label='password'
                    name='pass'
                    helperText='Insert your password'
                    value={ pass }
                    error={ isTouched && pass.length === 0 }
                    type='password'
                    onChange={ handleChange }
                    onBlur={ () => setIsTouched( true ) }
                    required
                />
              </Box>   
            </CardContent>
              <Box 
                  display='flex' 
                  flexDirection='column'
                  margin='1rem auto'
                >
                  <Button 
                    type='submit'
                    sx={{ width: '180px'}} 
                    variant='contained' 
                    onClick={ handleLogin }
                    disabled = { 
                      username.length <= 0 || pass.length <= 0
                    }
                  >
                    Login
                  </Button>
              </Box>
            <Box display='flex' alignItems='center' justifyContent='center' mt={3}>
              <Typography variant='subtitle2'>Not have an account yet?</Typography>
              <Button sx={{ paddingLeft: '3px'}} onClick={()=> navigate('/create-user')}>click here</Button>
            </Box>
        </Card>
      </Grid>
      
      <Grid item xs={ 0 } md={ 6 } lg={ 8 } position='relative' className='responsive-login-image'>
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: '#222',
          opacity: '0.5',
        }}
        >
        </Box>
        <img 
          src={ bank_image }
          alt='bank-image'
          height='100%'
        />
      </Grid>
    </Grid>
  )
}

export default Login;